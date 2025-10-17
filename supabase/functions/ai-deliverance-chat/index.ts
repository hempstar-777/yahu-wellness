import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Extract user ID from JWT
    const token = authHeader.replace('Bearer ', '');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid authentication' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Rate limiting: 20 requests per hour per user
    const windowStart = new Date();
    windowStart.setMinutes(0, 0, 0);
    
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from('ai_rate_limits')
      .select('request_count')
      .eq('user_id', user.id)
      .eq('function_name', 'ai-deliverance-chat')
      .gte('window_start', windowStart.toISOString())
      .maybeSingle();

    if (rateLimitError && rateLimitError.code !== 'PGRST116') {
      console.error('Rate limit check error:', rateLimitError);
    }

    const currentCount = rateLimitData?.request_count || 0;
    if (currentCount >= 20) {
      return new Response(JSON.stringify({ 
        error: 'Rate limit exceeded. Please try again in an hour.' 
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Update rate limit counter
    await supabase
      .from('ai_rate_limits')
      .upsert({
        user_id: user.id,
        function_name: 'ai-deliverance-chat',
        window_start: windowStart.toISOString(),
        request_count: currentCount + 1
      }, {
        onConflict: 'user_id,function_name,window_start'
      });

    const body = await req.json();
    const { messages } = body;
    
    // Input validation
    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Messages must be an array' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    if (messages.length === 0 || messages.length > 50) {
      return new Response(
        JSON.stringify({ error: 'Invalid message count (1-50 allowed)' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Validate each message structure
    for (const msg of messages) {
      if (!msg.role || !msg.content || typeof msg.content !== 'string') {
        return new Response(
          JSON.stringify({ error: 'Invalid message format' }),
          { status: 400, headers: corsHeaders }
        );
      }
      if (msg.content.length > 10000) {
        return new Response(
          JSON.stringify({ error: 'Message content too large' }),
          { status: 400, headers: corsHeaders }
        );
      }
    }
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `You are a compassionate AI deliverance assistant based on Messianic/Hebrew roots teachings and biblical principles from BRIDE Ministries. Your role is to:

1. Guide users through spiritual freedom using the 5-step deliverance process (Confess, Repent, Renounce, Bind, Cast Out)
2. Help identify bondages, traumas, and spiritual strongholds
3. Provide prayer guidance and encouragement
4. Reference scripture (using Yahuah for The Most High and Yahusha Ha Mashiach for the Messiah)
5. **CRITICAL DISCLAIMER**: Remind users that this is spiritual guidance, NOT medical treatment, psychiatric care, or licensed therapy
6. Encourage forgiveness and healing from spiritual trauma
7. Explain generational iniquities and how to break them

**IMPORTANT BOUNDARIES:**
- This is NOT a substitute for professional medical care, psychiatric treatment, or licensed therapy
- For mental health crises, suicidal thoughts, severe trauma, or medical emergencies, users MUST seek professional help (988 Lifeline, 911, RAINN 1-800-656-4673)
- You guide people toward spiritual healing that their body and soul are designed by Yahuah to experience - this works ALONGSIDE professional care when needed
- Do NOT diagnose medical conditions or prescribe medical treatments
- Do NOT claim to "cure" or "heal" medical/psychiatric conditions - frame as spiritual guidance for divinely-designed healing

Key principles:
- Deliverance is simple but requires faith and speaking aloud
- Non-consensual trauma still requires breaking spiritual victim agreements
- Forgiveness is essential for spiritual freedom
- The Ruach HaKodesh (Holy Spirit) must fill empty spaces after deliverance
- Some cases need professional deliverance coaching

Be empathetic, biblically sound, and practical. Always point to Yahusha's victory and authority while respecting medical boundaries.`;

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