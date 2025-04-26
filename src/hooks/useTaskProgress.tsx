import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Task {
  id: string;
  user_id: string;
  task_id: string;
  task_name: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  category: string;
}

export function useTaskProgress() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    fetchTasks();
    const unsubscribe = subscribeToTaskUpdates();
    
    return () => {
      unsubscribe();
    };
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data: tasksData, error: tasksError } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('user_id', user?.id);

      if (tasksError) throw tasksError;
      
      if (tasksData) {
        const typedTasksData = tasksData as Task[];
        setTasks(typedTasksData);
        
        const completedTasks = typedTasksData.filter(task => task.completed).length;
        const calculatedProgress = completedTasks * 2;
        
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

  const toggleTaskComplete = async (taskId: string, completed: boolean, category: string, taskName: string) => {
    try {
      const { data: existingTask, error: selectError } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('id', taskId)
        .single();

      if (selectError && selectError.code !== 'PGRST116') { // PGRST116 is "not found"
        throw selectError;
      }
      
      if (existingTask) {
        // Update existing task
        const { error } = await supabase
          .from('user_tasks')
          .update({ 
            completed,
            completed_at: completed ? new Date().toISOString() : null,
            updated_at: new Date().toISOString()
          })
          .eq('id', taskId);

        if (error) throw error;
      } else {
        // Create new task
        const { error } = await supabase
          .from('user_tasks')
          .insert({ 
            id: taskId,
            user_id: user?.id,
            task_id: 'setup_task',
            completed,
            completed_at: completed ? new Date().toISOString() : null,
            category,
            task_name: taskName
          });

        if (error) throw error;
      }
      
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  return { tasks, progress, loading, toggleTaskComplete };
}
