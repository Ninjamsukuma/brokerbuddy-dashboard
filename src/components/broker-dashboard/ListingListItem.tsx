
import React from 'react';
import { Edit, Share2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Listing } from '@/types/listing';

interface ListingListItemProps {
  listing: Listing;
  onEdit: (id: string) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

const ListingListItem: React.FC<ListingListItemProps> = ({ 
  listing, 
  onEdit, 
  onShare, 
  onDelete 
}) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-sm flex"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-24 h-24 flex-shrink-0">
        <img 
          src={listing.image} 
          alt={listing.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-3 flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
          <span className={`chip text-xs ${
            listing.status === 'active' ? 'bg-green-100 text-green-700' : 
            listing.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
            'bg-blue-100 text-blue-700'
          }`}>
            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
          </span>
        </div>
        
        <p className="text-dalali-600 font-semibold">
          KSh {listing.price.toLocaleString()}
        </p>
        <p className="text-gray-500 text-xs">{listing.location}</p>
        
        <div className="flex justify-end mt-1 space-x-1">
          <button 
            className="p-1 text-gray-500 hover:text-dalali-600"
            onClick={() => onEdit(listing.id)}
          >
            <Edit size={14} />
          </button>
          <button 
            className="p-1 text-gray-500 hover:text-dalali-600"
            onClick={() => onShare(listing.id)}
          >
            <Share2 size={14} />
          </button>
          <button 
            className="p-1 text-gray-500 hover:text-red-600"
            onClick={() => onDelete(listing.id)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingListItem;
