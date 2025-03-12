
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/ui/NavigationBar';
import BottomTabs from '@/components/ui/BottomTabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { mockListings } from '@/data/mockListings';
import DashboardStats from '@/components/broker-dashboard/DashboardStats';
import SearchBar from '@/components/broker-dashboard/SearchBar';
import StatusFilter from '@/components/broker-dashboard/StatusFilter';
import ViewToggle from '@/components/broker-dashboard/ViewToggle';
import AddListingButton from '@/components/broker-dashboard/AddListingButton';
import ListingsSection from '@/components/broker-dashboard/ListingsSection';
import { Listing } from '@/types/listing';

const BrokerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'sold'>('all');
  
  // Simple filtering logic
  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          listing.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || listing.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
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
    toast({
      title: "Share listing",
      description: `Sharing listing ${id}`,
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="Broker Dashboard" />
      
      <main className="px-4 pb-4">
        <div className="pt-4 space-y-4">
          {/* Dashboard Stats */}
          <DashboardStats listings={mockListings} />
          
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
        </div>
      </main>
      
      <BottomTabs />
    </div>
  );
};

export default BrokerDashboard;
