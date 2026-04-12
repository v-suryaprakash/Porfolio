import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'summary',
  '[role="button"]',
  '[data-cursor-label]',
].join(',');

export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (reduceMotion) return;

    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (coarsePointer) return;

    setIsEnabled(true);
    document.body.classList.add('custom-cursor-enabled');

    const target = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
    };

    const dot = {
      x: target.x,
      y: target.y,
    };

    const ring = {
      x: target.x,
      y: target.y,
    };

    let isVisible = false;
    let isInteractive = false;
    let isPressed = false;
    let label = '';

    const setInteractiveFromTarget = (eventTarget: EventTarget | null) => {
      if (!(eventTarget instanceof Element)) {
        isInteractive = false;
        label = '';
        return;
      }

      const interactiveParent = eventTarget.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      isInteractive = Boolean(interactiveParent);
      label = interactiveParent?.dataset.cursorLabel ?? '';
    };

    const render = () => {
      dot.x += (target.x - dot.x) * 0.34;
      dot.y += (target.y - dot.y) * 0.34;

      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;

      const dotScale = isPressed ? 0.65 : isInteractive ? 0.86 : 1;
      const ringScale = isPressed ? 0.82 : isInteractive ? 1.8 : 1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate3d(-50%, -50%, 0) scale(${dotScale})`;
        dotRef.current.style.opacity = isVisible ? '1' : '0';
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate3d(-50%, -50%, 0) scale(${ringScale})`;
        ringRef.current.style.opacity = isVisible ? '1' : '0';
      }

      if (labelRef.current) {
        labelRef.current.textContent = label;
        labelRef.current.style.opacity = isVisible && isInteractive && label ? '1' : '0';
        labelRef.current.style.transform = `translate3d(${ring.x + 22}px, ${ring.y - 20}px, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(render);
    };

    const onMouseMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      isVisible = true;
      setInteractiveFromTarget(event.target);
    };

    const onMouseOver = (event: MouseEvent) => {
      setInteractiveFromTarget(event.target);
    };

    const onMouseEnterWindow = () => {
      isVisible = true;
    };

    const onMouseLeaveWindow = () => {
      isVisible = false;
      isInteractive = false;
      isPressed = false;
      label = '';
    };

    const onMouseDown = () => {
      isPressed = true;
    };

    const onMouseUp = () => {
      isPressed = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mouseenter', onMouseEnterWindow);
    window.addEventListener('mouseleave', onMouseLeaveWindow);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    rafRef.current = window.requestAnimationFrame(render);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseenter', onMouseEnterWindow);
      window.removeEventListener('mouseleave', onMouseLeaveWindow);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);

      document.body.classList.remove('custom-cursor-enabled');
      setIsEnabled(false);
    };
  }, [reduceMotion]);

  if (!isEnabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      <div
        ref={ringRef}
        className="absolute h-9 w-9 rounded-full border border-cyan-300/70 bg-cyan-300/5 transition-[opacity] duration-200"
        style={{
          boxShadow: '0 0 24px rgba(0, 240, 255, 0.28)',
        }}
      />
      <div
        ref={dotRef}
        className="absolute h-2.5 w-2.5 rounded-full bg-cyan-300 transition-[opacity] duration-200"
        style={{
          boxShadow: '0 0 16px rgba(0, 240, 255, 0.88)',
        }}
      />
      <span
        ref={labelRef}
        className="absolute rounded-full border border-cyan-300/30 bg-[#081224]/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200 transition-opacity duration-200"
      />
    </div>
  );
}
