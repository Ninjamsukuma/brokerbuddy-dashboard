
import React from 'react';
import { MapPin } from 'lucide-react';
import FilterButton from './FilterButton';

export type DistanceFilter = 'all' | 'nearby' | '5km' | '10km' | '25km';

interface DistanceFilterProps {
  selectedDistance: DistanceFilter;
  showDistanceFilter: boolean;
  toggleDistanceFilter: () => void;
  handleDistanceSelect: (distance: DistanceFilter) => void;
}

const DistanceFilterComponent: React.FC<DistanceFilterProps> = ({
  selectedDistance,
  showDistanceFilter,
  toggleDistanceFilter,
  handleDistanceSelect
}) => {
  return (
    <FilterButton
      isActive={selectedDistance !== 'all'}
      label="Distance"
      icon={MapPin}
      isOpen={showDistanceFilter}
      onToggle={toggleDistanceFilter}
    >
      <div className="w-36">
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
    </FilterButton>
  );
};

export default DistanceFilterComponent;
