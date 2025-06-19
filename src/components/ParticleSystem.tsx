import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const ParticleSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const particles = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
    originalSize: number;
    angle: number;
    distance: number;
  }>>([]);

  const colors = [
    'rgba(139, 92, 246, 0.8)',   // purple-500
    'rgba(168, 85, 247, 0.6)',   // purple-600
    'rgba(192, 132, 252, 0.4)',  // purple-400
    'rgba(221, 214, 254, 0.3)',  // purple-200
    'rgba(236, 72, 153, 0.5)',   // pink-500
    'rgba(244, 114, 182, 0.4)',  // pink-400
  ];

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particles.current = [];
    const particleCount = Math.min(120, Math.floor(window.innerWidth / 12));
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 4 + 1;
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size,
        originalSize: size,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 100 + 50
      });
    }
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    initParticles();
  }, [initParticles]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Create subtle background gradient
    const gradient = ctx.createRadialGradient(
      rect.width / 2, rect.height / 2, 0,
      rect.width / 2, rect.height / 2, rect.width / 2
    );
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    particles.current.forEach((particle, index) => {
      // Mouse interaction
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const angle = Math.atan2(dy, dx);
        particle.vx -= Math.cos(angle) * force * 0.1;
        particle.vy -= Math.sin(angle) * force * 0.1;
        particle.size = particle.originalSize * (1 + force * 0.5);
        particle.opacity = Math.min(1, particle.opacity * (1 + force));
      } else {
        particle.size += (particle.originalSize - particle.size) * 0.1;
        particle.opacity += (0.6 - particle.opacity) * 0.05;
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary collision with smooth bounce
      if (particle.x < 0 || particle.x > rect.width) {
        particle.vx *= -0.8;
        particle.x = Math.max(0, Math.min(rect.width, particle.x));
      }
      if (particle.y < 0 || particle.y > rect.height) {
        particle.vy *= -0.8;
        particle.y = Math.max(0, Math.min(rect.height, particle.y));
      }

      // Add subtle floating motion
      particle.angle += 0.01;
      particle.vx += Math.sin(particle.angle) * 0.01;
      particle.vy += Math.cos(particle.angle) * 0.01;

      // Apply friction
      particle.vx *= 0.98;
      particle.vy *= 0.98;

      // Draw particle with glow effect
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      
      // Outer glow
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size + 2, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace(/[\d\.]+\)$/g, '0.1)');
      ctx.fill();
      
      // Inner particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      ctx.restore();

      // Draw connections
      particles.current.forEach((otherParticle, otherIndex) => {
        if (index !== otherIndex) {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxConnectionDistance = 120;

          if (distance < maxConnectionDistance) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / maxConnectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, 
              otherParticle.x, otherParticle.y
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, otherParticle.color);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.restore();
          }
        }
      });
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resizeCanvas, animate, handleMouseMove]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
      style={{ 
        zIndex: 1,
        background: 'transparent'
      }}
    />
  );
};

export default ParticleSystem;