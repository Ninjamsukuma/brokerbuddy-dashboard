
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Listing } from '@/types/listing';

interface DashboardStatsProps {
  listings: Listing[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ listings }) => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white p-3 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500">{t('brokerDashboard.activeListings')}</p>
        <p className="text-xl font-semibold text-dalali-800">
          {listings.filter(l => l.status === 'active').length}
        </p>
      </div>
      
      <div className="bg-white p-3 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500">{t('brokerDashboard.totalViews')}</p>
        <p className="text-xl font-semibold text-dalali-800">
          {listings.reduce((sum, listing) => sum + listing.views, 0)}
        </p>
      </div>
      
      <div className="bg-white p-3 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500">{t('brokerDashboard.soldRented')}</p>
        <p className="text-xl font-semibold text-dalali-800">
          {listings.filter(l => l.status === 'sold').length}
        </p>
      </div>
    </div>
  );
};

export default DashboardStats;
