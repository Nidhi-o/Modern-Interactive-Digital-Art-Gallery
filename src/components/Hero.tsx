import React, { useEffect, useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import ParticleSystem from './ParticleSystem';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900/90 via-blue-900/80 to-indigo-900/90 dark:from-black dark:via-gray-900 dark:to-purple-900/50"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <ParticleSystem />
      </motion.div>
      
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 sm:px-8 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="space-y-8 sm:space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-4"
          >
            <motion.div 
              className="text-xs sm:text-sm tracking-[0.3em] text-purple-300/80 font-light uppercase mb-8"
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1.5, delay: 1.2 }}
            >
              Contemporary Digital Art
            </motion.div>
            
            <motion.h1 
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 1.2 }}
              >
                DIGITAL
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent mt-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 1.4 }}
              >
                ARTISTRY
              </motion.span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-200/90 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.6 }}
          >
            Immerse yourself in a curated universe of cutting-edge digital art that transcends traditional boundaries and redefines creative expression.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.8 }}
          >
            <motion.button
              onClick={scrollToGallery}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/25"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              data-cursor-text="Explore"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <span className="relative z-10 flex items-center">
                <Play className="mr-2" size={18} />
                Explore Gallery
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-10 py-5 border-2 border-white/20 text-white font-medium rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-500 cursor-pointer backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              data-cursor-text="Learn More"
            >
              <span className="relative z-10">Our Story</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        onClick={scrollToGallery}
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.3 }}
        data-cursor-text="Scroll Down"
      >
        <div className="flex flex-col items-center space-y-2">
          <ChevronDown className="text-white/70 hover:text-white transition-colors duration-300" size={24} />
          <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none" />
    </section>
  );
};

export default Hero;