
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NavigationBar from '../components/ui/NavigationBar';
import BottomTabs from '../components/ui/BottomTabs';
import BrokerSearchInput from '@/components/find-broker/BrokerSearchInput';
import FilterBar from '@/components/find-broker/FilterBar';
import BrokerList from '@/components/find-broker/BrokerList';
import { useBrokerFilters } from '@/components/find-broker/useBrokerFilters';
import { brokers } from '@/components/find-broker/brokerData';

const FindBroker = () => {
  const [searchParams] = useSearchParams();
  const showMap = searchParams.get('map') === 'true';
  
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
