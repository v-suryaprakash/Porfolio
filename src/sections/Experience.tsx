import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Award, BriefcaseBusiness, GraduationCap, Sparkles } from 'lucide-react';

type TimelineEntry = {
  year: string;
  role: string;
  organization: string;
  type: 'Build' | 'Engineering' | 'Education' | 'Recognition';
  badge: string;
  summary: string;
  bullets: string[];
};

const timelineEntries: TimelineEntry[] = [
  {
    year: '2026',
    role: 'Founder Engineer',
    organization: 'RareLink',
    type: 'Build',
    badge: 'RL',
    summary:
      'Designed a privacy-first collaboration platform connecting patients, researchers, and specialists under a consent-centric architecture.',
    bullets: [
      'Built synchronized patient-researcher-specialist workflows',
      'Shaped gateway-driven API architecture for cross-portal consistency',
      'Focused on trust, data control, and operational clarity',
    ],
  },
  {
    year: '2026',
    role: 'Security Framework Developer',
    organization: 'Ghost Layer',
    type: 'Engineering',
    badge: 'GL',
    summary:
      'Developed a modular steganographic framework for secure payload hiding across image, audio, GIF, and text carriers.',
    bullets: [
      'Implemented layered serializer and protocol design',
      'Engineered deterministic reveal flows for payload integrity',
      'Maintained extensible architecture for future carrier engines',
    ],
  },
  {
    year: '2025',
    role: 'Product Co-Builder',
    organization: 'PoC - Proof of Consent',
    type: 'Build',
    badge: 'PC',
    summary:
      'Co-created a healthcare consent platform combining AI simplification and blockchain verification to improve patient understanding.',
    bullets: [
      'Mapped doctor and patient flows for transparent consent journeys',
      'Integrated AI explanation pathways and quiz-based comprehension',
      'Linked consent integrity with blockchain-backed records',
    ],
  },
  {
    year: 'Now',
    role: 'B.Tech AI and Data Science',
    organization: 'Anna University',
    type: 'Education',
    badge: 'AU',
    summary:
      'Pursuing formal AI and data systems training while shipping real-world products in public repositories.',
    bullets: [
      'Balancing academic depth with iterative product execution',
      'Applying course concepts directly into production prototypes',
      'Building a practical, systems-first engineering mindset',
    ],
  },
  {
    year: '2026',
    role: 'Consistent Open Source Contributor',
    organization: 'GitHub Activity',
    type: 'Recognition',
    badge: 'GH',
    summary:
      'Sustained active contribution rhythm across RareLink, Ghost Layer, and portfolio evolution with visible iteration velocity.',
    bullets: [
      '37 contributions in the last year on the public profile',
      'Frequent project refinement and architecture cleanup passes',
      'Continuous documentation and implementation polishing',
    ],
  },
];

const typeIconMap = {
  Build: BriefcaseBusiness,
  Engineering: Sparkles,
  Education: GraduationCap,
  Recognition: Award,
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 20%'],
  });

  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  const ambientY = useTransform(scrollYProgress, [0, 1], [60, -70]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-50 w-full min-h-screen overflow-hidden py-24 neural-section-layer-deep"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
        style={{ y: ambientY }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300/70">Experience Journal</p>
          <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">Editorial Timeline</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-white/65">
            A magazine-style journey of projects, learning, and contributions, arranged as chapters with visual anchors.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 lg:block">
            <div className="absolute inset-0 bg-white/12" />
            <motion.div
              className="absolute inset-0 origin-top bg-gradient-to-b from-cyan-300/95 via-cyan-300/65 to-cyan-300/15"
              style={{ scaleY: lineProgress }}
            />
          </div>

          <div className="space-y-16 lg:space-y-20">
            {timelineEntries.map((entry, index) => {
              const isLeft = index % 2 === 0;
              const EntryIcon = typeIconMap[entry.type];

              return (
                <motion.article
                  key={`${entry.organization}-${entry.role}`}
                  className="relative grid items-start gap-6 lg:grid-cols-2"
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: isLeft ? -90 : 90, rotateY: isLeft ? 12 : -12 }
                  }
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={isLeft ? 'lg:pr-14' : 'lg:col-start-2 lg:pl-14'}>
                    <div className="group relative overflow-hidden rounded-[26px] border border-white/12 bg-[#071224]/85 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                      <p className="pointer-events-none absolute right-3 top-1 font-display text-7xl text-white/[0.04] md:text-8xl">
                        {entry.year}
                      </p>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-200/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-100/90">
                            <EntryIcon className="h-3.5 w-3.5" />
                            {entry.type}
                          </span>
                          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">{entry.year}</span>
                        </div>

                        <h3 className="mt-4 font-display text-2xl text-white">{entry.role}</h3>
                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-200/75">{entry.organization}</p>

                        <p className="mt-4 text-sm leading-relaxed text-white/72">{entry.summary}</p>

                        <ul className="mt-5 space-y-2">
                          {entry.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2 text-sm text-white/66">
                              <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute left-1/2 top-8 hidden -translate-x-1/2 lg:block">
                    <div className="group/anchor pointer-events-auto relative flex h-12 w-12 items-center justify-center rounded-full border border-cyan-200/45 bg-[#051224] shadow-[0_0_18px_rgba(0,240,255,0.45)]">
                      <span className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-100">{entry.badge}</span>
                      <div className="absolute left-1/2 top-14 w-max -translate-x-1/2 rounded-lg border border-white/12 bg-[#071224]/95 px-3 py-2 text-[11px] text-white/75 opacity-0 transition-opacity duration-250 group-hover/anchor:opacity-100">
                        {entry.organization}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
