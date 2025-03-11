
import { useState } from 'react';
import { ServiceType } from './ServiceFilter';
import { RatingFilter } from './RatingFilter';
import { PriceFilter } from './PriceFilter';
import { DistanceFilter } from './DistanceFilter';
import { BrokerProps } from '../shared/BrokerCard';

export const useBrokerFilters = (brokers: BrokerProps[]) => {
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

  return {
    // State
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
    
    // Filtered data
    filteredBrokers
  };
};
