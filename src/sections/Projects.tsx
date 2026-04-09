import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NeuralCard } from '../components/neural';
import { ArrowUpRight, Cpu, MessageSquare, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Predictive Maintenance Pipeline',
    description: 'Anomaly detection on sensor streams with sub-second latency. Reduces downtime by 40% through real-time failure prediction.',
    tags: ['MLOps', 'Time Series', 'Edge Computing'],
    icon: Cpu,
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 2,
    title: 'Conversational AI Platform',
    description: 'Multi-turn dialogue system with retrieval-augmented generation. Handles 10K+ concurrent conversations with sub-200ms response time.',
    tags: ['NLP', 'RAG', 'LLM'],
    icon: MessageSquare,
    color: 'from-violet-500/20 to-cyan-500/20',
  },
  {
    id: 3,
    title: 'Edge Vision Stack',
    description: 'Lightweight detection models optimized for ARM devices. Achieves 30fps on Raspberry Pi 4 with 95%+ accuracy.',
    tags: ['Computer Vision', 'Edge AI', 'Optimization'],
    icon: Eye,
    color: 'from-blue-500/20 to-cyan-500/20',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(
        titleRef.current,
        { y: '-10vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards entrance with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const directions = [
          { x: '-36vw', rotateY: 12 },
          { y: '38vh', scale: 0.95 },
          { x: '36vw', rotateY: -12 },
        ];

        gsap.fromTo(
          card,
          { ...directions[index], opacity: 0 },
          {
            x: 0,
            y: 0,
            scale: 1,
            rotateY: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full h-screen overflow-hidden z-30 neural-section-layer-strong"
    >
      <div className="relative z-10 w-full h-full px-[8vw]">
        {/* Title */}
        <div ref={titleRef} className="absolute top-[10vh] left-[8vw] neural-anim-target">
          <p className="font-mono text-xs text-cyan-400/60 uppercase tracking-[0.2em] mb-2">
            Innovation Lab
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-2">
            Selected Builds
          </h2>
          <p className="font-mono text-sm text-white/50">
            Real impact. Production systems.
          </p>
        </div>

        {/* Project Cards */}
        <div className="absolute top-[22vh] left-0 right-0 flex justify-center gap-6 px-[8vw]">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="w-[26vw] neural-anim-target"
              style={{
                marginTop: index === 1 ? '0' : '4vh',
                height: index === 1 ? '56vh' : '52vh',
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <NeuralCard
                className="w-full h-full p-6 flex flex-col cursor-pointer group"
                glowColor={hoveredCard === index ? 'rgba(0, 240, 255, 0.25)' : 'rgba(0, 240, 255, 0.1)'}
              >
                {/* Card Header */}
                <div className={`h-32 rounded-xl bg-gradient-to-br ${project.color} mb-6 flex items-center justify-center relative overflow-hidden`}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      {[...Array(5)].map((_, i) => (
                        <circle
                          key={i}
                          cx={30 + i * 35}
                          cy={50}
                          r={8 + Math.sin(i) * 4}
                          fill="none"
                          stroke="rgba(0, 240, 255, 0.4)"
                          strokeWidth={1}
                          className="animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </svg>
                  </div>

                  <project.icon className="w-12 h-12 text-cyan-400 relative z-10" />

                  {/* Hover arrow */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-display text-xl text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-mono text-cyan-400/80 border border-cyan-400/30 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </NeuralCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
