
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import NavigationBar from '@/components/ui/NavigationBar';
import BottomTabs from '@/components/ui/BottomTabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { mockListings } from '@/data/mockListings';
import DashboardStats from '@/components/broker-dashboard/DashboardStats';
import BrokerStatistics from '@/components/broker-dashboard/BrokerStatistics';
import SearchBar from '@/components/broker-dashboard/SearchBar';
import StatusFilter from '@/components/broker-dashboard/StatusFilter';
import ViewToggle from '@/components/broker-dashboard/ViewToggle';
import AddListingButton from '@/components/broker-dashboard/AddListingButton';
import ListingsSection from '@/components/broker-dashboard/ListingsSection';
import BrokerProfile from '@/components/broker-dashboard/BrokerProfile';
import BrokerMessages from '@/components/broker-dashboard/BrokerMessages';
import BrokerOrders from '@/components/broker-dashboard/BrokerOrders';
import { Listing } from '@/types/listing';
import { User, ListFilter, MessageSquare, ShoppingBag, UserCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BrokerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('listings');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'sold'>('all');
  const [showDetailedStats, setShowDetailedStats] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simple filtering logic
  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          listing.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || listing.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  useEffect(() => {
    // Add a small delay to simulate loading and avoid flash of content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddListing = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add new listings will be available soon.",
      duration: 3000,
    });
  };
  
  const handleEditListing = (id: string) => {
    toast({
      title: "Edit listing",
      description: `Editing listing ${id}`,
      duration: 3000,
    });
  };
  
  const handleDeleteListing = (id: string) => {
    toast({
      title: "Delete listing",
      description: `Deleting listing ${id}`,
      duration: 3000,
    });
  };
  
  const handleShareListing = (id: string) => {
    navigate('/marketing-materials');
  };
  
  const toggleDetailedStats = () => {
    setShowDetailedStats(!showDetailedStats);
  };
  
  // Check if user is a broker
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the broker dashboard",
        duration: 3000,
      });
      navigate('/login', { state: { returnUrl: '/broker-dashboard' } });
    } else if (user.role !== 'broker') {
      toast({
        title: "Broker Access Only",
        description: "This dashboard is only available to brokers",
        duration: 3000,
      });
      navigate('/become-broker');
    }
  }, [user, navigate]);
  
  // Show loading state or redirect if not a broker
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-dalali-600">Loading broker dashboard...</div>
      </div>
    );
  }
  
  // If user is not authenticated or not a broker, the useEffect above will handle redirection
  // This is just a safety check
  if (!user || user.role !== 'broker') {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="Broker Dashboard" />
      
      <main className="px-4 pb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="listings" className="flex flex-col items-center py-2">
              <ListFilter className="h-5 w-5 mb-1" />
              <span className="text-xs">Listings</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex flex-col items-center py-2">
              <MessageSquare className="h-5 w-5 mb-1" />
              <span className="text-xs">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex flex-col items-center py-2">
              <ShoppingBag className="h-5 w-5 mb-1" />
              <span className="text-xs">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col items-center py-2">
              <UserCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">Profile</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="listings" className="space-y-4">
            {/* Marketing Materials Button */}
            <Button 
              onClick={() => navigate('/marketing-materials')}
              className="w-full flex items-center justify-center bg-dalali-50 text-dalali-800 py-2 rounded-lg font-medium text-sm border border-dalali-200 hover:bg-dalali-100 transition-colors"
            >
              <Share2 size={16} className="mr-2" />
              Create & Share Marketing Materials
            </Button>
            
            {/* Dashboard Stats */}
            <DashboardStats listings={mockListings} />
            
            {/* Toggle Detailed Stats Button */}
            <button 
              onClick={toggleDetailedStats}
              className="w-full bg-dalali-50 text-dalali-800 py-2 rounded-lg font-medium text-sm border border-dalali-200 hover:bg-dalali-100 transition-colors"
            >
              {showDetailedStats ? 'Hide Detailed Analytics' : 'Show Detailed Analytics'}
            </button>
            
            {/* Detailed Statistics (conditionally rendered) */}
            {showDetailedStats && (
              <BrokerStatistics listings={mockListings} />
            )}
            
            {/* Search and Filters */}
            <div className="flex flex-col space-y-3">
              <SearchBar 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
              />
              
              <div className="flex justify-between items-center">
                <StatusFilter 
                  filterStatus={filterStatus} 
                  setFilterStatus={setFilterStatus} 
                />
                
                <ViewToggle 
                  view={view} 
                  setView={setView} 
                />
              </div>
            </div>
            
            {/* Add New Listing Button */}
            <AddListingButton onAddListing={handleAddListing} />
            
            {/* Listings */}
            <ListingsSection 
              listings={filteredListings}
              view={view}
              onEdit={handleEditListing}
              onShare={handleShareListing}
              onDelete={handleDeleteListing}
            />
          </TabsContent>
          
          <TabsContent value="messages">
            <BrokerMessages />
          </TabsContent>
          
          <TabsContent value="orders">
            <BrokerOrders />
          </TabsContent>
          
          <TabsContent value="profile">
            <BrokerProfile />
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomTabs />
    </div>
  );
};

export default BrokerDashboard;
