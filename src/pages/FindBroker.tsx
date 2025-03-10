
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, MapPin, ChevronDown, Car, Home, Building, Key, Shield, Shirt, Umbrella, Star, DollarSign } from 'lucide-react';
import NavigationBar from '../components/ui/NavigationBar';
import BrokerCard, { BrokerProps } from '../components/shared/BrokerCard';
import BottomTabs from '../components/ui/BottomTabs';
import { toast } from "@/components/ui/use-toast";

// Service types
type ServiceType = 'all' | 'car-sales' | 'real-estate' | 'apartments' | 'rental' | 'residential' | 'insurance' | 'clothing' | 'cosmetics';

// Rating filter options
type RatingFilter = 'all' | '4+' | '4.5+' | '3+';

// Price filter options
type PriceFilter = 'all' | 'low' | 'medium' | 'high';

// Distance filter options
type DistanceFilter = 'all' | 'nearby' | '5km' | '10km' | '25km';

// Mock broker data with extended properties
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
    online: true,
    priceLevel: 'high'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.7,
    reviewCount: 89,
    distance: '3.5 km',
    specialties: ['Car Sales', 'Insurance'],
    verified: true,
    online: true,
    priceLevel: 'medium'
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.5,
    reviewCount: 67,
    distance: '2.8 km',
    specialties: ['Rental', 'Residential'],
    verified: false,
    online: false,
    priceLevel: 'low'
  },
  {
    id: '4',
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.8,
    reviewCount: 102,
    distance: '5.1 km',
    specialties: ['Clothing', 'Cosmetics'],
    verified: true,
    online: false,
    priceLevel: 'medium'
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.6,
    reviewCount: 75,
    distance: '4.3 km',
    specialties: ['Car Sales', 'Insurance'],
    verified: true,
    online: true,
    priceLevel: 'high'
  }
];

const FindBroker = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const showMap = searchParams.get('map') === 'true';
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtering states
  const [selectedService, setSelectedService] = useState<ServiceType>('all');
  const [selectedRating, setSelectedRating] = useState<RatingFilter>('all');
  const [selectedPrice, setSelectedPrice] = useState<PriceFilter>('all');
  const [selectedDistance, setSelectedDistance] = useState<DistanceFilter>('all');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  
  // Filter dialog states
  const [showServiceFilter, setShowServiceFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showDistanceFilter, setShowDistanceFilter] = useState(false);

  // Filter the brokers based on all criteria
  const filteredBrokers = brokers.filter(broker => {
    // Search filter
    const matchesSearch = 
      searchQuery === '' || 
      broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      broker.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    // Service filter
    const matchesService = 
      selectedService === 'all' || 
      broker.specialties.some(specialty => {
        if (selectedService === 'car-sales') return specialty.toLowerCase().includes('car');
        if (selectedService === 'real-estate') return specialty.toLowerCase().includes('real estate');
        if (selectedService === 'apartments') return specialty.toLowerCase().includes('apartment');
        if (selectedService === 'rental') return specialty.toLowerCase().includes('rental');
        if (selectedService === 'residential') return specialty.toLowerCase().includes('residential');
        if (selectedService === 'insurance') return specialty.toLowerCase().includes('insurance');
        if (selectedService === 'clothing') return specialty.toLowerCase().includes('clothing');
        if (selectedService === 'cosmetics') return specialty.toLowerCase().includes('cosmetic');
        return false;
      });
    
    // Rating filter
    const matchesRating = 
      selectedRating === 'all' || 
      (selectedRating === '4+' && broker.rating >= 4.0) ||
      (selectedRating === '4.5+' && broker.rating >= 4.5) ||
      (selectedRating === '3+' && broker.rating >= 3.0);
    
    // Price filter
    const matchesPrice = 
      selectedPrice === 'all' || 
      (selectedPrice === broker.priceLevel);
    
    // Distance filter - simplified for demo
    const matchesDistance = 
      selectedDistance === 'all' || 
      (selectedDistance === 'nearby' && parseFloat(broker.distance) <= 2) ||
      (selectedDistance === '5km' && parseFloat(broker.distance) <= 5) ||
      (selectedDistance === '10km' && parseFloat(broker.distance) <= 10) ||
      (selectedDistance === '25km' && parseFloat(broker.distance) <= 25);
    
    // Verified filter
    const matchesVerified = !showVerifiedOnly || broker.verified;
    
    return matchesSearch && matchesService && matchesRating && matchesPrice && matchesDistance && matchesVerified;
  });

  // Service button list with icons
  const serviceButtons = [
    { id: 'car-sales', label: 'Car Sales', icon: Car },
    { id: 'real-estate', label: 'Real Estate', icon: Home },
    { id: 'apartments', label: 'Apartments', icon: Building },
    { id: 'rental', label: 'Rental', icon: Key },
    { id: 'residential', label: 'Residential', icon: Home },
    { id: 'insurance', label: 'Insurance', icon: Shield },
    { id: 'clothing', label: 'Clothing', icon: Shirt },
    { id: 'cosmetics', label: 'Cosmetics', icon: Umbrella }
  ];

  // Handler functions
  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
    setShowServiceFilter(false);
    toast({
      title: "Service filter applied",
      description: `Showing brokers for: ${service === 'all' ? 'All Services' : service}`,
      duration: 3000,
    });
  };

  const handleRatingSelect = (rating: RatingFilter) => {
    setSelectedRating(rating);
    setShowRatingFilter(false);
    toast({
      title: "Rating filter applied",
      description: `Showing brokers with ${rating === 'all' ? 'any rating' : rating + ' stars'}`,
      duration: 3000,
    });
  };

  const handlePriceSelect = (price: PriceFilter) => {
    setSelectedPrice(price);
    setShowPriceFilter(false);
    toast({
      title: "Price filter applied",
      description: `Showing brokers with ${price === 'all' ? 'any price level' : price + ' prices'}`,
      duration: 3000,
    });
  };

  const handleDistanceSelect = (distance: DistanceFilter) => {
    setSelectedDistance(distance);
    setShowDistanceFilter(false);
    toast({
      title: "Distance filter applied",
      description: `Showing brokers ${distance === 'all' ? 'at any distance' : 'within ' + distance}`,
      duration: 3000,
    });
  };

  const toggleVerifiedOnly = () => {
    setShowVerifiedOnly(!showVerifiedOnly);
    toast({
      title: showVerifiedOnly ? "Showing all brokers" : "Showing verified only",
      duration: 3000,
    });
  };

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
            <button 
              className="chip bg-dalali-600 text-white"
              onClick={() => {
                // Reset all filters
                setSelectedService('all');
                setSelectedRating('all');
                setSelectedPrice('all');
                setSelectedDistance('all');
                setShowVerifiedOnly(false);
                toast({
                  title: "Filters reset",
                  description: "Showing all brokers",
                  duration: 3000,
                });
              }}
            >
              <Filter size={14} className="mr-1" />
              Filter
            </button>

            {/* Service Filter */}
            <div className="relative">
              <button 
                className={`chip ${selectedService !== 'all' ? 'bg-dalali-100 text-dalali-700' : 'bg-gray-100 text-gray-700'} flex items-center`}
                onClick={() => setShowServiceFilter(!showServiceFilter)}
              >
                Service
                <ChevronDown size={14} className="ml-1" />
              </button>
              
              {showServiceFilter && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-50 py-1 border border-gray-100">
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedService === 'all' ? 'bg-gray-100' : ''}`}
                    onClick={() => handleServiceSelect('all')}
                  >
                    All Services
                  </button>
                  
                  {serviceButtons.map((service) => (
                    <button
                      key={service.id}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center ${selectedService === service.id ? 'bg-gray-100' : ''}`}
                      onClick={() => handleServiceSelect(service.id as ServiceType)}
                    >
                      <service.icon size={14} className="mr-2" />
                      {service.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Rating Filter */}
            <div className="relative">
              <button 
                className={`chip ${selectedRating !== 'all' ? 'bg-dalali-100 text-dalali-700' : 'bg-gray-100 text-gray-700'} flex items-center`}
                onClick={() => setShowRatingFilter(!showRatingFilter)}
              >
                <Star size={14} className="mr-1" />
                Rating
                <ChevronDown size={14} className="ml-1" />
              </button>
              
              {showRatingFilter && (
                <div className="absolute top-full left-0 mt-1 w-36 bg-white rounded-lg shadow-lg z-50 py-1 border border-gray-100">
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedRating === 'all' ? 'bg-gray-100' : ''}`}
                    onClick={() => handleRatingSelect('all')}
                  >
                    Any Rating
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedRating === '4.5+' ? 'bg-gray-100' : ''}`}
                    onClick={() => handleRatingSelect('4.5+')}
                  >
                    4.5+ Stars
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedRating === '4+' ? 'bg-gray-100' : ''}`}
                    onClick={() => handleRatingSelect('4+')}
                  >
                    4+ Stars
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedRating === '3+' ? 'bg-gray-100' : ''}`}
                    onClick={() => handleRatingSelect('3+')}
                  >
                    3+ Stars
                  </button>
                </div>
              )}
            </div>
            
            {/* Price Filter */}
            <div className="relative">
              <button 
                className={`chip ${selectedPrice !== 'all' ? 'bg-dalali-100 text-dalali-700' : 'bg-gray-100 text-gray-700'} flex items-center`}
                onClick={() => setShowPriceFilter(!showPriceFilter)}
              >
                <DollarSign size={14} className="mr-1" />
                Price
                <ChevronDown size={14} className="ml-1" />
              </button>
              
              {showPriceFilter && (
                <div className="absolute top-full left-0 mt-1 w-36 bg-white rounded-lg shadow-lg z-50 py-1 border border-gray-100">
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedPrice === 'all' ? 'bg-gray-100' : ''}`}
                    onClick={() => handlePriceSelect('all')}
                  >
                    Any Price
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedPrice === 'low' ? 'bg-gray-100' : ''}`}
                    onClick={() => handlePriceSelect('low')}
                  >
                    Budget
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedPrice === 'medium' ? 'bg-gray-100' : ''}`}
                    onClick={() => handlePriceSelect('medium')}
                  >
                    Mid-range
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedPrice === 'high' ? 'bg-gray-100' : ''}`}
                    onClick={() => handlePriceSelect('high')}
                  >
                    Premium
                  </button>
                </div>
              )}
            </div>
            
            {/* Distance Filter */}
            <div className="relative">
              <button 
                className={`chip ${selectedDistance !== 'all' ? 'bg-dalali-100 text-dalali-700' : 'bg-gray-100 text-gray-700'} flex items-center`}
                onClick={() => setShowDistanceFilter(!showDistanceFilter)}
              >
                <MapPin size={14} className="mr-1" />
                Distance
                <ChevronDown size={14} className="ml-1" />
              </button>
              
              {showDistanceFilter && (
                <div className="absolute top-full left-0 mt-1 w-36 bg-white rounded-lg shadow-lg z-50 py-1 border border-gray-100">
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedDistance === 'all' ? 'bg-gray-100' : ''}`}
                    onClick={() => handleDistanceSelect('all')}
                  >
                    Any Distance
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedDistance === 'nearby' ? 'bg-gray-100' : ''}`}
                    onClick={() => handleDistanceSelect('nearby')}
                  >
                    Nearby (2km)
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedDistance === '5km' ? 'bg-gray-100' : ''}`}
                    onClick={() => handleDistanceSelect('5km')}
                  >
                    Within 5km
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedDistance === '10km' ? 'bg-gray-100' : ''}`}
                    onClick={() => handleDistanceSelect('10km')}
                  >
                    Within 10km
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedDistance === '25km' ? 'bg-gray-100' : ''}`}
                    onClick={() => handleDistanceSelect('25km')}
                  >
                    Within 25km
                  </button>
                </div>
              )}
            </div>
            
            {/* Verified Toggle */}
            <button 
              className={`chip ${showVerifiedOnly ? 'bg-dalali-100 text-dalali-700' : 'bg-gray-100 text-gray-700'} flex items-center`}
              onClick={toggleVerifiedOnly}
            >
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
