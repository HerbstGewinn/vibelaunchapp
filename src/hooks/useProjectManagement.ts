
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Project {
  project_name: string;
  id: string;
  created_at: string;
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

      // Store in localStorage for immediate access
      localStorage.setItem('project_name', projectName);

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
      // First try to get from localStorage for immediate display
      const cachedProjectName = localStorage.getItem('project_name');
      
      const { data, error } = await supabase
        .from('user_projects')
        .select('project_name, id, created_at')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        // Update localStorage with latest data from server
        localStorage.setItem('project_name', data.project_name);
        return data;
      } else if (cachedProjectName) {
        // Return cached data if no server data available
        return {
          project_name: cachedProjectName,
          id: 'local',
          created_at: new Date().toISOString()
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching project:', error);
      
      // Fallback to localStorage if server fetch fails
      const cachedProjectName = localStorage.getItem('project_name');
      if (cachedProjectName) {
        return {
          project_name: cachedProjectName,
          id: 'local',
          created_at: new Date().toISOString()
        };
      }
      
      return null;
    }
  };

  return { saveProject, fetchUserProject };
}
