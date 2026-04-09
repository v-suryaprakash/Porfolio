import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NeuralCard } from '../components/neural';
import { Brain, Server, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'AI / ML',
    icon: Brain,
    skills: [
      { name: 'PyTorch / TensorFlow', level: 95 },
      { name: 'LLMs & RAG', level: 90 },
      { name: 'Computer Vision', level: 88 },
      { name: 'MLOps', level: 85 },
      { name: 'NLP', level: 82 },
      { name: 'Reinforcement Learning', level: 75 },
    ],
  },
  {
    title: 'Backend / Systems',
    icon: Server,
    skills: [
      { name: 'Python / Go / Rust', level: 92 },
      { name: 'Distributed Systems', level: 88 },
      { name: 'Kubernetes', level: 85 },
      { name: 'Kafka / Redis', level: 82 },
      { name: 'PostgreSQL / MongoDB', level: 80 },
      { name: 'gRPC / GraphQL', level: 78 },
    ],
  },
  {
    title: 'Tools / Platforms',
    icon: Wrench,
    skills: [
      { name: 'AWS / GCP / Azure', level: 88 },
      { name: 'Docker / Terraform', level: 85 },
      { name: 'Git / CI/CD', level: 90 },
      { name: 'Prometheus / Grafana', level: 80 },
      { name: 'Jupyter / MLflow', level: 85 },
      { name: 'Linux / Bash', level: 88 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const barsRef = useRef<(HTMLDivElement | null)[][]>([]);

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

      // Columns entrance
      columnsRef.current.forEach((col, index) => {
        if (!col) return;

        const directions = [
          { x: '-50vw' },
          { y: '60vh' },
          { x: '50vw' },
        ];

        gsap.fromTo(
          col,
          { ...directions[index], opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 76%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Skill bars animation
      barsRef.current.forEach((categoryBars) => {
        categoryBars.forEach((bar) => {
          if (!bar) return;
          const targetWidth = bar.dataset.level;

          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: `${targetWidth}%`,
              duration: 0.8,
              ease: 'power2.out',
              immediateRender: false,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 72%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full h-screen overflow-hidden z-40 neural-section-layer-strong"
    >
      <div className="relative z-10 w-full h-full px-[8vw]">
        {/* Title */}
        <div ref={titleRef} className="absolute top-[10vh] left-[8vw] neural-anim-target">
          <p className="font-mono text-xs text-cyan-400/60 uppercase tracking-[0.2em] mb-2">
            System Capabilities
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-2">
            Tech Stack
          </h2>
          <p className="font-mono text-sm text-white/50">
            Languages · Frameworks · Infrastructure
          </p>
        </div>

        {/* Skill Columns */}
        <div className="absolute top-[26vh] left-0 right-0 flex justify-center gap-6 px-[6vw]">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              ref={(el) => { columnsRef.current[catIndex] = el; }}
              className="w-[28vw] neural-anim-target"
            >
              <NeuralCard className="w-full p-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-display text-xl text-white">{category.title}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-white/80 group-hover:text-cyan-400 transition-colors">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-white/40">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          ref={(el) => {
                            if (!barsRef.current[catIndex]) barsRef.current[catIndex] = [];
                            barsRef.current[catIndex][skillIndex] = el;
                          }}
                          data-level={skill.level}
                          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </NeuralCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
