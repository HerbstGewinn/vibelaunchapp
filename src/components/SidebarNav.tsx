import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useTaskProgress } from '@/hooks/useTaskProgress';
import { Globe, Search, Users, MessageSquare, BarChart3, ShieldCheck, CreditCard, Rocket, Lock, GanttChart, Mail, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent } from '@/components/ui/sheet';
const navItems = [{
  title: 'Launch Steps',
  items: [{
    name: 'Auth',
    icon: ShieldCheck,
    href: '/dashboard/auth'
  }, {
    name: 'Payment',
    icon: CreditCard,
    href: '/dashboard/payment'
  }, {
    name: 'Deployment',
    icon: Globe,
    href: '/dashboard/deployment'
  }, {
    name: 'Security',
    icon: Lock,
    href: '/dashboard/security'
  }, {
    name: 'SEO',
    icon: Search,
    href: '/dashboard/seo'
  }, {
    name: 'Launch',
    icon: Rocket,
    href: '/dashboard/launch'
  }, {
    name: 'Customer Service',
    icon: Mail,
    href: '/dashboard/customer-service'
  }, {
    name: 'User Growth',
    icon: Users,
    href: '/dashboard/growth'
  }]
}];
interface SidebarNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarNav = ({
  isOpen,
  onToggle
}: SidebarNavProps) => {
  const location = useLocation();
  const { signout } = useAuth();
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  const { progress } = useTaskProgress();
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate('/');
  };

  // Create the sidebar content as a separate component
  const SidebarContentComponent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-4">
        <span className="text-xl font-bold text-white">
          Vibe<span className="text-launch-cyan">Launch</span>
        </span>
        {isMobile}
      </div>
      
      <div className="mt-2 px-4">
        <div 
          className="bg-launch-card-bg rounded-lg p-3 cursor-pointer hover:bg-launch-card-hover transition-colors" 
          onClick={goToHomepage}
        >
          <div className="text-sm text-gray-400">Launch Progress:</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-800 h-2 rounded-full">
              <div 
                className="bg-launch-cyan h-full rounded-full transition-all duration-500" 
                style={{
                  width: `${Math.min(Math.round(progress), 100)}%`
                }}
              />
            </div>
            <span className="text-white text-sm">{Math.round(progress)}%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Click to go to homepage</p>
        </div>
      </div>

      <SidebarContent>
        {navItems.map((section, i) => <div key={i} className="py-2">
            <h3 className="text-launch-text-muted font-medium text-xs uppercase tracking-wider px-4 mb-2">
              {section.title}
            </h3>
            <SidebarMenu>
              {section.items.map(item => {
            const isActive = location.pathname === item.href;
            return <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={state === "collapsed" && isMobile ? item.name : undefined}>
                      <Link to={item.href} className={cn("flex items-center gap-3 rounded-md text-sm transition-colors px-4 py-2", isActive ? "text-launch-cyan" : "text-launch-text-muted hover:text-white")}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>;
          })}
            </SidebarMenu>
          </div>)}
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-gray-800 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/dashboard/settings'} tooltip={state === "collapsed" && isMobile ? "Settings" : undefined}>
              <Link to="/dashboard/settings" className={cn("flex items-center gap-3 rounded-md text-sm transition-colors px-4 py-2", location.pathname === '/dashboard/settings' ? "text-launch-cyan" : "text-launch-text-muted hover:text-white")}>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={signout} tooltip={state === "collapsed" && isMobile ? "Sign out" : undefined} className="flex items-center gap-3 rounded-md text-sm transition-colors px-4 py-2 w-full text-launch-text-muted hover:text-white">
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </div>
  );

  if (isMobile) {
    return <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetContent side="left" className="w-[280px] p-0 border-r border-gray-800 bg-launch-sidebar-bg">
          <SidebarContentComponent />
        </SheetContent>
      </Sheet>;
  }

  // On desktop, always show the sidebar
  return <Sidebar className="h-screen border-r border-gray-800 bg-launch-sidebar-bg">
      <SidebarContentComponent />
    </Sidebar>;
};

export default SidebarNav;
