
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarNav from '@/components/SidebarNav';
import { RequireAuth } from '@/contexts/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardLayout = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => setIsOpen(prev => !prev);

  // Scroll to top when route changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <RequireAuth>
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="flex min-h-screen bg-launch-dark text-white w-full relative">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="fixed top-4 left-4 z-50 text-gray-400 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}

          <SidebarNav isOpen={isOpen} onToggle={toggleSidebar} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 px-4 pt-16 pb-4 md:p-6 md:pt-6">
              <Outlet />
            </ScrollArea>
          </div>
        </div>
      </SidebarProvider>
    </RequireAuth>
  );
};

export default DashboardLayout;
