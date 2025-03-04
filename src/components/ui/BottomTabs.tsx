
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ClipboardList, MessageSquare, User } from 'lucide-react';

const BottomTabs: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const tabs = [
    {
      name: 'Home',
      icon: Home,
      path: '/',
    },
    {
      name: 'Find',
      icon: Search,
      path: '/find-broker',
    },
    {
      name: 'Requests',
      icon: ClipboardList,
      path: '/requests',
    },
    {
      name: 'Messages',
      icon: MessageSquare,
      path: '/messages',
    },
    {
      name: 'Profile',
      icon: User,
      path: '/profile',
    },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glassmorphism border-t shadow-lg animate-slide-up">
      <div className="flex justify-around items-center py-2 px-1 safe-area-inset">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.path}
            className={`tab-button ${currentPath === tab.path ? 'active' : 'text-gray-400'}`}
          >
            <tab.icon size={22} className={`mb-1 ${currentPath === tab.path ? 'text-dalali-600' : 'text-gray-400'}`} />
            <span>{tab.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomTabs;
