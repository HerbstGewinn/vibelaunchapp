
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressChart from './ProgressChart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTaskProgress } from '@/hooks/useTaskProgress';

const ProgressSection = () => {
  const navigate = useNavigate();
  const { progress } = useTaskProgress();

  const goToHomepage = () => {
    navigate('/');
  };

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
      <CardContent className="space-y-6">
        <div onClick={goToHomepage} className="space-y-1.5 cursor-pointer">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Current progress:</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-gray-800"
          />
          <p className="text-xs text-gray-500">Click the progress bar to go to homepage</p>
        </div>
        <div className="h-[300px] -mx-2">
          <ProgressChart />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSection;
