
import React from 'react';
import { Card } from "@/components/ui/card";
import { Rocket, Stars } from "lucide-react";

const GrowthMetrics = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-gradient-to-br from-launch-dark-blue to-launch-dark border-gray-800">
        <div className="p-6 md:p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Rocket className="h-16 w-16 text-launch-cyan animate-pulse" />
              <div className="absolute -top-2 -right-2">
                <Stars className="h-6 w-6 text-launch-cyan animate-bounce" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-launch-cyan to-white bg-clip-text text-transparent">
            Growth Dashboard Coming Soon
          </h1>
          
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            We're crafting powerful analytics and growth strategies to help your project reach its first 1000 users. Get ready for data-driven insights and actionable growth tactics!
          </p>
          
          <div className="bg-launch-dark/50 rounded-lg p-4 mt-6">
            <p className="text-launch-cyan text-sm font-medium">While you wait:</p>
            <ul className="text-gray-300 text-sm mt-2 space-y-2">
              <li>• Complete your project setup</li>
              <li>• Review your current metrics</li>
              <li>• Define your target audience</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GrowthMetrics;
