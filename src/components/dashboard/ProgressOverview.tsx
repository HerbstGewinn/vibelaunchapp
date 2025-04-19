
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Search, ShieldCheck } from 'lucide-react';

const ProgressOverview = () => {
  return (
    <Card className="bg-launch-card-bg border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { title: 'Completed domain setup', time: '2 days ago', icon: Globe },
            { title: 'Added Google Analytics', time: '3 days ago', icon: Search },
            { title: 'Updated meta tags', time: '5 days ago', icon: Search }
          ].map((activity, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-launch-dark border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="rounded-full p-2 bg-launch-cyan/10">
                <activity.icon className="h-4 w-4 text-launch-cyan" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
