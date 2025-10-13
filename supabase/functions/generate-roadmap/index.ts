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
    const body = await req.json();
    const { assessmentResults, assessmentType } = body;
    
    // Input validation
    if (!assessmentType || typeof assessmentType !== 'string' || assessmentType.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Invalid assessment type' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    if (!assessmentResults || typeof assessmentResults !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Invalid assessment results' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Limit assessment results size to prevent DoS
    const resultsString = JSON.stringify(assessmentResults);
    if (resultsString.length > 50000) {
      return new Response(
        JSON.stringify({ error: 'Assessment results too large' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `You are a compassionate spiritual deliverance coach creating personalized 30-day freedom roadmaps. Based on assessment results, generate a detailed, actionable plan following biblical principles.

Your roadmap must include:
1. **Week-by-week breakdown** (4 weeks)
2. **Daily activities** for critical days
3. **Specific prayers** to pray (reference the 5-step process: Confess, Repent, Renounce, Bind, Cast Out)
4. **Fasting recommendations** (when and how)
5. **Scripture reading plan** (use Yahuah for God, Yahusha Ha Mashiach for Jesus)
6. **Healing milestones** to track progress
7. **Warning signs** to watch for
8. **Emergency prayers** for difficult moments

Format your response as JSON with this structure:
{
  "title": "Your Personalized 30-Day Freedom Journey",
  "overview": "Brief overview of the journey",
  "weeks": [
    {
      "week": 1,
      "focus": "Main theme for this week",
      "days": [
        {
          "day": 1,
          "title": "Day title",
          "activities": ["activity 1", "activity 2"],
          "prayers": ["prayer 1", "prayer 2"],
          "scripture": "Book chapter:verse",
          "fasting": "fasting instruction if applicable"
        }
      ],
      "milestone": "What should be achieved by end of week"
    }
  ],
  "emergency_toolkit": {
    "quick_prayers": ["prayer 1", "prayer 2"],
    "scriptures": ["verse 1", "verse 2"],
    "warning_signs": ["sign 1", "sign 2"]
  }
}`;

    const userPrompt = `Assessment Type: ${assessmentType}
Assessment Results: ${JSON.stringify(assessmentResults, null, 2)}

Generate a personalized 30-day deliverance roadmap addressing the specific issues identified in this assessment. Be specific, practical, and biblically sound.`;

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
          { role: 'user', content: userPrompt }
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
    const roadmapContent = data.choices[0].message.content;
    
    // Try to parse JSON from the response
    let roadmapData;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = roadmapContent.match(/```json\n([\s\S]*?)\n```/) || 
                       roadmapContent.match(/```\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : roadmapContent;
      roadmapData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Fallback: return raw content
      roadmapData = {
        title: "Your Personalized Freedom Roadmap",
        overview: roadmapContent,
        weeks: [],
        emergency_toolkit: {
          quick_prayers: [],
          scriptures: [],
          warning_signs: []
        }
      };
    }
    
    return new Response(
      JSON.stringify({ roadmap: roadmapData }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in generate-roadmap:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
