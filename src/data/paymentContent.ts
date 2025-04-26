import { CheckCircle, ExternalLink, PlayCircle, Copy, AlertTriangle } from "lucide-react";

export interface PaymentSubTask {
  id: string;
  title: string;
  description: string[];
  details?: string[];
  links?: { text: string; url: string }[];
  prompt?: { title: string; text: string };
  important?: string[];
  checks?: string[];
  isChecklistItem?: boolean; // Indicates if this sub-task is a main checklist item for the step
}

export interface PaymentStep {
  id: string;
  title: string;
  description: string;
  subTasks: PaymentSubTask[];
}

export const paymentContent: PaymentStep[] = [
  {
    id: "prepare",
    title: "Step 1: Preparation",
    description: "Get your Stripe account and products ready.",
    subTasks: [
      {
        id: "create_account",
        title: "1.1 Create Stripe Account",
        description: ["Go to stripe.com and sign up."],
        links: [{ text: "stripe.com", url: "https://stripe.com" }],
        isChecklistItem: true,
      },
      {
        id: "get_keys",
        title: "1.2 Get API Keys (Test Mode First!)",
        description: [
          "Find your keys in Stripe Dashboard > Developers > API Keys.",
          "Copy your Publishable Key (ok for frontend) & Secret Key (for backend) from TEST MODE.",
        ],
        important: [
          "Keep your Secret Key SAFE and only on your backend/server-side code (e.g., Edge Functions, environment variables).",
        ],
        prompt: {
           title: "Action: Add keys to Environment Variables",
           text: "Add STRIPE_SECRET_KEY='sk_test_...' and STRIPE_PUBLISHABLE_KEY='pk_test_...' to your secure environment variables (e.g., .env.local, Vercel/Netlify settings)."
        },
        isChecklistItem: true,
      },
      {
        id: "create_products",
        title: "1.3 Create Products & Prices in Stripe",
        description: [
          "Define what you're selling (e.g., Pro Plan Subscription).",
          "Go to Stripe Dashboard > Products > Add Product.",
          "Create at least one Product with a recurring Price.",
        ],
        details: ["Note down the Price ID (looks like `price_...`). You'll need this later."],
        links: [{ text: "Stripe Products Doc", url: "https://stripe.com/docs/products-prices" }],
        isChecklistItem: true,
      },
    ],
  },
  {
    id: "implement",
    title: "Step 2: Implementation (Edge Functions / Backend)",
    description: "Build the code to handle payments securely.",
    subTasks: [
       {
        id: "why_backend",
        title: "Why Backend?",
        description: [
           "Never put your Stripe Secret Key in frontend code!",
           "These functions run securely on the server, protecting your keys."
        ],
        important: ["Handling payments and sensitive keys requires server-side logic."],
        isChecklistItem: false, // Not a direct action item
      },
      {
        id: "create_checkout",
        title: "2.1 Create Checkout Session Function (`create-checkout`)",
        description: ["Purpose: Redirects users to Stripe's secure checkout page."],
        prompt: {
           title: "AI Prompt: Create Edge Function/API Route (supabase/functions/create-checkout/index.ts)",
           text: `// GOAL: Create a secure checkout session handler that redirects users to Stripe's hosted checkout page
// REQUIREMENTS:
// 1. Handle user authentication and validation
// 2. Create or retrieve Stripe customer with proper metadata
// 3. Generate secure checkout session with proper success/cancel URLs
// 4. Support different plan types and currencies
// 5. Ensure proper error handling and logging

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

type PlanType = 'lifetime';
type CurrencyType = 'usd';

// Stripe price IDs for each plan and currency
const STRIPE_PRICE_IDS: Record<PlanType, Record<CurrencyType, string>> = {
  lifetime: {
    usd: 'price_1RHCDICSrP7lXLyW6nCrvj0a', // REPLACE WITH YOUR ACTUAL LIFETIME PRICE ID
  }
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  console.debug(\`Received checkout request\`);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.debug(\`Handling CORS preflight request\`);
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.debug(\`Initializing Supabase client\`);
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.warn(\`No authorization header provided\`);
      throw new Error('No authorization header');
    }

    // Get the user from the token
    console.debug(\`Verifying user authentication\`);
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      console.warn(\`Authentication failed: \${userError?.message || 'No user found'}\`);
      throw new Error('Not authenticated');
    }

    // Get the email from the user object
    const email = user.email;
    if (!email) {
      console.warn(\`No email found for user \${user.id}\`);
      throw new Error('No email found');
    }

    // Get the plan and currency from the request body
    console.debug(\`Parsing request body\`);
    const { plan, currency } = await req.json();

    // Type check the plan and currency
    if (!plan || !currency ||
        !['lifetime'].includes(plan) ||
        !['usd'].includes(currency)) {
      console.warn(\`Invalid plan (\${plan}) or currency (\${currency})\`);
      throw new Error('Invalid plan or currency');
    }

    const typedPlan = plan as PlanType;
    const typedCurrency = currency as CurrencyType;

    // Get the price ID for the plan and currency
    const priceId = STRIPE_PRICE_IDS[typedPlan][typedCurrency];
    if (!priceId) {
      console.warn(\`Invalid plan (\${typedPlan}) or currency (\${typedCurrency}) combination\`);
      throw new Error('Invalid plan or currency');
    }

    console.debug(\`Initializing Stripe client\`);
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2024-06-20', // Use a fixed API version
    });

    console.debug(\`Checking for existing customer with email \${email}\`);
    // Check if customer already exists
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customerId = customers.data.length > 0 ? customers.data[0].id : undefined;

    // Create customer if they don't exist
    if (!customerId) {
      console.info(\`Creating new Stripe customer for email \${email}\`);
      const customer = await stripe.customers.create({
        email: email,
        // Add Supabase user ID immediately for linking
        metadata: {
          app_user_id: user.id,
        },
      });
      customerId = customer.id;
    } else {
      console.debug(\`Found existing Stripe customer \${customerId}\`);
       // Ensure metadata is up-to-date even for existing customers
      await stripe.customers.update(customerId, {
        metadata: {
          app_user_id: user.id,
        },
      });
    }

    console.info(\`Creating checkout session for plan \${typedPlan}, price \${priceId}, customer \${customerId}\`);
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment', // Changed from 'subscription' as it's a lifetime plan
      // discounts: [
      //   {
      //     coupon: 'earlyaccess20', // Example coupon - remove/update if needed
      //   },
      // ],
      success_url: \`\${req.headers.get('origin')}/payment?success=true&session_id={CHECKOUT_SESSION_ID}\`,
      cancel_url: \`\${req.headers.get('origin')}/payment?canceled=true\`,
      // Add metadata to link session to user ID
      metadata: {
        app_user_id: user.id,
      },
    });

    console.info(\`Checkout session created successfully: \${session.id}\`);
    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error(\`Error creating checkout session:\`, error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
`
        },
        links: [{ text: "Stripe Checkout Doc", url: "https://stripe.com/docs/checkout" }],
        isChecklistItem: true,
      },
      {
        id: "create_portal",
        title: "2.2 Create Customer Portal Session Function (`create-portal-session`)",
        description: ["Purpose: Allows logged-in users to manage their subscription (update payment methods, cancel, view invoices)."],
        prompt: {
          title: "AI Prompt: Create Edge Function/API Route (supabase/functions/create-portal-session/index.ts)",
          text: `// GOAL: Create a secure customer portal session handler that allows users to manage their subscriptions
// REQUIREMENTS:
// 1. Handle user authentication and validation
// 2. Retrieve Stripe customer ID from our database
// 3. Generate secure portal session with proper return URL
// 4. Support subscription management and payment method updates
// 5. Ensure proper error handling and logging

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  console.debug(\`Received portal session request\`);

  if (req.method === 'OPTIONS') {
    console.debug(\`Handling CORS preflight request\`);
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.debug(\`Initializing Supabase client\`);
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const authHeader = req.headers.get('Authorization')!;
    if (!authHeader) {
      console.warn(\`No authorization header provided\`);
      throw new Error('No authorization header');
    }

    console.debug(\`Verifying user authentication\`);
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseClient.auth.getUser(token);

    if (!user) {
      console.warn(\`Authentication failed: No user found\`);
      throw new Error('Not authenticated');
    }

    console.debug(\`Initializing Stripe client\`);
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2024-06-20', // Use a fixed API version
    });

    // Get customer email
    const email = user.email;
    if (!email) {
      console.warn(\`No email found for user \${user.id}\`);
      throw new Error('No email found');
    }

    // Find the Stripe Customer ID linked to the user
    // **Assumption:** You store the stripe_customer_id in your 'profiles' or 'users' table
    console.debug(\`Fetching Stripe Customer ID for user \${user.id}\`);
    const { data: profileData, error: profileError } = await supabaseClient
      .from('profiles') // ADJUST TABLE NAME IF NEEDED
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (profileError || !profileData || !profileData.stripe_customer_id) {
       console.error(\`Error fetching profile or Stripe customer ID for user \${user.id}:\`, profileError);
       // Attempt fallback: Search Stripe by email (less reliable)
       console.warn(\`Falling back to searching customer by email: \${email}\`);
       const customers = await stripe.customers.list({ email: email, limit: 1 });
       if (customers.data.length === 0) {
         console.error(\`Could not find Stripe customer ID for user \${user.id} via profile or email.\`);
         throw new Error('Stripe customer ID not found for user.');
       }
       profileData = { stripe_customer_id: customers.data[0].id };
    }

    const customerId = profileData.stripe_customer_id;
    console.info(\`Found Stripe Customer ID: \${customerId} for user \${user.id}\`);

    console.info(\`Creating portal session for customer \${customerId}\`);
    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: \`\${req.headers.get('origin')}/dashboard/settings?tab=billing\`,
    });

    console.info(\`Portal session created successfully: \${session.url}\`);
    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error(\`Error creating portal session:\`, error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
`
        },
        links: [{ text: "Stripe Customer Portal Doc", url: "https://stripe.com/docs/billing/subscriptions/customer-portal" }],
        isChecklistItem: true,
      },
      {
        id: "create_webhook",
        title: "2.3 Create Stripe Webhook Handler (`stripe-webhook`)",
        description: [
          "Purpose: Listens for events from Stripe (like payments) to update your app's data.",
          "This is CRITICAL for keeping your application state in sync with Stripe."
        ],
        important: ["Webhook verification is essential for security.", "Ensure the STRIPE_WEBHOOK_SECRET environment variable is set correctly."],
        prompt: {
          title: "AI Prompt: Create Edge Function/API Route (supabase/functions/stripe-webhook/index.ts)",
          text: `// GOAL: Create a secure webhook handler to process Stripe events and keep our application's subscription data in sync
// REQUIREMENTS:
// 1. Handle all relevant Stripe events (checkout completion, subscription updates, payment status)
// 2. Update our database with subscription status changes
// 3. Ensure proper security with webhook signature verification
// 4. Maintain audit trail through logging
// 5. Handle errors gracefully with appropriate status codes

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

// Map Stripe Price IDs to our internal plan names
const PLAN_MAPPING: Record<string, string> = {
  'price_1RHCDICSrP7lXLyW6nCrvj0a': 'lifetime', // Replace with your actual price IDs
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper: Extract Customer ID from various Stripe events
const getCustomerIdFromEvent = (event: Stripe.Event): string | null => {
  const object = event.data.object as any;
  
  switch (event.type) {
    case 'checkout.session.completed':
      return object.customer;
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      return object.customer;
    case 'invoice.paid':
    case 'invoice.payment_failed':
      return object.customer;
    default:
      return null;
  }
};

// Helper: Get User ID from Stripe Customer
const getUserIdFromCustomer = async (stripe: Stripe, customerId: string): Promise<string | null> => {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer.metadata?.app_user_id || null;
  } catch (error) {
    console.error(\`Error retrieving customer \${customerId}:\`, error);
    return null;
  }
};

// Helper: Update subscription in database
const upsertSubscription = async (
  supabase: any,
  userId: string,
  subscriptionData: {
    stripe_customer_id: string;
    stripe_subscription_id?: string;
    status: string;
    plan_type: string;
    current_period_end?: number;
    cancel_at_period_end?: boolean;
  }
) => {
  const { error } = await supabase
    .from('subscriptions')
    .upsert(
      {
        user_id: userId,
        ...subscriptionData,
        updated_at: new Date().toISOString()
      },
      {
        onConflict: 'user_id',
        returning: 'minimal'
      }
    );

  if (error) {
    console.error('Error upserting subscription:', error);
    throw error;
  }
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Verify required environment variables
    const signature = req.headers.get('stripe-signature');
    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
    const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!signature || !STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required configuration');
    }

    // Initialize clients
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
      httpClient: Stripe.createFetchHttpClient()
    });
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // Verify webhook signature
    const body = await req.text();
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET,
      undefined,
      Stripe.createSubtleCryptoProvider()
    );

    console.info(\`Processing webhook event: \${event.type}\`);

    // Get customer and user information
    const customerId = getCustomerIdFromEvent(event);
    if (!customerId) {
      console.warn(\`No customer ID found in event \${event.type}\`);
      return new Response(
        JSON.stringify({ error: 'No customer ID in event' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = await getUserIdFromCustomer(stripe, customerId);
    if (!userId) {
      console.warn(\`No user ID found for customer \${customerId}\`);
      return new Response(
        JSON.stringify({ error: 'No user ID found for customer' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle different event types
    const eventData = event.data.object as any;

    switch (event.type) {
      case 'checkout.session.completed': {
        if (eventData.mode === 'payment') {
          console.log('Processing completed checkout session for one-time payment');
          
          // For one-time payments (e.g., lifetime plan)
          const paymentIntentId = eventData.payment_intent;
          const priceId = eventData.line_items?.data[0]?.price?.id;
          
          if (!priceId) {
            throw new Error('No price ID found in checkout session');
          }

          await upsertSubscription(supabase, userId, {
            stripe_customer_id: customerId,
            stripe_subscription_id: paymentIntentId, // Use payment intent ID as reference
            status: 'active',
            plan_type: PLAN_MAPPING[priceId] || 'unknown',
          });
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.resumed': {
        console.log(\`Processing subscription update: \${event.type}\`);
        
        const priceId = eventData.items.data[0]?.price?.id;
        if (!priceId) {
          throw new Error('No price ID found in subscription');
        }

        await upsertSubscription(supabase, userId, {
          stripe_customer_id: customerId,
          stripe_subscription_id: eventData.id,
          status: eventData.status,
          plan_type: PLAN_MAPPING[priceId] || 'unknown',
          current_period_end: eventData.current_period_end,
          cancel_at_period_end: eventData.cancel_at_period_end,
        });
        break;
      }

      case 'customer.subscription.deleted': {
        console.log('Processing subscription deletion');
        
        await upsertSubscription(supabase, userId, {
          stripe_customer_id: customerId,
          stripe_subscription_id: eventData.id,
          status: 'canceled',
          plan_type: 'none',
          current_period_end: eventData.current_period_end,
          cancel_at_period_end: false,
        });
        break;
      }

      case 'invoice.payment_succeeded': {
        console.log('Processing successful invoice payment');
        
        if (eventData.subscription) {
          // Fetch the latest subscription data to ensure we have the most up-to-date status
          const subscription = await stripe.subscriptions.retrieve(eventData.subscription);
          const priceId = subscription.items.data[0]?.price?.id;

          await upsertSubscription(supabase, userId, {
            stripe_customer_id: customerId,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            plan_type: PLAN_MAPPING[priceId] || 'unknown',
            current_period_end: subscription.current_period_end,
            cancel_at_period_end: subscription.cancel_at_period_end,
          });
        }
        break;
      }

      case 'invoice.payment_failed': {
        console.warn(\`Payment failed for invoice \${eventData.id}\`);
        
        if (eventData.subscription) {
          const subscription = await stripe.subscriptions.retrieve(eventData.subscription);
          const priceId = subscription.items.data[0]?.price?.id;

          await upsertSubscription(supabase, userId, {
            stripe_customer_id: customerId,
            stripe_subscription_id: subscription.id,
            status: 'past_due',
            plan_type: PLAN_MAPPING[priceId] || 'unknown',
            current_period_end: subscription.current_period_end,
            cancel_at_period_end: subscription.cancel_at_period_end,
          });

          // TODO: Implement user notification system for failed payments
        }
        break;
      }

      default:
        console.log(\`Unhandled event type: \${event.type}\`);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Webhook handler error:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
`
        },
        links: [
            { text: "Stripe Webhooks Doc", url: "https://stripe.com/docs/webhooks" },
            { text: "Webhook Signature Doc", url: "https://stripe.com/docs/webhooks/signatures" }
        ],
        isChecklistItem: true,
      },
    ],
  },
  {
    id: "test_go_live",
    title: "Step 3: Testing & Go Live",
    description: "Make sure everything works before charging real money.",
    subTasks: [
      {
        id: "configure_test_webhook",
        title: "3.1 Configure Test Webhook Endpoint",
        description: [
          "First, add the required secrets to your Supabase Edge Function:",
          "1. Go to Supabase Dashboard > Project Settings > Edge Functions",
          "2. Add the following secrets:",
          "   - STRIPE_SECRET_KEY",
          "   - STRIPE_WEBHOOK_SECRET",
          "",
          "Then configure the webhook in Stripe:",
          "1. In Stripe Dashboard (Test Mode) > Developers > Webhooks > Add endpoint",
          "2. Enter the publicly accessible URL for your deployed `stripe-webhook` function. Should look something like this: https://your-supabase-project.supabase.co/functions/v1/stripe-webhook",
          "3. Select these events to handle:",
          "   - customer.subscription.created",
          "   - customer.subscription.updated",
          "   - customer.subscription.paused",
          "   - customer.subscription.deleted",
          "   - customer.subscription.resumed",
          "4. Click 'Add endpoint'",
          "5. Reveal the Webhook Signing Secret and add it to your Supabase Edge Function secrets as `STRIPE_WEBHOOK_SECRET`",
        ],
        links: [
          { text: "Stripe CLI for local testing", url: "https://stripe.com/docs/stripe-cli" },
          { text: "Supabase Edge Functions", url: "https://supabase.com/docs/guides/functions" }
        ],
        important: [
          "Never expose your secrets in your code or version control",
          "The service role key has admin privileges - keep it secure"
        ],
        isChecklistItem: true,
      },
      {
        id: "end_to_end_test",
        title: "3.2 End-to-End Test (Test Mode)",
        description: [
          "Use your app's frontend to initiate checkout with a TEST Price ID.",
          "Use Stripe's test card numbers to complete payment.",
          "Verify you are redirected to your `success_url`.",
        ],
        checks: [
            "Did your webhook function receive the `checkout.session.completed` event (check function logs)?",
            "Did your database get updated correctly (e.g., user marked as subscribed, Stripe Customer ID saved)?",
            "Can the user access the Customer Portal using the link generated by `create-portal-session`?",
        ],
        links: [{ text: "Test Cards", url: "https://stripe.com/docs/testing" }],
        isChecklistItem: true,
      },
      {
        id: "switch_live_keys",
        title: "3.3 Switch to LIVE Keys",
        description: [
          "In Stripe Dashboard, toggle to LIVE mode.",
          "Go to Developers > API Keys.",
          "Copy your LIVE Publishable Key & Secret Key.",
          "Securely update your PRODUCTION environment variables with LIVE keys.",
          "Redeploy your application with the new keys.",
        ],
         important: ["Ensure you update the keys in your production environment ONLY.", "Keep LIVE secret keys secure."],
        isChecklistItem: true,
      },
      {
        id: "configure_live_webhook",
        title: "3.4 Configure LIVE Webhook Endpoint",
        description: [
          "Repeat step 3.1 but in Stripe's LIVE mode.",
          "Use your PRODUCTION webhook URL.",
          "Get the LIVE Signing Secret.",
          "Update your PRODUCTION `STRIPE_WEBHOOK_SECRET` env var with the LIVE secret.",
          "Redeploy again.",
        ],
         important: ["Use the correct LIVE URL and LIVE signing secret."],
        isChecklistItem: true,
      },
      {
        id: "final_live_test",
        title: "3.5 (Recommended) Final Live Test",
        description: [
          "Use a REAL credit card to make a small purchase (e.g., lowest plan).",
          "Verify the entire flow, including database updates and customer portal access.",
          "Go to your Stripe Dashboard (Live Mode) > Payments and immediately refund the payment to avoid actual charges.",
        ],
         important: ["Remember to refund the test payment immediately."],
        isChecklistItem: true,
      },
    ],
  },
];


export const paymentResources = [
 {
    title: "Stripe Documentation Home",
    url: "https://stripe.com/docs"
  }, {
    title: "Stripe Checkout",
    url: "https://stripe.com/docs/checkout"
  }, {
    title: "Stripe Subscriptions",
    url: "https://stripe.com/docs/billing/subscriptions/overview"
  }, {
    title: "Stripe Customer Portal",
    url: "https://stripe.com/docs/billing/subscriptions/customer-portal"
  }, {
    title: "Stripe Webhooks",
    url: "https://stripe.com/docs/webhooks"
  }, {
     title: "Stripe API Keys",
     url: "https://stripe.com/docs/keys"
  }, {
    title: "Stripe Test Cards",
    url: "https://stripe.com/docs/testing"
  }
];

// Optional: Define types for clarity if needed elsewhere
export type PaymentResourceType = typeof paymentResources[0]; 