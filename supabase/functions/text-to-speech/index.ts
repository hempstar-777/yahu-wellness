import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client for storage
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Create a hash for caching
async function generateHash(text: string, voiceId: string): Promise<string> {
  const data = new TextEncoder().encode(`${text}:${voiceId}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voiceId } = await req.json();
    
    if (!text || !voiceId) {
      throw new Error('Text and voiceId are required');
    }

    // Generate unique hash for this text+voice combination
    const audioHash = await generateHash(text, voiceId);
    const storagePath = `${audioHash}.mp3`;

    // Check if audio already exists in permanent storage
    const { data: existingFile } = await supabase.storage
      .from('audio-cache')
      .list('', { search: audioHash });

    if (existingFile && existingFile.length > 0) {
      console.log('Returning permanently cached audio from storage');
      const { data: publicUrlData } = supabase.storage
        .from('audio-cache')
        .getPublicUrl(storagePath);
      
      return new Response(JSON.stringify({ 
        audioUrl: publicUrlData.publicUrl,
        cached: true,
        source: 'storage'
      }), {
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

    // Store in permanent storage
    const audioBuffer = Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0));
    
    const { error: uploadError } = await supabase.storage
      .from('audio-cache')
      .upload(storagePath, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert: true
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      // Still return the audio even if storage fails
      return new Response(JSON.stringify({ 
        audioContent: base64Audio, 
        provider: usedProvider,
        cached: false 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Audio stored permanently: ${storagePath}`);
    
    const { data: publicUrlData } = supabase.storage
      .from('audio-cache')
      .getPublicUrl(storagePath);

    return new Response(JSON.stringify({ 
      audioUrl: publicUrlData.publicUrl,
      provider: usedProvider,
      cached: false,
      source: 'generated'
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
