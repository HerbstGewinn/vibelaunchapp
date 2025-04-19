import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import ProgressSection from '../components/dashboard/ProgressSection';
import ProgressOverview from '../components/dashboard/ProgressOverview';
import ProjectUrlCard from '../components/dashboard/ProjectUrlCard';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { tasks, progress, loading, toggleTaskComplete } = useTaskProgress();

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

  const [projectName, setProjectName] = useState('example.com');

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
        <Input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          className="bg-launch-dark border-gray-800 focus-visible:ring-launch-cyan text-white"
        />
      </div>

      <ProjectUrlCard projectName={projectName} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard 
          title="Launch Progress" 
          value={`${Math.round(progress)}%`} 
          change={tasks.filter(t => t.completed).length} 
        />
        <StatCard 
          title="Steps Completed" 
          value="0/50"  // Changed to default 0/50 
          change={0}    // Changed to 0 to match the default steps
        />
        <StatCard title="Time to Launch" value="7 days" change={-2} />
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
