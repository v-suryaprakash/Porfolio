import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    setCursorPos(mouseRef.current);
  };

  const socialLinks = [
    { 
      icon: Github, 
      label: 'GitHub', 
      href: 'https://github.com/v-suryaprakash',
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      href: 'http://linkedin.com/in/v-suryaprakash',
    },
    { 
      icon: Mail, 
      label: 'Email', 
      href: 'mailto:v.surya.prakash.2210@gmail.com',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
          },
        }
      );

      gsap.set(socialRef.current?.children || [], {
        x: 0,
        y: 0,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    window.open(href, '_blank');
  };

  return (
    <footer
      ref={sectionRef}
      className="relative w-full py-24 z-[70] neural-footer-layer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Global neural background from App.tsx flows through */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute w-64 h-64 rounded-full transition-all duration-700 ${
            isHovered 
              ? 'opacity-15' 
              : 'opacity-5'
          }`}
          style={{
            left: `${((cursorPos.x || 0) / window.innerWidth) * 100}%`,
            top: `${((cursorPos.y || 0) / window.innerHeight) * 100}%`,
            transform: 'translate3d(-50%, -50%, 0)',
            background: 'rgba(34, 211, 238, 0.3)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-8 text-center neural-anim-target">
        {/* Large Wordmark */}
        <h2 className="font-display text-[clamp(48px,10vw,120px)] text-white tracking-tight leading-none mb-4">
          SURYA
          <span className="text-cyan-400">.</span>
        </h2>

        {/* Tagline */}
        <p className="font-mono text-sm text-white/50 mb-8">
          Built with curiosity. Optimized for impact.
        </p>

        {/* Social Links - Square with curved edges, icon tilts right on hover */}
        <div ref={socialRef} className="flex justify-center gap-10 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-40 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all group"
              aria-label={link.label}
              onClick={(e) => handleButtonClick(e, link.href)}
              onMouseEnter={(e) => {
                const icon = e.currentTarget.querySelector('svg');
                if (icon) {
                  gsap.to(icon, { x: 3, y: -2, rotate: 8, duration: 0.3, ease: 'power2.out' });
                }
              }}
              onMouseLeave={(e) => {
                const icon = e.currentTarget.querySelector('svg');
                if (icon) {
                  gsap.to(icon, { x: 0, y: 0, rotate: 0, duration: 0.3, ease: 'power2.out' });
                }
              }}
            >
              <link.icon className="w-5 h-5 text-white/60 group-hover:text-cyan-400 transition-colors" />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-white/40">
            © 2026 — Neural Interface Portfolio
          </p>

          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            <span className="font-mono text-xs text-cyan-400/60">SYSTEM ONLINE</span>
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}