import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!signature || !webhookSecret) {
    return new Response('Missing signature or webhook secret', { status: 400 });
  }

  try {
    const body = await req.text();
    
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider
    );

    console.log('Webhook event:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const metadata = session.metadata;
      
      if (!metadata) {
        console.error('No metadata in session');
        return new Response('No metadata', { status: 400 });
      }

      const { userId, courseId, levelIndex, purchaseType } = metadata;

      // SECURITY: Validate metadata fields
      if (!userId || !courseId || !purchaseType) {
        console.error('Missing required metadata fields');
        return new Response('Invalid metadata', { status: 400 });
      }

      // SECURITY: Verify user exists and customer email matches
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', userId)
        .single();

      if (profileError || !profile) {
        console.error('User not found:', userId);
        return new Response('Invalid user', { status: 400 });
      }

      // SECURITY: Verify customer email matches user profile
      if (session.customer_email && session.customer_email !== profile.email) {
        console.error('Email mismatch - potential fraud attempt');
        return new Response('Email mismatch', { status: 400 });
      }

      // SECURITY: Validate purchaseType enum
      if (!['full_course', 'single_level'].includes(purchaseType)) {
        console.error('Invalid purchase type');
        return new Response('Invalid purchase type', { status: 400 });
      }

      // Record the purchase
      const { error: purchaseError } = await supabase
        .from('course_purchases')
        .insert({
          user_id: userId,
          course_id: courseId,
          level_index: levelIndex ? parseInt(levelIndex) : null,
          purchase_type: purchaseType,
          stripe_payment_id: session.payment_intent as string,
          amount_paid: session.amount_total || 0,
          currency: session.currency || 'usd',
        });

      if (purchaseError) {
        console.error('Error recording purchase:', purchaseError);
        throw purchaseError;
      }

      // Update course progress
      if (purchaseType === 'full_course') {
        // Grant access to all levels
        const { error: progressError } = await supabase
          .from('course_progress')
          .upsert({
            user_id: userId,
            course_id: courseId,
            level_index: 1,
            completed: false,
          });

        if (progressError) {
          console.error('Error updating progress:', progressError);
        }
      } else if (levelIndex) {
        // Grant access to specific level
        const { error: progressError } = await supabase
          .from('course_progress')
          .upsert({
            user_id: userId,
            course_id: courseId,
            level_index: parseInt(levelIndex),
            completed: false,
          });

        if (progressError) {
          console.error('Error updating progress:', progressError);
        }
      }

      console.log('Purchase recorded successfully');
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
});
