import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, FileText, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: Mail, label: 'Email', href: 'mailto:surya@example.com' },
    { icon: FileText, label: 'Resume', href: '#' },
  ];

  return (
    <footer
      ref={sectionRef}
      className="relative w-full py-24 z-[70] neural-footer-layer"
    >
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

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all group"
              aria-label={link.label}
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

          <p className="font-mono text-xs text-white/40 flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-cyan-400" /> in Bangalore
          </p>
        </div>

        {/* Neural activity indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
          <span className="font-mono text-xs text-cyan-400/60">SYSTEM ONLINE</span>
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
    </footer>
  );
}
