
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
            <button className="icon-button">
              <Search size={20} className="text-dalali-600" />
            </button>
          )}
          
          <button className="icon-button relative">
            <Bell size={20} className="text-dalali-600" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-dalali-600"></span>
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="icon-button">
                <Languages size={20} className="text-dalali-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
                🇬🇧 English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('sw')} className={language === 'sw' ? 'bg-accent' : ''}>
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
