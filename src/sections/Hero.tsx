import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Zap, 
  Radio, 
  Activity,
  Database,
  GitBranch,
  Eye,
  ChevronRight,
  Command,
  Layers,
  Folder,
  Code,
  Terminal
} from 'lucide-react';

const BOOT_SEQUENCE = [
  'Initializing neural interface...',
  'Loading identity matrix...',
  'SURYA_PRAKASH.V protocol activated',
  'System online and ready',
];

const SYSTEM_LOGS = [
  'Core temperature: 36.8°C',
  'Neural activity: 98.7%',
  'Memory allocation: 3.2GB/16GB',
  'Blockchain sync: Complete',
  'Security firewall: Active',
];

const DATA_STREAM = '101100111010111010010111010101101010010111010101001010101010111010101010111010101010101010101010101010101010101010';

const COMMANDS = [
  { cmd: 'whoami', desc: 'Who am I?', icon: Eye },
  { cmd: 'ls projects', desc: 'View projects', icon: Folder },
  { cmd: 'git status', desc: 'Current work', icon: GitBranch },
  { cmd: 'cat skills', desc: 'Technical skills', icon: Code },
];

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 1,
  delay: Math.random() * 5,
}));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [bootIndex, setBootIndex] = useState(0);
  const [currentLog, setCurrentLog] = useState(0);
  const [activeCommand, setActiveCommand] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);

  // Boot sequence
  useEffect(() => {
    const bootInterval = setInterval(() => {
      setBootIndex(i => {
        if (i < BOOT_SEQUENCE.length - 1) {
          return i + 1;
        } else {
          clearInterval(bootInterval);
          setTimeout(() => setBootComplete(true), 1000);
          return i;
        }
      });
    }, 800);
    return () => clearInterval(bootInterval);
  }, []);

  // System logs
  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLog(i => (i + 1) % SYSTEM_LOGS.length);
    }, 3000);
    return () => clearInterval(logInterval);
  }, []);

  // Command typing
  const handleCommandClick = (cmd: string, index: number) => {
    setActiveCommand(index);
    setCursorPos(0);
    
    let char = 0;
    const typeInterval = setInterval(() => {
      char++;
      setCursorPos(char);
      if (char >= cmd.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setActiveCommand(null);
        }, 1500);
      }
    }, 50);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 w-full min-h-screen overflow-hidden neural-section-layer-strong"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-400/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8 + p.delay,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-64 top-1/4 h-[600px] w-[600px] rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-64 bottom-1/4 h-[700px] w-[700px] rounded-full bg-purple-500/5 blur-3xl" />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-10 py-24">
        
        {/* System Status */}
        <motion.div 
          className="flex items-center justify-between mb-8 border-b border-white/10 pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-300/70 uppercase">SYSTEM ONLINE</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLog}
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Activity className="w-4 h-4 text-green-400" />
              <span className="font-mono text-xs text-green-400">{SYSTEM_LOGS[currentLog]}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Boot Sequence */}
        {!bootComplete && (
          <motion.div className="mb-8 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs text-cyan-300/70">Boot Sequence</span>
            </div>
            <div className="font-mono text-sm text-white">
              {BOOT_SEQUENCE[bootIndex]}
              <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <AnimatePresence>
          {bootComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
                
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Name: SURYA PRAKASH.V */}
                  <motion.h1 
                    className="font-display text-5xl lg:text-7xl text-white tracking-tight leading-none"
                  >
                    {['S','U','R','Y','A',' ','P','R','A','K','A','S','H','.','V'].map((char, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        whileHover={{ scale: 1.3, color: '#22d3ee', rotateY: 180 }}
                      >
                        {char === '.' ? (
                          <span className="text-cyan-400">.</span>
                        ) : (
                          char
                        )}
                      </motion.span>
                    ))}
                  </motion.h1>

                  {/* Command Prompt */}
                  <motion.div 
                    className="rounded-xl border border-cyan-400/20 bg-black/50 p-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Command className="w-4 h-4 text-cyan-400" />
                      <span className="font-mono text-xs text-white/40">system:~$</span>
                    </div>
                    
                    <div className="space-y-2 font-mono text-sm">
                      {COMMANDS.map((cmd, i) => (
                        <motion.div 
                          key={cmd.cmd}
                          className="flex items-center gap-3 cursor-pointer hover:bg-cyan-400/10 rounded p-1"
                          onClick={() => handleCommandClick(cmd.cmd, i)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + i * 0.1 }}
                        >
                          <ChevronRight className="w-4 h-4 text-cyan-400" />
                          <code className={activeCommand === i ? 'text-cyan-300' : 'text-white/60'}>
                            {activeCommand === i ? cmd.cmd.substring(0, cursorPos) : cmd.cmd}
                          </code>
                          <span className="text-white/40 text-xs">// {cmd.desc}</span>
                          <cmd.icon className="w-4 h-4 text-white/30 ml-auto" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Data Feed */}
                  <motion.div 
                    className="rounded-xl border border-purple-400/20 bg-purple-400/5 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-purple-400" />
                      <span className="font-mono text-xs text-purple-300/70">Live Feed</span>
                    </div>
                    <div className="font-mono text-[11px] text-white/50 overflow-hidden">
                      <motion.div 
                        animate={{ x: [0, -100] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{ width: '200%' }}
                      >
                        {DATA_STREAM}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col items-center justify-center">
                  {/* Neural Core */}
                  <motion.div
                    className="relative mb-8"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.5, type: 'spring', stiffness: 100 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full border border-cyan-400/20"
                        style={{ 
                          width: 200 + i * 40, 
                          height: 200 + i * 40, 
                          left: -100 - i * 20, 
                          top: -100 - i * 20 
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                      />
                    ))}
                    
                    <Cpu className="w-24 h-24 text-cyan-400 relative z-10" />
                    
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full border border-cyan-400/30"
                        style={{ 
                          width: 100 + i * 25, 
                          height: 100 + i * 25, 
                          left: -50 - i * 12.5, 
                          top: -50 - i * 12.5 
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.1, 0.3],
                        }}
                        transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </motion.div>

                  {/* Stats */}
                  <motion.div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Builds', value: '12+', icon: Zap, color: 'text-green-400' },
                      { label: 'Repos', value: '4', icon: GitBranch, color: 'text-cyan-400' },
                      { label: 'Stack', value: 'Full', icon: Layers, color: 'text-purple-400' },
                      { label: 'Status', value: 'Live', icon: Activity, color: 'text-blue-400' },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        className="flex flex-col items-center p-3 rounded-xl border border-white/10 bg-white/5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 2 + i * 0.1, type: 'spring' }}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.08)' }}
                      >
                        <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                        <div className="font-mono text-lg text-white">{stat.value}</div>
                        <div className="font-mono text-xs text-white/40">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}