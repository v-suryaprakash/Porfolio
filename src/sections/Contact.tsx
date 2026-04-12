import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, Send } from 'lucide-react';
import TypewriterText from '../components/interactive/TypewriterText';

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
    href: 'mailto:surya@example.com',
    icon: Mail,
    color: 'hover:text-emerald-200',
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const blurCloudY = useTransform(scrollYProgress, [0, 1], [-70, 62]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    await new Promise<void>((resolve) => {
      window.setTimeout(() => resolve(), 1400);
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    window.setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2800);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-[60] w-full min-h-screen overflow-hidden py-24 neural-section-layer"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-1/4 h-80 w-80 rounded-full bg-cyan-500/14 blur-3xl"
        style={{ y: blurCloudY }}
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
        <div className="grid gap-10 lg:grid-cols-[1.05fr_minmax(0,0.95fr)]">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -45, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300/70">Signal Room</p>
              <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
                <TypewriterText text="Let us build something remarkable." speed={40} startDelay={140} />
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
                I am open to opportunities involving product engineering, applied AI, and interaction-rich frontend systems.
              </p>
            </div>

            <div className="rounded-2xl border border-white/12 bg-[#071224]/80 p-4">
              <div className="flex items-center gap-2">
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-100/85">Open To Opportunities</p>
              </div>
              <p className="mt-2 text-sm text-white/66">Preferred response window: within 24 hours for collaboration discussions.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {socialLinks.map((social, index) => {
                const SocialIcon = social.icon;

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex min-h-[112px] flex-col justify-between rounded-2xl border border-white/12 bg-[#071224]/72 p-4 text-white/75 transition-colors ${social.color}`}
                    whileHover={reduceMotion ? undefined : { y: -5, rotate: index === 1 ? 1.5 : -1.5, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    data-cursor-label={`Open ${social.label}`}
                  >
                    <SocialIcon className="h-7 w-7 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                    <div className="inline-flex items-center justify-between text-xs font-mono uppercase tracking-[0.16em]">
                      <span>{social.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 45, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[28px] border border-white/12 bg-[#06101f]/84 p-6 shadow-[0_26px_85px_rgba(0,0,0,0.52)] backdrop-blur-xl md:p-7"
          >
            <div className="pointer-events-none mb-5 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" />

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
                <p className="mt-2 max-w-sm text-sm text-white/66">
                  Thank you for reaching out. I will review your message and reply soon.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.55 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: reduceMotion ? 0 : 0.1,
                      delayChildren: 0.06,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full rounded-xl border border-white/12 bg-[#091428]/86 px-4 py-3 text-sm text-white outline-none transition-colors duration-300 focus:border-cyan-200/50"
                    placeholder="Your name"
                    required
                  />
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full rounded-xl border border-white/12 bg-[#091428]/86 px-4 py-3 text-sm text-white outline-none transition-colors duration-300 focus:border-cyan-200/50"
                    placeholder="you@example.com"
                    required
                  />
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                    className="h-40 w-full resize-none rounded-xl border border-white/12 bg-[#091428]/86 px-4 py-3 text-sm text-white outline-none transition-colors duration-300 focus:border-cyan-200/50"
                    placeholder="Tell me what you want to build..."
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-200/35 bg-cyan-200/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-cyan-100 transition-colors duration-300 hover:bg-cyan-200/20 disabled:cursor-not-allowed disabled:opacity-65"
                  disabled={isSubmitting}
                  data-cursor-label="Send message"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
