
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressChart from './ProgressChart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProgressSection = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-launch-card-bg border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          Launch Progress
          <p className="text-sm text-gray-400 font-normal mt-1">
            Track your project's journey to launch
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="h-[300px] cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <ProgressChart />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSection;
