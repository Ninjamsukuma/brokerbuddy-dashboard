
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Search, ListFilter, Grid, List, Map, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import NavigationBar from '@/components/ui/NavigationBar';
import BottomTabs from '@/components/ui/BottomTabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

// Sample listing type
interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  status: 'active' | 'pending' | 'sold';
  featured: boolean;
  image: string;
  createdAt: string;
  views: number;
}

// Sample mock data
const mockListings: Listing[] = [
  {
    id: '1',
    title: '3 Bedroom Apartment in Westlands',
    price: 25000000,
    location: 'Westlands, Nairobi',
    type: 'Apartment',
    status: 'active',
    featured: true,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&q=80',
    createdAt: '2023-09-15',
    views: 245
  },
  {
    id: '2',
    title: 'Toyota RAV4 2020 Model',
    price: 3500000,
    location: 'Kilimani, Nairobi',
    type: 'Vehicle',
    status: 'active',
    featured: false,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&w=350&q=80',
    createdAt: '2023-10-05',
    views: 189
  },
  {
    id: '3',
    title: 'Office Space for Rent',
    price: 150000,
    location: 'CBD, Nairobi',
    type: 'Commercial',
    status: 'pending',
    featured: false,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&w=350&q=80',
    createdAt: '2023-10-12',
    views: 97
  },
  {
    id: '4',
    title: 'Mercedes Benz C200',
    price: 4200000,
    location: 'Lavington, Nairobi',
    type: 'Vehicle',
    status: 'sold',
    featured: false,
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&w=350&q=80',
    createdAt: '2023-08-25',
    views: 324
  }
];

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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="Broker Dashboard" />
      
      <main className="px-4 pb-4">
        <div className="pt-4 space-y-4">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-xl shadow-sm">
              <p className="text-xs text-gray-500">Active Listings</p>
              <p className="text-xl font-semibold text-dalali-800">
                {mockListings.filter(l => l.status === 'active').length}
              </p>
            </div>
            
            <div className="bg-white p-3 rounded-xl shadow-sm">
              <p className="text-xs text-gray-500">Total Views</p>
              <p className="text-xl font-semibold text-dalali-800">
                {mockListings.reduce((sum, listing) => sum + listing.views, 0)}
              </p>
            </div>
            
            <div className="bg-white p-3 rounded-xl shadow-sm">
              <p className="text-xs text-gray-500">Sold/Rented</p>
              <p className="text-xl font-semibold text-dalali-800">
                {mockListings.filter(l => l.status === 'sold').length}
              </p>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col space-y-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search your listings..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dalali-500/50 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <button 
                  className={`chip flex items-center ${filterStatus === 'all' ? 'bg-dalali-600 text-white' : 'bg-gray-100'}`}
                  onClick={() => setFilterStatus('all')}
                >
                  <ListFilter size={14} className="mr-1" />
                  All
                </button>
                <button 
                  className={`chip ${filterStatus === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}
                  onClick={() => setFilterStatus('active')}
                >
                  Active
                </button>
                <button 
                  className={`chip ${filterStatus === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100'}`}
                  onClick={() => setFilterStatus('pending')}
                >
                  Pending
                </button>
                <button 
                  className={`chip ${filterStatus === 'sold' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                  onClick={() => setFilterStatus('sold')}
                >
                  Sold
                </button>
              </div>
              
              <div className="flex space-x-1">
                <button 
                  className={`icon-button p-2 ${view === 'grid' ? 'bg-dalali-50 text-dalali-600' : ''}`}
                  onClick={() => setView('grid')}
                >
                  <Grid size={16} />
                </button>
                <button 
                  className={`icon-button p-2 ${view === 'list' ? 'bg-dalali-50 text-dalali-600' : ''}`}
                  onClick={() => setView('list')}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Add New Listing Button */}
          <div>
            <motion.button
              className="w-full bg-dalali-600 text-white rounded-lg py-3 flex items-center justify-center"
              onClick={handleAddListing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlusCircle size={18} className="mr-2" />
              Add New Listing
            </motion.button>
          </div>
          
          {/* Listings */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Your Listings</h2>
            
            {filteredListings.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                  <ListFilter size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">No listings found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <motion.div 
                className={view === 'grid' ? "grid grid-cols-2 gap-3" : "space-y-3"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredListings.map(listing => (
                  view === 'grid' ? (
                    <motion.div 
                      key={listing.id}
                      className="bg-white rounded-xl overflow-hidden shadow-sm"
                      variants={itemVariants}
                    >
                      <div className="relative h-32">
                        <img 
                          src={listing.image} 
                          alt={listing.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`chip text-xs ${
                            listing.status === 'active' ? 'bg-green-100 text-green-700' : 
                            listing.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                        <p className="text-dalali-600 font-semibold">
                          KSh {listing.price.toLocaleString()}
                        </p>
                        <p className="text-gray-500 text-xs">{listing.location}</p>
                        
                        <div className="flex justify-between mt-2">
                          <button 
                            className="p-1 text-gray-500 hover:text-dalali-600"
                            onClick={() => handleEditListing(listing.id)}
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            className="p-1 text-gray-500 hover:text-dalali-600"
                            onClick={() => handleShareListing(listing.id)}
                          >
                            <Share2 size={14} />
                          </button>
                          <button 
                            className="p-1 text-gray-500 hover:text-red-600"
                            onClick={() => handleDeleteListing(listing.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key={listing.id}
                      className="bg-white rounded-xl overflow-hidden shadow-sm flex"
                      variants={itemVariants}
                    >
                      <div className="w-24 h-24 flex-shrink-0">
                        <img 
                          src={listing.image} 
                          alt={listing.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="p-3 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                          <span className={`chip text-xs ${
                            listing.status === 'active' ? 'bg-green-100 text-green-700' : 
                            listing.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                          </span>
                        </div>
                        
                        <p className="text-dalali-600 font-semibold">
                          KSh {listing.price.toLocaleString()}
                        </p>
                        <p className="text-gray-500 text-xs">{listing.location}</p>
                        
                        <div className="flex justify-end mt-1 space-x-1">
                          <button 
                            className="p-1 text-gray-500 hover:text-dalali-600"
                            onClick={() => handleEditListing(listing.id)}
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            className="p-1 text-gray-500 hover:text-dalali-600"
                            onClick={() => handleShareListing(listing.id)}
                          >
                            <Share2 size={14} />
                          </button>
                          <button 
                            className="p-1 text-gray-500 hover:text-red-600"
                            onClick={() => handleDeleteListing(listing.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </main>
      
      <BottomTabs />
    </div>
  );
};

export default BrokerDashboard;
