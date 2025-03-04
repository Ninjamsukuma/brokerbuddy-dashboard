
import React from 'react';

interface WelcomeBannerProps {
  name: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ name }) => {
  const getCurrentTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="w-full py-4 animate-fade-in">
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl font-medium text-gray-500">{getCurrentTimeGreeting()},</h1>
        <h2 className="text-3xl font-semibold text-dalali-800">{name}</h2>
        <p className="text-sm font-medium text-dalali-500 mt-1">
          What are you looking for today?
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
