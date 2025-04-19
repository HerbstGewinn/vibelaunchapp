
import { useState, useEffect } from 'react';
import { useProjectManagement } from './useProjectManagement';
import { useAuth } from '@/contexts/AuthContext';

export const useDaysSinceStart = () => {
  const [daysSinceStart, setDaysSinceStart] = useState(1);
  const { fetchUserProject } = useProjectManagement();
  const { user } = useAuth();

  useEffect(() => {
    const calculateDays = async () => {
      if (user) {
        const project = await fetchUserProject(user.id);
        if (project && project.created_at) {
          const startDate = new Date(project.created_at);
          const currentDate = new Date();
          const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysSinceStart(Math.max(diffDays, 1)); // Minimum of 1 day
        }
      }
    };

    calculateDays();
    const interval = setInterval(calculateDays, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, [user]);

  return daysSinceStart;
};
