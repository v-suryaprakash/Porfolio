import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ArrowUpRight, Github, Linkedin, Mail, Send, Zap, Code2, Calendar, Trophy, Users, MessageCircle } from 'lucide-react';
import TypewriterText from '../components/interactive/TypewriterText';
import TiltCard from '../components/interactive/TiltCard';
import ParticleField from '../components/neural/ParticleField';

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/v-suryaprakash',
    icon: Github,
    color: 'hover:text-cyan-200',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/v-suryaprakash',
    icon: Linkedin,
    color: 'hover:text-blue-200',
  },
  {
    label: 'Mail',
    href: 'mailto:v.surya.prakash.2210@gmail.com?subject=Portfolio Inquiry',
    icon: Mail,
    color: 'hover:text-emerald-200',
  },
] as const;

const careerHighlights = [
  {
    icon: Code2,
    title: 'Tech Stack',
    description: 'Core Technologies',
    detail: 'React, Python, Solidity, PostgreSQL',
  },
  {
    icon: Calendar,
    title: 'Availability',
    description: 'Full-time Ready',
    detail: 'Remote/Hybrid preferred',
  },
  {
    icon: Trophy,
    title: 'Focus Areas',
    description: 'ML & Security',
    detail: 'Consent systems, steganography',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Team Player',
    detail: 'Cross-functional product teams',
  },
  {
    icon: MessageCircle,
    title: 'Communication',
    description: 'Clear & Technical',
    detail: 'Docs, presentations, reviews',
  },
  {
    icon: Zap,
    title: 'Values',
    description: 'Privacy-First',
    detail: 'Security, performance, UX',
  },
] as const;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const blurCloudY = useTransform(scrollYProgress, [0, 1], [-70, 62]);

  useEffect(() => {
    if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'v.surya.prakash.2210@gmail.com',
    };

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
      );

      if (result.status === 200) {
        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        setIsSubmitting(false);
        setErrorMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage('An unexpected error occurred. Please try again.');
      console.error('EmailJS error:', error);
    }
  };

  const SocialLinkButton = ({
    link,
    index,
  }: {
    link: typeof socialLinks[number];
    index: number;
  }) => {
    const Icon = link.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <TiltCard className="h-full rounded-[26px]" maxTilt={6}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex min-h-[112px] flex-col justify-between rounded-2xl border border-white/12 bg-[#071224]/72 p-4 text-white/75 transition-all duration-300 ${link.color}`}
            data-cursor-label={`Open ${link.label}`}
          >
            <div className="flex items-start justify-between">
              <Icon className="h-7 w-7 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
              <ArrowUpRight className="h-3.5 w-3.5 text-white/55 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="mt-3">
              <p className="font-mono text-xs uppercase tracking-[0.16em]">{link.label}</p>
            </div>
          </a>
        </TiltCard>
      </motion.div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-[60] w-full min-h-screen overflow-hidden py-24 neural-section-layer"
    >
      {/* Ambient background effects */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-cyan-500/14 blur-3xl"
        style={{ y: blurCloudY, contain: 'strict' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-12 h-[420px] w-[420px] rounded-full bg-blue-500/12 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [-10, 28, -10],
                x: [0, -16, 0],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -20, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300/70">Contact</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl text-white">
            <TypewriterText text="Let us build something remarkable." speed={40} startDelay={140} />
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/65">
            I am open to opportunities involving product engineering, applied AI, and interaction-rich frontend systems.
          </p>
        </motion.div>

        {/* Contact Section */}
        <div className="relative mt-8 flex flex-col gap-6 lg:h-[calc(100vh-200px)] lg:items-center lg:justify-center">
          {/* Contact Form */}
          <div className="flex w-full max-w-3xl flex-col">
            {isSubmitted ? (
              <motion.div
                className="flex min-h-[360px] flex-col items-center justify-center text-center"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-200/35 bg-cyan-200/10">
                  <Send className="h-7 w-7 text-cyan-200" />
                </div>
                <h3 className="font-display text-2xl text-white">Signal Delivered</h3>
                <p className="mt-2 max-w-sm text-sm text-white/66">Thank you for reaching out. I will review your message and reply soon.</p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="rounded-[28px] border border-white/12 bg-[#071224]/84 p-6 backdrop-blur-xl md:p-7"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                      staggerChildren: reduceMotion ? 0 : 0.08,
                    },
                  },
                }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" />
                <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-cyan-300/10 blur-2xl" />

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border border-rose-200/30 bg-rose-200/10 px-3 py-2 text-xs text-rose-200"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                <motion.div custom={0} variants={itemVariants}>
                  <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-xl border border-white/12 bg-[#091428]/86 px-4 py-3 text-sm text-white outline-none transition-colors duration-300 focus:border-cyan-200/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                    placeholder="Your name"
                    required
                  />
                </motion.div>

                <motion.div custom={1} variants={itemVariants}>
                  <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-xl border border-white/12 bg-[#091428]/86 px-4 py-3 text-sm text-white outline-none transition-colors duration-300 focus:border-cyan-200/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                    placeholder="you@example.com"
                    required
                  />
                </motion.div>

                <motion.div custom={2} variants={itemVariants}>
                  <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">Message</label>
                  <textarea
                    value={formData.message}
                    on Change={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="h-40 w-full resize-none rounded-xl border border-white/12 bg-[#091428]/86 px-4 py-3 text-sm text-white outline-none transition-colors duration-300 focus:border-cyan-200/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                    placeholder="Tell me what you want to build..."
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-200/35 bg-cyan-200/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-cyan-100 transition-all duration-300 hover:bg-cyan-2 00/20 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] disabled:cursor-not-allowed disabled:opacity-65"
                  custom={3}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-100/35 border-t-cyan-100" />
                      Sending
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      Send Signal
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </div>

          {/* Bottom section with social buttons */}
          <div className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left: Social buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-100">Connect</h3>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link, index) => (
                  <SocialLinkButton key={link.label} link={link} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Right: Open to opportunities centered */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex h-full items-center justify-center"
            >
              <div className="inline-flex items-center gap-2 rounded-2xl border border-cyan-200/30 bg-cyan-2 00/10 px-4 py-2 font-mono text-sm uppercase tracking-[0.2em] text-cyan-100 shadow-[0_6px_18px_rgba(0,240,255,0.15)]">
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </span>
                Open To Opportunities
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="mt-8 space-y-6 lg:hidden">
          <div className="rounded-2xl border border-white/12 bg-[#071224]/80 p-4">
            <div className="flex items-center gap-2">
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </span>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-100/85">Open To Opportunities</p>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-[28px] border border-white/12 bg-[#06101f]/84 p-6 backdrop-blur-xl md:p-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, staggerChildren: 0.08, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {/* Mobile form fields */}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};
