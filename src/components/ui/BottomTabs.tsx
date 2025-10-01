
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, MessageSquare, User, LayoutDashboard, MapPin, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRoutes } from '@/hooks/useRoutes';

interface NavItem {
  path: string;
  icon: typeof Home;
  title: string;
  access_level: 'public' | 'authenticated' | 'client' | 'broker';
}

const BottomTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { isRouteAccessible } = useRoutes();

  // Define static navigation items
  const allNavItems: NavItem[] = [
    { path: '/', icon: Home, title: 'Home', access_level: 'public' },
    { path: '/find-broker', icon: Search, title: 'Find', access_level: 'client' },
    { path: '/nearby-brokers', icon: MapPin, title: 'Nearby', access_level: 'client' },
    { path: '/broker-dashboard', icon: LayoutDashboard, title: 'Dashboard', access_level: 'broker' },
    { path: '/requests', icon: FileText, title: 'Requests', access_level: 'authenticated' },
    { path: '/messages', icon: MessageSquare, title: 'Messages', access_level: 'authenticated' },
    { path: '/profile', icon: User, title: 'Profile', access_level: 'authenticated' },
  ];

  // Filter navigation items based on user role and database routes
  const filteredNavItems = allNavItems.filter(item => {
    // Check if route exists and is accessible
    if (!isRouteAccessible(item.path)) return false;
    
    // Additional client-side filtering
    if (item.access_level === 'public') return true;
    if (!user) return false;
    if (item.access_level === 'authenticated') return true;
    return item.access_level === user?.role;
  });

  // List of paths where we should display the bottom tabs
  const tabsEnabledPaths = ['/', '/find-broker', '/requests', '/messages', '/profile', '/broker-dashboard', '/nearby-brokers'];
  
  // Don't render bottom tabs for paths that shouldn't have them
  if (!tabsEnabledPaths.includes(location.pathname) && !tabsEnabledPaths.some(path => location.pathname.startsWith(path))) {
    return null;
  }

  if (filteredNavItems.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glassmorphism border-t shadow-lg animate-slide-up">
      <div className="flex justify-around items-center py-2 px-1 safe-area-inset">
        {filteredNavItems.slice(0, 5).map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`tab-button ${isActive ? 'active' : 'text-gray-400'}`}
            >
              <IconComponent size={22} className={`mb-1 ${isActive ? 'text-dalali-600' : 'text-gray-400'}`} />
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabs;
