
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNav from '@/components/SidebarNav';
import { RequireAuth } from '@/contexts/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider } from '@/components/ui/sidebar';

const DashboardLayout = () => {
  return (
    <RequireAuth>
      <SidebarProvider>
        <div className="flex h-screen bg-launch-dark text-white w-full">
          <SidebarNav />
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1">
              <Outlet />
            </ScrollArea>
          </div>
        </div>
      </SidebarProvider>
    </RequireAuth>
  );
};

export default DashboardLayout;
