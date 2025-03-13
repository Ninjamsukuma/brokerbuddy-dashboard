
import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating }: { rating: number | null }) => {
  if (rating === null) return <span className="text-gray-500 text-sm">Not rated yet</span>;

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-700">{rating}</span>
    </div>
  );
};

export default RatingStars;
