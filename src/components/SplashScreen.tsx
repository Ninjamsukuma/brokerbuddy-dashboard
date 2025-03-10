
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { MapPin } from 'lucide-react';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

const SplashScreen = ({ onAnimationComplete }: SplashScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  
  // Complete animation in 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onAnimationComplete();
      }, 300);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-dalali-50/90 to-dalali-100/90 dark:from-dalali-900 dark:to-dalali-950 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Logo container with animations */}
        <motion.div
          className="relative mb-10"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6, 
              ease: "easeOut" 
            }
          }}
          exit={{ 
            scale: 0.9, 
            opacity: 0, 
            y: -50,
            transition: { 
              duration: 0.3, 
              ease: "easeIn" 
            }
          }}
        >
          {/* Logo with rotation animation to act as loader */}
          <motion.div
            animate={{ 
              rotate: isLoading ? 360 : 0,
              y: [0, -8, 0],
            }}
            transition={{ 
              rotate: {
                duration: 2,
                ease: "linear",
                repeat: Infinity
              },
              y: { 
                duration: 2, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatType: "mirror"
              }
            }}
            className="flex items-center justify-center"
          >
            {/* Use the provided logo with larger size */}
            <img 
              src="/lovable-uploads/4517b9c4-9005-4325-9427-42aa560001a3.png" 
              alt="Dalali Kiganjani" 
              className="w-36 h-36 object-contain" // Increased size from w-24 h-24
            />
          </motion.div>
          
          {/* Ripple/glow animations */}
          <motion.div 
            className="absolute inset-0 rounded-full blur-xl bg-blue-500/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.5, 1.2],
              opacity: [0.2, 0.4, 0],
              transition: { 
                duration: 2, 
                ease: "easeInOut",
                repeat: Infinity,
              }
            }}
          />
          
          {/* Second ripple with different timing */}
          <motion.div 
            className="absolute inset-0 rounded-full blur-xl bg-green-500/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1.1, 1.6, 1.3],
              opacity: [0.3, 0.3, 0],
              transition: { 
                duration: 2.5, 
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.5
              }
            }}
          />
        </motion.div>

        {/* Location pin animation */}
        <motion.div
          initial={{ scale: 0, y: -20, opacity: 0 }}
          animate={{ 
            scale: 1, 
            y: 0, 
            opacity: [0, 1, 0.8],
            transition: { 
              delay: 0.7,
              duration: 0.7, 
              ease: "backOut",
            }
          }}
          exit={{ opacity: 0 }}
          className="mb-8"
        >
          <MapPin className="w-8 h-8 text-dalali-600 dark:text-dalali-400" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 1, duration: 0.6 }
          }}
          className="text-xs text-dalali-600/70 dark:text-dalali-400/70 mt-4"
        >
          {t('tagline')}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
