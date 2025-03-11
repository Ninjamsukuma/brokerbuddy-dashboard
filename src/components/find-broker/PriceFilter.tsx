
import React from 'react';
import { DollarSign } from 'lucide-react';
import FilterButton from './FilterButton';

export type PriceFilter = 'all' | 'low' | 'medium' | 'high';

interface PriceFilterProps {
  selectedPrice: PriceFilter;
  showPriceFilter: boolean;
  togglePriceFilter: () => void;
  handlePriceSelect: (price: PriceFilter) => void;
}

const PriceFilterComponent: React.FC<PriceFilterProps> = ({
  selectedPrice,
  showPriceFilter,
  togglePriceFilter,
  handlePriceSelect
}) => {
  return (
    <FilterButton
      isActive={selectedPrice !== 'all'}
      label="Price"
      icon={DollarSign}
      isOpen={showPriceFilter}
      onToggle={togglePriceFilter}
    >
      <div className="w-36">
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
    </FilterButton>
  );
};

export default PriceFilterComponent;
