
import React from 'react';
import { Search } from 'lucide-react';

interface BrokerSearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const BrokerSearchInput = ({ searchQuery, setSearchQuery }: BrokerSearchInputProps) => {
  return (
    <div className="relative mb-3 animate-fade-in">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search brokers or services..."
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dalali-500/50 focus:border-transparent"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default BrokerSearchInput;
