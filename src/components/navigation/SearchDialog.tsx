
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

interface SearchDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onOpenChange }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('searchStarted'),
      description: `${t('searching')}: ${searchQuery}`,
      duration: 3000,
    });
    onOpenChange(false);
    setSearchQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('search')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search size={18} className="absolute top-3 left-3 text-gray-400" />
            <input 
              type="text" 
              className="w-full border rounded-md pl-10 pr-4 py-2"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-dalali-600 text-white py-2 rounded-md"
          >
            {t('searchButton')}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
