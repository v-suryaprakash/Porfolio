import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  BrainCircuit,
  Boxes,
  Code2,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import TiltCard from '../components/interactive/TiltCard';

interface SkillBranch {
  title: string;
  points: string[];
}

interface SkillField {
  id: string;
  label: string;
  labelLines: [string, string];
  subtitle: string;
  icon: LucideIcon;
  branches: SkillBranch[];
}

const skillFields: SkillField[] = [
  {
    id: 'programming',
    label: 'Programming Languages',
    labelLines: ['Programming', 'Languages'],
    subtitle: 'Core coding stack',
    icon: Code2,
    branches: [
      { title: 'Python', points: ['NumPy', 'Pandas'] },
      { title: 'C', points: ['Pointers', 'Structures'] },
      { title: 'Java', points: ['OOP', 'Collections'] },
      { title: 'HTML / CSS / JavaScript', points: ['DOM', 'Fetch API'] },
    ],
  },
  {
    id: 'aiml',
    label: 'Machine Learning',
    labelLines: ['Machine', 'Learning'],
    subtitle: 'Data to model workflow',
    icon: BrainCircuit,
    branches: [
      { title: 'Data Analysis', points: ['Pandas', 'NumPy'] },
      { title: 'Machine Learning', points: ['Scikit-learn', 'Model Selection'] },
      { title: 'Deep Learning (Basic)', points: ['TensorFlow', 'Keras'] },
      { title: 'Preprocessing & Visualization', points: ['Matplotlib', 'StandardScaler'] },
    ],
  },
  {
    id: 'software',
    label: 'System Development',
    labelLines: ['System', 'Development'],
    subtitle: 'Practical system building',
    icon: Boxes,
    branches: [
      { title: 'Backend Logic Development', points: ['Node.js', 'Express'] },
      { title: 'Database Design & Management', points: ['PostgreSQL', 'SQL'] },
      { title: 'Web3 / Blockchain Fundamentals', points: ['Solidity', 'Hardhat'] },
      { title: 'Full Stack Development', points: ['React', 'REST API'] },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Technologies',
    labelLines: ['Tools &', 'Technologies'],
    subtitle: 'Daily development tools',
    icon: Wrench,
    branches: [
      { title: 'Git & GitHub', points: ['Git', 'GitHub'] },
      { title: 'Jupyter Notebook', points: ['IPython', 'Notebook Cells'] },
      { title: 'Matplotlib / Scikit-learn', points: ['Matplotlib', 'Scikit-learn'] },
      { title: 'Linux', points: ['Bash', 'CLI'] },
    ],
  },
  {
    id: 'mindset',
    label: 'Mindset & Strengths',
    labelLines: ['Mindset &', 'Strengths'],
    subtitle: 'Execution mindset',
    icon: Sparkles,
    branches: [
      { title: 'Analytical Thinking', points: ['Pattern Analysis', 'Root Cause'] },
      { title: 'Problem Decomposition', points: ['Modular Breakdown', 'Task Prioritization'] },
      { title: 'Self-Driven and Fast Learning', points: ['Rapid Adaptation', 'Self Learning'] },
      { title: 'Consistency & Discipline', points: ['Daily Practice', 'Execution Focus'] },
    ],
  },
];

const branchLayout = [
  { targetX: 32.8, targetY: 36.5, anchorX: 43.0, anchorY: 43, cardClass: 'left-[4%] top-[12%] w-[28%]' },
  { targetX: 67.2, targetY: 42.5, anchorX: 56.0, anchorY: 38, cardClass: 'right-[4%] top-[12%] w-[28%]' },
  { targetX: 32.8, targetY: 58.5, anchorX: 44.0, anchorY: 44, cardClass: 'left-[4%] bottom-[12%] w-[28%]' },
  { targetX: 67.2, targetY: 58.5, anchorX: 56.0, anchorY: 44, cardClass: 'right-[4%] bottom-[12%] w-[28%]' },
] as const;

const clockwiseRevealOrder = [0, 1, 3, 2] as const;

const revealDelays = {
  hologram: 0.08,
  label: 0.34,
  skills: 0.74,
  step: 0.16,
} as const;

function getClockwiseDelay(index: number) {
  const step = clockwiseRevealOrder.indexOf(index as (typeof clockwiseRevealOrder)[number]);
  return revealDelays.skills + Math.max(0, step) * revealDelays.step;
}

function HologramCore({
  field,
  reducedMotion,
}: {
  field: SkillField;
  reducedMotion: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={field.id}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.35, ease: [0.2, 1, 0.3, 1] }}
        className="relative mx-auto h-[268px] w-full max-w-[540px] sm:h-[304px] lg:h-[334px]"
      >
        {/* Realistic Hologram Light Rays */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[18%] flex justify-center origin-bottom"
          initial={{ opacity: 0, scaleY: 0.1 }}
          animate={
            reducedMotion
              ? { opacity: 1, scaleY: 1 }
              : { opacity: [0.5, 0.8, 0.4, 0.9, 0.6], scaleY: [0.95, 1.05, 0.98, 1.08, 1] }
          }
          transition={
            reducedMotion
              ? { duration: 0.3, delay: revealDelays.hologram + 0.1 }
              : { duration: 2.2, delay: revealDelays.hologram + 0.1, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          {/* Main Cone */}
          <div className="relative h-[190px] w-[200px] [clip-path:polygon(42%_100%,58%_100%,100%_0%,0%_0%)]">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/40 via-cyan-300/10 to-transparent" />
            
            {/* Animated Scanning Lines effect embedded via Framer Motion inside the cone */}
            <motion.div 
              className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_4px,rgba(162,247,255,0.4)_5px,transparent_6px)] opacity-60"
              animate={{ y: ['0%', '-10%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
            
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_6px,rgba(162,247,255,0.15)_8px,transparent_10px)] opacity-70" />
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-cyan-200/50 to-transparent" />
          </div>
          
          {/* Core Beam */}
          <div className="absolute bottom-0 h-[230px] w-[240px] [clip-path:polygon(46%_100%,54%_100%,80%_0%,20%_0%)] bg-gradient-to-t from-white/50 via-cyan-100/20 to-transparent blur-[2px]" />
          
          {/* Subtle Outer Glow */}
          <div className="absolute bottom-0 h-[230px] w-[320px] [clip-path:polygon(45%_100%,55%_100%,100%_0%,0%_0%)] bg-gradient-to-t from-cyan-600/30 via-cyan-900/10 to-transparent blur-[8px]" />
        </motion.div>

        {/* Hologram Base 3D Structure */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[2%] flex flex-col items-center justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            reducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: [0.8, 1, 0.85, 1], scale: [0.99, 1.01, 1, 1.01] }
          }
          transition={
            reducedMotion
              ? { duration: 0.3, delay: revealDelays.hologram }
              : { duration: 2.5, delay: revealDelays.hologram, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <div className="relative h-[60px] w-[240px]">
            {/* Bottom Base Layer */}
            <div className="absolute bottom-0 left-1/2 h-[45px] w-[240px] -translate-x-1/2 rounded-[50%] border border-cyan-800/60 bg-[#020815] shadow-[0_15px_30px_rgba(0,180,255,0.25)]" />
            
            {/* Middle Pillar */}
            <div className="absolute bottom-[16px] left-1/2 h-[30px] w-[230px] -translate-x-1/2 rounded-[50%] border-x-2 border-cyan-500/30 bg-gradient-to-b from-[#061223] to-[#040e1e]" />
            
            {/* Top Emitting Surface */}
            <div className="absolute bottom-[10px] left-1/2 h-[45px] w-[230px] -translate-x-1/2 rounded-[50%] border-2 border-cyan-400/50 bg-[#081a33] shadow-[0_0_40px_rgba(50,220,255,0.4)_inset]" />
            
            {/* Inner Ring (Lens) */}
            <div className="absolute bottom-[28px] left-1/2 h-[35px] w-[190px] -translate-x-1/2 rounded-[50%] border border-cyan-300/80 bg-cyan-900/40" />
            <div className="absolute bottom-[38px] left-1/2 h-[25px] w-[140px] -translate-x-1/2 rounded-[50%] border border-white/50 bg-cyan-300/20" />
            
            {/* Core Light Emitter */}
            <div className="absolute bottom-[44px] left-1/2 h-[15px] w-[80px] -translate-x-1/2 rounded-[50%] bg-cyan-100 shadow-[0_0_25px_10px_rgba(100,240,255,0.8)] blur-[2px]" />
            <div className="absolute bottom-[48px] left-1/2 h-[6px] w-[40px] -translate-x-1/2 rounded-[50%] bg-white blur-[1px]" />
            
            {/* Ground Reflection */}
            <div className="absolute -bottom-[20px] left-1/2 h-[20px] w-[280px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.25)_0%,transparent_70%)] blur-[6px]" />
          </div>
        </motion.div>

        {/* Floating Text Label */}
        <motion.div
          className="absolute inset-x-0 top-[25%] flex justify-center px-3"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.94, filter: 'blur(8px)' }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.32, delay: revealDelays.label }}
        >
          <div className="pointer-events-none absolute left-1/2 top-[56%] h-[122px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/12 blur-[30px]" />
          <motion.h3
            className="max-w-[390px] text-center font-display text-[clamp(2rem,2.3vw,3rem)] leading-[1.06] text-cyan-100"
            style={{ textShadow: '0 0 28px rgba(83, 244, 255, 0.7)' }}
            animate={
              reducedMotion
                ? { opacity: 1 }
                : {
                    opacity: [0.68, 1, 0.8, 1, 0.88],
                  }
            }
            transition={
              reducedMotion
                ? { duration: 0.2 }
                : { duration: 1.65, repeat: Infinity, ease: 'easeInOut', delay: revealDelays.label }
            }
          >
            <span className="block">{field.labelLines[0]}</span>
            <span className="block">{field.labelLines[1]}</span>
          </motion.h3>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Skills() {
  const reducedMotion = useReducedMotion();
  const [activeFieldId, setActiveFieldId] = useState('tools');

  const activeField = useMemo(
    () => skillFields.find((field) => field.id === activeFieldId) ?? skillFields[0],
    [activeFieldId],
  );

  return (
    <section
      id="skills"
      className="relative z-40 w-full min-h-screen overflow-hidden py-16 lg:h-screen lg:py-10 neural-section-layer-strong"
    >
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-6 lg:px-10">
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs text-cyan-400/60 uppercase tracking-[0.2em]">Tech Arsenal</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl text-white">Skill Constellation</h2>
          <p className="mt-2 font-mono text-sm text-white/50">Select a domain to visualize the capability graph powering end-to-end product execution.</p>
        </motion.div>

        <div className="relative mt-4 overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#061223]/72 p-2 shadow-[0_12px_35px_rgba(2,10,25,0.5)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/85 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-80%,rgba(104,244,255,0.22),transparent_55%)]" />

          <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {skillFields.map((field) => {
              const isActive = field.id === activeField.id;
              const TabIcon = field.icon;

              return (
                <button
                  key={field.id}
                  type="button"
                  onClick={() => setActiveFieldId(field.id)}
                  className="group relative rounded-xl px-3 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/75"
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-skill-field"
                      className="absolute inset-0 rounded-xl border border-cyan-200/50 bg-gradient-to-br from-cyan-200/20 via-cyan-200/10 to-transparent shadow-[0_6px_18px_rgba(0,240,255,0.2)]"
                      transition={{ type: 'spring', stiffness: 210, damping: 24 }}
                    />
                  ) : null}

                  <span className="pointer-events-none absolute inset-0 rounded-xl border border-transparent transition-colors duration-300 group-hover:border-cyan-200/25" />

                  <span className="relative z-10 flex items-center gap-2">
                    <TabIcon
                      className={`h-4 w-4 transition-colors ${
                        isActive ? 'text-cyan-100' : 'text-white/45 group-hover:text-cyan-200/80'
                      }`}
                    />
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.13em] transition-colors ${
                        isActive ? 'text-cyan-50' : 'text-white/62 group-hover:text-white/88'
                      }`}
                    >
                      {field.label}
                    </span>
                  </span>

                  <motion.span
                    className="pointer-events-none absolute bottom-1.5 left-3 h-[2px] rounded-full bg-cyan-200/70"
                    initial={false}
                    animate={{ width: isActive ? '48%' : '0%' }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-5 hidden min-h-0 flex-1 overflow-hidden rounded-[24px] border border-white/10 bg-[#041022]/35 lg:block">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {branchLayout.map((node, index) => {
              const revealDelay = getClockwiseDelay(index);

              return (
                <g key={`line-${activeField.id}-${index}`}>
                  <motion.path
                    d={`M ${node.anchorX} ${node.anchorY} L ${node.targetX} ${node.targetY}`}
                    fill="none"
                    stroke="rgba(125, 234, 255, 0.5)"
                    strokeWidth="0.22"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.42, delay: revealDelay }}
                  />

                  <motion.circle
                    cx={node.targetX}
                    cy={node.targetY}
                    r="0.65"
                    fill="rgba(159, 244, 255, 0.95)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.22, delay: revealDelay + 0.07 }}
                  />

                  <motion.circle
                    cx={node.anchorX}
                    cy={node.anchorY}
                    r="0.52"
                    fill="rgba(159, 244, 255, 0.7)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.22, delay: revealDelay + 0.03 }}
                  />
                </g>
              );
            })}
          </svg>

          <div className="absolute inset-x-0 top-[60%] z-20 flex -translate-y-1/2 justify-center px-4">
            <div className="w-full max-w-[560px]">
              <HologramCore field={activeField} reducedMotion={Boolean(reducedMotion)} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeField.id} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {activeField.branches.map((branch, index) => {
                const node = branchLayout[index];
                const originX = (50 - node.targetX) * 5;
                const originY = (50 - node.targetY) * 5;
                const revealDelay = getClockwiseDelay(index);

                return (
                  <motion.div
                    key={`${activeField.id}-${branch.title}`}
                    className={`absolute ${node.cardClass}`}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: originX, y: originY, scale: 0.88 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: originX * 0.35, y: originY * 0.35, scale: 0.92 }}
                    transition={{ duration: 0.4, delay: revealDelay + 0.04, ease: [0.2, 1, 0.3, 1] }}
                    whileHover={{ y: -4, scale: 1.01 }}
                  >
                    <TiltCard className="h-full rounded-2xl" maxTilt={8}>
                      <div className="group relative h-full overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-[#081a2d]/88 via-[#0a2038]/62 to-[#071427]/88 p-4 transition-colors hover:border-cyan-200/35 hover:from-[#0b223a]/90 hover:to-[#08213a]/92">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-200/75 to-transparent" />
                        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-300/10 blur-2xl" />

                        <p className="relative font-display text-[1.7rem] leading-tight text-cyan-100">{branch.title}</p>
                        <ul className="relative mt-2 space-y-1.5">
                          {branch.points.map((point) => (
                            <li key={point} className="flex items-start gap-2 text-[0.95rem] leading-snug text-white/72">
                              <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full bg-cyan-200/85" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 space-y-4 lg:hidden">
          <HologramCore field={activeField} reducedMotion={Boolean(reducedMotion)} />

          <AnimatePresence mode="wait">
            <motion.div key={`mobile-${activeField.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-3">
              {activeField.branches.map((branch, index) => (
                <motion.div
                  key={`${activeField.id}-mobile-${branch.title}`}
                  className="relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-[#081a2d]/88 via-[#0a2038]/62 to-[#071427]/88 p-4"
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: index * 0.06 }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-200/75 to-transparent" />
                  <p className="font-display text-xl text-cyan-100">{branch.title}</p>
                  <ul className="mt-2 space-y-1.5">
                    {branch.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm leading-snug text-white/72">
                        <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full bg-cyan-200/85" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
