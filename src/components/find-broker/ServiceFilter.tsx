
import React from 'react';
import { Car, Home, Building, Key, Shield, Shirt, Umbrella } from 'lucide-react';
import FilterButton from './FilterButton';

export type ServiceType = 'all' | 'car-sales' | 'real-estate' | 'apartments' | 'rental' | 'residential' | 'insurance' | 'clothing' | 'cosmetics';

interface ServiceFilterProps {
  selectedService: ServiceType;
  showServiceFilter: boolean;
  toggleServiceFilter: () => void;
  handleServiceSelect: (service: ServiceType) => void;
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({
  selectedService,
  showServiceFilter,
  toggleServiceFilter,
  handleServiceSelect
}) => {
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

  return (
    <FilterButton
      isActive={selectedService !== 'all'}
      label="Service"
      isOpen={showServiceFilter}
      onToggle={toggleServiceFilter}
    >
      <div className="w-48">
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
    </FilterButton>
  );
};

export default ServiceFilter;
