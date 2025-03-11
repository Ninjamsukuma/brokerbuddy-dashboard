
import React, { useState } from 'react';
import { Filter, Star, DollarSign, MapPin, CheckCircle, X } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { ServiceType } from './ServiceFilter';
import { RatingFilter } from './RatingFilter';
import { PriceFilter } from './PriceFilter';
import { DistanceFilter } from './DistanceFilter';
import VerifiedFilter from './VerifiedFilter';
import { motion, AnimatePresence } from 'framer-motion';

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
  // Modal states for filter options
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Function to close all filter modals
  const closeAllFilters = () => {
    setActiveFilter(null);
  };

  // Handler for toggling a filter modal
  const toggleFilterModal = (filterName: string) => {
    if (activeFilter === filterName) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterName);
    }
  };

  // Handler functions
  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
    closeAllFilters();
    toast({
      title: "Service filter applied",
      description: `Showing brokers for: ${service === 'all' ? 'All Services' : service}`,
      duration: 3000,
    });
  };

  const handleRatingSelect = (rating: RatingFilter) => {
    setSelectedRating(rating);
    closeAllFilters();
    toast({
      title: "Rating filter applied",
      description: `Showing brokers with ${rating === 'all' ? 'any rating' : rating + ' stars'}`,
      duration: 3000,
    });
  };

  const handlePriceSelect = (price: PriceFilter) => {
    setSelectedPrice(price);
    closeAllFilters();
    toast({
      title: "Price filter applied",
      description: `Showing brokers with ${price === 'all' ? 'any price level' : price + ' prices'}`,
      duration: 3000,
    });
  };

  const handleDistanceSelect = (distance: DistanceFilter) => {
    setSelectedDistance(distance);
    closeAllFilters();
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

  const resetFilters = () => {
    setSelectedService('all');
    setSelectedRating('all');
    setSelectedPrice('all');
    setSelectedDistance('all');
    setShowVerifiedOnly(false);
    closeAllFilters();
    toast({
      title: "Filters reset",
      description: "Showing all brokers",
      duration: 3000,
    });
  };

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.15 } 
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none animate-slide-up">
        <button 
          className="chip bg-dalali-600 text-white hover:bg-dalali-700 transition-colors duration-200"
          onClick={resetFilters}
        >
          <Filter size={14} className="mr-1" />
          Filter
        </button>

        {/* Service Filter Button */}
        <button 
          className={`chip ${selectedService !== 'all' ? 'bg-dalali-100 text-dalali-700' : 'bg-gray-100 text-gray-700'} hover:bg-dalali-50 transition-colors duration-200`}
          onClick={() => toggleFilterModal('service')}
        >
          Service
          {selectedService !== 'all' && <span className="ml-1 font-semibold">•</span>}
        </button>
        
        {/* Rating Filter Button */}
        <button 
          className={`chip flex items-center ${selectedRating !== 'all' ? 'bg-dalali-100 text-dalali-700' : 'bg-gray-100 text-gray-700'} hover:bg-dalali-50 transition-colors duration-200`}
          onClick={() => toggleFilterModal('rating')}
        >
          <Star size={14} className="mr-1" />
          Rating
          {selectedRating !== 'all' && <span className="ml-1 font-semibold">•</span>}
        </button>
        
        {/* Price Filter Button */}
        <button 
          className={`chip flex items-center ${selectedPrice !== 'all' ? 'bg-dalali-100 text-dalali-700' : 'bg-gray-100 text-gray-700'} hover:bg-dalali-50 transition-colors duration-200`}
          onClick={() => toggleFilterModal('price')}
        >
          <DollarSign size={14} className="mr-1" />
          Price
          {selectedPrice !== 'all' && <span className="ml-1 font-semibold">•</span>}
        </button>
        
        {/* Distance Filter Button */}
        <button 
          className={`chip flex items-center ${selectedDistance !== 'all' ? 'bg-dalali-100 text-dalali-700' : 'bg-gray-100 text-gray-700'} hover:bg-dalali-50 transition-colors duration-200`}
          onClick={() => toggleFilterModal('distance')}
        >
          <MapPin size={14} className="mr-1" />
          Distance
          {selectedDistance !== 'all' && <span className="ml-1 font-semibold">•</span>}
        </button>
        
        {/* Verified Filter Button */}
        <VerifiedFilter 
          showVerifiedOnly={showVerifiedOnly}
          toggleVerifiedOnly={toggleVerifiedOnly}
        />
      </div>

      {/* Filter Modal Overlays */}
      <AnimatePresence>
        {activeFilter && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-25" onClick={closeAllFilters}>
            <motion.div 
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 pb-8 z-50"
              onClick={e => e.stopPropagation()}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {activeFilter === 'service' && 'Select Service'}
                  {activeFilter === 'rating' && 'Select Rating'}
                  {activeFilter === 'price' && 'Select Price'}
                  {activeFilter === 'distance' && 'Select Distance'}
                </h3>
                <button onClick={closeAllFilters} className="p-1 rounded-full hover:bg-gray-100">
                  <X size={20} />
                </button>
              </div>

              {/* Service Options */}
              {activeFilter === 'service' && (
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className={`filter-button ${selectedService === 'all' ? 'active' : ''}`}
                    onClick={() => handleServiceSelect('all')}
                  >
                    All Services
                  </button>
                  <button 
                    className={`filter-button ${selectedService === 'car-sales' ? 'active' : ''}`}
                    onClick={() => handleServiceSelect('car-sales')}
                  >
                    Car Sales
                  </button>
                  <button 
                    className={`filter-button ${selectedService === 'real-estate' ? 'active' : ''}`}
                    onClick={() => handleServiceSelect('real-estate')}
                  >
                    Real Estate
                  </button>
                  <button 
                    className={`filter-button ${selectedService === 'apartments' ? 'active' : ''}`}
                    onClick={() => handleServiceSelect('apartments')}
                  >
                    Apartments
                  </button>
                  <button 
                    className={`filter-button ${selectedService === 'rental' ? 'active' : ''}`}
                    onClick={() => handleServiceSelect('rental')}
                  >
                    Rental
                  </button>
                  <button 
                    className={`filter-button ${selectedService === 'residential' ? 'active' : ''}`}
                    onClick={() => handleServiceSelect('residential')}
                  >
                    Residential
                  </button>
                  <button 
                    className={`filter-button ${selectedService === 'insurance' ? 'active' : ''}`}
                    onClick={() => handleServiceSelect('insurance')}
                  >
                    Insurance
                  </button>
                  <button 
                    className={`filter-button ${selectedService === 'clothing' ? 'active' : ''}`}
                    onClick={() => handleServiceSelect('clothing')}
                  >
                    Clothing
                  </button>
                  <button 
                    className={`filter-button ${selectedService === 'cosmetics' ? 'active' : ''}`}
                    onClick={() => handleServiceSelect('cosmetics')}
                  >
                    Cosmetics
                  </button>
                </div>
              )}

              {/* Rating Options */}
              {activeFilter === 'rating' && (
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className={`filter-button ${selectedRating === 'all' ? 'active' : ''}`}
                    onClick={() => handleRatingSelect('all')}
                  >
                    Any Rating
                  </button>
                  <button 
                    className={`filter-button ${selectedRating === '4.5+' ? 'active' : ''}`}
                    onClick={() => handleRatingSelect('4.5+')}
                  >
                    4.5+ Stars
                  </button>
                  <button 
                    className={`filter-button ${selectedRating === '4+' ? 'active' : ''}`}
                    onClick={() => handleRatingSelect('4+')}
                  >
                    4+ Stars
                  </button>
                  <button 
                    className={`filter-button ${selectedRating === '3+' ? 'active' : ''}`}
                    onClick={() => handleRatingSelect('3+')}
                  >
                    3+ Stars
                  </button>
                </div>
              )}

              {/* Price Options */}
              {activeFilter === 'price' && (
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className={`filter-button ${selectedPrice === 'all' ? 'active' : ''}`}
                    onClick={() => handlePriceSelect('all')}
                  >
                    Any Price
                  </button>
                  <button 
                    className={`filter-button ${selectedPrice === 'low' ? 'active' : ''}`}
                    onClick={() => handlePriceSelect('low')}
                  >
                    Budget
                  </button>
                  <button 
                    className={`filter-button ${selectedPrice === 'medium' ? 'active' : ''}`}
                    onClick={() => handlePriceSelect('medium')}
                  >
                    Mid-range
                  </button>
                  <button 
                    className={`filter-button ${selectedPrice === 'high' ? 'active' : ''}`}
                    onClick={() => handlePriceSelect('high')}
                  >
                    Premium
                  </button>
                </div>
              )}

              {/* Distance Options */}
              {activeFilter === 'distance' && (
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className={`filter-button ${selectedDistance === 'all' ? 'active' : ''}`}
                    onClick={() => handleDistanceSelect('all')}
                  >
                    Any Distance
                  </button>
                  <button 
                    className={`filter-button ${selectedDistance === 'nearby' ? 'active' : ''}`}
                    onClick={() => handleDistanceSelect('nearby')}
                  >
                    Nearby (2km)
                  </button>
                  <button 
                    className={`filter-button ${selectedDistance === '5km' ? 'active' : ''}`}
                    onClick={() => handleDistanceSelect('5km')}
                  >
                    Within 5km
                  </button>
                  <button 
                    className={`filter-button ${selectedDistance === '10km' ? 'active' : ''}`}
                    onClick={() => handleDistanceSelect('10km')}
                  >
                    Within 10km
                  </button>
                  <button 
                    className={`filter-button ${selectedDistance === '25km' ? 'active' : ''}`}
                    onClick={() => handleDistanceSelect('25km')}
                  >
                    Within 25km
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add styling for filter buttons */}
      <style>
        {`
        .filter-button {
          padding: 0.75rem;
          border-radius: 0.5rem;
          text-align: center;
          background-color: #f3f4f6;
          transition: all 0.2s;
        }
        
        .filter-button:hover {
          background-color: #e5e7eb;
        }
        
        .filter-button.active {
          background-color: #f0f7ff;
          color: #2563eb;
          font-weight: 500;
          border: 1px solid #bfdbfe;
        }
        `}
      </style>
    </>
  );
};

export default FilterBar;

