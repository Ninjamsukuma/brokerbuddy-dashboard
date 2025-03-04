
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, MapPin, ChevronDown } from 'lucide-react';
import NavigationBar from '../components/ui/NavigationBar';
import BrokerCard, { BrokerProps } from '../components/shared/BrokerCard';
import BottomTabs from '../components/ui/BottomTabs';

// Mock broker data
const brokers: BrokerProps[] = [
  {
    id: '1',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.9,
    reviewCount: 124,
    distance: '1.2 km',
    specialties: ['Real Estate', 'Apartments'],
    verified: true,
    online: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.7,
    reviewCount: 89,
    distance: '3.5 km',
    specialties: ['Car Sales', 'Financing'],
    verified: true,
    online: true
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.5,
    reviewCount: 67,
    distance: '2.8 km',
    specialties: ['Land', 'Commercial'],
    verified: false,
    online: false
  },
  {
    id: '4',
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.8,
    reviewCount: 102,
    distance: '5.1 km',
    specialties: ['Residential', 'Rentals'],
    verified: true,
    online: false
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.6,
    reviewCount: 75,
    distance: '4.3 km',
    specialties: ['Car Sales', 'SUVs'],
    verified: true,
    online: true
  }
];

const FindBroker = () => {
  const [searchParams] = useSearchParams();
  const showMap = searchParams.get('map') === 'true';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrokers = brokers.filter(broker => 
    broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    broker.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="Find a Broker" showSearch={false} />
      
      <main className="px-4 pb-4">
        <div className="pt-4 pb-2 sticky top-[61px] z-30 bg-background">
          {/* Search input */}
          <div className="relative mb-3 animate-fade-in">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search brokers or services..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dalali-500/50 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filter options */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none animate-slide-up">
            <button className="chip bg-dalali-600 text-white">
              <Filter size={14} className="mr-1" />
              Filter
            </button>
            <button className="chip bg-gray-100 text-gray-700 flex items-center">
              Service
              <ChevronDown size={14} className="ml-1" />
            </button>
            <button className="chip bg-gray-100 text-gray-700 flex items-center">
              Rating
              <ChevronDown size={14} className="ml-1" />
            </button>
            <button className="chip bg-gray-100 text-gray-700 flex items-center">
              Price
              <ChevronDown size={14} className="ml-1" />
            </button>
            <button className="chip bg-gray-100 text-gray-700 flex items-center">
              <MapPin size={14} className="mr-1" />
              Distance
            </button>
            <button className="chip bg-gray-100 text-gray-700 flex items-center">
              Verified
            </button>
          </div>
        </div>
        
        {/* Brokers list */}
        <div className="mt-3 space-y-4">
          {filteredBrokers.length > 0 ? (
            filteredBrokers.map(broker => (
              <BrokerCard key={broker.id} broker={broker} />
            ))
          ) : (
            <div className="text-center py-10">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                <Search size={30} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No results found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
      
      <BottomTabs />
    </div>
  );
};

export default FindBroker;
