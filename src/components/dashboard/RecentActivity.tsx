
import React from 'react';
import { Clock, Check, X, AlertTriangle, MessageSquare } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'request' | 'message' | 'alert' | 'review';
  title: string;
  description: string;
  time: string;
  status?: 'pending' | 'completed' | 'cancelled';
  actionRequired?: boolean;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'request',
    title: 'Request for 2BHK in Kinondoni',
    description: 'Your request has been accepted by 3 brokers',
    time: '2h ago',
    status: 'pending',
    actionRequired: true
  },
  {
    id: '2',
    type: 'message',
    title: 'New message from James Wilson',
    description: "I've found a property that matches your...",
    time: '5h ago',
    actionRequired: true
  },
  {
    id: '3',
    type: 'request',
    title: 'Car inspection booking',
    description: 'Your Toyota Corolla inspection is scheduled',
    time: '1d ago',
    status: 'completed'
  },
  {
    id: '4',
    type: 'alert',
    title: 'Security Alert',
    description: 'Verify your identity for better security',
    time: '2d ago',
    actionRequired: true
  }
];

const RecentActivity: React.FC = () => {
  const getIcon = (activity: ActivityItem) => {
    if (activity.type === 'request') {
      if (activity.status === 'pending') return <Clock size={18} className="text-amber-500" />;
      if (activity.status === 'completed') return <Check size={18} className="text-green-500" />;
      if (activity.status === 'cancelled') return <X size={18} className="text-red-500" />;
    }
    if (activity.type === 'message') return <MessageSquare size={18} className="text-dalali-600" />;
    if (activity.type === 'alert') return <AlertTriangle size={18} className="text-amber-500" />;
    
    return <Clock size={18} className="text-dalali-600" />;
  };

  return (
    <div className="w-full mt-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-dalali-800">Recent Activity</h2>
        <a href="/activities" className="text-dalali-600 text-sm font-medium">
          View All
        </a>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 flex items-start space-x-3 card-hover"
          >
            <div className="p-2 bg-gray-100 rounded-full flex-shrink-0">
              {getIcon(activity)}
            </div>
            
            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="font-medium text-dalali-800 truncate">{activity.title}</h3>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1 truncate">{activity.description}</p>
              
              {activity.actionRequired && (
                <div className="mt-2">
                  <span className="chip bg-dalali-50 text-dalali-600 text-xs">
                    Action Required
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
