
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from '@/components/ui/use-toast';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  
  // Check if user has already selected a language
  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem('hasSelectedLanguage');
    if (hasSelectedLanguage === 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLanguageSelect = (lang: 'en' | 'sw') => {
    setLanguage(lang);
    localStorage.setItem('hasSelectedLanguage', 'true');
    
    toast({
      title: lang === 'en' ? 'Language set to English' : 'Lugha imewekwa kuwa Kiswahili',
      description: lang === 'en' ? 'You can change this later in settings' : 'Unaweza kubadilisha hii baadaye kwenye mipangilio',
      duration: 3000,
    });
    
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Languages size={64} className="text-dalali-600" />
          </div>
          <h1 className="text-3xl font-bold text-dalali-800">Choose Your Language</h1>
          <p className="text-gray-500 mt-2">Chagua Lugha Yako</p>
        </div>
        
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLanguageSelect('en')}
            className="w-full p-4 bg-white border-2 border-dalali-100 rounded-xl flex items-center justify-between hover:border-dalali-500 transition-colors"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">🇬🇧</span>
              <span className="font-medium text-gray-800">English</span>
            </div>
            {language === 'en' && (
              <div className="h-4 w-4 rounded-full bg-dalali-600"></div>
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLanguageSelect('sw')}
            className="w-full p-4 bg-white border-2 border-dalali-100 rounded-xl flex items-center justify-between hover:border-dalali-500 transition-colors"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">🇹🇿</span>
              <span className="font-medium text-gray-800">Kiswahili</span>
            </div>
            {language === 'sw' && (
              <div className="h-4 w-4 rounded-full bg-dalali-600"></div>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageSelection;
