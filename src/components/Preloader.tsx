import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('initializing');

  const phases = [
    { key: 'initializing', text: 'Initializing digital canvas...', duration: 800 },
    { key: 'loading', text: 'Loading artworks...', duration: 600 },
    { key: 'rendering', text: 'Rendering visual experiences...', duration: 500 },
    { key: 'finalizing', text: 'Finalizing details...', duration: 400 }
  ];

  useEffect(() => {
    let currentProgress = 0;
    let phaseIndex = 0;
    
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 3 + 1;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
        setTimeout(() => {
          setCurrentPhase('complete');
        }, 200);
      } else {
        // Update phase based on progress
        const newPhaseIndex = Math.min(
          Math.floor((currentProgress / 100) * phases.length),
          phases.length - 1
        );
        
        if (newPhaseIndex !== phaseIndex) {
          phaseIndex = newPhaseIndex;
          setCurrentPhase(phases[phaseIndex].key);
        }
      }
      
      setLoadingProgress(currentProgress);
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  const currentPhaseData = phases.find(phase => phase.key === currentPhase) || phases[0];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, #8B5CF6 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, #EC4899 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, #3B82F6 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, #8B5CF6 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto px-6">
        {/* Logo Animation */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Main Loader */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div
              className="absolute inset-0 w-24 h-24 border-2 border-purple-600/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            
            <motion.div
              className="absolute inset-0 w-24 h-24 border-2 border-transparent border-t-purple-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
            
            <motion.div
              className="absolute inset-2 w-20 h-20 border-2 border-transparent border-r-pink-600 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Center Dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          
          {/* Brand Name */}
          <motion.h1
            className="text-5xl font-black text-white mb-2 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            ARTISTRY
          </motion.h1>
          
          <motion.div
            className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
        
        {/* Phase Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentPhase}
            className="text-gray-400 text-lg mb-8 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {currentPhaseData.text}
          </motion.p>
        </AnimatePresence>
        
        {/* Progress Bar */}
        <div className="relative">
          <motion.div
            className="w-80 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: loadingProgress / 100 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            />
          </motion.div>
          
          {/* Progress Percentage */}
          <motion.div
            className="mt-4 text-2xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {Math.round(loadingProgress)}%
          </motion.div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              initial={{ 
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                opacity: 0 
              }}
              animate={{ 
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;