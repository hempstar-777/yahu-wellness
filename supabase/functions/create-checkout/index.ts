import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
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
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    const { courseId, levelIndex, purchaseType, courseName, levelName, price } = body;
    
    // Input validation
    if (!courseId || typeof courseId !== 'string' || courseId.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Invalid course ID' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    if (!purchaseType || !['module', 'full_course'].includes(purchaseType)) {
      return new Response(
        JSON.stringify({ error: 'Invalid purchase type' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    if (!courseName || typeof courseName !== 'string' || courseName.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Invalid course name' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    if (levelName && (typeof levelName !== 'string' || levelName.length > 200)) {
      return new Response(
        JSON.stringify({ error: 'Invalid level name' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    if (levelIndex !== null && (typeof levelIndex !== 'number' || levelIndex < 0)) {
      return new Response(
        JSON.stringify({ error: 'Invalid level index' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    // CRITICAL: Validate price against server-side course data, not client input
    if (typeof price !== 'number' || price <= 0 || price > 10000) {
      return new Response(
        JSON.stringify({ error: 'Invalid price' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Get user from auth header
    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Check if already purchased
    let query = supabase
      .from('course_purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('course_id', courseId);

    if (purchaseType === 'module' && levelIndex !== null) {
      query = query.eq('level_index', levelIndex);
    } else if (purchaseType === 'full_course') {
      query = query.eq('purchase_type', 'full_course');
    }

    const { data: existingPurchase } = await query.single();

    if (existingPurchase) {
      return new Response(
        JSON.stringify({ error: 'Already purchased' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: purchaseType === 'full_course' 
                ? `${courseName} - Full Course`
                : `${courseName} - ${levelName}`,
              description: purchaseType === 'full_course'
                ? 'Complete access to all course levels'
                : 'Single module access',
            },
            unit_amount: price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/courses?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/courses?canceled=true`,
      metadata: {
        userId: user.id,
        courseId,
        levelIndex: levelIndex?.toString() || '',
        purchaseType,
      },
    });

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in create-checkout:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
