
import React from 'react';
import { Search } from 'lucide-react';
import BrokerCard, { BrokerProps } from '../shared/BrokerCard';

interface BrokerListProps {
  brokers: BrokerProps[];
}

const BrokerList: React.FC<BrokerListProps> = ({ brokers }) => {
  return (
    <div className="mt-3 space-y-4">
      {brokers.length > 0 ? (
        brokers.map(broker => (
          <BrokerCard key={broker.id} broker={broker} />
        ))
      ) : (
        <div className="text-center py-10">
          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
            <Search size={30} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">No results found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default BrokerList;
