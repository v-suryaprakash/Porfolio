import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NeuralCard } from '../components/neural';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    type: 'work',
    icon: Briefcase,
    period: '2022 — Present',
    role: 'Staff AI Engineer',
    company: 'CoreSystems',
    description: [
      'Leading model serving infrastructure; reduced p99 latency by 40%',
      'Architected distributed training pipeline handling 10M+ samples/day',
      'Mentoring team of 8 engineers on MLOps best practices',
    ],
  },
  {
    id: 2,
    type: 'work',
    icon: Briefcase,
    period: '2019 — 2022',
    role: 'Senior ML Engineer',
    company: 'DataFlow Labs',
    description: [
      'Shipped forecasting pipelines used by 3 enterprise clients',
      'Built real-time anomaly detection reducing false positives by 60%',
      'Published 3 papers on time-series forecasting at top conferences',
    ],
  },
  {
    id: 3,
    type: 'work',
    icon: Briefcase,
    period: '2017 — 2019',
    role: 'Software Engineer',
    company: 'CloudScale',
    description: [
      'Built distributed task queues processing 1M+ jobs/day',
      'Designed monitoring dashboards used by 50+ engineers',
      'Contributed to open-source Kubernetes operators',
    ],
  },
  {
    id: 4,
    type: 'education',
    icon: GraduationCap,
    period: '2015 — 2017',
    role: 'M.S. Computer Science',
    company: 'Indian Institute of Technology',
    description: [
      'Specialization in Machine Learning and Distributed Systems',
      'Thesis: "Scalable Deep Learning for Edge Devices"',
      'GPA: 9.2/10',
    ],
  },
  {
    id: 5,
    type: 'award',
    icon: Award,
    period: '2023',
    role: 'Best AI Innovation Award',
    company: 'Tech Summit India',
    description: [
      'Recognized for predictive maintenance system reducing industrial downtime',
      'Featured in TechCrunch and Analytics India Magazine',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.5,
          },
        }
      );

      // Entry cards animation
      entriesRef.current.forEach((entry, index) => {
        if (!entry) return;

        const isLeft = index % 2 === 0;

        gsap.fromTo(
          entry,
          {
            y: 40,
            opacity: 0,
            rotateZ: isLeft ? -1.5 : 1.5,
          },
          {
            y: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: entry,
              start: 'top 80%',
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
      id="experience"
      className="relative w-full min-h-screen py-24 z-50 neural-section-layer-deep"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-cyan-400/60 uppercase tracking-[0.2em] mb-2">
            Timeline Stream
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-2">
            Experience
          </h2>
          <p className="font-mono text-sm text-white/50">
            Journey through the neural network of my career
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 origin-top"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(0, 240, 255, 0.4) 10%, rgba(0, 240, 255, 0.4) 90%, transparent 100%)',
            }}
          />

          {/* Entries */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  ref={(el) => { entriesRef.current[index] = el; }}
                  className={`relative flex items-center neural-anim-target ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Card */}
                  <div className={`w-[45%] ${isLeft ? 'pr-8' : 'pl-8'}`}>
                    <NeuralCard className="p-6">
                      {/* Period */}
                      <div className="flex items-center gap-2 mb-3">
                        <exp.icon className="w-4 h-4 text-cyan-400" />
                        <span className="font-mono text-xs text-cyan-400/60">{exp.period}</span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="font-display text-xl text-white mb-1">{exp.role}</h3>
                      <p className="font-mono text-sm text-white/60 mb-4">{exp.company}</p>

                      {/* Description */}
                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                            <span className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </NeuralCard>
                  </div>

                  {/* Timeline node */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#0A192F] shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
