
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Project {
  project_name: string;
  id: string;
  created_at: string; // Add this line
}

export function useProjectManagement() {
  const { toast } = useToast();

  const saveProject = async (projectName: string, userId: string) => {
    try {
      const { error } = await supabase
        .from('user_projects')
        .insert([
          { project_name: projectName, user_id: userId }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project name saved successfully",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const fetchUserProject = async (userId: string): Promise<Project | null> => {
    try {
      const { data, error } = await supabase
        .from('user_projects')
        .select('project_name, id, created_at') // Add created_at to select
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  };

  return { saveProject, fetchUserProject };
}
