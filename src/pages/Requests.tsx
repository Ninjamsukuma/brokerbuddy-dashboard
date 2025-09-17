
import React, { useState, useEffect } from 'react';
import { ArrowRight, Clipboard, Clock, Check, X, MoreHorizontal } from 'lucide-react';
import NavigationBar from '../components/ui/NavigationBar';
import BottomTabs from '../components/ui/BottomTabs';
import { useServiceRequests } from '@/hooks/useServiceRequests';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';

interface Request {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  broker?: {
    name: string;
    avatar: string;
  };
}

const Requests = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');
  const { user } = useAuth();
  const { requests, loading, error } = useServiceRequests(user?.role);
  
  const filteredRequests = requests.filter(request => {
    if (activeTab === 'active') {
      return ['pending', 'accepted', 'in_progress'].includes(request.status);
    } else if (activeTab === 'completed') {
      return ['completed', 'cancelled'].includes(request.status);
    }
    return true;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'pending':
        return <div className="chip bg-amber-100 text-amber-700">Pending</div>;
      case 'accepted':
        return <div className="chip bg-blue-100 text-blue-700">Accepted</div>;
      case 'in_progress':
        return <div className="chip bg-dalali-100 text-dalali-700">In Progress</div>;
      case 'completed':
        return <div className="chip bg-green-100 text-green-700">Completed</div>;
      case 'cancelled':
        return <div className="chip bg-red-100 text-red-700">Cancelled</div>;
      default:
        return <div className="chip bg-gray-100 text-gray-700">Unknown</div>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={18} className="text-amber-500" />;
      case 'accepted':
        return <Check size={18} className="text-blue-500" />;
      case 'in_progress':
        return <ArrowRight size={18} className="text-dalali-600" />;
      case 'completed':
        return <Check size={18} className="text-green-500" />;
      case 'cancelled':
        return <X size={18} className="text-red-500" />;
      default:
        return <Clock size={18} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="My Requests" />
      
      <main className="px-4 pb-4">
        {/* Tab buttons */}
        <div className="flex items-center border-b border-gray-200 mt-2 mb-4 animate-fade-in">
          <button 
            className={`py-3 px-4 text-sm font-medium ${activeTab === 'active' ? 'text-dalali-600 border-b-2 border-dalali-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button 
            className={`py-3 px-4 text-sm font-medium ${activeTab === 'completed' ? 'text-dalali-600 border-b-2 border-dalali-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
          <button 
            className={`py-3 px-4 text-sm font-medium ${activeTab === 'all' ? 'text-dalali-600 border-b-2 border-dalali-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
        </div>
        
        {/* Request Cards */}
        <div className="space-y-4 animate-slide-up">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request, index) => (
              <div 
                key={request.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-dalali-800">{request.title}</h3>
                    <div className="flex space-x-2 items-center">
                      {getStatusChip(request.status)}
                      <button className="text-gray-400">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{request.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clipboard size={14} className="mr-1" />
                      <span>Request ID: #{request.id.slice(0, 8)}</span>
                    </div>
                    <span>{formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}</span>
                  </div>
                  
                  {/* Broker info would need to be fetched separately or joined */}
                  
                  {['pending', 'accepted', 'in_progress'].includes(request.status) && (
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 py-2 px-4 bg-white border border-dalali-600 text-dalali-600 rounded-lg text-sm font-medium">
                        Cancel
                      </button>
                      <button className="flex-1 py-2 px-4 bg-dalali-600 text-white rounded-lg text-sm font-medium shadow-sm">
                        View Details
                      </button>
                    </div>
                  )}
                  
                  {['completed', 'cancelled'].includes(request.status) && (
                    <div className="mt-4">
                      <button className="w-full py-2 px-4 bg-dalali-600 text-white rounded-lg text-sm font-medium shadow-sm">
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                <Clipboard size={30} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No requests found</h3>
              <p className="text-gray-500 mb-4">You don't have any {activeTab} requests</p>
              <button className="py-2 px-6 bg-dalali-600 text-white rounded-lg text-sm font-medium shadow-sm">
                Create New Request
              </button>
            </div>
          )}
        </div>
        
        {/* Floating Action Button */}
        <div className="fixed right-6 bottom-24">
          <button className="w-14 h-14 rounded-full bg-dalali-600 text-white shadow-lg flex items-center justify-center animate-scale-up">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </main>
      
      <BottomTabs />
    </div>
  );
};

export default Requests;
