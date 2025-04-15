
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Globe, 
  Search, 
  Users, 
  MessageSquare, 
  BarChart3,
  ShieldCheck, 
  CreditCard,
  Rocket,
  Lock,
  GanttChart,
  Mail,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
  {
    title: 'Launch Steps',
    items: [
      { name: 'Auth', icon: ShieldCheck, href: '/dashboard/auth' },
      { name: 'Payment', icon: CreditCard, href: '/dashboard/payment' },
      { name: 'Deployment', icon: Globe, href: '/dashboard/deployment' },
      { name: 'Security', icon: Lock, href: '/dashboard/security' },
      { name: 'SEO', icon: Search, href: '/dashboard/seo' },
      { name: 'Launch', icon: Rocket, href: '/dashboard/launch' },
      { name: 'Customer Service', icon: Mail, href: '/dashboard/customer-service' },
      { name: 'User Growth', icon: Users, href: '/dashboard/growth' },
    ],
  }
];

const SidebarNav = () => {
  const location = useLocation();
  const { signout } = useAuth();

  return (
    <div className="h-screen w-64 bg-launch-sidebar-bg border-r border-gray-800 flex flex-col">
      <div className="p-4">
        <div className="flex items-center gap-2 px-2">
          <span className="text-xl font-bold text-white">Vibe<span className="text-launch-cyan">Launch</span></span>
        </div>
      </div>
      
      <div className="px-4 py-2">
        <div className="bg-launch-card-bg rounded-lg p-3">
          <div className="text-sm text-gray-400">Launch Progress:</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-800 h-2 rounded-full">
              <div className="bg-launch-cyan h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
            <span className="text-white text-sm">65%</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-2 py-2 scrollbar-none">
        {navItems.map((section, i) => (
          <div key={i} className="mb-4">
            <h3 className="text-launch-text-muted font-medium text-xs uppercase tracking-wider px-4 mb-2">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        isActive 
                          ? "bg-launch-dark text-launch-cyan" 
                          : "text-launch-text-muted hover:bg-launch-dark hover:text-white"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <Link 
          to="/dashboard/settings" 
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors mb-2",
            location.pathname === '/dashboard/settings' 
              ? "bg-launch-dark text-launch-cyan" 
              : "text-launch-text-muted hover:bg-launch-dark hover:text-white"
          )}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-launch-text-muted hover:text-white"
          onClick={signout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default SidebarNav;
