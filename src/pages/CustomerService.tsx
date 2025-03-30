
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, ExternalLink, PlayCircle, Mail, Copy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useToast } from "@/hooks/use-toast";

const CustomerService = () => {
  const { toast } = useToast();
  
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

  const copyPrompt = () => {
    const promptText = document.getElementById('prompt-text')?.textContent;
    if (promptText) {
      navigator.clipboard.writeText(promptText);
      toast({
        title: "Copied to clipboard",
        description: "The prompt has been copied to your clipboard",
      });
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-launch-cyan">Customer Service</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Implement Resend for transactional emails and customer communications.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-launch-cyan" />
              Resend Implementation Checklist
            </CardTitle>
            <CardDescription>Track your progress setting up email services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todoItems.map((item, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 rounded-md hover:bg-launch-dark/50 transition-colors">
                <div className="mt-1">
                  {item.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <span className="text-white">{item.text}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="flex items-center gap-2 hover:bg-launch-cyan hover:text-black transition-colors">
              Save Progress <CheckCircle className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-launch-cyan" />
              Tutorial Video
            </CardTitle>
            <CardDescription>Learn how to implement Resend with Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={16 / 9}>
              <div className="bg-gradient-to-br from-black/80 to-gray-800/80 rounded-md flex items-center justify-center border border-gray-800 h-full group cursor-pointer">
                <PlayCircle className="h-16 w-16 text-launch-cyan/70 group-hover:text-launch-cyan group-hover:scale-110 transition-all" />
              </div>
            </AspectRatio>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-launch-cyan" />
              Documentation
            </CardTitle>
            <CardDescription>Official Resend and Supabase resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Resend Documentation", url: "https://resend.com/docs" },
              { title: "Resend with Supabase Edge Functions", url: "https://resend.com/docs/send-with-supabase-edge-functions" },
              { title: "React Email Templates", url: "https://react.email/docs" },
              { title: "Supabase Edge Functions", url: "https://supabase.com/docs/guides/functions" }
            ].map((item, index) => (
              <a 
                key={index}
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-launch-cyan/0 via-launch-cyan/5 to-launch-cyan/0 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-700"></div>
                <span className="text-white z-10">{item.title}</span>
                <ExternalLink className="h-4 w-4 text-launch-cyan z-10 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-launch-cyan/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="h-5 w-5 text-launch-cyan" />
              LLM Prompt Example
            </CardTitle>
            <CardDescription>Copy and customize for your project</CardDescription>
          </CardHeader>
          <CardContent>
            <div id="prompt-text" className="bg-launch-dark/80 p-4 rounded-md border border-gray-800 text-sm text-gray-300 font-mono relative shadow-inner">
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
          <CardFooter className="flex justify-end">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-gradient-to-r from-launch-cyan/10 to-transparent hover:from-launch-cyan/20 hover:to-transparent border-launch-cyan/50"
              onClick={copyPrompt}
            >
              <Copy className="h-4 w-4" />
              Copy Prompt
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="bg-launch-card-bg border-gray-800 shadow-lg relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-launch-cyan/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        <CardHeader className="border-b border-gray-800/50">
          <CardTitle className="text-white flex items-center gap-2">
            <Mail className="h-5 w-5 text-launch-cyan" />
            Email Templates
          </CardTitle>
          <CardDescription>Common email templates you should implement</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Welcome Email",
                description: "Send to new users after signup to welcome them and provide next steps.",
                icon: <ArrowRight className="text-green-400" />
              },
              {
                title: "Password Reset",
                description: "Send when users request a password reset with a secure token link.",
                icon: <ArrowRight className="text-yellow-400" />
              },
              {
                title: "Order Confirmation",
                description: "Send after a successful purchase with order details and receipt.",
                icon: <ArrowRight className="text-blue-400" />
              },
              {
                title: "Account Verification",
                description: "Send to verify user email addresses with a confirmation link.",
                icon: <ArrowRight className="text-purple-400" />
              },
              {
                title: "Feature Announcement",
                description: "Send to notify users about new features or updates.",
                icon: <ArrowRight className="text-pink-400" />
              },
              {
                title: "Subscription Renewal",
                description: "Send before subscription renewals to prevent unexpected charges.",
                icon: <ArrowRight className="text-orange-400" />
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="p-4 bg-launch-dark/80 rounded-md border border-gray-800 hover:border-gray-700 transition-colors hover:shadow-md group"
              >
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <h3 className="text-white font-medium group-hover:text-launch-cyan transition-colors">{item.title}</h3>
                </div>
                <p className="text-launch-text-muted text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerService;
