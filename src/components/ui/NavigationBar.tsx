
import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

interface NavigationBarProps {
  title?: string;
  showSearch?: boolean;
  showMenu?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  title = "Dalali Kiganjani", // Restored full name
  showSearch = true,
  showMenu = true,
}) => {
  return (
    <div className="sticky top-0 z-40 w-full">
      <div className="glassmorphism px-4 py-3 flex items-center justify-between">
        {/* Left side: Menu or Back button */}
        {showMenu && (
          <button className="icon-button">
            <Menu size={20} className="text-dalali-600" />
          </button>
        )}
        
        {/* Center: Title or Logo - styled as signature-like text */}
        <h1 className={`text-sm font-medium tracking-tight text-center ${title === "Dalali Kiganjani" ? "brand-logo italic" : "font-semibold"}`}>
          {title}
        </h1>
        
        {/* Right side: Notification and Profile */}
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
          
          <button className="h-9 w-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
