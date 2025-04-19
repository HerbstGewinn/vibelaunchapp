
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Search, CheckCircle } from 'lucide-react';
import { useTaskProgress } from '@/hooks/useTaskProgress';
import { formatDistanceToNow } from 'date-fns';

const ProgressOverview = () => {
  const { tasks } = useTaskProgress();

  // Get the last 3 completed tasks, sorted by completion time
  const recentCompletedTasks = tasks
    .filter(task => task.completed && task.completed_at)
    .sort((a, b) => {
      // Sort by completed_at in descending order (most recent first)
      return new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime();
    })
    .slice(0, 3);

  const getIconForTask = (taskName: string) => {
    if (taskName.toLowerCase().includes('domain')) return Globe;
    if (taskName.toLowerCase().includes('analytics') || taskName.toLowerCase().includes('seo')) return Search;
    return CheckCircle;
  };

  return (
    <Card className="bg-launch-card-bg border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentCompletedTasks.map((task) => (
            <div 
              key={task.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-launch-dark border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="rounded-full p-2 bg-launch-cyan/10">
                {React.createElement(getIconForTask(task.task_name), {
                  className: "h-4 w-4 text-launch-cyan"
                })}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {task.task_name}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDistanceToNow(new Date(task.completed_at!), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
          {recentCompletedTasks.length === 0 && (
            <div className="text-sm text-gray-400 text-center py-4">
              No completed tasks yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
