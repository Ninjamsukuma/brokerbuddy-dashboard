
import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from "@/components/ui/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: 'en' | 'sw') => {
    setLanguage(lang);
    toast({
      title: t('languageChanged'),
      description: lang === 'en' ? 'Language set to English' : 'Lugha imewekwa kuwa Kiswahili',
      duration: 3000,
    });
  };

  return (
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
  );
};

export default LanguageSelector;
