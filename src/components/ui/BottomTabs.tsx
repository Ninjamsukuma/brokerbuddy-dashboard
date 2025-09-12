
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, MessageSquare, User, LayoutDashboard, MapPin, FileText, Briefcase, ClipboardList } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRoutes } from '@/hooks/useRoutes';

const BottomTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { getNavigationRoutes } = useRoutes();

  const iconMap = {
    'home': Home,
    'search': Search,
    'message-circle': MessageSquare,
    'user': User,
    'layout-dashboard': LayoutDashboard,
    'map-pin': MapPin,
    'file-text': ClipboardList,
    'briefcase': Briefcase,
  };

  // Get navigation routes from database
  const navigationRoutes = getNavigationRoutes();

  // Filter routes based on user role
  const filteredRoutes = navigationRoutes.filter(route => {
    if (route.access_level === 'public') return true;
    if (!user) return false;
    if (route.access_level === 'authenticated') return true;
    return route.access_level === user.role;
  });

  // List of paths where we should display the bottom tabs
  const tabsEnabledPaths = ['/', '/find-broker', '/requests', '/messages', '/profile', '/broker-dashboard', '/nearby-brokers'];
  
  // Don't render bottom tabs for paths that shouldn't have them
  if (!tabsEnabledPaths.includes(location.pathname) && !tabsEnabledPaths.some(path => location.pathname.startsWith(path))) {
    return null;
  }

  if (filteredRoutes.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glassmorphism border-t shadow-lg animate-slide-up">
      <div className="flex justify-around items-center py-2 px-1 safe-area-inset">
        {filteredRoutes.slice(0, 5).map((route) => {
          const IconComponent = iconMap[route.icon as keyof typeof iconMap] || Home;
          const isActive = location.pathname === route.path;
          
          return (
            <button
              key={route.id}
              onClick={() => navigate(route.path)}
              className={`tab-button ${isActive ? 'active' : 'text-gray-400'}`}
            >
              <IconComponent size={22} className={`mb-1 ${isActive ? 'text-dalali-600' : 'text-gray-400'}`} />
              <span>{route.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabs;
