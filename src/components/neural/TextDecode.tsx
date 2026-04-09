import { useState, useEffect, useRef } from 'react';

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

interface TextDecodeProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  chars?: string;
  onComplete?: () => void;
}

export default function TextDecode({
  text,
  className = '',
  delay = 0,
  duration = 1500,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
  onComplete,
}: TextDecodeProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let decodeInterval: number | null = null;

    const startTimeout = window.setTimeout(() => {
      setIsDecoding(true);

      const textLength = text.length;
      if (textLength === 0) {
        setDisplayText('');
        setIsDecoding(false);
        onComplete?.();
        return;
      }

      const stepMs = 28;
      const totalIterations = Math.max(textLength * 3, Math.floor(Math.max(duration, 280) / stepMs));
      let currentIteration = 0;

      decodeInterval = window.setInterval(() => {
        const progress = clamp(currentIteration / totalIterations, 0, 1);
        const decodedCharacters = Math.floor(progress * textLength);

        const nextText = new Array(textLength);
        for (let index = 0; index < textLength; index++) {
          const char = text[index];

          if (index < decodedCharacters || char === ' ') {
            nextText[index] = char;
            continue;
          }

          nextText[index] = chars[Math.floor(Math.random() * chars.length)];
        }

        setDisplayText(nextText.join(''));

        currentIteration++;

        if (currentIteration > totalIterations) {
          if (decodeInterval !== null) {
            window.clearInterval(decodeInterval);
            decodeInterval = null;
          }

          setDisplayText(text);
          setIsDecoding(false);
          onComplete?.();
        }
      }, stepMs);
    }, delay);

    return () => {
      window.clearTimeout(startTimeout);

      if (decodeInterval !== null) {
        window.clearInterval(decodeInterval);
      }
    };
  }, [text, delay, duration, chars, onComplete]);

  return (
    <span className={`${className} ${isDecoding ? 'text-glow-cyan' : ''}`}>
      {displayText || text.split('').map(() => ' ').join('')}
    </span>
  );
}
