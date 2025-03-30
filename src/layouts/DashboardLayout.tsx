
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNav from '@/components/SidebarNav';
import { RequireAuth } from '@/contexts/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';

const DashboardLayout = () => {
  return (
    <RequireAuth>
      <div className="flex h-screen bg-launch-dark text-white">
        <SidebarNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <Outlet />
          </ScrollArea>
        </div>
      </div>
    </RequireAuth>
  );
};

export default DashboardLayout;
