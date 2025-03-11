
import React from 'react';
import { Filter } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import ServiceFilter, { ServiceType } from './ServiceFilter';
import RatingFilterComponent, { RatingFilter } from './RatingFilter';
import PriceFilterComponent, { PriceFilter } from './PriceFilter';
import DistanceFilterComponent, { DistanceFilter } from './DistanceFilter';
import VerifiedFilter from './VerifiedFilter';

interface FilterBarProps {
  selectedService: ServiceType;
  setSelectedService: (service: ServiceType) => void;
  selectedRating: RatingFilter;
  setSelectedRating: (rating: RatingFilter) => void;
  selectedPrice: PriceFilter;
  setSelectedPrice: (price: PriceFilter) => void;
  selectedDistance: DistanceFilter;
  setSelectedDistance: (distance: DistanceFilter) => void;
  showVerifiedOnly: boolean;
  setShowVerifiedOnly: (value: boolean) => void;
  showServiceFilter: boolean;
  setShowServiceFilter: (show: boolean) => void;
  showRatingFilter: boolean;
  setShowRatingFilter: (show: boolean) => void;
  showPriceFilter: boolean;
  setShowPriceFilter: (show: boolean) => void;
  showDistanceFilter: boolean;
  setShowDistanceFilter: (show: boolean) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
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
  setShowDistanceFilter
}) => {
  // Function to close all filter dropdowns
  const closeAllDropdowns = (except?: string) => {
    if (except !== 'service') setShowServiceFilter(false);
    if (except !== 'rating') setShowRatingFilter(false);
    if (except !== 'price') setShowPriceFilter(false);
    if (except !== 'distance') setShowDistanceFilter(false);
  };

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

  const toggleServiceFilter = () => {
    setShowServiceFilter(!showServiceFilter);
    closeAllDropdowns('service');
  };

  const toggleRatingFilter = () => {
    setShowRatingFilter(!showRatingFilter);
    closeAllDropdowns('rating');
  };

  const togglePriceFilter = () => {
    setShowPriceFilter(!showPriceFilter);
    closeAllDropdowns('price');
  };

  const toggleDistanceFilter = () => {
    setShowDistanceFilter(!showDistanceFilter);
    closeAllDropdowns('distance');
  };

  const resetFilters = () => {
    setSelectedService('all');
    setSelectedRating('all');
    setSelectedPrice('all');
    setSelectedDistance('all');
    setShowVerifiedOnly(false);
    closeAllDropdowns();
    toast({
      title: "Filters reset",
      description: "Showing all brokers",
      duration: 3000,
    });
  };

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none animate-slide-up">
      <button 
        className="chip bg-dalali-600 text-white hover:bg-dalali-700 transition-colors duration-200"
        onClick={resetFilters}
      >
        <Filter size={14} className="mr-1" />
        Filter
      </button>

      <ServiceFilter 
        selectedService={selectedService}
        showServiceFilter={showServiceFilter}
        toggleServiceFilter={toggleServiceFilter}
        handleServiceSelect={handleServiceSelect}
      />
      
      <RatingFilterComponent 
        selectedRating={selectedRating}
        showRatingFilter={showRatingFilter}
        toggleRatingFilter={toggleRatingFilter}
        handleRatingSelect={handleRatingSelect}
      />
      
      <PriceFilterComponent 
        selectedPrice={selectedPrice}
        showPriceFilter={showPriceFilter}
        togglePriceFilter={togglePriceFilter}
        handlePriceSelect={handlePriceSelect}
      />
      
      <DistanceFilterComponent 
        selectedDistance={selectedDistance}
        showDistanceFilter={showDistanceFilter}
        toggleDistanceFilter={toggleDistanceFilter}
        handleDistanceSelect={handleDistanceSelect}
      />
      
      <VerifiedFilter 
        showVerifiedOnly={showVerifiedOnly}
        toggleVerifiedOnly={toggleVerifiedOnly}
      />
    </div>
  );
};

export default FilterBar;
