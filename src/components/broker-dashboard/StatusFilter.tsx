
import React from 'react';
import { ListFilter } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

type FilterStatus = 'all' | 'active' | 'pending' | 'sold';

interface StatusFilterProps {
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ filterStatus, setFilterStatus }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center space-x-2">
      <button 
        className={`chip flex items-center ${filterStatus === 'all' ? 'bg-dalali-600 text-white' : 'bg-gray-100'}`}
        onClick={() => setFilterStatus('all')}
      >
        <ListFilter size={14} className="mr-1" />
        {t('all')}
      </button>
      <button 
        className={`chip ${filterStatus === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}
        onClick={() => setFilterStatus('active')}
      >
        {t('active')}
      </button>
      <button 
        className={`chip ${filterStatus === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100'}`}
        onClick={() => setFilterStatus('pending')}
      >
        {t('pending')}
      </button>
      <button 
        className={`chip ${filterStatus === 'sold' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
        onClick={() => setFilterStatus('sold')}
      >
        {t('sold')}
      </button>
    </div>
  );
};

export default StatusFilter;
