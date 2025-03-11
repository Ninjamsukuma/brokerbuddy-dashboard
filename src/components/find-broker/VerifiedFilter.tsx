
import React from 'react';
import FilterButton from './FilterButton';

interface VerifiedFilterProps {
  showVerifiedOnly: boolean;
  toggleVerifiedOnly: () => void;
}

const VerifiedFilter: React.FC<VerifiedFilterProps> = ({ showVerifiedOnly, toggleVerifiedOnly }) => {
  return (
    <FilterButton
      isActive={showVerifiedOnly}
      label="Verified"
      isOpen={false}
      onToggle={toggleVerifiedOnly}
    />
  );
};

export default VerifiedFilter;
