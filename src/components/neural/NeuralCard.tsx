import { useRef, useState } from 'react';
import { gsap } from 'gsap';

interface NeuralCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hoverScale?: number;
  onClick?: () => void;
}

export default function NeuralCard({
  children,
  className = '',
  glowColor = 'rgba(0, 240, 255, 0.15)',
  hoverScale = 1.01,
  onClick,
}: NeuralCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative rounded-[22px] overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: 'rgba(11, 15, 23, 0.72)',
        border: `1px solid ${isHovered ? 'rgba(0, 240, 255, 0.25)' : 'rgba(242, 247, 255, 0.08)'}`,
        boxShadow: isHovered
          ? `0 16px 44px rgba(0, 0, 0, 0.5), 0 0 24px ${glowColor}`
          : '0 14px 36px rgba(0, 0, 0, 0.48)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.03) 0%, transparent 50%, rgba(0, 150, 200, 0.02) 100%)',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-500/20 rounded-tl-[22px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-500/20 rounded-tr-[22px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-500/20 rounded-bl-[22px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/20 rounded-br-[22px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
