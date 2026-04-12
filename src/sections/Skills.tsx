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
  subtitle: string;
  icon: LucideIcon;
  branches: SkillBranch[];
}

const skillFields: SkillField[] = [
  {
    id: 'programming',
    label: 'Programming Languages',
    subtitle: 'Core coding stack',
    icon: Code2,
    branches: [
      {
        title: 'Python',
        points: ['NumPy', 'Pandas'],
      },
      {
        title: 'C',
        points: ['Pointers', 'Structures'],
      },
      {
        title: 'Java',
        points: ['OOP', 'Collections'],
      },
      {
        title: 'HTML / CSS / JavaScript',
        points: ['DOM', 'Fetch API'],
      },
    ],
  },
  {
    id: 'aiml',
    label: 'AI & ML',
    subtitle: 'Data to model workflow',
    icon: BrainCircuit,
    branches: [
      {
        title: 'Data Analysis',
        points: ['Pandas', 'NumPy'],
      },
      {
        title: 'Machine Learning',
        points: ['Scikit-learn', 'Model Selection'],
      },
      {
        title: 'Deep Learning (Basic)',
        points: ['TensorFlow', 'Keras'],
      },
      {
        title: 'Preprocessing & Visualization',
        points: ['Matplotlib', 'StandardScaler'],
      },
    ],
  },
  {
    id: 'software',
    label: 'Software & System Development',
    subtitle: 'Practical system building',
    icon: Boxes,
    branches: [
      {
        title: 'Backend Logic Development',
        points: ['Node.js', 'Express'],
      },
      {
        title: 'Database Design & Management',
        points: ['PostgreSQL', 'SQL'],
      },
      {
        title: 'Web3 / Blockchain Fundamentals',
        points: ['Solidity', 'Hardhat'],
      },
      {
        title: 'Full Stack Development',
        points: ['React', 'REST API'],
      },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Technologies',
    subtitle: 'Daily development tools',
    icon: Wrench,
    branches: [
      {
        title: 'Git & GitHub',
        points: ['Git', 'GitHub'],
      },
      {
        title: 'Jupyter Notebook',
        points: ['IPython', 'Notebook Cells'],
      },
      {
        title: 'Matplotlib / Scikit-learn',
        points: ['Matplotlib', 'Scikit-learn'],
      },
      {
        title: 'Linux',
        points: ['Bash', 'CLI'],
      },
    ],
  },
  {
    id: 'mindset',
    label: 'Mindset & Strengths',
    subtitle: 'Execution mindset',
    icon: Sparkles,
    branches: [
      {
        title: 'Analytical Thinking',
        points: ['Pattern Analysis', 'Root Cause'],
      },
      {
        title: 'Problem Decomposition',
        points: ['Modular Breakdown', 'Task Prioritization'],
      },
      {
        title: 'Self-Driven and Fast Learning',
        points: ['Rapid Adaptation', 'Self Learning'],
      },
      {
        title: 'Consistency & Discipline',
        points: ['Daily Practice', 'Execution Focus'],
      },
    ],
  },
];

const branchLayout = [
  {
    targetX: 27,
    targetY: 28,
    anchorX: 43,
    anchorY: 43,
    controlX: 34,
    controlY: 34,
    cardClass: 'left-[3.5%] top-[10%] w-[27%]',
  },
  {
    targetX: 73,
    targetY: 28,
    anchorX: 57,
    anchorY: 43,
    controlX: 66,
    controlY: 34,
    cardClass: 'right-[3.5%] top-[10%] w-[27%]',
  },
  {
    targetX: 27,
    targetY: 72,
    anchorX: 43,
    anchorY: 57,
    controlX: 34,
    controlY: 66,
    cardClass: 'left-[3.5%] bottom-[10%] w-[27%]',
  },
  {
    targetX: 73,
    targetY: 72,
    anchorX: 57,
    anchorY: 57,
    controlX: 66,
    controlY: 66,
    cardClass: 'right-[3.5%] bottom-[10%] w-[27%]',
  },
] as const;

function CenterNode({
  field,
  reducedMotion,
}: {
  field: SkillField;
  reducedMotion: boolean;
}) {
  const FieldIcon = field.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={field.id}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.86, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: -18 }}
        transition={{ duration: 0.38, ease: [0.2, 1, 0.3, 1] }}
        className="relative mx-auto w-full max-w-[390px]"
      >
        <div className="relative min-h-[250px] overflow-hidden border border-cyan-200/35 bg-[#061325]/92 px-6 pb-12 pt-8 shadow-[0_0_45px_rgba(0,240,255,0.22)] [clip-path:polygon(8%_0%,92%_0%,100%_18%,100%_68%,74%_68%,50%_100%,26%_68%,0%_68%,0%_18%)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-300/10 blur-2xl" />
          <div className="pointer-events-none absolute left-1/2 top-[66%] h-16 w-16 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-xl" />

          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-200/30 bg-cyan-200/12">
              <FieldIcon className="h-7 w-7 text-cyan-100" />
            </div>
          </div>

          <h3 className="mx-auto mt-4 max-w-[310px] text-center font-display text-[clamp(1.9rem,2.2vw,2.8rem)] leading-tight text-cyan-50">
            {field.label}
          </h3>
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/62">
            {field.subtitle}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Skills() {
  const reducedMotion = useReducedMotion();
  const [activeFieldId, setActiveFieldId] = useState(skillFields[0].id);

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
          <p className="font-mono text-xs text-cyan-400/60 uppercase tracking-[0.2em]">Capability Map</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl text-white">Skills</h2>
          <p className="mt-2 font-mono text-sm text-white/50">Pick a field above to rewire the center and branch network.</p>
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
                  data-cursor-label={`Open ${field.label}`}
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
            {branchLayout.map((node, index) => (
              <g key={`line-${activeField.id}-${index}`}>
                <motion.path
                  d={`M ${node.anchorX} ${node.anchorY} Q ${node.controlX} ${node.controlY} ${node.targetX} ${node.targetY}`}
                  fill="none"
                  stroke="rgba(125, 234, 255, 0.5)"
                  strokeWidth="0.28"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                />

                <motion.circle
                  cx={node.targetX}
                  cy={node.targetY}
                  r="0.65"
                  fill="rgba(159, 244, 255, 0.95)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25, delay: 0.18 + index * 0.05 }}
                />

                <motion.circle
                  cx={node.anchorX}
                  cy={node.anchorY}
                  r="0.52"
                  fill="rgba(159, 244, 255, 0.7)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25, delay: 0.15 + index * 0.05 }}
                />
              </g>
            ))}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-20 w-[30%] min-w-[290px] -translate-x-1/2 -translate-y-1/2">
            <CenterNode field={activeField} reducedMotion={Boolean(reducedMotion)} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeField.id} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {activeField.branches.map((branch, index) => {
                const node = branchLayout[index];
                const originX = (50 - node.targetX) * 5;
                const originY = (50 - node.targetY) * 5;

                return (
                  <motion.div
                    key={`${activeField.id}-${branch.title}`}
                    className={`absolute ${node.cardClass}`}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: originX, y: originY, scale: 0.86 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: originX * 0.35, y: originY * 0.35, scale: 0.92 }}
                    transition={{ duration: 0.45, delay: 0.1 + index * 0.06, ease: [0.2, 1, 0.3, 1] }}
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
          <CenterNode field={activeField} reducedMotion={Boolean(reducedMotion)} />

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