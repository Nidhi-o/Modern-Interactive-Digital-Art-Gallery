import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { isDarkMode, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'gallery', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: `rgba(255, 255, 255, ${backgroundOpacity.get() * (isDarkMode ? 0 : 1)})`,
          borderBottom: `1px solid rgba(255, 255, 255, ${borderOpacity.get()})`,
        }}
      >
        <motion.div
          className="absolute inset-0 backdrop-blur-xl"
          style={{
            background: isDarkMode 
              ? `rgba(0, 0, 0, ${backgroundOpacity.get() * 0.8})`
              : `rgba(255, 255, 255, ${backgroundOpacity.get() * 0.8})`,
          }}
        />
        
        <div className="relative z-10 max-w-8xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              className="font-black text-2xl lg:text-3xl text-gray-900 dark:text-white cursor-pointer tracking-tight"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('hero')}
              data-cursor-text="Home"
            >
              ARTISTRY
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-12">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 font-medium cursor-pointer ${
                    activeSection === item.id ? 'text-purple-600 dark:text-purple-400' : ''
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  data-cursor-text={item.label}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", damping: 30, stiffness: 500 }}
                    />
                  )}
                </motion.button>
              ))}
              
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={toggleTheme}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  data-cursor-text={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>
                
                <motion.button
                  className="group flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 cursor-pointer font-medium"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor-text="Get in Touch"
                  onClick={() => scrollToSection('contact')}
                >
                  <span>Contact</span>
                  <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
              
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 dark:text-gray-300 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
        >
          <div className="px-6 py-8 space-y-6">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left text-xl font-semibold transition-all duration-300 cursor-pointer ${
                  activeSection === item.id 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20 
                }}
                transition={{ delay: index * 0.1 + 0.1 }}
                whileHover={{ x: 10 }}
              >
                {item.label}
              </motion.button>
            ))}
            
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="w-full mt-8 px-6 py-4 bg-purple-600 text-white rounded-2xl font-semibold hover:bg-purple-700 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20 
              }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navbar;