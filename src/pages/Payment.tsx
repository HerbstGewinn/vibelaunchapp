
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTaskProgress } from '@/hooks/useTaskProgress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TodoList } from '@/components/common/TodoList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Payment = () => {
  const navigate = useNavigate();
  const { toggleTaskComplete } = useTaskProgress();

  const paymentSetupTasks = [
    { text: "Set up Stripe account", completed: false },
    { text: "Configure payment methods", completed: false },
    { text: "Test payment processing", completed: false },
    { text: "Implement subscription billing", completed: false }
  ];

  const handleTaskComplete = () => {
    toggleTaskComplete(
      'setup_payment', 
      true, 
      'payment',
      'Configure payment processing system' // Add task name
    );
  };

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-bold">Payment Configuration</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="bg-launch-card-bg border-gray-800">
            <CardHeader>
              <CardTitle>Setup Payment Processing</CardTitle>
              <CardDescription>
                Configure your payment system to start accepting payments from your users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tasks" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="tasks">Setup Tasks</TabsTrigger>
                  <TabsTrigger value="configuration">Configuration</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tasks" className="space-y-4">
                  <div className="p-4 rounded-lg bg-launch-dark border border-gray-800">
                    <h3 className="font-medium mb-3">Payment Setup Checklist</h3>
                    <TodoList 
                      items={paymentSetupTasks} 
                      taskId="payment_setup"
                      category="payment"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="configuration">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-launch-dark border border-gray-800">
                      <h3 className="font-medium mb-2">Payment Provider</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Choose and configure your payment provider
                      </p>
                      <Button variant="outline">Connect Stripe</Button>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-launch-dark border border-gray-800">
                      <h3 className="font-medium mb-2">Payment Methods</h3>
                      <p className="text-sm text-gray-400">
                        No payment methods configured yet
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t border-gray-800 pt-4">
              <Button onClick={handleTaskComplete}>Mark Payment Setup as Complete</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="bg-launch-card-bg border-gray-800">
            <CardHeader>
              <CardTitle>Payment Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-launch-dark border border-gray-800 hover:border-gray-700 transition-colors">
                <h3 className="font-medium text-sm">Stripe Documentation</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Official guides and reference for Stripe integration
                </p>
              </div>
              
              <div className="p-3 rounded-lg bg-launch-dark border border-gray-800 hover:border-gray-700 transition-colors">
                <h3 className="font-medium text-sm">Payment Best Practices</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Learn how to optimize your payment system
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
