import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PLAN_MAPPING = {
  'price_1RFyySCEMnmk0WNT4Ho7QbMh': 'lifetime',
} as const;

serve(async (req) => {
  console.debug(`Received webhook request`)

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.debug(`Handling CORS preflight request`)
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the authorization header
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      console.warn(`Missing stripe-signature header in request`)
      return new Response(
        JSON.stringify({ error: 'Missing stripe-signature header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')
    const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error(`Missing required environment variables`)
      throw new Error('Missing environment variables')
    }

    console.debug(`Initializing Stripe client`)
    // Initialize Stripe with the latest API version
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2025-03-31.basil',
      httpClient: Stripe.createFetchHttpClient(),
    })

    // Get the raw body
    const body = await req.text()
    console.debug(`Received webhook body`)

    // Verify the webhook signature
    let event
    try {
      console.debug(`Verifying webhook signature`)
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        STRIPE_WEBHOOK_SECRET,
        undefined,
        Stripe.createSubtleCryptoProvider()
      )
      console.info(`Webhook signature verified successfully. Event type: ${event.type}`)
    } catch (err: unknown) {
      console.error(`Webhook signature verification failed:`, (err as Error).message)
      return new Response(
        JSON.stringify({ error: 'Webhook signature verification failed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.debug(`Initializing Supabase client`)
    // Initialize Supabase client with service role key
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      db: {
        schema: 'public'
      }
    })

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.resumed': {
        console.info(`Processing ${event.type} event`)
        const subscription = event.data.object
        console.debug(`Retrieving customer data for subscription ${subscription.id}`)
        const customer = await stripe.customers.retrieve(subscription.customer as string)

        // Update or insert subscription in Supabase
        const priceId = subscription.items.data[0].price.id
        const planName = PLAN_MAPPING[priceId as keyof typeof PLAN_MAPPING] || 'explorer'
        console.debug(`Mapped price ${priceId} to plan ${planName}`)

        console.debug(`Upserting subscription data for user ${customer.metadata.app_user_id}`)
        const { error } = await supabase
          .from('subscriptions')
          .upsert(
            {
              user_id: customer.metadata.app_user_id,
              stripe_subscription_id: subscription.id,
              stripe_customer_id: subscription.customer,
              status: subscription.status,
              price_id: priceId,
              plan_name: planName,
              quantity: subscription.items.data[0].quantity,
              cancel_at_period_end: subscription.cancel_at_period_end,
              current_period_start: new Date(subscription.current_period_start * 1000),
              current_period_end: new Date(subscription.current_period_end * 1000),
              updated_at: new Date(),
            },
            {
              onConflict: 'stripe_subscription_id'
            }
          )

        if (error) {
          console.error(`Error updating subscription:`, error)
          throw error
        }
        console.info(`Successfully processed ${event.type} for subscription ${subscription.id}`)
        break
      }

      case 'customer.subscription.deleted': {
        console.info(`Processing subscription deletion event`)
        const subscription = event.data.object

        console.debug(`Deleting subscription ${subscription.id} from database`)
        const { error } = await supabase
          .from('subscriptions')
          .delete()
          .match({ stripe_subscription_id: subscription.id })

        if (error) {
          console.error(`Error deleting subscription ${subscription.id}:`, error)
          throw error
        }
        console.info(`Successfully deleted subscription ${subscription.id}`)
        break
      }

      case 'payment_intent.succeeded': {
        console.info(`Processing payment intent succeeded event`)
        const paymentIntent = event.data.object
        console.debug(`Retrieving customer data for payment intent ${paymentIntent.id}`)
        const customer = await stripe.customers.retrieve(paymentIntent.customer as string)
        
        console.debug(`Upserting payment intent data for customer ${paymentIntent.customer}`)
        const { error } = await supabase
          .from('subscriptions')
          .upsert(
            {
              user_id: customer.metadata.app_user_id,
              stripe_subscription_id: paymentIntent.id, // Using payment intent ID as subscription ID
              stripe_customer_id: paymentIntent.customer,
              status: paymentIntent.status,
              price_id: 'price_1RFyySCEMnmk0WNT4Ho7QbMh', // Payment intent doesn't have price ID
              plan_name: 'lifetime', // Default to explorer as we don't have plan info
              quantity: 1, // Default quantity
              cancel_at_period_end: false, // Payment intents don't have this info
              current_period_start: new Date(paymentIntent.created * 1000),
              current_period_end: new Date(paymentIntent.created * 1000), // Same as start since we don't have period info
              updated_at: new Date(),
            },
            {
              onConflict: 'stripe_subscription_id'
            }
          )

        if (error) {
          console.error(`Error updating subscription with payment intent:`, error)
          throw error
        }
        console.info(`Successfully processed payment intent ${paymentIntent.id}`)
        break
      }
    }

    console.info(`Webhook processed successfully`)
    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error(`Critical error processing webhook:`, error)
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})