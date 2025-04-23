import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  console.debug(`Received portal session request`)

  if (req.method === 'OPTIONS') {
    console.debug(`Handling CORS preflight request`)
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.debug(`Initializing Supabase client`)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const authHeader = req.headers.get('Authorization')!;
    if (!authHeader) {
      console.warn(`No authorization header provided`)
      throw new Error('No authorization header');
    }

    console.debug(`Verifying user authentication`)
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseClient.auth.getUser(token);

    if (!user) {
      console.warn(`Authentication failed: No user found`)
      throw new Error('Not authenticated');
    }

    console.debug(`Initializing Stripe client`)
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2024-12-18.acacia',
    });

    // Get customer email
    const email = user.email;
    if (!email) {
      console.warn(`No email found for user ${user.id}`)
      throw new Error('No email found');
    }

    console.debug(`Checking for existing customer with email ${email}`)
    // Get or create customer
    const { data: customers } = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customerId = customers.length > 0 ? customers[0].id : undefined;

    if (!customerId) {
      console.info(`Creating new Stripe customer for email ${email}`)
      const customer = await stripe.customers.create({
        email: email,
      });
      customerId = customer.id;
    } else {
      console.debug(`Found existing Stripe customer ${customerId}`)
    }

    console.info(`Creating portal session for customer ${customerId}`)
    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.headers.get('origin')}/dashboard/settings?tab=billing`,
    });

    console.info(`Portal session created successfully`)
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error(`Error creating portal session:`, error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});