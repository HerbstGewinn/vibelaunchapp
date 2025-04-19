
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Search } from 'lucide-react';
import { useTaskProgress } from '@/hooks/useTaskProgress';
import { formatDistanceToNow } from 'date-fns';

const ProgressOverview = () => {
  const { tasks } = useTaskProgress();

  // Get the latest 3 completed tasks
  const recentTasks = [...tasks]
    .filter(task => task.completed)
    .sort((a, b) => new Date(b.completed_at || '').getTime() - new Date(a.completed_at || '').getTime())
    .slice(0, 3)
    .map(task => ({
      title: task.task_name,
      time: task.completed_at ? formatDistanceToNow(new Date(task.completed_at), { addSuffix: true }) : '',
      icon: task.category === 'seo' ? Search : Globe
    }));

  return (
    <Card className="bg-launch-card-bg border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTasks.length > 0 ? (
            recentTasks.map((activity, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-launch-dark border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="rounded-full p-2 bg-launch-cyan/10">
                  <activity.icon className="h-4 w-4 text-launch-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No completed tasks yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
