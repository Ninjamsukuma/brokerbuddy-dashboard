
import React from 'react';
import { Listing } from '@/types/listing';

interface DashboardStatsProps {
  listings: Listing[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ listings }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white p-3 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500">Active Listings</p>
        <p className="text-xl font-semibold text-dalali-800">
          {listings.filter(l => l.status === 'active').length}
        </p>
      </div>
      
      <div className="bg-white p-3 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500">Total Views</p>
        <p className="text-xl font-semibold text-dalali-800">
          {listings.reduce((sum, listing) => sum + listing.views, 0)}
        </p>
      </div>
      
      <div className="bg-white p-3 rounded-xl shadow-sm">
        <p className="text-xs text-gray-500">Sold/Rented</p>
        <p className="text-xl font-semibold text-dalali-800">
          {listings.filter(l => l.status === 'sold').length}
        </p>
      </div>
    </div>
  );
};

export default DashboardStats;
