
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
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
  {
    title: 'Launch Steps',
    items: [
      { name: 'Domain & Deployment', icon: Globe, href: '/dashboard/domain' },
      { name: 'Google Indexing', icon: Search, href: '/dashboard/indexing' },
      { name: 'Acquisition Strategy', icon: Users, href: '/dashboard/acquisition' },
      { name: 'Feedback Collection', icon: MessageSquare, href: '/dashboard/feedback' },
      { name: 'Growth & Analytics', icon: BarChart3, href: '/dashboard/analytics' },
    ],
  },
  {
    title: 'Social Media',
    items: [
      { name: 'Facebook', icon: Facebook, href: '/dashboard/facebook' },
      { name: 'Twitter', icon: Twitter, href: '/dashboard/twitter' },
      { name: 'Instagram', icon: Instagram, href: '/dashboard/instagram' },
      { name: 'LinkedIn', icon: Linkedin, href: '/dashboard/linkedin' },
      { name: 'YouTube', icon: Youtube, href: '/dashboard/youtube' },
    ],
  },
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
        <div className="bg-launch-card-bg rounded-lg p-3 mb-4">
          <div className="text-sm text-gray-400">Launch Progress:</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-800 h-2 rounded-full">
              <div className="bg-launch-cyan h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
            <span className="text-white text-sm">65%</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {navItems.map((section, i) => (
          <div key={i} className="mb-6">
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
