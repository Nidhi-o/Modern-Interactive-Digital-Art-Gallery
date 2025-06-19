import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorSize, setCursorSize] = useState(16);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springX = useSpring(cursorX, { stiffness: 1000, damping: 15 });
  const springY = useSpring(cursorY, { stiffness: 1000, damping: 15 });
  
  // Move useSpring calls for cursor text to top level
  const textSpringX = useSpring(cursorX.get() + cursorSize + 10, { stiffness: 400, damping: 28 });
  const textSpringY = useSpring(cursorY.get() - 10, { stiffness: 400, damping: 28 });
  
  const cursorRef = useRef<HTMLDivElement>(null);

  // Check for mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    let moveTimer: NodeJS.Timeout;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorX.set(mouseX - cursorSize / 2);
      cursorY.set(mouseY - cursorSize / 2);
      
      // Update text spring positions
      textSpringX.set(mouseX - cursorSize / 2 + cursorSize + 10);
      textSpringY.set(mouseY - cursorSize / 2 - 10);
      
      if (!isVisible) setIsVisible(true);
      
      // Handle cursor movement state
      clearTimeout(moveTimer);
      if (!isMoving) {
        isMoving = true;
      }
      
      moveTimer = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Add null/undefined check for target
      if (!target || !target.classList) {
        return;
      }
      
      const isInteractive = target.classList.contains('cursor-pointer') || 
                           target.tagName === 'BUTTON' || 
                           target.tagName === 'A' ||
                           target.closest('button') ||
                           target.closest('a') ||
                           target.closest('[data-cursor-text]') ||
                           target.hasAttribute('data-cursor-text');
      
      if (isInteractive) {
        setIsHovering(true);
        setCursorSize(40);
        
        const text = target.getAttribute('data-cursor-text') || 
                    target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text') ||
                    '';
        setCursorText(text);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement;
      
      // Add null/undefined check for relatedTarget
      if (!relatedTarget || !relatedTarget.classList) {
        setIsHovering(false);
        setCursorText('');
        setCursorSize(16);
        return;
      }
      
      // Check if we're still over an interactive element
      if (!relatedTarget.classList.contains('cursor-pointer') && 
          relatedTarget.tagName !== 'BUTTON' && 
          relatedTarget.tagName !== 'A' &&
          !relatedTarget.closest('button') &&
          !relatedTarget.closest('a') &&
          !relatedTarget.closest('[data-cursor-text]') &&
          !relatedTarget.hasAttribute('data-cursor-text')) {
        setIsHovering(false);
        setCursorText('');
        setCursorSize(16);
      }
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    // Only add event listeners if not mobile
    if (!isMobile) {
      window.addEventListener('mousemove', moveCursor);
      document.addEventListener('mouseenter', handleMouseEnter, true);
      document.addEventListener('mouseleave', handleMouseLeave, true);
      document.addEventListener('mouseenter', handleMouseEnterWindow);
      document.addEventListener('mouseleave', handleMouseLeaveWindow);
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', moveCursor);
        document.removeEventListener('mouseenter', handleMouseEnter, true);
        document.removeEventListener('mouseleave', handleMouseLeave, true);
        document.removeEventListener('mouseenter', handleMouseEnterWindow);
        document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      }
      clearTimeout(moveTimer);
    };
  }, [cursorX, cursorY, cursorSize, isVisible, isMobile, textSpringX, textSpringY]);

  // Move the mobile check to after all hooks are called
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { type: 'spring', stiffness: 400, damping: 28 }
        }}
      >
        <motion.div
          className="relative"
          animate={{
            width: cursorSize,
            height: cursorSize,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <motion.div
            className="absolute inset-0 bg-white rounded-full"
            animate={{
              scale: isHovering ? 0.8 : 1,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          />
          
          {/* Outer ring for hover state */}
          <motion.div
            className="absolute inset-0 border-2 border-white rounded-full"
            animate={{
              scale: isHovering ? 1.2 : 0,
              opacity: isHovering ? 0.6 : 0,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          />
        </motion.div>
      </motion.div>
      
      {/* Cursor Text */}
      <AnimatePresence>
        {cursorText && isVisible && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-50 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-full whitespace-nowrap hidden md:block shadow-lg"
            style={{
              x: textSpringX,
              y: textSpringY,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            {cursorText}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;