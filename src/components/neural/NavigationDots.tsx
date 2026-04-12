import { useEffect, useRef, useState } from 'react';

interface NavItem {
  id: string;
  label: string;
}

interface NavigationDotsProps {
  items: NavItem[];
  className?: string;
}

export default function NavigationDots({ items, className = '' }: NavigationDotsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const updateNavigationState = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight * 0.5;

      let bestIndex = 0;
      let bestScore = Number.NEGATIVE_INFINITY;

      for (let index = 0; index < items.length; index++) {
        const section = document.getElementById(items[index].id);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        const intersection = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
        const centerDistance = Math.abs((rect.top + rect.bottom) * 0.5 - viewportCenter);
        const centerBoost = rect.top <= viewportCenter && rect.bottom >= viewportCenter ? 10000 : 0;

        const score = centerBoost + intersection * 1.8 - centerDistance;
        if (score > bestScore) {
          bestScore = score;
          bestIndex = index;
        }
      }

      setActiveIndex((previous) => (previous === bestIndex ? previous : bestIndex));

      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const aboutTop = aboutSection.getBoundingClientRect().top;
        const shouldShow = aboutTop <= viewportHeight * 0.86;
        setIsVisible((previous) => (previous === shouldShow ? previous : shouldShow));
      } else {
        const shouldShow = bestIndex > 0;
        setIsVisible((previous) => (previous === shouldShow ? previous : shouldShow));
      }
    };

    const queueNavigationUpdate = () => {
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        updateNavigationState();
      });
    };

    queueNavigationUpdate();
    window.addEventListener('scroll', queueNavigationUpdate, { passive: true });
    window.addEventListener('resize', queueNavigationUpdate);

    return () => {
      window.removeEventListener('scroll', queueNavigationUpdate);
      window.removeEventListener('resize', queueNavigationUpdate);

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [items]);

  const scrollToSection = (id: string, index: number) => {
    const element = document.getElementById(id);
    if (!element) return;

    setActiveIndex(index);
    window.dispatchEvent(new CustomEvent('neural-glitch', { detail: { intensity: 0.72 } }));
    window.dispatchEvent(new CustomEvent('neural-nav-target', { detail: { id } }));

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const handleBlurCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget as Node | null;
    if (!event.currentTarget.contains(relatedTarget)) {
      setIsExpanded(false);
    }
  };

  return (
    <div
      className={`fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col rounded-2xl border p-1.5 backdrop-blur-sm origin-right transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
      } ${
        isExpanded
          ? 'scale-110 bg-[#081428]/92 border-cyan-200/35 shadow-[0_10px_35px_rgba(0,0,0,0.45)]'
          : 'scale-100 bg-[#071222]/60 border-white/12'
      } ${className}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onFocusCapture={() => setIsExpanded(true)}
      onBlurCapture={handleBlurCapture}
    >
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id, index)}
          className={`group relative flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/75 ${
            isExpanded ? 'h-11 w-11' : 'h-9 w-9'
          }`}
          aria-label={`Go to ${item.label}`}
          aria-current={activeIndex === index ? 'true' : undefined}
        >
          {/* Label tooltip */}
          <span
            className={`absolute right-[calc(100%+0.6rem)] px-2.5 py-1 text-xs font-mono text-white/75 bg-[#061225]/88 border border-cyan-200/20 rounded-md whitespace-nowrap transition-all duration-200 ${
              isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1 pointer-events-none'
            }`}
          >
            {item.label}
          </span>

          {/* Dot */}
          <div
            className={`rounded-full transition-all duration-300 ${
              activeIndex === index
                ? isExpanded
                  ? 'w-4 h-4 bg-cyan-300 shadow-[0_0_14px_rgba(0,240,255,0.9)]'
                  : 'w-2.5 h-2.5 bg-cyan-400 scale-125 shadow-[0_0_10px_rgba(0,240,255,0.8)]'
                : isExpanded
                  ? 'w-3 h-3 bg-white/45 group-hover:bg-cyan-100/85'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
