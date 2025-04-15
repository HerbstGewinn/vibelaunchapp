
import React from 'react';
import ProgressChart from './ProgressChart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProgressSection = () => {
  return (
    <Card className="bg-launch-card-bg border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          Launch Progress
          <p className="text-launch-text-muted text-sm font-normal mt-1">
            Track your project's journey to launch
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ProgressChart />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSection;
