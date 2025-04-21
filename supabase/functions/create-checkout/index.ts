import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

type PlanType = 'lifetime';
type CurrencyType = 'usd';

// Stripe price IDs for each plan and currency
const STRIPE_PRICE_IDS: Record<PlanType, Record<CurrencyType, string>> = {
  lifetime: {
    usd: 'price_1RFyySCEMnmk0WNT4Ho7QbMh',
  }
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  console.debug(`Received checkout request`)

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.debug(`Handling CORS preflight request`)
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.debug(`Initializing Supabase client`)
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.warn(`No authorization header provided`)
      throw new Error('No authorization header');
    }

    // Get the user from the token
    console.debug(`Verifying user authentication`)
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      console.warn(`Authentication failed: ${userError?.message || 'No user found'}`)
      throw new Error('Not authenticated');
    }

    // Get the email from the user object
    const email = user.email;
    if (!email) {
      console.warn(`No email found for user ${user.id}`)
      throw new Error('No email found');
    }

    // Get the plan and currency from the request body
    console.debug(`Parsing request body`)
    const { plan, currency } = await req.json();
    
    // Type check the plan and currency
    if (!plan || !currency || 
        !['lifetime'].includes(plan) || 
        !['usd'].includes(currency)) {
      console.warn(`Invalid plan (${plan}) or currency (${currency})`)
      throw new Error('Invalid plan or currency');
    }
    
    const typedPlan = plan as PlanType;
    const typedCurrency = currency as CurrencyType;

    // Get the price ID for the plan and currency
    const priceId = STRIPE_PRICE_IDS[typedPlan][typedCurrency];
    if (!priceId) {
      console.warn(`Invalid plan (${typedPlan}) or currency (${typedCurrency}) combination`)
      throw new Error('Invalid plan or currency');
    }

    console.debug(`Initializing Stripe client`)
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2024-12-18.acacia',
    });

    console.debug(`Checking for existing customer with email ${email}`)
    // Check if customer already exists
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customerId = customers.data.length > 0 ? customers.data[0].id : undefined;

    // Create customer if they don't exist
    if (!customerId) {
      console.info(`Creating new Stripe customer for email ${email}`)
      const customer = await stripe.customers.create({
        email: email,
      });
      customerId = customer.id;
    } else {
      console.debug(`Found existing Stripe customer ${customerId}`)
    }

    console.debug(`Updating customer metadata for user ${user.id}`)
    // Update the customer with the user's ID
    await stripe.customers.update(customerId, {
      metadata: {
        app_user_id: user.id,
      },
    });

    console.info(`Creating checkout session for plan ${typedPlan}`)
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      discounts: [
        {
          coupon: 'tZsxFraY',
        },
      ],
      success_url: `${req.headers.get('origin')}/dashboard/settings?tab=billing`,
      cancel_url: `${req.headers.get('origin')}/dashboard/settings?tab=billing`,
    });

    console.info(`Checkout session created successfully: ${session.id}`)
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error(`Error creating checkout session:`, error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});