import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory cache: key = `${text}:${voiceId}`, value = base64 audio
const audioCache = new Map<string, string>();
const CACHE_MAX_SIZE = 50; // Limit cache size

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voiceId } = await req.json();
    
    if (!text || !voiceId) {
      throw new Error('Text and voiceId are required');
    }

    // Check cache first
    const cacheKey = `${text.substring(0, 100)}:${voiceId}`;
    const cached = audioCache.get(cacheKey);
    if (cached) {
      console.log('Returning cached audio');
      return new Response(JSON.stringify({ audioContent: cached, cached: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

    let base64Audio: string | null = null;
    let usedProvider = '';

    // Try ElevenLabs first
    if (ELEVENLABS_API_KEY) {
      try {
        console.log('Attempting ElevenLabs TTS for voice:', voiceId);
        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
          {
            method: 'POST',
            headers: {
              'Accept': 'audio/mpeg',
              'Content-Type': 'application/json',
              'xi-api-key': ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
              text,
              model_id: 'eleven_turbo_v2_5',
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
              },
            }),
          }
        );

        if (response.ok) {
          const audioBuffer = await response.arrayBuffer();
          base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));
          usedProvider = 'ElevenLabs';
          console.log('ElevenLabs TTS succeeded');
        } else {
          const error = await response.text();
          console.warn('ElevenLabs failed:', error);
          // Check if quota/credits issue
          const isQuotaIssue = error.includes('quota') || error.includes('credits');
          if (!isQuotaIssue) {
            // If not a quota issue, return the error
            throw new Error(`ElevenLabs: ${error}`);
          }
          console.log('ElevenLabs quota exceeded, falling back to OpenAI');
        }
      } catch (elevenLabsError) {
        console.error('ElevenLabs error:', elevenLabsError);
      }
    }

    // Fallback to OpenAI TTS if ElevenLabs failed or no key
    if (!base64Audio && OPENAI_API_KEY) {
      try {
        console.log('Attempting OpenAI TTS fallback');
        const openaiResponse = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'tts-1',
            input: text,
            voice: 'alloy', // Natural-sounding voice
            response_format: 'mp3',
          }),
        });

        if (!openaiResponse.ok) {
          const errorText = await openaiResponse.text();
          throw new Error(`OpenAI TTS: ${errorText}`);
        }

        const audioBuffer = await openaiResponse.arrayBuffer();
        base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));
        usedProvider = 'OpenAI';
        console.log('OpenAI TTS succeeded');
      } catch (openaiError) {
        console.error('OpenAI TTS error:', openaiError);
        throw new Error('Both ElevenLabs and OpenAI TTS failed');
      }
    }

    if (!base64Audio) {
      throw new Error('No TTS provider available or all failed');
    }

    // Cache the result (manage cache size)
    if (audioCache.size >= CACHE_MAX_SIZE) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, base64Audio);

    return new Response(JSON.stringify({ 
      audioContent: base64Audio, 
      provider: usedProvider,
      cached: false 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in text-to-speech function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
