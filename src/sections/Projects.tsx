import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, Github, Hammer, Sparkles, X } from 'lucide-react';
import TiltCard from '../components/interactive/TiltCard';

type ProjectStatus = 'Live' | 'In Progress';

type ProjectEntry = {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  progressWord?: string;
  summary: string;
  stack: string[];
  highlights: string[];
  visuals: Array<{ label: string; value: string }>;
  repoUrl?: string;
  gradient: string;
  accent: string;
};

const projects: ProjectEntry[] = [
  {
    id: 'poc',
    title: 'PoC',
    category: 'Health',
    status: 'Live',
    summary:
      'Proof of Consent is an AI-explained, blockchain-verified medical consent platform focused on helping patients understand before they consent.',
    stack: ['Node.js', 'Express', 'Tailwind CSS', 'Hardhat', 'Solidity'],
    highlights: [
      'AI-generated procedure explanations are rewritten in patient-friendly language.',
      'Interactive quizzes and AI chat support comprehension before signing.',
      'Consent hashes are verified with Ethereum-backed integrity checks and OTP-protected access.',
    ],
    visuals: [
      { label: 'Doctor Flow', value: 'Consent creation and patient status tracking dashboard' },
      { label: 'Patient Flow', value: 'Review, quiz, chat, and digital signature experience' },
    ],
    repoUrl: 'https://github.com/v-suryaprakash/PoC',
    gradient: 'from-emerald-500/18 via-cyan-500/16 to-[#0a1323]/95',
    accent: 'text-emerald-200',
  },
  {
    id: 'ghost-layer',
    title: 'Ghost Layer',
    category: 'Security',
    status: 'Live',
    summary:
      'Ghost Layer is a multi-carrier steganographic framework designed to hide encrypted payloads across image, audio, GIF, and text channels.',
    stack: ['Python', 'Pillow', 'GLYR Protocol', 'LSB Stego', 'Serialization'],
    highlights: [
      'Layered architecture separates serializer, header/integrity, stego engines, and orchestration.',
      'Dedicated engines support image LSB, audio sample embedding, GIF frame embedding, and zero-width text modes.',
      'GLYR 32-bit header workflow improves deterministic extraction and corruption detection.',
    ],
    visuals: [
      { label: 'Pipeline', value: 'hide.py and reveal.py orchestration flow' },
      { label: 'Carriers', value: 'Image, audio, GIF, and text embedding matrix' },
    ],
    repoUrl: 'https://github.com/v-suryaprakash/Ghost-Layer',
    gradient: 'from-indigo-500/20 via-blue-500/14 to-[#0b1024]/96',
    accent: 'text-blue-200',
  },
  {
    id: 'rarelink',
    title: 'RareLink',
    category: 'Platform',
    status: 'Live',
    summary:
      'RareLink is a privacy-first multi-portal platform connecting patients, researchers, and specialists through consent-aware collaboration workflows.',
    stack: ['Next.js', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma'],
    highlights: [
      'Three coordinated experiences cover patient, researcher, and specialist journeys.',
      'Consent-centric access control keeps data sharing approval-driven and traceable.',
      'Symptom navigator and cohort intelligence flows support trial discovery and routing.',
    ],
    visuals: [
      { label: 'Portal Surface', value: 'Multi-role dashboard with connected workflows' },
      { label: 'Service Layout', value: 'Unified gateway with patient/researcher/clinical APIs' },
    ],
    repoUrl: 'https://github.com/v-suryaprakash/RareLink',
    gradient: 'from-cyan-500/22 via-blue-500/16 to-[#08172a]/95',
    accent: 'text-cyan-200',
  },
  {
    id: 'forging',
    title: 'Forging...',
    category: 'In Progress',
    status: 'In Progress',
    progressWord: 'Forging',
    summary: 'A fresh build is in active construction.',
    stack: [],
    highlights: [],
    visuals: [],
    gradient: 'from-slate-500/22 via-cyan-500/14 to-[#091126]/96',
    accent: 'text-cyan-100',
  },
];

const layoutTransition = {
  type: 'spring' as const,
  stiffness: 180,
  damping: 26,
  mass: 0.9,
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId],
  );

  useEffect(() => {
    if (!activeProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProjectId(null);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activeProject]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [70, -55]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-30 w-full min-h-screen overflow-hidden py-24 neural-section-layer-strong"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ y: gridY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,240,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.08) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 78%)',
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.95, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.32 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300/70">Project Gallery</p>
            <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">Blueprints Between Breakthroughs</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
              Selected systems in health, security, and platform design. Tap any card to glide it into a focused command brief.
            </p>
          </div>
        </motion.div>

        <LayoutGroup id="project-cards">
          <motion.div
            className="mt-10 grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="min-h-[210px]"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 36, rotateX: -8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              >
                {activeProjectId === project.id ? (
                  <div
                    aria-hidden="true"
                    className="h-full rounded-[26px] border border-transparent"
                  />
                ) : (
                  <TiltCard
                    className="h-full rounded-[26px]"
                    maxTilt={8}
                    cursorLabel={`Inspect ${project.title}`}
                  >
                    <motion.button
                      layoutId={`project-card-${project.id}`}
                      transition={layoutTransition}
                      type="button"
                      onClick={() => setActiveProjectId(project.id)}
                      data-cursor-label={`Inspect ${project.title}`}
                      className={`group relative h-full w-full overflow-hidden rounded-[26px] border border-white/12 bg-gradient-to-br ${project.gradient} p-6 text-left transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70`}
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
                      <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-cyan-300/10 blur-2xl" />

                      <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-cyan-200/35 bg-cyan-200/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-100 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-1">
                        Inspect {project.title}
                      </span>

                      {project.status === 'In Progress' ? (
                        <div className="relative z-10 flex h-full flex-col">
                          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-100/82">
                            New Build In Progress
                          </p>

                          <div className="flex flex-1 flex-col items-center justify-center gap-4">
                            <motion.div
                              className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-200/35 bg-cyan-200/10"
                              animate={
                                reduceMotion
                                  ? undefined
                                  : {
                                      rotate: [0, -18, 10, 0],
                                      scale: [1, 1.08, 1],
                                    }
                              }
                              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                            >
                              <Hammer className="h-8 w-8 text-cyan-100" />
                            </motion.div>

                            <h3 className="font-display text-4xl text-cyan-100">Crafting...</h3>
                          </div>
                        </div>
                      ) : (
                        <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">{project.category}</p>
                            </div>

                            <h3 className={`mt-2 font-display text-3xl text-white ${project.accent}`}>
                              {project.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/72">{project.summary}</p>
                          </div>

                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                              {project.stack.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full border border-white/18 bg-white/8 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/72"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-100/90">
                              Open Project Brief
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.button>
                  </TiltCard>
                )}
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {activeProject ? (
              <>
                <motion.button
                  type="button"
                  aria-label="Close project details"
                  onClick={() => setActiveProjectId(null)}
                  className="fixed inset-0 z-[120] bg-[#010815]/88 backdrop-blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />

                <motion.div
                  className="fixed inset-0 z-[130] flex items-center justify-center p-4 md:p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.article
                    layoutId={`project-card-${activeProject.id}`}
                    transition={layoutTransition}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${activeProject.title} details`}
                    className={`relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-cyan-200/28 p-6 shadow-[0_35px_90px_rgba(2,12,30,0.72)] md:p-7`}
                  >
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${activeProject.gradient}`} />
                    <div className="pointer-events-none absolute inset-0 bg-[#041226]/90 backdrop-blur-xl" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(96,246,255,0.23),transparent_42%)]" />

                    <motion.div
                      className="relative z-10"
                      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.42, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/68">
                              {activeProject.category}
                            </p>
                            {activeProject.status === 'In Progress' ? (
                              <span className="rounded-full border border-cyan-200/35 bg-cyan-200/12 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-100">
                                {activeProject.progressWord}
                              </span>
                            ) : (
                              <span className="rounded-full border border-emerald-200/35 bg-emerald-200/12 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-100">
                                Live
                              </span>
                            )}
                          </div>

                          {activeProject.status === 'In Progress' ? null : (
                            <h3 className={`mt-2 font-display text-3xl ${activeProject.accent}`}>{activeProject.title}</h3>
                          )}
                          {activeProject.status === 'In Progress' ? null : (
                            <p className="mt-2 text-sm leading-relaxed text-white/75">{activeProject.summary}</p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveProjectId(null)}
                          className="rounded-full border border-white/20 bg-white/8 p-2 text-white/80 transition-colors hover:text-white"
                          data-cursor-label="Close panel"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {activeProject.status === 'In Progress' ? (
                        <div className="mt-10 flex flex-col items-center justify-center gap-5 pb-4">
                          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-100/82">
                            New Build In Progress
                          </p>
                          <motion.div
                            className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-200/35 bg-cyan-200/10"
                            animate={
                              reduceMotion
                                ? undefined
                                : {
                                    rotate: [0, -20, 8, 0],
                                    scale: [1, 1.1, 1],
                                  }
                            }
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <Hammer className="h-10 w-10 text-cyan-100" />
                          </motion.div>
                          <h3 className="font-display text-5xl text-cyan-100">Crafting...</h3>
                        </div>
                      ) : (
                        <>
                          <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <div>
                              <p className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-100/90">
                                <Sparkles className="h-3.5 w-3.5" />
                                Features
                              </p>
                              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-white/78">
                                {activeProject.highlights.map((point) => (
                                  <li key={point} className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-200/90" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-100/90">Visual Notes</p>
                              <div className="mt-2 space-y-2">
                                {activeProject.visuals.map((visual) => (
                                  <div key={visual.label} className="rounded-xl border border-white/15 bg-[#061327]/82 p-2.5">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/58">{visual.label}</p>
                                    <p className="mt-1 text-xs leading-relaxed text-white/80">{visual.value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 flex flex-wrap items-center gap-3">
                            {activeProject.repoUrl ? (
                              <a
                                href={activeProject.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-200/12 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-cyan-50"
                                data-cursor-label="Open repository"
                              >
                                <Github className="h-3.5 w-3.5" />
                                GitHub
                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                              </a>
                            ) : null}

                            <button
                              type="button"
                              onClick={() => setActiveProjectId(null)}
                              className="rounded-full border border-white/18 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 transition-colors hover:text-white"
                            >
                              Close
                            </button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </motion.article>
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
