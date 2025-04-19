
import React from 'react';
import { Card } from "@/components/ui/card";
import { MessageSquare, Sparkles } from "lucide-react";

const CustomerService = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-gradient-to-br from-launch-dark-blue to-launch-dark border-gray-800">
        <div className="p-6 md:p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <MessageSquare className="h-16 w-16 text-launch-cyan animate-pulse" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-launch-cyan animate-bounce" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-launch-cyan to-white bg-clip-text text-transparent">
            Customer Service Hub Coming Soon
          </h1>
          
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            We're building a comprehensive customer support system to help you deliver exceptional service. Soon you'll have all the tools you need to delight your users!
          </p>
          
          <div className="bg-launch-dark/50 rounded-lg p-4 mt-6">
            <p className="text-launch-cyan text-sm font-medium">In the meantime:</p>
            <ul className="text-gray-300 text-sm mt-2 space-y-2">
              <li>• Plan your customer service strategy</li>
              <li>• Prepare response templates</li>
              <li>• Document common user questions</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomerService;
