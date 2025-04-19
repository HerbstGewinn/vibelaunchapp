import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle, ExternalLink, PlayCircle, Copy, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/hooks/use-toast";
import { useTaskProgress } from '@/hooks/useTaskProgress';
import { v4 as uuidv4 } from 'uuid';
import { useConfetti } from '@/hooks/useConfetti';

const Payment = () => {
  const { toast } = useToast();
  const { toggleTaskComplete } = useTaskProgress();
  const { triggerConfetti } = useConfetti();
  const [todoItems, setTodoItems] = useState([
    { id: uuidv4(), text: "Create Stripe account", completed: false, task_id: "setup_payment" },
    { id: uuidv4(), text: "Set up Stripe product and price", completed: false, task_id: "setup_payment" },
    { id: uuidv4(), text: "Store Stripe API keys in Supabase secrets", completed: false, task_id: "setup_payment" },
    { id: uuidv4(), text: "Create checkout edge function", completed: false, task_id: "setup_payment" },
    { id: uuidv4(), text: "Create subscription verification edge function", completed: false, task_id: "setup_payment" },
    { id: uuidv4(), text: "Set up Stripe webhook edge function", completed: false, task_id: "setup_payment" },
    { id: uuidv4(), text: "Implement payment UI components", completed: false, task_id: "setup_payment" },
    { id: uuidv4(), text: "Test payment flow end to end", completed: false, task_id: "setup_payment" },
  ]);

  const toggleTodo = async (index: number) => {
    const newTodoItems = [...todoItems];
    const isCompleting = !newTodoItems[index].completed;
    newTodoItems[index].completed = isCompleting;
    setTodoItems(newTodoItems);
    
    try {
      await toggleTaskComplete(newTodoItems[index].id, newTodoItems[index].completed, 'payment');
      
      if (isCompleting) {
        triggerConfetti();
      }
      
      toast({
        title: newTodoItems[index].completed ? "Task completed!" : "Task marked as incomplete",
        description: newTodoItems[index].text,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      newTodoItems[index].completed = !newTodoItems[index].completed;
      setTodoItems(newTodoItems);
      toast({
        title: "Failed to update task",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };
  
  const copyPrompt = () => {
    const promptText = document.getElementById('payment-prompt-text')?.textContent;
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
      <h1 className="text-3xl font-bold text-launch-cyan">Payment Integration</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Integrate Stripe payments with Supabase Edge Functions to add subscriptions or one-time payments to your application.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-launch-cyan" />
              Todo Checklist
            </CardTitle>
            <CardDescription>Track your progress with Stripe setup</CardDescription>
          </CardHeader>
          <CardContent>
            <TodoList items={todoItems} taskId="setup_payment" category="payment" />
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
            <CardDescription>Learn how to implement Stripe with Supabase</CardDescription>
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
            <CardDescription>Official Stripe and Supabase resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Stripe Checkout", url: "https://stripe.com/docs/payments/checkout" },
              { title: "Stripe Subscriptions", url: "https://stripe.com/docs/billing/subscriptions/build-subscriptions" },
              { title: "Supabase Edge Functions", url: "https://supabase.com/docs/guides/functions" },
              { title: "Stripe Webhooks", url: "https://stripe.com/docs/webhooks" }
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
              <CreditCard className="h-5 w-5 text-launch-cyan" />
              LLM Prompt Example
            </CardTitle>
            <CardDescription>Copy and customize for your project</CardDescription>
          </CardHeader>
          <CardContent>
            <div id="payment-prompt-text" className="bg-launch-dark/80 p-4 rounded-md border border-gray-800 text-sm text-gray-300 font-mono relative shadow-inner">
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
    </div>
  );
};

export default Payment;
