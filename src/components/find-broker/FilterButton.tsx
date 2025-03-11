
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterButtonProps {
  isActive: boolean;
  label: string;
  icon?: LucideIcon;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

// Animation variants for dropdown menus
const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -5 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: -5, 
    transition: { duration: 0.15, ease: "easeIn" }
  }
};

const FilterButton: React.FC<FilterButtonProps> = ({ 
  isActive, 
  label, 
  icon: Icon, 
  isOpen, 
  onToggle, 
  children 
}) => {
  return (
    <div className="relative">
      <button 
        className={`chip ${isActive ? 'bg-dalali-100 text-dalali-700' : 'bg-gray-100 text-gray-700'} flex items-center hover:bg-dalali-50 transition-colors duration-200`}
        onClick={onToggle}
      >
        {Icon && <Icon size={14} className="mr-1" />}
        {label}
        {children && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        )}
      </button>
      
      {children && (
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg z-50 py-1 border border-gray-100"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default FilterButton;
