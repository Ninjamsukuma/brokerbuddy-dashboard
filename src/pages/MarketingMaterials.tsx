
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/ui/NavigationBar';
import BottomTabs from '@/components/ui/BottomTabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import MarketingGenerator from '@/components/broker-dashboard/MarketingGenerator';
import { mockListings } from '@/data/mockListings';
import { PropertyListing } from '@/components/broker-dashboard/types';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { 
  Image as ImageIcon, 
  BarChart, 
  ListFilter, 
  PlusCircle,
  Share2
} from 'lucide-react';

const MarketingMaterials = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('create');
  
  // Convert mock listings to PropertyListing format
  const propertyListings: PropertyListing[] = mockListings.map(listing => ({
    id: listing.id,
    title: listing.title,
    type: listing.type,
    location: listing.location,
    price: listing.price,
    bedrooms: Math.floor(Math.random() * 5) + 1,
    bathrooms: Math.floor(Math.random() * 3) + 1,
    area: Math.floor(Math.random() * 200) + 50,
    features: ['Parking', 'Garden', 'Security'],
    description: `Beautiful ${listing.type} located in ${listing.location}. This property features modern amenities and is priced to sell quickly.`,
    images: [listing.image, listing.image, listing.image], // Using the same image 3 times for mock
    contactName: user?.name || 'John Doe',
    contactPhone: user?.phone || '+254 712 345 678',
    contactEmail: user?.email || 'john@example.com',
    createdAt: listing.createdAt,
  }));
  
  // Selected property (using the first one for demo)
  const selectedProperty = propertyListings[0];
  
  // Check if user is a broker
  React.useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the marketing materials",
        duration: 3000,
      });
      navigate('/login');
    } else if (user.role !== 'broker') {
      toast({
        title: "Broker Access Only",
        description: "This feature is only available to brokers",
        duration: 3000,
      });
      navigate('/become-broker');
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="Marketing Materials" />
      
      <main className="px-4 pb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="create" className="flex flex-col items-center py-2">
              <PlusCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">Create</span>
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex flex-col items-center py-2">
              <Share2 className="h-5 w-5 mb-1" />
              <span className="text-xs">Materials</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex flex-col items-center py-2">
              <BarChart className="h-5 w-5 mb-1" />
              <span className="text-xs">Analytics</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4">
            <MarketingGenerator listing={selectedProperty} />
          </TabsContent>
          
          <TabsContent value="materials" className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Your Marketing Materials</h2>
              
              {/* This would show a list of previously generated materials */}
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                  <ImageIcon size={24} className="text-gray-400" />
                </div>
                <h3 className="text-base font-medium text-gray-700 mb-1">No materials yet</h3>
                <p className="text-gray-500 text-sm">Generate your first marketing material to see it here</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Marketing Analytics</h2>
              
              {/* This would show analytics for the marketing materials */}
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                  <BarChart size={24} className="text-gray-400" />
                </div>
                <h3 className="text-base font-medium text-gray-700 mb-1">No analytics yet</h3>
                <p className="text-gray-500 text-sm">Share your marketing materials to start tracking engagement</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomTabs />
    </div>
  );
};

export default MarketingMaterials;
