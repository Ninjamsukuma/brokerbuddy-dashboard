import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavigationBar from '../components/ui/NavigationBar';
import BottomTabs from '../components/ui/BottomTabs';
import BrokerSearchInput from '@/components/find-broker/BrokerSearchInput';
import FilterBar from '@/components/find-broker/FilterBar';
import BrokerList from '@/components/find-broker/BrokerList';
import { useBrokerFilters } from '@/components/find-broker/useBrokerFilters';
import { useBrokerServices } from '@/hooks/useBrokerServices';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { toast } from '@/components/ui/use-toast';

const FindBroker = () => {
  const [searchParams] = useSearchParams();
  const showMap = searchParams.get('map') === 'true';
  
  // Get filters from URL
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  
  // Fetch brokers from Supabase
  const { brokers, loading, error } = useBrokerServices({
    category: category || undefined,
    location: location || undefined,
  });
  
  const {
    searchQuery,
    setSearchQuery,
    selectedService,
    setSelectedService,
    selectedRating,
    setSelectedRating,
    selectedPrice,
    setSelectedPrice,
    selectedDistance,
    setSelectedDistance,
    showVerifiedOnly,
    setShowVerifiedOnly,
    showServiceFilter,
    setShowServiceFilter,
    showRatingFilter,
    setShowRatingFilter,
    showPriceFilter,
    setShowPriceFilter,
    showDistanceFilter,
    setShowDistanceFilter,
    filteredBrokers
  } = useBrokerFilters(brokers);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading brokers",
        description: error,
        variant: "destructive",
      });
    }
  }, [error]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="Find a Broker" showSearch={false} />
      
      <main className="px-4 pb-4">
        <div className="pt-4 pb-2 sticky top-[61px] z-30 bg-background">
          {/* Search input */}
          <BrokerSearchInput 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          {/* Filter options */}
          <FilterBar 
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedDistance={selectedDistance}
            setSelectedDistance={setSelectedDistance}
            showVerifiedOnly={showVerifiedOnly}
            setShowVerifiedOnly={setShowVerifiedOnly}
            showServiceFilter={showServiceFilter}
            setShowServiceFilter={setShowServiceFilter}
            showRatingFilter={showRatingFilter}
            setShowRatingFilter={setShowRatingFilter}
            showPriceFilter={showPriceFilter}
            setShowPriceFilter={setShowPriceFilter}
            showDistanceFilter={showDistanceFilter}
            setShowDistanceFilter={setShowDistanceFilter}
          />
        </div>
        
        {/* Brokers list */}
        <BrokerList brokers={filteredBrokers} />
      </main>
      
      <BottomTabs />
    </div>
  );
};

export default FindBroker;