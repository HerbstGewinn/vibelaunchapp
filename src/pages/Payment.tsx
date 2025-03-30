
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, ExternalLink, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Payment = () => {
  const todoItems = [
    { text: "Create Stripe account", completed: false },
    { text: "Set up Stripe product and price", completed: false },
    { text: "Store Stripe API keys in Supabase secrets", completed: false },
    { text: "Create checkout edge function", completed: false },
    { text: "Create subscription verification edge function", completed: false },
    { text: "Set up Stripe webhook edge function", completed: false },
    { text: "Implement payment UI components", completed: false },
    { text: "Test payment flow end to end", completed: false },
  ];
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-launch-cyan">Payment Integration</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Integrate Stripe payments with Supabase Edge Functions to add subscriptions or one-time payments to your application.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Todo Checklist</CardTitle>
            <CardDescription>Track your progress with Stripe setup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todoItems.map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="mt-1">
                  {item.completed ? (
                    <CheckCircle className="h-5 w-5 text-launch-cyan" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <span className="text-white">{item.text}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="flex items-center gap-2">
              Save Progress <CheckCircle className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Tutorial Video</CardTitle>
            <CardDescription>Learn how to implement Stripe with Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black/30 rounded-md flex items-center justify-center border border-gray-800">
              <PlayCircle className="h-16 w-16 text-launch-cyan/50" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Documentation</CardTitle>
            <CardDescription>Official Stripe and Supabase resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <a 
              href="https://stripe.com/docs/payments/checkout" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">Stripe Checkout</span>
              <ExternalLink className="h-4 w-4 text-launch-cyan" />
            </a>
            <a 
              href="https://stripe.com/docs/billing/subscriptions/build-subscriptions" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">Stripe Subscriptions</span>
              <ExternalLink className="h-4 w-4 text-launch-cyan" />
            </a>
            <a 
              href="https://supabase.com/docs/guides/functions" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">Supabase Edge Functions</span>
              <ExternalLink className="h-4 w-4 text-launch-cyan" />
            </a>
            <a 
              href="https://stripe.com/docs/webhooks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">Stripe Webhooks</span>
              <ExternalLink className="h-4 w-4 text-launch-cyan" />
            </a>
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">LLM Prompt Example</CardTitle>
            <CardDescription>Copy and customize for your project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-launch-dark p-4 rounded-md border border-gray-800 text-sm text-gray-300 font-mono">
              <p>Create a payment system using Stripe and Supabase Edge Functions with:</p>
              <br />
              <p>1. Subscription-based payment model with monthly/yearly options</p>
              <p>2. Secure checkout process using Stripe Checkout</p>
              <p>3. Webhook handler for subscription events</p>
              <p>4. User dashboard to manage subscription</p>
              <p>5. Secure API for verifying subscription status</p>
              <p>6. Payment history and invoice access</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="flex items-center gap-2">
              Copy Prompt
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
