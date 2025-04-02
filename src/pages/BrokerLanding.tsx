
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/ui/NavigationBar';
import BottomTabs from '@/components/ui/BottomTabs';
import { MapPin, List, Clock, Bell, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { mockListings } from '@/data/mockListings';
import { Button } from '@/components/ui/button';
import { Listing } from '@/types/listing';

const BrokerLanding = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Verify user is a broker
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access broker features",
        duration: 3000,
      });
      navigate('/login', { state: { returnUrl: '/broker-landing' } });
    } else if (user.role !== 'broker') {
      toast({
        title: "Broker Access Only",
        description: "This page is only available to brokers",
        duration: 3000,
      });
      navigate('/become-broker');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
      duration: 3000,
    });
  };

  if (!user || user.role !== 'broker') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="Broker Portal" />
      
      <main className="px-4 pb-4">
        {/* Map Section */}
        <div className="mt-4 mb-6 rounded-xl overflow-hidden shadow-md h-[200px] relative">
          <div className="absolute inset-0 bg-gray-200">
            <div className="flex h-full items-center justify-center">
              <MapPin className="text-dalali-600 h-12 w-12 opacity-30" />
              <p className="text-gray-500 ml-2">Interactive Map Loading...</p>
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <Button 
              size="sm" 
              variant="default" 
              className="bg-dalali-600 hover:bg-dalali-700"
              onClick={() => navigate('/broker-dashboard')}
            >
              Dashboard
            </Button>
          </div>
        </div>
        
        {/* Broker Profile Summary */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center">
            <div className="h-14 w-14 rounded-full overflow-hidden mr-3 bg-dalali-100">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-dalali-200 text-dalali-600 font-bold text-xl">
                  {user.name && user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-dalali-800">{user.name || 'Broker'}</h3>
              <p className="text-sm text-gray-600">{user.email || user.phone || 'Contact information not available'}</p>
              <span className="inline-block mt-1 text-xs bg-dalali-100 text-dalali-700 px-2 py-0.5 rounded-full">
                Broker
              </span>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <button 
            className="flex flex-col items-center justify-center p-3 bg-white rounded-lg shadow-sm"
            onClick={() => navigate('/broker-dashboard')}
          >
            <List className="h-6 w-6 text-dalali-600 mb-1" />
            <span className="text-xs text-gray-700">Listings</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center p-3 bg-white rounded-lg shadow-sm"
            onClick={() => navigate('/broker-dashboard?tab=orders')}
          >
            <Clock className="h-6 w-6 text-dalali-600 mb-1" />
            <span className="text-xs text-gray-700">Orders</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center p-3 bg-white rounded-lg shadow-sm"
            onClick={() => navigate('/broker-dashboard?tab=messages')}
          >
            <MessageSquare className="h-6 w-6 text-dalali-600 mb-1" />
            <span className="text-xs text-gray-700">Messages</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center p-3 bg-white rounded-lg shadow-sm"
            onClick={handleLogout}
          >
            <LogOut className="h-6 w-6 text-red-500 mb-1" />
            <span className="text-xs text-gray-700">Logout</span>
          </button>
        </div>
        
        {/* Recent Market Activity */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-dalali-800 mb-3">Market Activity</h2>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="space-y-4">
              {mockListings.slice(0, 3).map((listing: Listing) => (
                <div key={listing.id} className="flex border-b pb-3 last:border-0 last:pb-0">
                  <div className="h-14 w-14 rounded-md overflow-hidden mr-3">
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-dalali-800 text-sm">{listing.title}</h3>
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs font-medium text-dalali-600">
                        {listing.status === 'sold' ? 'Sold' : 'Available'}
                      </span>
                      <span className="text-xs bg-dalali-50 text-dalali-800 px-2 py-0.5 rounded-full">
                        {listing.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-dalali-800">Notifications</h2>
            <Bell className="h-5 w-5 text-dalali-600" />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="space-y-3">
              <div className="p-3 bg-dalali-50 rounded-lg border border-dalali-100">
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full mr-3">
                    <Bell className="h-4 w-4 text-dalali-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dalali-800">New location request</p>
                    <p className="text-xs text-gray-600">Client is requesting to view a property in Kinondoni</p>
                    <div className="mt-2 flex space-x-2">
                      <button className="px-3 py-1 bg-dalali-600 text-white text-xs rounded-full">Accept</button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Decline</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <MessageSquare className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">New message</p>
                    <p className="text-xs text-gray-600">You have a new message from Maria about property pricing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BottomTabs />
    </div>
  );
};

export default BrokerLanding;
