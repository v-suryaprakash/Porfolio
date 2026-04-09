import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NeuralCard } from '../components/neural';
import { Mail, Linkedin, Github, Send, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left card entrance
      gsap.fromTo(
        leftCardRef.current,
        { x: '-60vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Right panel entrance
      gsap.fromTo(
        rightPanelRef.current,
        { x: '60vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form fields entrance
      gsap.fromTo(
        formRef.current?.children || [],
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const contactLinks = [
    { icon: Mail, label: 'Email', value: 'surya@example.com', href: 'mailto:surya@example.com' },
    { icon: Linkedin, label: 'LinkedIn', value: '/in/suryaprakash', href: 'https://linkedin.com' },
    { icon: Github, label: 'GitHub', value: '@suryaprakash', href: 'https://github.com' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full h-screen overflow-hidden z-[60] neural-section-layer"
    >
      <div className="relative z-10 w-full h-full flex items-center justify-center px-[8vw]">
        {/* Left Contact Card */}
        <div
          ref={leftCardRef}
          className="absolute neural-anim-target"
          style={{ left: '8vw', top: '18vh', width: '40vw', height: '64vh' }}
        >
          <NeuralCard className="w-full h-full p-8 flex flex-col">
            {/* Header */}
            <div className="mb-8">
              <p className="font-mono text-xs text-cyan-400/60 uppercase tracking-[0.2em] mb-2">
                Signal Transmission
              </p>
              <h2 className="font-display text-4xl text-white mb-2">Send a Signal</h2>
              <p className="text-white/60">
                Open to collaborations, research, and hard problems.
              </p>
            </div>

            {/* Contact Links */}
            <div className="flex-1 space-y-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
                    <link.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-xs text-white/40">{link.label}</p>
                    <p className="text-white group-hover:text-cyan-400 transition-colors">{link.value}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>

            {/* Status indicator */}
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-mono text-xs text-white/60">Available for new projects</span>
              </div>
              <span className="font-mono text-xs text-cyan-400/60">Response time: ~24h</span>
            </div>
          </NeuralCard>
        </div>

        {/* Right Form Panel */}
        <div
          ref={rightPanelRef}
          className="absolute neural-anim-target"
          style={{ left: '52vw', top: '18vh', width: '40vw', height: '64vh' }}
        >
          <NeuralCard className="w-full h-full p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="font-display text-2xl text-white mb-2">Signal Transmitted</h3>
                <p className="text-white/60">Thank you for reaching out. I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="h-full flex flex-col">
                <div className="mb-6">
                  <p className="font-mono text-xs text-cyan-400/60 uppercase tracking-[0.2em] mb-2">
                    Compose Message
                  </p>
                </div>

                <div className="flex-1 space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block font-mono text-xs text-white/40 mb-2">NAME</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-cyan-400/50 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block font-mono text-xs text-white/40 mb-2">EMAIL</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-cyan-400/50 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="flex-1">
                    <label className="block font-mono text-xs text-white/40 mb-2">MESSAGE</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-cyan-400/50 focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full py-4 bg-cyan-400/10 border border-cyan-400/50 text-cyan-400 font-mono text-sm uppercase tracking-wider rounded-xl hover:bg-cyan-400/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Transmit Message
                    </>
                  )}
                </button>
              </form>
            )}
          </NeuralCard>
        </div>
      </div>
    </section>
  );
}
