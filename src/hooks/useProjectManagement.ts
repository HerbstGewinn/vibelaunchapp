
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

  return { saveProject };
}
