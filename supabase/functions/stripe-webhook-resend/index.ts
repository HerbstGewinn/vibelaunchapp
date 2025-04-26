// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno'; // Use Stripe SDK compatible with Deno
import { Resend } from 'https://esm.sh/resend@1.0.0'; // Use Resend SDK

// Initialize Stripe and Resend clients with secrets
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { // NOTE: You might need STRIPE_SECRET_KEY as well for other operations, add it via `supabase secrets set STRIPE_SECRET_KEY=sk_...` if needed. For webhook verification, the signing secret is primary.
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(), // Use Deno's fetch
});

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET');

console.log("Hello from Functions!")

serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature');
  const body = await req.text(); // Read body as text for signature verification

  if (!stripeWebhookSecret) {
    console.error('Stripe webhook signing secret is not set.');
    return new Response('Webhook secret not configured.', { status: 500 });
  }

  if (!signature) {
    console.error('Missing Stripe-Signature header.');
    return new Response('Missing Stripe-Signature header.', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Verify the webhook signature
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      stripeWebhookSecret,
      undefined, // Optional tolerance
      Stripe.createSubtleCryptoProvider() // Use Deno's crypto provider
    );
    console.log('Webhook event verified:', event.id);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract customer details (adjust based on your checkout session setup)
    const customerEmail = session.customer_details?.email || session.customer_email; // Handle different ways email might be stored
    const customerName = session.customer_details?.name || 'Valued Customer';
    const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : 'N/A'; // Convert from cents
    const currency = session.currency?.toUpperCase() || '';

    console.log(`Processing checkout completion for ${customerEmail}`);

    if (!customerEmail) {
      console.error('Customer email not found in checkout session:', session.id);
      // Decide how to handle this - maybe log and return 200 to Stripe to avoid retries
      return new Response('Customer email missing, but event acknowledged.', { status: 200 });
    }

    try {
      // Send confirmation email using Resend
      const { data, error } = await resend.emails.send({
        from: 'Your App <noreply@yourdomain.com>', // **Replace with your verified Resend domain/email**
        to: [customerEmail],
        subject: 'Your Order Confirmation',
        html: `
          <h1>Thank you for your order, ${customerName}!</h1>
          <p>Your checkout was successful.</p>
          <p><strong>Amount:</strong> ${amountTotal} ${currency}</p>
          <p>We'll notify you when your order ships.</p>
          <p>Best regards,<br>Your App Team</p>
        `,
        // You can add more details like order ID, items purchased, etc.
        // text: `...` // Optional plain text version
      });

      if (error) {
        console.error(`Resend error sending email to ${customerEmail}:`, error);
        // Return 500 so Stripe retries, or 200 if you don't want retries for email failures
        return new Response('Error sending confirmation email.', { status: 500 });
      }

      console.log(`Confirmation email sent successfully to ${customerEmail}. Resend ID: ${data?.id}`);
      return new Response(JSON.stringify({ received: true, emailSent: true }), { status: 200 });

    } catch (emailError) {
      console.error(`Failed to send email via Resend:`, emailError);
      return new Response('Internal Server Error during email sending.', { status: 500 });
    }
  } else {
    // Handle other event types or ignore them
    console.log(`Unhandled event type: ${event.type}`);
    return new Response(JSON.stringify({ received: true, ignored: true }), { status: 200 });
  }
});

console.log('Stripe webhook handler function started...');

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/stripe-webhook-resend' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
