
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { MapPin } from 'lucide-react';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

const SplashScreen = ({ onAnimationComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();
  
  // Slow down the progress to complete in 3.5 seconds total
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 2.85; // Slower increment for 3.5s total
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, onAnimationComplete]);

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
          {/* Logo with bounce animation */}
          <motion.div
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "mirror"
            }}
            className="flex items-center justify-center"
          >
            {/* Use the provided logo */}
            <img 
              src="/lovable-uploads/4517b9c4-9005-4325-9427-42aa560001a3.png" 
              alt="Dalali Kiganjani" 
              className="w-24 h-24 object-contain"
            />
          </motion.div>

          {/* Removed Title/appName */}
          
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

        {/* Progress bar with animated fill */}
        <div className="w-60 h-1.5 bg-dalali-200/30 dark:bg-dalali-800/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

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
