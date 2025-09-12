
import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import SearchDialog from '@/components/navigation/SearchDialog';
import NotificationsDialog from '@/components/navigation/NotificationsDialog';
import LanguageSelector from '@/components/navigation/LanguageSelector';
import SidebarMenu from '@/components/navigation/SidebarMenu';
import logoIcon from '@/assets/logo-icon.png';

interface NavigationBarProps {
  title?: string;
  showSearch?: boolean;
  showMenu?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  title = "Dalali Kiganjani",
  showSearch = true,
  showMenu = true,
}) => {
  const { t } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 w-full">
      <div className="glassmorphism px-4 py-3 flex items-center justify-between">
        {/* Left side: Menu or Back button */}
        <SidebarMenu showMenu={showMenu} />
        
        {/* Center: Title or Logo */}
        <div className="flex items-center space-x-2">
          {title === "Dalali Kiganjani" && (
            <img 
              src="/lovable-uploads/21d90d31-7676-4ed3-8bd0-9c475a53dc05.png" 
              alt="Dalali Kiganjani Logo" 
              className="w-6 h-6 object-contain"
            />
          )}
          <h1 className={`${title === "Dalali Kiganjani" ? "brand-logo-subtle" : "font-semibold"}`}>
            {title === "Dalali Kiganjani" ? t('appName') : t(title)}
          </h1>
        </div>
        
        {/* Right side: Language selector, Notification */}
        <div className="flex items-center space-x-3">
          {showSearch && (
            <>
              <button className="icon-button" onClick={() => setIsSearchOpen(true)}>
                <Search size={20} className="text-dalali-600" />
              </button>
              
              <SearchDialog 
                isOpen={isSearchOpen} 
                onOpenChange={setIsSearchOpen}
              />
            </>
          )}
          
          <button 
            className="icon-button relative" 
            onClick={() => setIsNotificationsOpen(true)}
          >
            <Bell size={20} className="text-dalali-600" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-dalali-600"></span>
          </button>
          
          <NotificationsDialog
            isOpen={isNotificationsOpen}
            onOpenChange={setIsNotificationsOpen}
          />
          
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
