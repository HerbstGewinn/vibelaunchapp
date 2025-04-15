
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
    <Card 
      className="bg-launch-card-bg border-gray-800 cursor-pointer hover:border-gray-700 transition-colors"
      onClick={goToHomepage}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          Launch Progress
          <p className="text-sm text-gray-400 font-normal mt-1">
            Track your project's journey to launch
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-400">Current progress:</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-gray-800"
          />
        </div>
        <div className="h-[250px]">
          <ProgressChart />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSection;
