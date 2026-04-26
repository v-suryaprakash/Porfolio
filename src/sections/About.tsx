import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Terminal, 
  Activity,
  Compass,
  Hammer,
  Eye,
  Rocket,
  Sparkles,
  School,
  MapPin,
  Clock,
  Database,
  Radio,
  BrainCircuit
} from 'lucide-react';

const CODE_LINES = [
  'class Surya extends Human implements Innovator {',
  '  institute: "Anna University";',
  '  pursuit: "AI & Data Science";',
  '  status: "Learning Mode: ACTIVE";',
  '  ',
  '  constructor() {',
  '    super();',
  '    this.mindset = "System Thinking";',
  '    this.approach = "Break down. Build up.";',
  '  }',
  '}',
];

const CONSCIOUSNESS = [
  'Compiling knowledge structures...',
  'Executing learning algorithms...',
  'Building neural connections...',
  'Processing system insights...',
];

// Custom hook for safe intervals
function useSafeInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(callback);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    intervalId.current = setInterval(() => savedCallback.current(), delay);
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [delay]);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [typedText, setTypedText] = useState<string[]>(Array(CODE_LINES.length).fill(''));
  const [currentLine, setCurrentLine] = useState(0);
  const [consciousnessIndex, setConsciousnessIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<number | null>(null);
  const [hoveredMethod, setHoveredMethod] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const glitchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingLineRef = useRef(0);
  const typingCharRef = useRef(0);
  const mouseFrameRef = useRef<number | null>(null);
  const mousePendingRef = useRef<{ x: number; y: number } | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const flushMousePosition = useCallback(() => {
    mouseFrameRef.current = null;
    if (!mousePendingRef.current) return;

    setMousePos(mousePendingRef.current);
    mousePendingRef.current = null;
  }, []);

  // Mouse tracking for card gradients (throttled to one update per frame)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (hoveredTag === null && hoveredMethod === null) return;

    const rect = e.currentTarget.getBoundingClientRect();
    mousePendingRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };

    if (mouseFrameRef.current === null) {
      mouseFrameRef.current = requestAnimationFrame(flushMousePosition);
    }
  }, [flushMousePosition, hoveredTag, hoveredMethod]);

  useEffect(() => {
    return () => {
      if (mouseFrameRef.current) cancelAnimationFrame(mouseFrameRef.current);
    };
  }, []);

  // Typing effect loop (single timer chain to avoid stale closures)
  useEffect(() => {
    let isActive = true;
    const typeChar = () => {
      if (!isActive) return;

      const lineIndex = typingLineRef.current;
      const charIndex = typingCharRef.current;
      const line = CODE_LINES[lineIndex];

      if (charIndex < line.length) {
        const nextChar = charIndex + 1;
        setTypedText(prev => {
          const newText = [...prev];
          newText[lineIndex] = line.slice(0, nextChar);
          return newText;
        });
        typingCharRef.current = nextChar;
        timeoutRef.current = setTimeout(typeChar, 40);
      } else if (lineIndex < CODE_LINES.length - 1) {
        const nextLine = lineIndex + 1;
        typingLineRef.current = nextLine;
        typingCharRef.current = 0;
        setCurrentLine(nextLine);
        timeoutRef.current = setTimeout(typeChar, 0);
      } else {
        // Reset after pause once all lines are complete.
        timeoutRef.current = setTimeout(() => {
          if (!isActive) return;

          typingLineRef.current = 0;
          typingCharRef.current = 0;
          setCurrentLine(0);
          setTypedText(Array(CODE_LINES.length).fill(''));

          timeoutRef.current = setTimeout(typeChar, 40);
        }, 2000);
      }
    };

    timeoutRef.current = setTimeout(typeChar, 40);
    
    return () => {
      isActive = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Consciousness stream
  useSafeInterval(() => {
    setConsciousnessIndex(i => (i + 1) % CONSCIOUSNESS.length);
  }, 3000);

  // Glitch effect - fixed
  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
      glitchTimeoutRef.current = setTimeout(() => setIsGlitching(false), 150);
    };
    
    const id = setInterval(() => {
      if (Math.random() > 0.7) triggerGlitch();
    }, 5000);
    
    return () => {
      clearInterval(id);
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
    };
  }, []);

  const tags = [
    { id: 0, label: 'Institute', value: 'Anna University', icon: School, color: 'from-cyan-400/20 to-blue-400/20' },
    { id: 1, label: 'Location', value: 'Coimbatore, IN', icon: MapPin, color: 'from-purple-400/20 to-pink-400/20' },
    { id: 2, label: 'Phase', value: 'Undergraduate', icon: Clock, color: 'from-emerald-400/20 to-cyan-400/20' },
    { id: 3, label: 'Domain', value: 'AI & Data Science', icon: Database, color: 'from-amber-400/20 to-orange-400/20' },
  ];

  const methods = [
    { step: '01', title: 'Understand', desc: 'Dive deep into the problem space. Break complexity into clarity.', icon: Eye, color: 'from-cyan-400/20 to-blue-400/20' },
    { step: '02', title: 'Plan', desc: 'Architect solutions across all layers. From pixels to databases.', icon: Compass, color: 'from-purple-400/20 to-pink-400/20' },
    { step: '03', title: 'Build', desc: 'Execute with precision. Write clean code, ship impactful systems.', icon: Hammer, color: 'from-emerald-400/20 to-green-400/20' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 w-full min-h-screen overflow-hidden py-24 neural-section-layer-strong"
      onMouseMove={handleMouseMove}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400/20"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
              width: 2 + (i % 3),
              height: 2 + (i % 3),
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Ambient glows */}
      <motion.div 
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-cyan-400/6 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div 
        className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/4 blur-3xl"
        style={{ y: y2 }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-10">
        
        {/* Status Badges */}
        <motion.div 
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10"
            whileHover={{ scale: 1.05 }}
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-300">SYSTEM ONLINE</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-400/30 bg-purple-400/10"
            whileHover={{ scale: 1.05 }}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-mono text-xs text-purple-300">NEURAL: 98%</span>
          </motion.div>
        </motion.div>

        {/* Main Title with Glitch */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={isGlitching ? {
              x: [-2, 2, -1, 1, 0],
              filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'],
            } : {}}
            transition={{ duration: isGlitching ? 0.15 : 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-tight">
              {/* Changed name to SURYA PRAKASH.V */}
              {'SURYA PRAKASH.V'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block cursor-default"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + i * 0.02, duration: 0.4 }}
                  whileHover={{ 
                    scale: 1.2, 
                    color: '#22d3ee',
                    transition: { duration: 0.15 }
                  }}
                >
                  {char === ' ' ? '\u00A0' : char === '.' ? <span className="text-purple-400">.</span> : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Animated underline */}
          <motion.div 
            className="h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: '50%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
          />
        </div>

        {/* Quote Section - Added new creative section */}
        <motion.div
          className="mt-8 mb-12 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative inline-block">
            <div className="absolute -top-8 left-0 text-6xl text-cyan-400/20 font-serif leading-none">
              "
            </div>
            <motion.h2 
              className="font-display text-2xl md:text-3xl text-white/90 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Building the future by blending{' '}
              <motion.span 
                className="text-cyan-400 font-semibold"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring" }}
              >
                AI innovation
              </motion.span>
              {' '}with{' '}
              <motion.span 
                className="text-purple-400 font-semibold"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring" }}
              >
                strong engineering
              </motion.span>
              .
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Crafting intelligent systems that{' '}
              <motion.span 
                className="text-emerald-400 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                scale
              </motion.span>
              ,{' '}
              <motion.span 
                className="text-cyan-400 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                adapt
              </motion.span>
              , and{' '}
              <motion.span 
                className="text-purple-400 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                evolve
              </motion.span>
              .
            </motion.p>
            <div className="absolute -bottom-8 right-0 text-6xl text-cyan-400/20 font-serif leading-none">
              "
            </div>
          </div>
        </motion.div>

        {/* Tags Grid - Square with Gradient Hover */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
          {tags.map((tag, i) => (
            <motion.div
              key={tag.id}
              className="relative aspect-square p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              onMouseEnter={() => setHoveredTag(tag.id)}
              onMouseLeave={() => setHoveredTag(null)}
            >
              {/* Mouse-following gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-radial ${tag.color} opacity-0 transition-opacity duration-300 pointer-events-none`}
                style={{
                  opacity: hoveredTag === tag.id ? 0.6 : 0,
                  background: hoveredTag === tag.id 
                    ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(34,211,238,0.3) 0%, transparent 60%)`
                    : 'none',
                }}
              />
              
              {/* Border glow on hover */}
              <motion.div 
                className="absolute inset-0 rounded-xl border-2 border-cyan-400/0"
                animate={{ borderColor: hoveredTag === tag.id ? 'rgba(34,211,238,0.5)' : 'rgba(34,211,238,0)' }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative flex flex-col items-center justify-center h-full text-center">
                <motion.div
                  animate={{ y: hoveredTag === tag.id ? -2 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <tag.icon className="w-6 h-6 text-cyan-400/70 mb-3" />
                </motion.div>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">{tag.label}</span>
                <span className="text-white text-sm font-medium mt-1">{tag.value}</span>
              </div>

              {/* Bottom accent */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredTag === tag.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Terminal */}
        <motion.div 
          className="max-w-2xl mx-auto mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="relative rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <Terminal className="w-4 h-4 text-cyan-400 ml-2" />
              <span className="font-mono text-xs text-white/40">entity.js</span>
            </div>
            
            <div className="p-5 font-mono text-sm relative">
              {/* Scan line */}
              <motion.div 
                className="absolute left-0 right-0 h-8 bg-gradient-to-b from-cyan-400/5 to-transparent pointer-events-none"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {CODE_LINES.map((line, i) => (
                <div 
                  key={i}
                  className={`flex ${
                    i === currentLine ? 'text-cyan-300' : i < currentLine ? 'text-white/70' : 'text-white/30'
                  }`}
                >
                  <span className="w-8 text-white/20 text-right pr-3 select-none">{i + 1}</span>
                  <span className="relative">
                    {typedText[i]}
                    {i === currentLine && typedText[i].length < line.length && (
                      <span className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 animate-pulse" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Consciousness stream */}
          <motion.div 
            className="flex items-center justify-center gap-3 mt-4 px-4 py-2 rounded-full border border-white/5 bg-white/5"
          >
            <Activity className="w-3.5 h-3.5 text-green-400" />
            <motion.span 
              key={consciousnessIndex}
              className="font-mono text-xs text-cyan-200/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {CONSCIOUSNESS[consciousnessIndex]}
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Philosophy Section with Gradient Hover */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Rocket className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs text-cyan-300 uppercase tracking-wider">Methodology</span>
            </motion.div>
            <h2 className="font-display text-3xl text-white">How I Build</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {methods.map((item, i) => (
              <motion.div 
                key={item.step}
                className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                onMouseEnter={() => setHoveredMethod(i)}
                onMouseLeave={() => setHoveredMethod(null)}
              >
                {/* Mouse-following gradient - same effect as tags */}
                <motion.div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
                  style={{
                    opacity: hoveredMethod === i ? 0.5 : 0,
                    background: hoveredMethod === i 
                      ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(34,211,238,0.25) 0%, transparent 60%)`
                      : 'none',
                  }}
                />
                
                {/* Border glow */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl border-2 border-cyan-400/0"
                  animate={{ borderColor: hoveredMethod === i ? 'rgba(34,211,238,0.4)' : 'rgba(34,211,238,0)' }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-3xl font-bold text-white/10 group-hover:text-white/20 transition-colors">{item.step}</span>
                    <motion.div 
                      className="p-2 rounded-lg bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-colors"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                  </div>
                  <h3 className="font-display text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{item.desc}</p>
                  
                  <motion.div 
                    className="mt-4 h-0.5 w-full bg-white/10 rounded-full overflow-hidden"
                  >
                    <motion.div 
                      className="h-full bg-cyan-400"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5"
            whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.3)' }}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-sm text-white/60">Always learning</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}