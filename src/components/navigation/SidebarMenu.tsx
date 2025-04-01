
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Briefcase, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SidebarMenuProps {
  showMenu: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ showMenu }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();

  const navigateToBecomeABroker = () => {
    navigate('/become-broker');
  };
  
  const navigateToBrokerDashboard = () => {
    navigate('/broker-dashboard');
  };

  if (!showMenu) return null;

  return (
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
          <h3 className="font-medium text-lg">{user?.name || 'Guest User'}</h3>
          <p className="text-sm text-muted-foreground">{user?.phone || user?.email || 'Not logged in'}</p>
          {user?.role === 'broker' && (
            <span className="bg-dalali-100 text-dalali-800 text-xs px-2 py-1 rounded-full mt-1">
              Broker
            </span>
          )}
        </div>
        
        <div className="mt-8 space-y-2">
          <div className="px-2 py-1">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">{t('menu.main')}</h4>
            <div className="space-y-1">
              <button 
                className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent"
                onClick={() => navigate('/')}
              >
                <span>Home</span>
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent">
                <span>{t('menu.profile')}</span>
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent">
                <span>{t('menu.settings')}</span>
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent">
                <span>{t('menu.location')}</span>
              </button>
              
              {user?.role === 'broker' ? (
                <button 
                  className="w-full flex items-center px-3 py-2 text-sm rounded-md bg-dalali-50 text-dalali-600 hover:bg-dalali-100"
                  onClick={navigateToBrokerDashboard}
                >
                  <LayoutDashboard size={18} className="mr-2 text-dalali-600" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Broker Dashboard</span>
                    <span className="text-xs text-gray-500">Manage your listings</span>
                  </div>
                </button>
              ) : (
                <button 
                  className="w-full flex items-center px-3 py-2 text-sm rounded-md bg-dalali-50 text-dalali-600 hover:bg-dalali-100"
                  onClick={navigateToBecomeABroker}
                >
                  <Briefcase size={18} className="mr-2 text-dalali-600" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Become a Broker</span>
                    <span className="text-xs text-gray-500">Earn money on your schedule</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMenu;
