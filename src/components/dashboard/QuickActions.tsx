
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, ClipboardList } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Find a Broker Near Me',
      icon: MapPin,
      path: '/find-broker?nearby=true',
      color: 'bg-dalali-600',
    },
    {
      title: 'List My Service Request',
      icon: ClipboardList,
      path: '/requests/new',
      color: 'bg-dalali-700',
    },
    {
      title: 'View My Ongoing Requests',
      icon: Search,
      path: '/requests?status=active',
      color: 'bg-dalali-800',
    },
  ];

  return (
    <div className="w-full mt-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action, index) => (
          <Link 
            key={action.title} 
            to={action.path}
            className="relative overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98]"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <div className={`${action.color} text-white p-4 flex items-center justify-between`}>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <action.icon size={20} className="text-white" />
                </div>
                <h3 className="font-medium">{action.title}</h3>
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20">
                <span className="sr-only">Go to {action.title}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 9L7.5 6L4.5 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
