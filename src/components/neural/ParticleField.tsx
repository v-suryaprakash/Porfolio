import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  driftSeed: number;
  driftSpeed: number;
  glow: number;
}

interface SpringLink {
  a: number;
  b: number;
  restLength: number;
  stiffness: number;
}

interface ThreadChain {
  nodeIndices: number[];
  springs: SpringLink[];
  hue: number;
  phase: number;
  speed: number;
  alpha: number;
  flex: number;
  flexVelocity: number;
  flexTarget: number;
  flexShiftAt: number;
}

interface PointerState {
  x: number;
  y: number;
  active: boolean;
}

interface ParticleFieldProps {
  className?: string;
}

interface RenderQualityProfile {
  particleScale: number;
  targetFrameMs: number;
  springPasses: number;
  shadowScale: number;
  strandLayers: number;
  drawCrossLinks: boolean;
  particleGlowLayers: number;
}

const TAU = Math.PI * 2;
const GLITCH_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-=';

const randomBetween = (min: number, max: number): number => min + Math.random() * (max - min);

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

interface WordRange {
  start: number;
  end: number;
}

const mutateWordsForGlitch = (text: string, intensity: number): string => {
  const ranges: WordRange[] = [];
  const wordPattern = /\b[A-Za-z0-9]{3,}\b/g;
  let match: RegExpExecArray | null;

  while ((match = wordPattern.exec(text)) !== null) {
    ranges.push({ start: match.index, end: match.index + match[0].length });
  }

  if (ranges.length === 0) {
    return text;
  }

  const chars = text.split('');
  const targetWordCount = Math.min(ranges.length, Math.max(1, Math.floor(1 + intensity * 0.7)));
  const pickedWordIndexes = new Set<number>();

  while (pickedWordIndexes.size < targetWordCount) {
    pickedWordIndexes.add(Math.floor(Math.random() * ranges.length));
  }

  const mutationChance = clamp(0.32 + intensity * 0.12, 0.32, 0.52);

  pickedWordIndexes.forEach((wordIndex) => {
    const range = ranges[wordIndex];
    let mutated = false;

    for (let index = range.start; index < range.end; index++) {
      const char = chars[index];
      if (!/[A-Za-z0-9]/.test(char)) continue;

      if (Math.random() < mutationChance) {
        chars[index] = GLITCH_CHARSET[Math.floor(Math.random() * GLITCH_CHARSET.length)];
        mutated = true;
      }
    }

    if (!mutated) {
      const mutableIndexes: number[] = [];

      for (let index = range.start; index < range.end; index++) {
        if (/[A-Za-z0-9]/.test(chars[index])) {
          mutableIndexes.push(index);
        }
      }

      if (mutableIndexes.length > 0) {
        const forcedIndex = mutableIndexes[Math.floor(Math.random() * mutableIndexes.length)];
        chars[forcedIndex] = GLITCH_CHARSET[Math.floor(Math.random() * GLITCH_CHARSET.length)];
      }
    }
  });

  return chars.join('');
};

const distance = (a: Particle, b: Particle): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.hypot(dx, dy);
};

const particleCountForWidth = (width: number, reducedMotion: boolean): number => {
  if (reducedMotion) return width < 768 ? 34 : 48;
  if (width < 640) return 52;
  if (width < 1024) return 72;
  return 92;
};

const threadCountForParticles = (particleCount: number, reducedMotion: boolean): number => {
  const ratio = reducedMotion ? 0.16 : 0.24;
  return Math.max(10, Math.floor(particleCount * ratio));
};

const getRenderQualityProfile = (reducedMotion: boolean): RenderQualityProfile => {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;

  if (reducedMotion || cores <= 2 || memory <= 2) {
    return {
      particleScale: 0.34,
      targetFrameMs: 42,
      springPasses: 1,
      shadowScale: 0.42,
      strandLayers: 1,
      drawCrossLinks: false,
      particleGlowLayers: 1,
    };
  }

  if (cores <= 4 || memory <= 4) {
    return {
      particleScale: 0.5,
      targetFrameMs: 34,
      springPasses: 1,
      shadowScale: 0.58,
      strandLayers: 1,
      drawCrossLinks: false,
      particleGlowLayers: 1,
    };
  }

  return {
    particleScale: 0.68,
    targetFrameMs: 26,
    springPasses: 1,
    shadowScale: 0.74,
    strandLayers: 1,
    drawCrossLinks: false,
    particleGlowLayers: 2,
  };
};

function createParticles(width: number, height: number, count: number): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const angle = randomBetween(0, TAU);
    const speed = randomBetween(0.05, 0.22);

    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: randomBetween(1.25, 3.2),
      driftSeed: randomBetween(0, TAU),
      driftSpeed: randomBetween(0.25, 0.9),
      glow: randomBetween(0.55, 1),
    });
  }

  return particles;
}

function createThreads(
  particles: Particle[],
  threadCount: number,
  width: number,
  height: number
): ThreadChain[] {
  const threads: ThreadChain[] = [];
  const maxLinkDistance = Math.min(Math.max(width, height) * 0.28, 260);

  for (let i = 0; i < threadCount; i++) {
    const chainSize = 2 + Math.floor(Math.random() * 3);
    const startIndex = Math.floor(Math.random() * particles.length);
    const nodeIndices = [startIndex];
    const used = new Set<number>(nodeIndices);

    while (nodeIndices.length < chainSize) {
      const previous = particles[nodeIndices[nodeIndices.length - 1]];
      let bestCandidate = -1;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (let attempt = 0; attempt < 24; attempt++) {
        const candidateIndex = Math.floor(Math.random() * particles.length);
        if (used.has(candidateIndex)) continue;

        const candidate = particles[candidateIndex];
        const dist = Math.hypot(candidate.x - previous.x, candidate.y - previous.y);

        if (dist < bestDistance) {
          bestDistance = dist;
          bestCandidate = candidateIndex;
        }
      }

      if (bestCandidate === -1 || bestDistance > maxLinkDistance) {
        break;
      }

      nodeIndices.push(bestCandidate);
      used.add(bestCandidate);
    }

    if (nodeIndices.length < 2) {
      continue;
    }

    const springs: SpringLink[] = [];
    for (let n = 0; n < nodeIndices.length - 1; n++) {
      const a = nodeIndices[n];
      const b = nodeIndices[n + 1];
      springs.push({
        a,
        b,
        restLength: distance(particles[a], particles[b]),
        stiffness: randomBetween(0.0018, 0.0038),
      });
    }

    threads.push({
      nodeIndices,
      springs,
      hue: randomBetween(182, 198),
      phase: randomBetween(0, TAU),
      speed: randomBetween(0.5, 1.7),
      alpha: randomBetween(0.35, 0.72),
      flex: randomBetween(-10, 10),
      flexVelocity: 0,
      flexTarget: randomBetween(-12, 12),
      flexShiftAt: randomBetween(0.8, 3.2),
    });
  }

  return threads;
}

function applyPhysics(
  particles: Particle[],
  threads: ThreadChain[],
  pointer: PointerState,
  frameDelta: number,
  elapsedSeconds: number,
  width: number,
  height: number,
  glitchAmount: number,
  springPasses: number
) {
  const boundaryPadding = 42;
  const pointerRadius = 128;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const driftX = Math.cos(elapsedSeconds * p.driftSpeed + p.driftSeed) * 0.018;
    const driftY = Math.sin(elapsedSeconds * (p.driftSpeed + 0.17) + p.driftSeed) * 0.018;
    const microDriftX = Math.sin(elapsedSeconds * (1.1 + p.driftSpeed) + p.driftSeed * 2.4) * 0.012;
    const microDriftY = Math.cos(elapsedSeconds * (1.35 + p.driftSpeed) + p.driftSeed * 1.7) * 0.012;

    p.vx += driftX * frameDelta;
    p.vy += driftY * frameDelta;
    p.vx += microDriftX * frameDelta;
    p.vy += microDriftY * frameDelta;

    if (glitchAmount > 0.12) {
      const glitchPush = (Math.random() - 0.5) * 0.035 * glitchAmount * frameDelta;
      p.vx += glitchPush;
      p.vy -= glitchPush * 0.7;
    }

    if (pointer.active) {
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 0 && dist < pointerRadius) {
        const influence = (1 - dist / pointerRadius) * 0.08 * frameDelta;
        p.vx += (dx / dist) * influence;
        p.vy += (dy / dist) * influence;
      }
    }
  }

  for (let pass = 0; pass < springPasses; pass++) {
    for (let i = 0; i < threads.length; i++) {
      const thread = threads[i];

      for (let s = 0; s < thread.springs.length; s++) {
        const spring = thread.springs[s];
        const a = particles[spring.a];
        const b = particles[spring.b];

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 1;
        const stretch = dist - spring.restLength;
        const force = stretch * spring.stiffness * frameDelta;

        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }
    }
  }

  const damping = clamp(0.983 - glitchAmount * 0.02, 0.94, 0.988);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    p.vx *= damping;
    p.vy *= damping;

    p.x += p.vx * frameDelta * 2.25;
    p.y += p.vy * frameDelta * 2.25;

    if (p.x < -boundaryPadding) {
      p.x = -boundaryPadding;
      p.vx *= -0.8;
    } else if (p.x > width + boundaryPadding) {
      p.x = width + boundaryPadding;
      p.vx *= -0.8;
    }

    if (p.y < -boundaryPadding) {
      p.y = -boundaryPadding;
      p.vy *= -0.8;
    } else if (p.y > height + boundaryPadding) {
      p.y = height + boundaryPadding;
      p.vy *= -0.8;
    }
  }

  for (let i = 0; i < threads.length; i++) {
    const thread = threads[i];

    if (elapsedSeconds > thread.flexShiftAt) {
      thread.flexTarget = randomBetween(-13, 13);
      thread.flexShiftAt = elapsedSeconds + randomBetween(0.9, 3.5);
    }

    thread.flexVelocity += (thread.flexTarget - thread.flex) * 0.045 * frameDelta;
    thread.flexVelocity *= 0.86;
    thread.flex += thread.flexVelocity;
    thread.phase += thread.speed * frameDelta * 0.022;
  }
}

function drawScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  particles: Particle[],
  threads: ThreadChain[],
  elapsedSeconds: number,
  glitchAmount: number,
  ambientGradient: CanvasGradient | null,
  qualityProfile: RenderQualityProfile,
  revealAmount: number
) {
  if (revealAmount <= 0.001 && glitchAmount < 0.05) {
    ctx.clearRect(0, 0, width, height);
    return;
  }

  ctx.clearRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = clamp(revealAmount * 1.35, 0, 1);

  ctx.fillStyle = ambientGradient ?? 'rgba(2, 6, 23, 0.15)';
  ctx.fillRect(0, 0, width, height);

  if (glitchAmount > 0.02) {
    const jitterX = (Math.random() - 0.5) * 3.2 * glitchAmount;
    const jitterY = (Math.random() - 0.5) * 2.2 * glitchAmount;
    ctx.translate(jitterX, jitterY);
  }

  ctx.globalCompositeOperation = 'lighter';

  for (let i = 0; i < threads.length; i++) {
    const thread = threads[i];
    const pulse = 0.5 + Math.sin(elapsedSeconds * thread.speed + thread.phase) * 0.5;

    for (let n = 0; n < thread.nodeIndices.length - 1; n++) {
      const p1 = particles[thread.nodeIndices[n]];
      const p2 = particles[thread.nodeIndices[n + 1]];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = -dy / dist;
      const ny = dx / dist;

      const bend = (thread.flex * 0.55 + Math.sin(elapsedSeconds * (thread.speed * 1.15) + n * 0.8 + thread.phase) * 4.4)
        * (0.42 + pulse * 0.58);

      const cx = (p1.x + p2.x) * 0.5 + nx * bend;
      const cy = (p1.y + p2.y) * 0.5 + ny * bend;

      const twistPhase = elapsedSeconds * (thread.speed * 2.5) + n * 1.65 + thread.phase;
      const twistAmplitude = (0.95 + pulse * 1.45) * (0.72 + qualityProfile.shadowScale * 0.28);
      const twistStart = Math.sin(twistPhase) * twistAmplitude;
      const twistEnd = Math.sin(twistPhase + Math.PI) * twistAmplitude;
      const twistMid = Math.sin(twistPhase + Math.PI * 0.5) * twistAmplitude * 0.5;

      const drawStrand = (sign: number, widthScale: number, alphaScale: number, hueShift: number) => {
        const sx = p1.x + nx * (twistStart * sign);
        const sy = p1.y + ny * (twistStart * sign);
        const ex = p2.x + nx * (twistEnd * sign);
        const ey = p2.y + ny * (twistEnd * sign);
        const cxs = cx + nx * (twistMid * sign);
        const cys = cy + ny * (twistMid * sign);

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(cxs, cys, ex, ey);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = (7 + pulse * 7) * qualityProfile.shadowScale;
        ctx.shadowColor = `hsla(${thread.hue + hueShift}, 100%, 64%, ${thread.alpha * 0.28 * alphaScale})`;
        ctx.strokeStyle = `hsla(${thread.hue + hueShift}, 100%, 69%, ${thread.alpha * (0.24 + pulse * 0.2) * alphaScale})`;
        ctx.lineWidth = (1.05 + pulse * 0.5) * widthScale;
        ctx.stroke();
      };

      drawStrand(1, 1, 1, 0);
      if (qualityProfile.strandLayers > 1) {
        drawStrand(-1, 0.92, 0.82, 8);
      }

      if (qualityProfile.drawCrossLinks && (n + i) % 2 === 0) {
        const midX = (p1.x + p2.x) * 0.5 + nx * bend * 0.08;
        const midY = (p1.y + p2.y) * 0.5 + ny * bend * 0.08;
        const cross = twistAmplitude * 0.45;

        ctx.beginPath();
        ctx.moveTo(midX + nx * cross, midY + ny * cross);
        ctx.lineTo(midX - nx * cross, midY - ny * cross);
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `hsla(${thread.hue + 14}, 100%, 86%, ${thread.alpha * 0.2})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.quadraticCurveTo(cx, cy, p2.x, p2.y);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = `hsla(${thread.hue + 14}, 100%, 84%, ${thread.alpha * (0.24 + pulse * 0.14)})`;
      ctx.lineWidth = 0.34;
      ctx.stroke();
    }
  }

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    const flicker = 0.72 + Math.sin(elapsedSeconds * 2.3 + particle.driftSeed * 2) * 0.28;
    const glowRadius = particle.radius * (3 + flicker * 1.7);

    if (qualityProfile.particleGlowLayers > 1) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(0, 222, 255, ${0.045 * particle.glow})`;
      ctx.arc(particle.x, particle.y, glowRadius, 0, TAU);
      ctx.fill();
    }

    ctx.beginPath();
    ctx.fillStyle = `rgba(75, 232, 255, ${0.42 * flicker})`;
    ctx.arc(particle.x, particle.y, particle.radius * 1.18, 0, TAU);
    ctx.fill();

    if (qualityProfile.particleGlowLayers > 1) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(225, 255, 255, ${0.78 * flicker})`;
      ctx.arc(particle.x, particle.y, Math.max(0.58, particle.radius * 0.48), 0, TAU);
      ctx.fill();
    }
  }

  // Glitch visual effects on content only - NOT on background canvas
  // Removed canvas stripe drawing that caused background blanking
  // Text glitch effects still apply via triggerTextGlitch function

  ctx.restore();
}

export default function ParticleField({ className = '' }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });
  const glitchAmountRef = useRef(0);
  const lastGlitchAtRef = useRef(0);
  const glitchResetTimerRef = useRef<number | null>(null);
  const periodicGlitchIntervalRef = useRef<number | null>(null);
  const textRestoreTimersRef = useRef<number[]>([]);
  const activeTextTargetsRef = useRef<HTMLElement[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);
  const rafIdRef = useRef(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const qualityProfile = getRenderQualityProfile(reducedMotion);

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];
    let threads: ThreadChain[] = [];
    let ambientGradient: CanvasGradient | null = null;
    let lastRenderAt = performance.now();
    let introAlpha = 0;
    let revealAmount = 0;
    let revealTarget = 0;
    let scrollDepthFactor = 0;
    let clearedWhenHidden = false;

    const clearTextGlitchTargets = () => {
      for (let index = 0; index < textRestoreTimersRef.current.length; index++) {
        window.clearTimeout(textRestoreTimersRef.current[index]);
      }
      textRestoreTimersRef.current = [];

      for (let index = 0; index < activeTextTargetsRef.current.length; index++) {
        const target = activeTextTargetsRef.current[index];
        target.classList.remove('neural-text-glitch-active');
        target.removeAttribute('data-neural-glitch');
      }

      activeTextTargetsRef.current = [];
    };

    const resolveCurrentSection = (): HTMLElement | null => {
      const sectionElements = Array.from(document.querySelectorAll<HTMLElement>('main > [id]'));
      if (sectionElements.length === 0) {
        return null;
      }

      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight * 0.5;
      let bestSection: HTMLElement | null = null;
      let bestScore = Number.NEGATIVE_INFINITY;

      for (let index = 0; index < sectionElements.length; index++) {
        const section = sectionElements[index];
        const rect = section.getBoundingClientRect();
        const intersection = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
        const centerDistance = Math.abs((rect.top + rect.bottom) * 0.5 - viewportCenter);
        const centerBoost = rect.top <= viewportCenter && rect.bottom >= viewportCenter ? 10000 : 0;
        const score = centerBoost + intersection * 1.8 - centerDistance;

        if (score > bestScore) {
          bestScore = score;
          bestSection = section;
        }
      }

      return bestSection;
    };

    const triggerTextGlitch = (intensity: number) => {
      clearTextGlitchTargets();

      const activeSection = resolveCurrentSection();
      if (!activeSection) {
        return;
      }

      const candidates = Array.from(
        activeSection.querySelectorAll<HTMLElement>('h1, h2, h3, p, li, span, a')
      ).filter((element) => {
        if (!element.isConnected) return false;
        if (element.closest('[aria-hidden="true"]')) return false;
        if (element.childNodes.length !== 1 || element.firstChild?.nodeType !== Node.TEXT_NODE) return false;

        const rect = element.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight || rect.width <= 0 || rect.height <= 0) {
          return false;
        }

        const text = (element.textContent ?? '').trim();
        return text.length >= 3 && text.length <= 120;
      });

      if (candidates.length === 0) {
        return;
      }

      // Increase number of words affected by glitch - random words, not entire lines.
      // Keep DOM ownership with React by only using CSS data attributes for visual glitch.
      const maxTargets = Math.min(candidates.length, Math.max(2, Math.floor(3 + intensity * 4)));
      const usedIndexes = new Set<number>();

      for (let pick = 0; pick < maxTargets; pick++) {
        let candidateIndex = Math.floor(Math.random() * candidates.length);
        let guard = 0;

        while (usedIndexes.has(candidateIndex) && guard < 20) {
          candidateIndex = Math.floor(Math.random() * candidates.length);
          guard++;
        }

        usedIndexes.add(candidateIndex);

        const target = candidates[candidateIndex];
        const originalText = target.textContent ?? '';
        const glitchedText = mutateWordsForGlitch(originalText, intensity);

        if (glitchedText === originalText) {
          continue;
        }

        target.setAttribute('data-neural-glitch', glitchedText);
        target.classList.add('neural-text-glitch-active');
        activeTextTargetsRef.current.push(target);

        const restoreTimer = window.setTimeout(() => {
          if (!target.isConnected) return;

          target.classList.remove('neural-text-glitch-active');
          target.removeAttribute('data-neural-glitch');
        }, Math.floor(170 + intensity * 110));

        textRestoreTimersRef.current.push(restoreTimer);
      }
    };

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    const updateRevealTarget = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const revealFadeInStart = height * 0.12;
      const revealFadeInEnd = height * 1.06;
      const fadeInRange = Math.max(1, revealFadeInEnd - revealFadeInStart);
      const fadeIn = clamp((scrollY - revealFadeInStart) / fadeInRange, 0, 1);

      revealTarget = fadeIn;
      scrollDepthFactor = clamp((scrollY - height * 2.2) / (height * 5.2), 0, 1);
    };

    let scrollRafId = 0;
    const onScroll = () => {
      if (scrollRafId) return;

      scrollRafId = window.requestAnimationFrame(() => {
        scrollRafId = 0;
        updateRevealTarget();
      });
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const maxDpr = qualityProfile.particleScale < 0.65
        ? 1.12
        : qualityProfile.particleScale < 0.82
        ? 1.24
        : 1.36;
      const dpr = clamp(window.devicePixelRatio || 1, 1, maxDpr);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      updateRevealTarget();

      ambientGradient = context.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.08,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7
      );
      ambientGradient.addColorStop(0, 'rgba(12, 52, 86, 0.12)');
      ambientGradient.addColorStop(1, 'rgba(2, 6, 23, 0)');

      const particleCount = Math.max(
        28,
        Math.floor(particleCountForWidth(width, reducedMotion) * qualityProfile.particleScale)
      );
      const threadCount = Math.max(
        10,
        Math.floor(threadCountForParticles(particleCount, reducedMotion) * (0.9 + qualityProfile.particleScale * 0.1))
      );

      particles = createParticles(width, height, particleCount);
      threads = createThreads(particles, threadCount, width, height);
      lastRenderAt = performance.now();
    };

    const triggerGlitch = (intensity: number) => {
      const now = performance.now();
      if (now - lastGlitchAtRef.current < 2400) return;

      lastGlitchAtRef.current = now;
      const normalizedIntensity = clamp(intensity, 0.35, 1);
      glitchAmountRef.current = Math.min(1, Math.max(glitchAmountRef.current, normalizedIntensity));
      setIsGlitching(true);

      if (!reducedMotion) {
        triggerTextGlitch(normalizedIntensity);
      }

      if (glitchResetTimerRef.current) {
        window.clearTimeout(glitchResetTimerRef.current);
      }

      glitchResetTimerRef.current = window.setTimeout(() => {
        setIsGlitching(false);
        clearTextGlitchTargets();
      }, Math.floor(randomBetween(180, 300)));
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
      pointerRef.current.active = true;
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };

    const onGlitchSignal = (event: Event) => {
      const detail = (event as CustomEvent<{ intensity?: number }>).detail;
      const requestedIntensity = detail?.intensity;
      triggerGlitch(requestedIntensity ?? randomBetween(0.55, 0.85));
    };

    const onVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;

      if (isVisibleRef.current) {
        lastRenderAt = performance.now();
      } else {
        setIsGlitching(false);
        clearTextGlitchTargets();
      }
    };

    const animate = (timestamp: number) => {
      if (!isVisibleRef.current) {
        lastRenderAt = timestamp;
        rafIdRef.current = window.requestAnimationFrame(animate);
        return;
      }

      // Throttle to target frame rate
      const elapsedSinceRender = timestamp - lastRenderAt;
      const frameBudget = qualityProfile.targetFrameMs + scrollDepthFactor * 8;

      if (elapsedSinceRender < frameBudget) {
        rafIdRef.current = window.requestAnimationFrame(animate);
        return;
      }

      const frameDelta = Math.min(elapsedSinceRender / 16.6667, 2.6);
      const elapsedSeconds = timestamp / 1000;
      lastRenderAt = timestamp;
      introAlpha = clamp(introAlpha + frameDelta * 0.032, 0, 1);

      glitchAmountRef.current = Math.max(0, glitchAmountRef.current - frameDelta * 0.042);
      const revealLerp = clamp(0.09 * frameDelta, 0.05, 0.28);
      revealAmount += (revealTarget - revealAmount) * revealLerp;
      const baseReveal = Math.max(revealAmount, glitchAmountRef.current * 0.25);
      const effectiveReveal = baseReveal * introAlpha;

      if (effectiveReveal < 0.01 && glitchAmountRef.current < 0.05) {
        if (!clearedWhenHidden) {
          context.clearRect(0, 0, width, height);
          clearedWhenHidden = true;
        }

        rafIdRef.current = window.requestAnimationFrame(animate);
        return;
      }

      clearedWhenHidden = false;

      applyPhysics(
        particles,
        threads,
        pointerRef.current,
        frameDelta,
        elapsedSeconds,
        width,
        height,
        glitchAmountRef.current,
        qualityProfile.springPasses
      );

      drawScene(
        context,
        width,
        height,
        particles,
        threads,
        elapsedSeconds,
        glitchAmountRef.current,
        ambientGradient,
        qualityProfile,
        effectiveReveal
      );

      rafIdRef.current = window.requestAnimationFrame(animate);
    };

    resizeCanvas();

    if (!reducedMotion) {
      const initialGlitchDelay = window.setTimeout(() => {
        triggerGlitch(randomBetween(0.58, 0.82));
      }, 1800);
      textRestoreTimersRef.current.push(initialGlitchDelay);

      periodicGlitchIntervalRef.current = window.setInterval(() => {
        triggerGlitch(randomBetween(0.62, 0.9));
      }, 15000);
    }

    rafIdRef.current = window.requestAnimationFrame(animate);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('neural-glitch', onGlitchSignal);
    document.addEventListener('visibilitychange', onVisibilityChange);

    if (hasFinePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      window.cancelAnimationFrame(rafIdRef.current);

      if (scrollRafId) {
        window.cancelAnimationFrame(scrollRafId);
      }

      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('neural-glitch', onGlitchSignal);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      if (hasFinePointer) {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerleave', onPointerLeave);
      }

      if (periodicGlitchIntervalRef.current !== null) {
        window.clearInterval(periodicGlitchIntervalRef.current);
      }

      if (glitchResetTimerRef.current) {
        window.clearTimeout(glitchResetTimerRef.current);
      }

      clearTextGlitchTargets();
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 ${className} ${isGlitching ? 'neural-glitch-active' : ''}`}
      style={{ zIndex: 0, contain: 'strict', willChange: 'transform' }}
    >
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}
