
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface ProjectUrlCardProps {
  projectName: string;
  className?: string;
}

const ProjectUrlCard = ({ projectName, className }: ProjectUrlCardProps) => {
  return (
    <div className={cn("bg-launch-card-bg rounded-lg p-6", className)}>
      <div className="flex items-center">
        <CheckCircle className="h-6 w-6 text-green-500 mr-2" /> 
        <h3 className="text-gray-400 font-medium">Project Name:</h3>
        <span className="ml-2 text-launch-cyan">{projectName}</span>
      </div>
    </div>
  );
};

export default ProjectUrlCard;
