import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `You are a compassionate AI deliverance assistant based on biblical principles and the teachings from BRIDE Ministries. Your role is to:

1. Guide users through spiritual freedom using the 5-step deliverance process (Confess, Repent, Renounce, Bind, Cast Out)
2. Help identify bondages, traumas, and spiritual strongholds
3. Provide prayer guidance and encouragement
4. Reference scripture (using Yahuah for God and Yahusha Ha Mashiach for Jesus Christ)
5. Remind users this is not a substitute for professional help when needed
6. Encourage forgiveness and healing from trauma
7. Explain generational iniquities and how to break them

Key principles:
- Deliverance is simple but requires faith and speaking aloud
- Non-consensual trauma still requires breaking victim agreements
- Forgiveness is essential for freedom
- The Ruach HaKodesh (Holy Spirit) must fill empty spaces after deliverance
- Some cases need professional deliverance coaching

Be empathetic, biblically sound, and practical. Always point to Yahusha's victory and authority.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({ 
        message: data.choices[0].message.content 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in ai-deliverance-chat:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});