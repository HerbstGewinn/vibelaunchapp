
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import ProgressSection from '../components/dashboard/ProgressSection';
import ProgressOverview from '../components/dashboard/ProgressOverview';
import ProjectUrlCard from '../components/dashboard/ProjectUrlCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("launch-steps");

  // Sample launch steps data
  const launchSteps = [
    {
      id: 1,
      title: "Get a Domain, Deploy your project",
      description: "Secure your online identity and make your project accessible to the world.",
      status: "completed",
      progress: 100
    },
    {
      id: 2,
      title: "Get indexed by Google",
      description: "Set up sitemap.xml, Google Search Console, and Google Analytics.",
      status: "in-progress",
      progress: 75
    }
  ];

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
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Launch <span className="text-launch-cyan">Dashboard</span>
          </h1>
          <p className="text-gray-400">
            Track and manage your project's journey from vibe to 1000 users
          </p>
        </div>
        <div className="w-[250px]">
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
      </div>

      <ProjectUrlCard url="example.com" className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard title="Completed Tasks" value="12/20" change={4} />
        <StatCard title="Steps Completed" value="3/5" change={1} />
        <StatCard title="Time to Launch" value="7 days" change={-2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ProgressSection />
        </div>
        <div>
          <ProgressOverview />
        </div>
      </div>

      {/* Launch Steps and Action Items Tabs */}
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
          
          <TabsContent value="launch-steps" className="p-4">
            <div className="space-y-4">
              {launchSteps.map(step => (
                <div key={step.id} className="bg-launch-dark border border-gray-800 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-2 ${step.status === 'completed' ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                      {step.status === 'completed' ? (
                        <Check className="h-6 w-6 text-green-500" />
                      ) : (
                        <Clock className="h-6 w-6 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-white">{step.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs capitalize ${
                          step.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {step.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{step.description}</p>
                      <div className="mt-4 w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${step.status === 'completed' ? 'bg-green-500' : 'bg-launch-cyan'}`}
                          style={{ width: `${step.progress}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-right">
                        <span className="text-xs text-gray-400">{step.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="action-items" className="p-4">
            <div className="space-y-2">
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
