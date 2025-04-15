
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import ProgressSection from '../components/dashboard/ProgressSection';
import ProgressOverview from '../components/dashboard/ProgressOverview';
import ProjectUrlCard from '../components/dashboard/ProjectUrlCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Clock } from 'lucide-react';
import { useTaskProgress } from '@/hooks/useTaskProgress';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("launch-steps");
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

  // Sample action items data
  const actionItems = [
    {
      id: 1,
      title: "Completed domain setup",
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Added Google Analytics tracking",
      date: "3 days ago"
    },
    {
      id: 3,
      title: "Submitted sitemap to Google",
      date: "4 days ago"
    }
  ];

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

      <div className="w-full md:w-[250px]">
        <Select defaultValue="example.com">
          <SelectTrigger className="bg-launch-dark border-gray-800 focus:ring-launch-cyan">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent className="bg-launch-dark border-gray-800">
            <SelectItem value="example.com">example.com</SelectItem>
            <SelectItem value="myapp.io">myapp.io</SelectItem>
            <SelectItem value="myproject.dev">myproject.dev</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ProjectUrlCard url="example.com" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard 
          title="Launch Progress" 
          value={`${Math.round(progress)}%`} 
          change={tasks.filter(t => t.completed).length} 
        />
        <StatCard 
          title="Steps Completed" 
          value={`${tasks.filter(t => t.completed).length}/7`} 
          change={1} 
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

      <div className="bg-launch-card-bg border border-gray-800 rounded-lg overflow-hidden">
        <Tabs defaultValue="launch-steps" value={activeTab} onValueChange={setActiveTab}>
          <div className="bg-launch-sidebar-bg p-1 rounded-t-lg">
            <TabsList className="bg-transparent">
              <TabsTrigger 
                value="launch-steps" 
                className="data-[state=active]:bg-launch-dark data-[state=active]:text-white text-gray-400"
              >
                Launch Steps
              </TabsTrigger>
              <TabsTrigger 
                value="action-items" 
                className="data-[state=active]:bg-launch-dark data-[state=active]:text-white text-gray-400"
              >
                Action Items
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="launch-steps" className="p-4 md:p-6">
            <div className="grid gap-4">
              {!loading && tasks.map(task => (
                <Button
                  key={task.id}
                  variant="ghost"
                  className="w-full bg-launch-dark border border-gray-800 rounded-lg p-4 transition-all hover:border-gray-700 text-left"
                  onClick={() => handleTaskClick(task.id, task.completed)}
                >
                  <div className="flex items-start gap-4 w-full">
                    <div
                      className={`rounded-full p-2 transition-colors ${
                        task.completed ? 'bg-green-500/20' : 'bg-yellow-500/20'
                      }`}
                    >
                      {task.completed ? (
                        <Check className="h-6 w-6 text-green-500" />
                      ) : (
                        <Clock className="h-6 w-6 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <h3 className="font-medium text-white capitalize">
                          {task.task_id.replace(/_/g, ' ')}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs capitalize ${
                          task.completed ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {task.completed ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {taskDescriptions[task.task_id]}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="action-items" className="p-4 md:p-6">
            <div className="grid gap-4">
              {actionItems.map(item => (
                <div key={item.id} className="bg-launch-dark border border-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white">{item.title}</h3>
                    <span className="text-gray-400 text-sm">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
