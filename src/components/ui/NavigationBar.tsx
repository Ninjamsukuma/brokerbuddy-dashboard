
import React, { useState } from 'react';
import { Search, Bell, Menu, Languages } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const { language, setLanguage, t } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLanguageChange = (lang: 'en' | 'sw') => {
    setLanguage(lang);
    toast({
      title: t('languageChanged'),
      description: lang === 'en' ? 'Language set to English' : 'Lugha imewekwa kuwa Kiswahili',
      duration: 3000,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('searchStarted'),
      description: `${t('searching')}: ${searchQuery}`,
      duration: 3000,
    });
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="sticky top-0 z-40 w-full">
      <div className="glassmorphism px-4 py-3 flex items-center justify-between">
        {/* Left side: Menu or Back button */}
        {showMenu && (
          <Sheet>
            <SheetTrigger asChild>
              <button className="icon-button">
                <Menu size={20} className="text-dalali-600" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="brand-logo">{t('appName')}</SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 flex flex-col items-center">
                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white shadow-sm mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">Samwel Johnson</h3>
                <p className="text-sm text-muted-foreground">+255 712 345 678</p>
              </div>
              
              <div className="mt-8 space-y-2">
                <div className="px-2 py-1">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">{t('menu.main')}</h4>
                  <div className="space-y-1">
                    <button className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent">
                      <span>{t('menu.profile')}</span>
                    </button>
                    <button className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent">
                      <span>{t('menu.settings')}</span>
                    </button>
                    <button className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent">
                      <span>{t('menu.location')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
        
        {/* Center: Title or Logo - using brand-logo class without italic */}
        <h1 className={`${title === "Dalali Kiganjani" ? "brand-logo" : "font-semibold"}`}>
          {title === "Dalali Kiganjani" ? t('appName') : t(title)}
        </h1>
        
        {/* Right side: Language selector, Notification */}
        <div className="flex items-center space-x-3">
          {showSearch && (
            <>
              <button className="icon-button" onClick={() => setIsSearchOpen(true)}>
                <Search size={20} className="text-dalali-600" />
              </button>
              
              <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
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
            </>
          )}
          
          <button 
            className="icon-button relative" 
            onClick={() => setIsNotificationsOpen(true)}
          >
            <Bell size={20} className="text-dalali-600" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-dalali-600"></span>
          </button>
          
          <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t('notifications')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b pb-3">
                    <h4 className="font-medium">{t('notificationTitle')}</h4>
                    <p className="text-sm text-gray-500">{t('notificationDesc')}</p>
                    <p className="text-xs text-gray-400 mt-1">2h ago</p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="icon-button">
                <Languages size={20} className="text-dalali-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('en')} 
                className={language === 'en' ? 'bg-accent' : ''}
              >
                🇬🇧 English
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('sw')} 
                className={language === 'sw' ? 'bg-accent' : ''}
              >
                🇹🇿 Kiswahili
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
