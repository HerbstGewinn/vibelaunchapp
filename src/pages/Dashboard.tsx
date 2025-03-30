
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import ProgressSection from '../components/dashboard/ProgressSection';
import ProgressOverview from '../components/dashboard/ProgressOverview';
import ProjectUrlCard from '../components/dashboard/ProjectUrlCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Dashboard = () => {
  const { user } = useAuth();

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
