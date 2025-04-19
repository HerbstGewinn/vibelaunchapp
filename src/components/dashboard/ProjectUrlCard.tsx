import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface ProjectUrlCardProps {
  projectName: string;
  isProjectSaved?: boolean;
  className?: string;
}

const ProjectUrlCard = ({ projectName, isProjectSaved, className }: ProjectUrlCardProps) => {
  // Keep project name in localStorage whenever it changes
  useEffect(() => {
    if (projectName && isProjectSaved) {
      localStorage.setItem('project_name', projectName);
    }
  }, [projectName, isProjectSaved]);

  return (
    <div className={cn("bg-launch-card-bg rounded-lg p-6", className)}>
      <div className="flex items-center">
        {isProjectSaved && (
          <Lock className="h-6 w-6 text-launch-cyan mr-2" />
        )}
        <h3 className="text-gray-400 font-medium">Project Name:</h3>
        <span className="ml-2 text-launch-cyan">{projectName}</span>
        {isProjectSaved && (
          <span className="ml-2 text-xs text-gray-500">(locked)</span>
        )}
      </div>
    </div>
  );
};

export default ProjectUrlCard;
