
import React from 'react';
import { Grid, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  setView: (view: 'grid' | 'list') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  return (
    <div className="flex space-x-1">
      <button 
        className={`icon-button p-2 ${view === 'grid' ? 'bg-dalali-50 text-dalali-600' : ''}`}
        onClick={() => setView('grid')}
      >
        <Grid size={16} />
      </button>
      <button 
        className={`icon-button p-2 ${view === 'list' ? 'bg-dalali-50 text-dalali-600' : ''}`}
        onClick={() => setView('list')}
      >
        <List size={16} />
      </button>
    </div>
  );
};

export default ViewToggle;
