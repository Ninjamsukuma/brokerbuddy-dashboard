
import React from 'react';
import { Star } from 'lucide-react';
import FilterButton from './FilterButton';

export type RatingFilter = 'all' | '4+' | '4.5+' | '3+';

interface RatingFilterProps {
  selectedRating: RatingFilter;
  showRatingFilter: boolean;
  toggleRatingFilter: () => void;
  handleRatingSelect: (rating: RatingFilter) => void;
}

const RatingFilterComponent: React.FC<RatingFilterProps> = ({
  selectedRating,
  showRatingFilter,
  toggleRatingFilter,
  handleRatingSelect
}) => {
  return (
    <FilterButton
      isActive={selectedRating !== 'all'}
      label="Rating"
      icon={Star}
      isOpen={showRatingFilter}
      onToggle={toggleRatingFilter}
    >
      <div className="w-36">
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
    </FilterButton>
  );
};

export default RatingFilterComponent;
