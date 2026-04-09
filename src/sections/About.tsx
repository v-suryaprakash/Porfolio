import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NeuralCard } from '../components/neural';
import { ArrowRight, Brain, Code, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '7+', label: 'Years', icon: Brain },
  { value: '40+', label: 'Projects', icon: Code },
  { value: '12', label: 'Publications', icon: Database },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const neuralNodes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        id: index,
        cx: 150 + Math.sin(index * 0.5) * 80 + Math.random() * 40,
        cy: 100 + index * 15 + Math.random() * 20,
        r: 2 + Math.random() * 3,
        delay: index * 0.1,
      })),
    []
  );

  const neuralLinks = useMemo(
    () =>
      Array.from({ length: 25 }, (_, index) => ({
        id: index,
        x1: 150 + Math.sin(index * 0.5) * 80,
        y1: 100 + index * 15,
        x2: 150 + Math.sin((index + 1) * 0.5) * 80,
        y2: 100 + (index + 1) * 15,
      })),
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait card entrance
      gsap.fromTo(
        portraitRef.current,
        { x: '-55vw', opacity: 0, rotateY: 18 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
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

      // Info panel entrance
      gsap.fromTo(
        panelRef.current,
        { x: '55vw', opacity: 0, rotateY: -18 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
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

      // Stats entrance
      gsap.fromTo(
        statsRef.current?.children || [],
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full h-screen overflow-hidden z-20 neural-section-layer-strong"
    >
      <div className="relative z-10 w-full h-full flex items-center justify-center px-[8vw]">
        {/* Portrait Card */}
        <div
          ref={portraitRef}
          className="absolute neural-anim-target"
          style={{ left: '8vw', top: '18vh', width: '34vw', height: '64vh' }}
        >
          <NeuralCard className="w-full h-full p-0">
            <div className="relative w-full h-full overflow-hidden">
              {/* Neural silhouette visualization */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-blue-900/40">
                {/* Neural network pattern overlay */}
                <div className="absolute inset-0 opacity-30">
                  <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
                    {/* Neural nodes forming human silhouette */}
                    {neuralNodes.map((node) => (
                      <circle
                        key={node.id}
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r}
                        fill="rgba(0, 240, 255, 0.6)"
                        className="animate-pulse"
                        style={{ animationDelay: `${node.delay}s` }}
                      />
                    ))}
                    {/* Connection lines */}
                    {neuralLinks.map((line) => (
                      <line
                        key={`line-${line.id}`}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="rgba(0, 240, 255, 0.2)"
                        strokeWidth={1}
                      />
                    ))}
                  </svg>
                </div>

                {/* Central identity marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="w-24 h-24 rounded-full border-2 border-cyan-400/50 flex items-center justify-center mb-4 mx-auto">
                    <span className="font-display text-3xl text-cyan-400">SP</span>
                  </div>
                  <p className="font-mono text-xs text-cyan-400/60 tracking-wider">IDENTITY CORE</p>
                </div>
              </div>

              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F17] to-transparent" />
            </div>
          </NeuralCard>
        </div>

        {/* Info Panel */}
        <div
          ref={panelRef}
          className="absolute neural-anim-target"
          style={{ left: '46vw', top: '18vh', width: '46vw', height: '64vh' }}
        >
          <NeuralCard className="w-full h-full p-8 flex flex-col">
            {/* Header */}
            <div className="mb-6">
              <p className="font-mono text-xs text-cyan-400/60 uppercase tracking-[0.2em] mb-2">
                Identity Core
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-2">Surya Prakash</h2>
              <p className="font-mono text-sm text-white/60">
                AI Engineer · Systems Builder
              </p>
            </div>

            {/* Description */}
            <div className="flex-1 space-y-4">
              <p className="text-white/80 leading-relaxed">
                I design end-to-end systems that turn noisy data into reliable decisions.
                From prototype to production, I optimize for latency, cost, and maintainability.
              </p>
              <p className="text-white/80 leading-relaxed">
                Currently building intelligent infrastructure at the intersection of ML and backend.
                My work spans conversational AI, predictive maintenance, and edge vision systems.
              </p>
              <p className="text-white/80 leading-relaxed">
                I believe in the power of blending research rigor with engineering pragmatism
                to create systems that not only work in theory but scale in practice.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex gap-8 mt-8 pt-6 border-t border-white/10">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-display text-2xl text-white">{stat.value}</p>
                    <p className="font-mono text-xs text-white/50">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="mt-6 flex items-center gap-2 text-cyan-400 font-mono text-sm group">
              <span>Read the full story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </NeuralCard>
        </div>
      </div>
    </section>
  );
}
