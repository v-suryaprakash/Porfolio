import { useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  cursorLabel?: string;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  cursorLabel,
}: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const stateRef = useRef({
    rotateX: 0,
    rotateY: 0,
    targetX: 0,
    targetY: 0,
    pointerX: 0.5,
    pointerY: 0.5,
    active: false,
    enabled: true,
  });

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    stateRef.current.enabled = !reduceMotion && !coarsePointer;

    const animate = () => {
      const state = stateRef.current;

      state.rotateX += (state.targetX - state.rotateX) * 0.14;
      state.rotateY += (state.targetY - state.rotateY) * 0.14;

      if (cardRef.current && state.enabled) {
        cardRef.current.style.transform = `perspective(1400px) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg)`;
      }

      if (glareRef.current && state.enabled) {
        glareRef.current.style.opacity = state.active ? '1' : '0';
        const glowX = Math.round(state.pointerX * 100);
        const glowY = Math.round(state.pointerY * 100);
        glareRef.current.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(157, 225, 255, 0.22), transparent 42%)`;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [reduceMotion]);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!stateRef.current.enabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    stateRef.current.pointerX = x;
    stateRef.current.pointerY = y;
    stateRef.current.targetY = (x - 0.5) * maxTilt * 2;
    stateRef.current.targetX = (0.5 - y) * maxTilt * 2;
    stateRef.current.active = true;
  };

  const handleLeave = () => {
    stateRef.current.targetX = 0;
    stateRef.current.targetY = 0;
    stateRef.current.active = false;
  };

  return (
    <div
      ref={cardRef}
      className={`relative h-full transform-gpu ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor-label={cursorLabel}
    >
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
      <div className="relative z-10 h-full" style={{ transform: 'translateZ(36px)' }}>
        {children}
      </div>
    </div>
  );
}
