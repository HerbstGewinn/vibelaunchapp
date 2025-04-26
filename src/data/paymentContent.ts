import {
  CheckCircle,
  ExternalLink,
  PlayCircle,
  Copy,
  AlertTriangle,
} from "lucide-react";

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
  videoUrl?: string;
}

export const paymentContent: PaymentStep[] = [
  {
    id: "prepare",
    title: "Step 1: Preparation",
    description: "Get your Stripe account and products ready.",
    videoUrl: "https://xnqbmtsphlduhxrkaopt.supabase.co/storage/v1/object/public/public-files//Payments%20Made%20Easy-2.mp4",
    subTasks: [
      {
        id: "create_account",
        title: "1.1 Create Stripe Account",
        description: [
          "Go to stripe.com and sign up. Stripe is a payment processor that allows you to accept payments from your customers.",
        ],
        links: [{ text: "stripe.com", url: "https://stripe.com" }],
        isChecklistItem: true,
      },
      {
        id: "get_keys",
        title: "1.2 Get and Store API Keys (Sandbox Mode First!)",
        description: [
          "Through the menu in the top left corner you can switch between sandbox and live mode. Go to your sandbox. Use the link down to open your sandbox dashboard.",
          "Find your api secret key in Stripe Dashboard > Developers > API Keys. The Publishable Key is ok for frontend, use the Secret Key only for backend from SANDBOX MODE.",
        ],
        important: [
          "Keep your Secret Key SAFE and only on your backend/server-side code (e.g., Edge Functions, environment variables).",
        ],
        links: [
          {
            text: "Stripe Sandbox Doc",
            url: "https://docs.stripe.com/sandboxes",
          },
          {
            text: "Stripe Sandbox Dashboard",
            url: "https://dashboard.stripe.com/test/dashboard",
          },
        ],
        prompt: {
          title: "Action: Add keys to Environment Variables",
          text: "Add STRIPE_SECRET_KEY='sk_test_...' to your supabase edge functions secrets. You can store it in the supabase dashboard > edge functions > secrets.",
        },
        isChecklistItem: true,
      },
      {
        id: "create_products",
        title: "1.3 Create Products & Prices in Stripe",
        description: [
          "Define what you're selling (e.g., Pro Plan Subscription).",
          "Go to Stripe Dashboard > Products > Add Product.",
          "Create at least one Product with a recurring Price. There must be one product for each plan.",
        ],
        details: [
          "Note down the Price IDs (looks like `price_...`). You'll need them later.",
        ],
        links: [
          {
            text: "Stripe Products Doc",
            url: "https://docs.stripe.com/products-prices/",
          },
        ],
        isChecklistItem: true,
      },
    ],
  },
  {
    id: "implement",
    title: "Step 2: Implementation (Edge Functions / Backend)",
    description: "Build the code to handle payments securely.",
    videoUrl: "https://xnqbmtsphlduhxrkaopt.supabase.co/storage/v1/object/public/public-files//Implementing%20Stripe%20Checkout-2.mp4",
    subTasks: [
      {
        id: "why_backend",
        title: "Why Backend?",
        description: [
          "Never put your Stripe Secret Key in frontend code!",
          "These functions run securely on the server, protecting your keys.",
        ],
        important: [
          "Handling payments and sensitive keys requires server-side logic.",
        ],
        isChecklistItem: false, // Not a direct action item
      },
      {
        id: "create_subscriptions_table",
        title: "2.1 Create Subscriptions Table",
        description: [
          "Create a table to store subscription data in your Supabase database.",
          "This table will keep track of user subscriptions and their status.",
        ],
        prompt: {
          title: "SQL Migration: Create Subscriptions Table",
          text: `-- Create subscriptions table
create table public.subscriptions (
    id uuid not null default gen_random_uuid(),
    user_id uuid references public.profiles(id),
    stripe_subscription_id text unique,
    stripe_customer_id text,
    status text not null,
    price_id text not null,
    quantity integer default 0,
    cancel_at_period_end boolean default false,
    current_period_start timestamptz,
    current_period_end timestamptz,
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now()),
    plan_name text default ''
);

-- Enable RLS
alter table subscriptions enable row level security;

-- Policy to enable users to view their own data only
create policy "Enable users to view their own data only"
    on subscriptions
    for select
    to authenticated
    using ((SELECT auth.uid() AS uid) = user_id);`,
        },
        important: [
          "This schema matches the data we'll receive from Stripe webhooks",
          "The RLS policies ensure users can only view their own subscriptions",
        ],
        isChecklistItem: true,
      },
      {
        id: "create_checkout",
        title: "2.2 Create Checkout Session Function (`create-checkout`)",
        description: [
          "Purpose: Redirects users to Stripe's secure checkout page.",
        ],
        prompt: {
          title:
            "AI Prompt: Create Edge Function/API Route (supabase/functions/create-checkout/index.ts)",
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

type PlanType = 'starter' | 'basic' | 'pro';
type CurrencyType = 'usd';

// Stripe price IDs for each plan and currency
const STRIPE_PRICE_IDS: Record<PlanType, Record<CurrencyType, string>> = {
  starter: {
    usd: 'price_123456789', // REPLACE WITH YOUR ACTUAL STARTER PRICE ID
  },
  basic: {
    usd: 'price_123456789', // REPLACE WITH YOUR ACTUAL BASIC PRICE ID
  },
  pro: {
    usd: 'price_123456789', // REPLACE WITH YOUR ACTUAL PRO PRICE ID
  },
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
      success_url: \`\${req.headers.get('origin')}/account\`,
      cancel_url: \`\${req.headers.get('origin')}/account\`,
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
`,
        },
        links: [
          {
            text: "Stripe Checkout Doc",
            url: "https://stripe.com/docs/checkout",
          },
        ],
        isChecklistItem: true,
      },
      {
        id: "create_portal",
        title: "2.3 Create Customer Portal Session Function (`create-portal-session`)",
        description: [
          "Purpose: Allows logged-in users to manage their subscription (update payment methods, cancel, view invoices).",
        ],
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
`,
        },
        links: [
          {
            text: "Stripe Customer Portal Doc",
            url: "https://stripe.com/docs/billing/subscriptions/customer-portal",
          },
        ],
        isChecklistItem: true,
      },
      {
        id: "create_billing_ui",
        title: "2.4 Create Billing Section UI",
        description: [
          "Purpose: Create a user-friendly billing interface in your settings/account page that shows subscription status and allows plan management.",
        ],
        prompt: {
          title: "AI Prompt: Create BillingSection Component (src/components/settings/BillingSection.tsx)",
          text: `// GOAL: Create a billing section component that displays subscription status and handles plan management
// REQUIREMENTS:
// 1. Show current subscription status and plan details
// 2. Allow purchasing a plan for users with no subscription
// 3. Enable subscription management through Stripe Portal
// 4. Handle loading states and errors gracefully
// 5. Update UI based on subscription status
// 6. Integrate billing section with the account/profiles/settings page

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, CreditCard, Plus } from "lucide-react";
import { Database } from '@/integrations/supabase/types';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

export const BillingSection = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isManaging, setIsManaging] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<'lifetime' | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadSubscription();
    }
  }, [user?.id]);

  const loadSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error("Error loading subscription:", error);
        toast.error('Failed to load subscription details');
        return;
      }
      
      setSubscription(data);
    } catch (error) {
      console.error("Error loading subscription:", error);
      toast.error('Failed to load subscription details');
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsManaging(true);
    try {
      const { data: { url }, error } = await supabase.functions.invoke('create-portal-session');
      
      if (error) {
        throw error;
      }
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error creating portal session:", error);
      toast.error('Failed to access billing portal');
    } finally {
      setIsManaging(false);
    }
  };

  const handleSubscribe = async (plan: 'lifetime') => {
    if (!user) {
      return;
    }

    setLoadingPlan(plan);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          plan,
          currency: 'usd'
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create checkout session');
      setLoadingPlan(null);
    }
  };

  if (loading) {
    return (
      <Card className="bg-launch-card-bg border-gray-800">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  const planName = subscription?.plan_name || 'Free Plan';
  const isActive = subscription?.status === 'active' || subscription?.status === 'succeeded';
  const isTrialing = subscription?.status === 'trialing';
  const endDate = subscription?.current_period_end 
    ? new Date(subscription.current_period_end).toLocaleDateString()
    : null;

  return (
    <Card className="bg-launch-card-bg border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Plans & Billing</CardTitle>
        <CardDescription>Manage your subscription and billing settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-white font-medium">Current Plan</h3>
          <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-white">{planName}</p>
                <p className="text-launch-text-muted text-sm">
                  {isTrialing ? (
                    <>Trial Period (Ends on {endDate})</>
                  ) : isActive ? (
                    <>Active {subscription?.cancel_at_period_end && '(Cancels at end of period)'}</>
                  ) : (
                    'Upgrade to access premium features'
                  )}
                </p>
              </div>
              {subscription ? (
                <Button 
                  onClick={handleManageSubscription} 
                  disabled={isManaging}
                  className="bg-launch-cyan hover:bg-launch-cyan/80 text-black font-medium"
                >
                  {isManaging ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CreditCard className="h-4 w-4 mr-2" />
                  )}
                  Manage Subscription
                </Button>
              ) : (
                <Button 
                  className="bg-launch-cyan hover:bg-launch-cyan/80 text-black font-medium"
                  onClick={() => handleSubscribe('lifetime')}
                  disabled={loadingPlan !== null}
                >
                  {loadingPlan === 'lifetime' ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Upgrade to Lifetime Plan
                </Button>
              )}
            </div>
            {subscription && endDate && (
              <div className="border-t border-gray-800 mt-4 pt-4">
                <h4 className="text-white text-sm font-medium mb-1">Next Payment</h4>
                <p className="text-launch-text-muted text-sm">{endDate}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};`,
        },
        details: [
          "The component integrates with the edge functions created earlier (`create-checkout` and `create-portal-session`)",
          "Uses Supabase Auth for user authentication",
          "Implements proper loading states and error handling with toast messages",
          "Supports trial periods, active subscriptions, and cancellation states",
          "Uses shadcn/ui components for consistent styling",
        ],
        checks: [
          "Does the component show proper loading states while fetching subscription data?",
          "Are subscription status and plan details clearly displayed?",
          "Do the upgrade and manage subscription buttons work correctly?",
          "Are errors properly handled and displayed to users?",
          "Does the UI update correctly after returning from Stripe checkout/portal?",
        ],
        links: [
          {
            text: "Stripe Customer Portal Integration",
            url: "https://stripe.com/docs/billing/subscriptions/integrating-customer-portal",
          },
          {
            text: "Supabase Auth User Management",
            url: "https://supabase.com/docs/guides/auth/managing-user-data",
          },
        ],
        isChecklistItem: true,
      },
    ],
  },
  {
    id: "webhooks",
    title: "Step 3: Webhook Setup",
    description: "Set up and configure Stripe webhooks to keep your application in sync with Stripe events.",
    videoUrl: "https://xnqbmtsphlduhxrkaopt.supabase.co/storage/v1/object/public/public-files//Stripe%20Webhook%20Setup-2.mp4",
    subTasks: [
      {
        id: "create_webhook",
        title: "3.1 Create Stripe Webhook Handler (`stripe-webhook`)",
        description: [
          "Purpose: Listens for events from Stripe (like payments) to update your app's data.",
          "This is CRITICAL for keeping your application state in sync with Stripe.",
        ],
        important: [
          "Webhook verification is essential for security.",
          "Ensure the STRIPE_WEBHOOK_SECRET environment variable is set correctly.",
        ],
        prompt: {
          title: "AI Prompt: Create Edge Function/API Route (supabase/functions/stripe-webhook/index.ts)",
          text: `import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PLAN_MAPPING = {
  'price_1123456789': 'starter',
} as const;

serve(async (req) => {
  console.debug(\`Received webhook request\`)

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.debug(\`Handling CORS preflight request\`)
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the authorization header
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      console.warn(\`Missing stripe-signature header in request\`)
      return new Response(
        JSON.stringify({ error: 'Missing stripe-signature header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY_PROD')
    const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET_PROD')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error(\`Missing required environment variables\`)
      throw new Error('Missing environment variables')
    }

    console.debug(\`Initializing Stripe client\`)
    // Initialize Stripe with the latest API version
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2025-03-31.basil',
      httpClient: Stripe.createFetchHttpClient(),
    })

    // Get the raw body
    const body = await req.text()
    console.debug(\`Received webhook body\`)

    // Verify the webhook signature
    let event
    try {
      console.debug(\`Verifying webhook signature\`)
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        STRIPE_WEBHOOK_SECRET,
        undefined,
        Stripe.createSubtleCryptoProvider()
      )
      console.info(\`Webhook signature verified successfully. Event type: \${event.type}\`)
    } catch (err: unknown) {
      console.error(\`Webhook signature verification failed:\`, (err as Error).message)
      return new Response(
        JSON.stringify({ error: 'Webhook signature verification failed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.debug(\`Initializing Supabase client\`)
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
      case 'customer.subscription.resumed':
      case 'customer.subscription.paused': {
        console.info(\`Processing \${event.type} event\`)
        const subscription = event.data.object
        console.debug(\`Retrieving customer data for subscription \${subscription.id}\`)
        const customer = await stripe.customers.retrieve(subscription.customer as string)

        // Update or insert subscription in Supabase
        const priceId = subscription.items.data[0].price.id
        const planName = PLAN_MAPPING[priceId as keyof typeof PLAN_MAPPING] || 'explorer'
        console.debug(\`Mapped price \${priceId} to plan \${planName}\`)

        console.debug(\`Upserting subscription data for user \${customer.metadata.app_user_id}\`)
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
          console.error(\`Error updating subscription:\`, error)
          throw error
        }
        console.info(\`Successfully processed \${event.type} for subscription \${subscription.id}\`)
        break
      }

      case 'customer.subscription.deleted': {
        console.info(\`Processing subscription deletion event\`)
        const subscription = event.data.object

        console.debug(\`Deleting subscription \${subscription.id} from database\`)
        const { error } = await supabase
          .from('subscriptions')
          .delete()
          .match({ stripe_subscription_id: subscription.id })

        if (error) {
          console.error(\`Error deleting subscription \${subscription.id}:\`, error)
          throw error
        }
        console.info(\`Successfully deleted subscription \${subscription.id}\`)
        break
      }
    }

    console.info(\`Webhook processed successfully\`)
    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error(\`Critical error processing webhook:\`, error)
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})`,
        },
        links: [
          {
            text: "Stripe Webhooks Doc",
            url: "https://stripe.com/docs/webhooks",
          },
          {
            text: "Webhook Signature Doc",
            url: "https://stripe.com/docs/webhooks/signatures",
          },
        ],
        isChecklistItem: true,
      },
      {
        id: "prepare_webhook",
        title: "3.2 Configure Stripe Webhook",
        description: [
          "Set up the webhook endpoint in Stripe Dashboard and configure the Edge Function to handle it.",
          "1. Go to Stripe Dashboard > Developers > Webhooks > Add endpoint",
          "2. Enter your Edge Function URL: https://[PROJECT_REF].supabase.co/functions/v1/stripe-webhook",
          "3. Select events to listen for:",
          "   - customer.subscription.created",
          "   - customer.subscription.deleted",
          "   - customer.subscription.paused",
          "   - customer.subscription.resumed",
          "   - customer.subscription.updated",
          "4. Get the Signing Secret from the destination overview after creating the webhook",
        ],
        prompt: {
          title: "Action: Configure Edge Function for Webhook",
          text: "1. Add STRIPE_WEBHOOK_SECRET='whsec_...' to your Edge Function secrets\n2. Disable JWT verification for the webhook endpoint via the supabase dashboard > edge functions > stripe-webhook > details > Function Configuration > Enforce JWT Verification (disable it)",
        },
        important: [
          "The webhook endpoint must be publicly accessible",
          "Store the webhook signing secret securely",
          "Disable JWT verification as Stripe won't send a JWT",
        ],
        links: [
          {
            text: "Stripe Webhooks Guide",
            url: "https://stripe.com/docs/webhooks",
          },
          {
            text: "Supabase Edge Functions",
            url: "https://supabase.com/docs/guides/functions",
          },
        ],
        isChecklistItem: true,
      },
    ],
  },
  {
    id: "test_go_live",
    title: "Step 4: Testing & Go Live",
    description: "Make sure everything works before charging real money.",
    videoUrl: "https://xnqbmtsphlduhxrkaopt.supabase.co/storage/v1/object/public/public-files//Stripe%20Payments%20Setup%203.mp4",
    subTasks: [
      {
        id: "end_to_end_test",
        title: "4.1 End-to-End Test (Test Mode)",
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
        title: "4.2 Switch to LIVE Keys",
        description: [
          "In Stripe Dashboard, toggle to LIVE mode.",
          "Go to Developers > API Keys.",
          "Copy your LIVE Publishable Key & Secret Key.",
          "Securely update your PRODUCTION environment variables with LIVE keys.",
          "Redeploy your application with the new keys.",
        ],
        important: [
          "Ensure you update the keys in your production environment ONLY.",
          "Keep LIVE secret keys secure.",
        ],
        isChecklistItem: true,
      },
      {
        id: "configure_live_webhook",
        title: "4.3 Configure LIVE Webhook Endpoint",
        description: [
          "Repeat step 4.1 but in Stripe's LIVE mode.",
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
        title: "4.4 (Recommended) Final Live Test",
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
    url: "https://stripe.com/docs",
  },
  {
    title: "Stripe Checkout",
    url: "https://stripe.com/docs/checkout",
  },
  {
    title: "Stripe Subscriptions",
    url: "https://stripe.com/docs/billing/subscriptions/overview",
  },
  {
    title: "Stripe Customer Portal",
    url: "https://stripe.com/docs/billing/subscriptions/customer-portal",
  },
  {
    title: "Stripe Webhooks",
    url: "https://stripe.com/docs/webhooks",
  },
  {
    title: "Stripe API Keys",
    url: "https://stripe.com/docs/keys",
  },
  {
    title: "Stripe Test Cards",
    url: "https://stripe.com/docs/testing",
  },
];

// Optional: Define types for clarity if needed elsewhere
export type PaymentResourceType = (typeof paymentResources)[0];
