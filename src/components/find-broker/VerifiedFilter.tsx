
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface VerifiedFilterProps {
  showVerifiedOnly: boolean;
  toggleVerifiedOnly: () => void;
}

const VerifiedFilter: React.FC<VerifiedFilterProps> = ({ showVerifiedOnly, toggleVerifiedOnly }) => {
  return (
    <button 
      className={`chip flex items-center ${showVerifiedOnly ? 'bg-dalali-100 text-dalali-700' : 'bg-gray-100 text-gray-700'} hover:bg-dalali-50 transition-colors duration-200`}
      onClick={toggleVerifiedOnly}
    >
      <CheckCircle size={14} className="mr-1" />
      Verified
    </button>
  );
};

export default VerifiedFilter;
