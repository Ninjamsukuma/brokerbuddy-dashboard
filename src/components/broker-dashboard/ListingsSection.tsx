
import React from 'react';
import { motion } from 'framer-motion';
import { ListFilter } from 'lucide-react';
import { Listing } from '@/types/listing';
import ListingGridItem from './ListingGridItem';
import ListingListItem from './ListingListItem';
import { useLanguage } from '@/hooks/useLanguage';

interface ListingsSectionProps {
  listings: Listing[];
  view: 'grid' | 'list';
  onEdit: (id: string) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

const ListingsSection: React.FC<ListingsSectionProps> = ({ 
  listings, 
  view, 
  onEdit, 
  onShare, 
  onDelete 
}) => {
  const { t } = useLanguage();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">{t('brokerDashboard.yourListings')}</h2>
      
      {listings.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
            <ListFilter size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">{t('noListingsFound')}</h3>
          <p className="text-gray-500">{t('adjustFilters')}</p>
        </div>
      ) : (
        <motion.div 
          className={view === 'grid' ? "grid grid-cols-2 gap-3" : "space-y-3"}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {listings.map(listing => (
            view === 'grid' ? (
              <ListingGridItem 
                key={listing.id}
                listing={listing}
                onEdit={onEdit}
                onShare={onShare}
                onDelete={onDelete}
              />
            ) : (
              <ListingListItem 
                key={listing.id}
                listing={listing}
                onEdit={onEdit}
                onShare={onShare}
                onDelete={onDelete}
              />
            )
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ListingsSection;
