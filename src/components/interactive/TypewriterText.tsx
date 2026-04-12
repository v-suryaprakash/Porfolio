import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  showCursor?: boolean;
}

export default function TypewriterText({
  text,
  className = '',
  speed = 48,
  startDelay = 120,
  showCursor = true,
}: TypewriterTextProps) {
  const reduceMotion = useReducedMotion();
  const [charCount, setCharCount] = useState(reduceMotion ? text.length : 0);

  useEffect(() => {
    if (reduceMotion) {
      setCharCount(text.length);
      return;
    }

    setCharCount(0);
    let currentIndex = 0;
    let typeInterval: number | undefined;

    const startTimeout = window.setTimeout(() => {
      typeInterval = window.setInterval(() => {
        currentIndex += 1;
        setCharCount(currentIndex);

        if (currentIndex >= text.length && typeInterval) {
          window.clearInterval(typeInterval);
        }
      }, Math.max(18, speed));
    }, Math.max(0, startDelay));

    return () => {
      window.clearTimeout(startTimeout);
      if (typeInterval) {
        window.clearInterval(typeInterval);
      }
    };
  }, [reduceMotion, speed, startDelay, text]);

  const showTypingCursor = showCursor && !reduceMotion && charCount < text.length;

  return (
    <span className={className}>
      {text.slice(0, charCount)}
      {showTypingCursor ? (
        <span className="ml-1 inline-block animate-pulse text-cyan-300">|</span>
      ) : null}
    </span>
  );
}
