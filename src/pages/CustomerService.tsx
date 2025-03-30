
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, ExternalLink, PlayCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomerService = () => {
  const todoItems = [
    { text: "Create Resend account", completed: false },
    { text: "Verify domain for sending emails", completed: false },
    { text: "Store Resend API key in Supabase secrets", completed: false },
    { text: "Create email templates", completed: false },
    { text: "Implement welcome email flow", completed: false },
    { text: "Implement transactional emails", completed: false },
    { text: "Set up email analytics", completed: false },
    { text: "Test email delivery", completed: false },
  ];
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-launch-cyan">Customer Service</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Implement Resend for transactional emails and customer communications.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Resend Implementation Checklist</CardTitle>
            <CardDescription>Track your progress setting up email services</CardDescription>
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
            <CardDescription>Learn how to implement Resend with Supabase</CardDescription>
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
            <CardDescription>Official Resend and Supabase resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <a 
              href="https://resend.com/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">Resend Documentation</span>
              <ExternalLink className="h-4 w-4 text-launch-cyan" />
            </a>
            <a 
              href="https://resend.com/docs/send-with-supabase-edge-functions" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">Resend with Supabase Edge Functions</span>
              <ExternalLink className="h-4 w-4 text-launch-cyan" />
            </a>
            <a 
              href="https://react.email/docs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">React Email Templates</span>
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
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">LLM Prompt Example</CardTitle>
            <CardDescription>Copy and customize for your project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-launch-dark p-4 rounded-md border border-gray-800 text-sm text-gray-300 font-mono">
              <p>Create a customer email system with Resend and Supabase Edge Functions with:</p>
              <br />
              <p>1. Welcome email template for new user signups</p>
              <p>2. Password reset email with secure token</p>
              <p>3. Transaction confirmation emails for purchases</p>
              <p>4. Weekly newsletter template with dynamic content</p>
              <p>5. React Email components for all templates</p>
              <p>6. Edge function for secure email sending</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="flex items-center gap-2">
              Copy Prompt
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="bg-launch-card-bg border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Email Templates</CardTitle>
          <CardDescription>Common email templates you should implement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
              <h3 className="text-white font-medium">Welcome Email</h3>
              <p className="text-launch-text-muted text-sm mt-1">
                Send to new users after signup to welcome them and provide next steps.
              </p>
            </div>
            <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
              <h3 className="text-white font-medium">Password Reset</h3>
              <p className="text-launch-text-muted text-sm mt-1">
                Send when users request a password reset with a secure token link.
              </p>
            </div>
            <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
              <h3 className="text-white font-medium">Order Confirmation</h3>
              <p className="text-launch-text-muted text-sm mt-1">
                Send after a successful purchase with order details and receipt.
              </p>
            </div>
            <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
              <h3 className="text-white font-medium">Account Verification</h3>
              <p className="text-launch-text-muted text-sm mt-1">
                Send to verify user email addresses with a confirmation link.
              </p>
            </div>
            <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
              <h3 className="text-white font-medium">Feature Announcement</h3>
              <p className="text-launch-text-muted text-sm mt-1">
                Send to notify users about new features or updates.
              </p>
            </div>
            <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
              <h3 className="text-white font-medium">Subscription Renewal</h3>
              <p className="text-launch-text-muted text-sm mt-1">
                Send before subscription renewals to prevent unexpected charges.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerService;
