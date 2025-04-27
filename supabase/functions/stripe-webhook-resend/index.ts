// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno'; // Use Stripe SDK compatible with Deno

// Initialize Stripe and Resend clients with secrets
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { // NOTE: You might need STRIPE_SECRET_KEY as well for other operations, add it via `supabase secrets set STRIPE_SECRET_KEY=sk_...` if needed. For webhook verification, the signing secret is primary.
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(), // Use Deno's fetch
});

const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET_RESEND');

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
      // Send confirmation email using Resend HTTP API directly
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Vibelaunch <info@vibelaunch.io>',
          to: [customerEmail],
          subject: 'Thank You for Your Vibelaunch Purchase!',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
                  .content { padding: 20px; }
                  .footer { text-align: center; padding: 20px; font-size: 0.9em; color: #666; }
                  .amount { font-size: 1.2em; color: #28a745; font-weight: bold; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Thank You for Your Purchase!</h1>
                  </div>
                  <div class="content">
                    <p>Dear ${customerName},</p>
                    <p>Thank you for choosing Vibelaunch! Your payment has been successfully processed.</p>
                    <p>Order Details:</p>
                    <p class="amount">Amount: ${amountTotal} ${currency}</p>
                    <p>We're excited to have you on board! Your purchase helps us continue developing and improving our services.</p>
                    <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
                  </div>
                  <div class="footer">
                    <p>Best regards,<br>The Vibelaunch Team</p>
                    <p>© ${new Date().getFullYear()} Vibelaunch. All rights reserved.</p>
                  </div>
                </div>
              </body>
            </html>
          `,
        }),
      });
      const emailData = await emailResponse.json();
      if (!emailResponse.ok) {
        console.error(`Resend error sending email to ${customerEmail}:`, emailData);
        return new Response('Error sending confirmation email.', { status: 500 });
      }
      console.log(`Confirmation email sent successfully to ${customerEmail}. Resend response:`, emailData);
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
