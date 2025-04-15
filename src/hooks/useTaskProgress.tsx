
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Task {
  id: string;
  task_id: string;
  completed: boolean;
  completed_at: string | null;
}

export function useTaskProgress() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [progress, setProgress] = useState<number>(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    fetchTasks();
    subscribeToTaskUpdates();
  }, [user]);

  const fetchTasks = async () => {
    try {
      // Use the generic version of the from method to avoid type errors
      const { data: tasksData, error: tasksError } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true });

      if (tasksError) throw tasksError;
      
      // Safely cast the data to our Task type
      setTasks((tasksData as unknown as Task[]) || []);

      // Instead of using the view, calculate progress directly
      if (tasksData) {
        const completedTasks = tasksData.filter((task: any) => task.completed).length;
        const totalTasks = tasksData.length;
        const calculatedProgress = 
          totalTasks > 0 
            ? 5 + (completedTasks / totalTasks) * 95 
            : 5;
        
        setProgress(calculatedProgress);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToTaskUpdates = () => {
    const channel = supabase
      .channel('task-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_tasks',
          filter: `user_id=eq.${user?.id}`,
        },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const toggleTaskComplete = async (taskId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('user_tasks')
        .update({ 
          completed,
          completed_at: completed ? new Date().toISOString() : null
        })
        .eq('id', taskId);

      if (error) throw error;
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return { tasks, progress, loading, toggleTaskComplete };
}
