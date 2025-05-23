
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

interface AddListingButtonProps {
  onAddListing: () => void;
}

const AddListingButton: React.FC<AddListingButtonProps> = ({ onAddListing }) => {
  const { t } = useLanguage();
  
  return (
    <motion.button
      className="w-full bg-dalali-600 text-white rounded-lg py-3 flex items-center justify-center"
      onClick={onAddListing}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <PlusCircle size={18} className="mr-2" />
      {t('brokerDashboard.addListing')}
    </motion.button>
  );
};

export default AddListingButton;
