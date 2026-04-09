import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CoreNode, TextDecode } from '../components/neural';
import { siteConfig } from '../config';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microLabelsRef = useRef<HTMLDivElement>(null);

  const [showContent, setShowContent] = useState(false);
  const [initText, setInitText] = useState('Initializing Neural Interface...');

  // Initial load animation sequence
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Initialization text sequence
    tl.to({}, { duration: 0.4, onComplete: () => setInitText('Identity Recognized: SURYA PRAKASH') })
      .to({}, { duration: 0.4, onComplete: () => setInitText('System Online') })
      .to({}, {
        duration: 0.25,
        onComplete: () => {
          setShowContent(true);
          gsap.to('.init-text', { opacity: 0, duration: 0.3 });
        },
      });

    return () => {
      tl.kill();
    };
  }, []);

  // Content entrance animation
  useEffect(() => {
    if (!showContent) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Core node entrance
      tl.fromTo(
        coreRef.current,
        { scale: 0.2, opacity: 0, rotation: -90 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'power3.out' }
      );

      // Headline entrance
      tl.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      // Tagline entrance
      tl.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

      // CTA entrance
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

      // Micro labels entrance
      tl.fromTo(
        microLabelsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [showContent]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    window.dispatchEvent(new CustomEvent('neural-nav-target', { detail: { id: 'about' } }));

    const targetY = aboutSection.getBoundingClientRect().top + window.scrollY;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: targetY,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #0A192F 50%, #020617 100%)' }}
    >
      {/* Initialization text overlay */}
      {!showContent && (
        <div className="init-text absolute inset-0 flex items-center justify-center z-30">
          <p className="font-mono text-cyan-400 text-lg tracking-wider animate-pulse">
            {initText}
          </p>
        </div>
      )}

      {/* Content */}
      {showContent && (
        <div ref={contentRef} className="relative z-20 w-full h-full flex flex-col items-center justify-center">
          {/* Core Node */}
          <div ref={coreRef} className="absolute neural-anim-target" style={{ top: '42%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <CoreNode size={220} onClick={scrollToAbout} />
          </div>

          {/* Headline */}
          <div
            ref={headlineRef}
            className="absolute text-center neural-anim-target"
            style={{ top: '58%', left: '50%', transform: 'translateX(-50%)' }}
          >
            <h1 className="font-display text-[clamp(36px,6vw,84px)] text-white tracking-tight leading-none">
              <TextDecode text="SURYA PRAKASH" delay={200} duration={1200} />
            </h1>
          </div>

          {/* Tagline */}
          <div
            ref={taglineRef}
            className="absolute text-center neural-anim-target"
            style={{ top: '68%', left: '50%', transform: 'translateX(-50%)' }}
          >
            <p className="font-mono text-sm md:text-base text-cyan-300/80 tracking-[0.2em] uppercase">
              AI Innovator · Stack Engineer · Product Builder
            </p>
            <p className="font-mono text-xs text-white/50 mt-2 tracking-wider">
              Building the future by blending AI innovation with strong engineering.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="absolute flex gap-4 neural-anim-target"
            style={{ top: '78%', left: '50%', transform: 'translateX(-50%)' }}
          >
            <button
              onClick={scrollToAbout}
              className="group relative px-8 py-3 border border-cyan-400/50 text-cyan-400 font-mono text-sm uppercase tracking-wider rounded-full overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:text-white"
            >
              <span className="relative z-10">Enter System</span>
              <div className="absolute inset-0 bg-cyan-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
            <button
              onClick={() => window.open(siteConfig.cvUrl || '#', '_blank')}
              className="px-8 py-3 border border-white/20 text-white/70 font-mono text-sm uppercase tracking-wider rounded-full transition-all duration-300 hover:border-white/40 hover:text-white"
            >
              Download CV
            </button>
          </div>

          {/* Micro Labels */}
          <div ref={microLabelsRef} className="absolute inset-0 pointer-events-none">
            {/* Top left */}
            <div className="absolute top-8 left-8">
              <p className="font-mono text-xs text-white/40 uppercase tracking-wider">Neural Interface v2.7</p>
            </div>

            {/* Top right */}
            <div className="absolute top-8 right-8 text-right">
              <p className="font-mono text-xs text-white/40 uppercase tracking-wider">Status</p>
              <p className="font-mono text-xs text-cyan-400 flex items-center justify-end gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                ONLINE
              </p>
            </div>

            {/* Bottom left */}
            <div className="absolute bottom-8 left-8">
              <p className="font-mono text-xs text-white/40 uppercase tracking-wider">Location</p>
              <p className="font-mono text-xs text-white/60">Bangalore, IN</p>
            </div>

            {/* Bottom right */}
            <div className="absolute bottom-8 right-8 text-right">
              <p className="font-mono text-xs text-white/40 uppercase tracking-wider">Neural Activity</p>
              <p className="font-mono text-xs text-cyan-400/80">98.7%</p>
            </div>
          </div>
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/50 via-transparent to-[#020617]/50" />
      </div>
    </section>
  );
}
