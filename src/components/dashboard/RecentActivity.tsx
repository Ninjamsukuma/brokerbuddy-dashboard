
import React, { useEffect, useState } from 'react';
import { Clock, Check, X, AlertTriangle, MessageSquare } from 'lucide-react';
import { useServiceRequests } from '@/hooks/useServiceRequests';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  type: 'request' | 'message' | 'alert' | 'review';
  title: string;
  description: string;
  time: string;
  status?: 'pending' | 'completed' | 'cancelled';
  actionRequired?: boolean;
}

const RecentActivity: React.FC = () => {
  const { user } = useAuth();
  const { requests, loading } = useServiceRequests(user?.role);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    if (requests.length > 0) {
      // Convert requests to activities
      const requestActivities: ActivityItem[] = requests
        .slice(0, 4) // Show only first 4
        .map(request => ({
          id: request.id,
          type: 'request' as const,
          title: request.title,
          description: request.description || `${request.status.charAt(0).toUpperCase() + request.status.slice(1)} request`,
          time: formatDistanceToNow(new Date(request.created_at), { addSuffix: true }),
          status: request.status === 'pending' ? 'pending' : 
                  request.status === 'completed' ? 'completed' : 
                  request.status === 'cancelled' ? 'cancelled' : 'pending',
          actionRequired: request.status === 'pending'
        }));
      
      setActivities(requestActivities);
    }
  }, [requests]);

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

  if (loading) {
    return (
      <div className="w-full mt-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-dalali-800">Recent Activity</h2>
        <a href="/requests" className="text-dalali-600 text-sm font-medium">
          View All
        </a>
      </div>
      
      {activities.length === 0 ? (
        <div className="p-6 text-center text-muted-foreground">
          <p>No recent activity to show.</p>
          <a href="/requests" className="text-primary hover:underline">Create your first request</a>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default RecentActivity;
