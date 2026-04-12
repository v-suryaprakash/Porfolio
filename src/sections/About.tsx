import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Activity, ArrowRight, Binary, GitBranch, Sparkles } from 'lucide-react';

interface StoryChapter {
  id: string;
  title: string;
  period: string;
  summary: string;
  highlights: string[];
}

interface Metric {
  label: string;
  target: number;
  suffix?: string;
}

const storyChapters: StoryChapter[] = [
  {
    id: '01',
    title: 'Origin Layer',
    period: 'Present',
    summary:
      'I am currently pursuing B.Tech in Artificial Intelligence and Data Science at Anna University while building production-minded software in public.',
    highlights: [
      'Profile focus: applied AI, systems design, and engineering craft',
      'Build style: fast prototypes with strict refactor discipline',
      'Location context: India-based, collaborating across time zones',
    ],
  },
  {
    id: '02',
    title: 'Proof Of Consent',
    period: '2025 - 2026',
    summary:
      'PoC is a medical consent platform that combines AI explanation and blockchain verification, designed to help patients truly understand what they are signing.',
    highlights: [
      'AI-generated consent explanations in patient-friendly language',
      'Consent integrity secured through Ethereum record anchoring',
      'Doctor and patient experiences designed for trust and clarity',
    ],
  },
  {
    id: '03',
    title: 'RareLink',
    period: '2026',
    summary:
      'RareLink is a privacy-first, multi-portal ecosystem linking patients, researchers, and specialists into a single consent-aware workflow for rare disease collaboration.',
    highlights: [
      'Unified orchestration between patient, researcher, and specialist portals',
      'Consent lifecycle synchronization across service boundaries',
      'Cohort intelligence workflows to accelerate trial discovery',
    ],
  },
  {
    id: '04',
    title: 'Ghost Layer',
    period: '2026',
    summary:
      'Ghost Layer is a multi-carrier steganographic framework focused on modular architecture, payload integrity, and covert transport across image, audio, GIF, and text carriers.',
    highlights: [
      'Custom header protocol for deterministic payload extraction',
      'Separate serializer, integrity, engine, and orchestration layers',
      'Research-first architecture tuned for extensibility and security',
    ],
  },
];

const metrics: Metric[] = [
  { label: 'Contributions Last Year', target: 37, suffix: '+' },
  { label: 'Public Repositories', target: 4 },
  { label: 'Flagship Builds', target: 3 },
];

const currentSignals = [
  'Deepening RareLink cross-portal consistency checks',
  'Refining Ghost Layer payload reliability constraints',
  'Pushing portfolio interactions toward crafted micro-details',
];

function CounterMetric({
  label,
  target,
  suffix,
  inView,
  delay,
}: Metric & { inView: boolean; delay: number }) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setCount(target);
      return;
    }

    let rafId = 0;
    const duration = 1250;
    const start = performance.now() + delay;

    const tick = (now: number) => {
      if (now < start) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [delay, inView, reduceMotion, target]);

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1323]/70 p-5"
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
      <p className="font-display text-4xl text-white">
        {count}
        {suffix ?? ''}
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">{label}</p>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const orbOneY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [70, -55]);

  const activeChapter = storyChapters[activeChapterIndex];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 w-full min-h-screen overflow-hidden py-20 neural-section-layer-strong"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-28 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
        style={{ y: orbOneY }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
        style={{ y: orbTwoY }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <motion.div
          className="rounded-[30px] border border-white/10 bg-[#060d1d]/80 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:p-10"
          initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0 round 30px)', opacity: 0.5 }}
          whileInView={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0 round 30px)', opacity: 1 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
            <aside>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300/70">Story Protocol</p>
              <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
                <span className="block">Not A Bio.</span>
                <span className="block gradient-text">A Build Narrative.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                Explore this as chapters. Every chapter has a different engineering intent and execution style.
              </p>

              <div className="mt-6 space-y-3">
                {storyChapters.map((chapter, index) => {
                  const selected = index === activeChapterIndex;

                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      onClick={() => setActiveChapterIndex(index)}
                      className={`group w-full rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                        selected
                          ? 'border-cyan-300/60 bg-cyan-300/12'
                          : 'border-white/10 bg-white/5 hover:border-cyan-300/35 hover:bg-cyan-300/8'
                      }`}
                      data-cursor-label="Open chapter"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-200/70">{chapter.id}</span>
                        <ArrowRight className={`h-4 w-4 text-cyan-200/70 transition-transform ${selected ? 'translate-x-0.5' : ''}`} />
                      </div>
                      <p className="mt-2 font-display text-lg text-white">{chapter.title}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{chapter.period}</p>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeChapter.id}
                  className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-[#0b1730]/92 via-[#08172a]/88 to-[#041022]/90 p-6 lg:p-8"
                  initial={{ opacity: 0, x: 48, rotateY: -8 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -40, rotateY: 8 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="pointer-events-none absolute right-5 top-4 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10">
                    <Binary className="h-8 w-8 text-cyan-200/65" />
                  </div>

                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-200/70">{activeChapter.period}</p>
                  <h3 className="mt-2 font-display text-3xl text-white">{activeChapter.title}</h3>
                  <p className="mt-4 max-w-3xl leading-relaxed text-white/75">{activeChapter.summary}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {activeChapter.highlights.map((item) => (
                      <motion.div
                        key={item}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                      >
                        <p className="text-sm text-white/75">{item}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl border border-white/10 bg-[#081424]/80 p-4">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/70" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                      </span>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-200/80">Currently</p>
                    </div>
                    <div className="mt-3 space-y-2">
                      {currentSignals.map((signal) => (
                        <div key={signal} className="flex items-start gap-2 text-sm text-white/72">
                          <Sparkles className="mt-0.5 h-3.5 w-3.5 text-cyan-200/70" />
                          <span>{signal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric, index) => (
              <CounterMetric
                key={metric.label}
                label={metric.label}
                target={metric.target}
                suffix={metric.suffix}
                inView={inView}
                delay={index * 130}
              />
            ))}
          </div>

          <motion.div
            className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/55"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 font-mono uppercase tracking-[0.16em]">
              <Activity className="h-3 w-3 text-cyan-300/70" />
              Live Build Rhythm
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 font-mono uppercase tracking-[0.16em]">
              <GitBranch className="h-3 w-3 text-cyan-300/70" />
              Open Source First
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
