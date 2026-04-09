import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface CoreNodeProps {
  size?: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function CoreNode({ size = 200, isActive = false, onClick, className = '' }: CoreNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Breathing animation
  useEffect(() => {
    if (!nodeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(nodeRef.current, {
        scale: 1.03,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  // Pulse ring animation
  useEffect(() => {
    if (!pulseRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(pulseRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={nodeRef}
      className={`relative cursor-pointer transition-all duration-500 ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer pulse ring */}
      <div
        ref={pulseRef}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Outer glow ring */}
      <div
        className={`absolute inset-2 rounded-full transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-60'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, transparent 70%)',
          boxShadow: isHovered
            ? '0 0 60px rgba(0, 240, 255, 0.5), 0 0 100px rgba(0, 240, 255, 0.3)'
            : '0 0 40px rgba(0, 240, 255, 0.3), 0 0 80px rgba(0, 240, 255, 0.15)',
        }}
      />

      {/* Cyan ring */}
      <div
        className={`absolute inset-4 rounded-full border-2 transition-all duration-300 ${
          isActive ? 'border-cyan-400' : 'border-cyan-500/50'
        }`}
        style={{
          boxShadow: isHovered
            ? 'inset 0 0 20px rgba(0, 240, 255, 0.3), 0 0 20px rgba(0, 240, 255, 0.3)'
            : 'inset 0 0 10px rgba(0, 240, 255, 0.15)',
        }}
      />

      {/* Inner core */}
      <div
        className="absolute inset-8 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(0, 240, 255, 0.8) 0%, rgba(0, 150, 200, 0.4) 50%, rgba(0, 80, 120, 0.2) 100%)',
          boxShadow: '0 0 30px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)',
        }}
      />

      {/* Center bright spot */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Orbiting particles */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-cyan-400"
          style={{
            transform: `rotate(${i * 120}deg) translateX(${size * 0.55}px)`,
            transformOrigin: '0 0',
            opacity: 0.7,
            animation: `orbit ${3 + i * 0.5}s linear infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(${size * 0.55}px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(${size * 0.55}px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
