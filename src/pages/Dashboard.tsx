import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import ProgressSection from '../components/dashboard/ProgressSection';
import ProgressOverview from '../components/dashboard/ProgressOverview';
import ProjectUrlCard from '../components/dashboard/ProjectUrlCard';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTaskProgress } from '@/hooks/useTaskProgress';
import { useProjectManagement } from '@/hooks/useProjectManagement';
import { useDaysSinceStart } from '@/hooks/useDaysSinceStart';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { tasks, progress, loading, toggleTaskComplete } = useTaskProgress();
  const { saveProject, fetchUserProject } = useProjectManagement();
  const [projectName, setProjectName] = useState('example.com');
  const [isProjectSaved, setIsProjectSaved] = useState(false);
  const daysSinceStart = useDaysSinceStart();

  useEffect(() => {
    const loadProject = async () => {
      if (user) {
        const project = await fetchUserProject(user.id);
        if (project) {
          setProjectName(project.project_name);
          setIsProjectSaved(true);
          console.log('Project loaded:', project.project_name);
        }
      }
    };
    loadProject();
  }, [user]);

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && user && !isProjectSaved) {
      console.log('Saving project:', projectName);
      const success = await saveProject(projectName, user.id);
      if (success) {
        setIsProjectSaved(true);
      }
    }
  };

  // Mapping of task_ids to their descriptions
  const taskDescriptions: Record<string, string> = {
    setup_auth: "Set up authentication and user management",
    setup_payment: "Configure payment processing system",
    setup_deployment: "Set up deployment and hosting",
    setup_security: "Implement security measures",
    setup_seo: "Configure SEO and analytics",
    setup_launch: "Prepare for product launch",
    setup_customer_service: "Set up customer support system",
    setup_growth: "Plan user growth strategies"
  };

  // Function to handle task click
  const handleTaskClick = (taskId: string, currentlyCompleted: boolean) => {
    toggleTaskComplete(taskId, !currentlyCompleted);
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Launch <span className="text-launch-cyan">Dashboard</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Track and manage your project's journey from vibe to 1000 users
        </p>
      </div>

      <div className="flex items-center gap-3 w-full md:w-[350px]">
        {isProjectSaved ? (
          <div className="w-full">
            <div className="bg-launch-dark-blue border border-launch-cyan/20 text-launch-cyan px-4 py-2 rounded-lg cursor-default text-base flex items-center">
              {projectName}
            </div>
          </div>
        ) : (
          <Input
            value={projectName}
            onChange={(e) => !isProjectSaved && setProjectName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter project name"
            className="bg-launch-dark border-gray-800 focus-visible:ring-launch-cyan text-white"
          />
        )}
      </div>

      <ProjectUrlCard projectName={projectName} isProjectSaved={isProjectSaved} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard 
          title="Launch Progress" 
          value={`${Math.round(progress)}%`} 
          change={tasks.filter(t => t.completed).length * 2} 
        />
        <StatCard 
          title="Steps Completed" 
          value={`${tasks.filter(t => t.completed).length}/50`}
          change={tasks.filter(t => t.completed).length}
        />
        <StatCard 
          title="Days Since Start" 
          value={`${daysSinceStart} days`} 
          change={1} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <ProgressSection />
        </div>
        <div>
          <ProgressOverview />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
