
import React from 'react';
import { ChevronRight, User, Shield, CreditCard, Bell, HelpCircle, LogOut, Mail, Phone, MapPin, Settings } from 'lucide-react';
import NavigationBar from '../components/ui/NavigationBar';
import BottomTabs from '../components/ui/BottomTabs';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // If no user is logged in, redirect to login
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  // Default avatar if user doesn't have one
  const defaultAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  const menuSections = [
    {
      title: t('profile.title'),
      items: [
        { icon: User, label: t('profile.personalDetails'), path: '/profile/details' },
        { icon: Shield, label: t('profile.security'), path: '/profile/security' },
        { icon: CreditCard, label: t('profile.paymentMethods'), path: '/profile/payments' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: t('profile.notifications'), path: '/profile/notifications' },
        { icon: MapPin, label: t('profile.locationSettings'), path: '/profile/location' },
        { icon: Settings, label: t('profile.appSettings'), path: '/profile/settings' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: t('profile.helpCenter'), path: '/help' },
        { icon: LogOut, label: t('profile.logout'), path: '/logout', danger: true, onClick: () => {
          logout();
          navigate('/login');
        }},
      ]
    }
  ];

  // Loading state while checking authentication
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">Loading profile...</div>
          <div className="animate-spin h-8 w-8 border-4 border-dalali-600 rounded-full border-t-transparent mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title={t('profile.title')} showSearch={false} />
      
      <main className="px-4 pb-4">
        {/* Profile header */}
        <div className="mt-4 mb-6 flex flex-col items-center animate-fade-in">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img 
                src={user.avatar || defaultAvatar} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {user.role === 'broker' && (
              <div className="absolute bottom-0 right-0 bg-dalali-600 text-white p-1 rounded-full border-2 border-white">
                <Shield size={16} />
              </div>
            )}
          </div>
          
          <h1 className="text-xl font-semibold text-dalali-800">{user.name}</h1>
          
          <div className="flex items-center space-x-1 mt-1">
            {user.role === 'broker' ? (
              <div className="chip bg-green-100 text-green-700">
                <Shield size={12} className="mr-1" />
                {t('profile.verified')}
              </div>
            ) : (
              <div className="chip bg-blue-100 text-blue-700">
                {t('profile.client')}
              </div>
            )}
          </div>
          
          <div className="mt-4 flex flex-col items-center space-y-1 text-sm text-gray-600">
            {user.email && (
              <div className="flex items-center">
                <Mail size={14} className="mr-1" />
                {user.email}
              </div>
            )}
            {user.phone && (
              <div className="flex items-center">
                <Phone size={14} className="mr-1" />
                {user.phone}
              </div>
            )}
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              {t('location.defaultLocation')}
            </div>
          </div>
          
          <button className="mt-4 py-2 px-6 bg-dalali-600 text-white rounded-lg text-sm font-medium shadow-sm">
            {t('profile.editProfile')}
          </button>
        </div>
        
        {/* Menu sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-6 animate-slide-up" style={{ animationDelay: `${0.1 * sectionIndex}s` }}>
            <h2 className="text-sm font-medium text-gray-500 mb-2 px-1">{section.title}</h2>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              {section.items.map((item, itemIndex) => (
                <a 
                  key={item.label} 
                  href={item.path} 
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className={`flex items-center justify-between p-4 ${
                    itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${item.danger ? 'bg-red-50' : 'bg-dalali-50'}`}>
                      <item.icon size={18} className={item.danger ? 'text-red-600' : 'text-dalali-600'} />
                    </div>
                    <span className={`font-medium ${item.danger ? 'text-red-600' : 'text-dalali-800'}`}>
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight size={18} className={item.danger ? 'text-red-400' : 'text-gray-400'} />
                </a>
              ))}
            </div>
          </div>
        ))}
        
        <div className="text-center text-xs text-gray-500 mt-6 mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p>{t('appName')} {t('version')} 1.0.0</p>
          <p className="mt-1">© 2023 {t('allRightsReserved')}</p>
        </div>
      </main>
      
      <BottomTabs />
    </div>
  );
};

export default Profile;
