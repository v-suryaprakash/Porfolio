import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ParticleField, NavigationDots } from './components/neural';
import CustomCursor from './components/interactive/CustomCursor';

import { siteConfig } from './config';
import './index.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const loadAbout = () => import('./sections/About');
const loadProjects = () => import('./sections/Projects');
const loadSkills = () => import('./sections/Skills');
const loadExperience = () => import('./sections/Experience');
const loadContact = () => import('./sections/Contact');
const loadFooter = () => import('./sections/Footer');

const About = lazy(loadAbout);
const Projects = lazy(loadProjects);
const Skills = lazy(loadSkills);
const Experience = lazy(loadExperience);
const Contact = lazy(loadContact);
const Footer = lazy(loadFooter);

const deferredSectionImports = [
  loadAbout,
  loadProjects,
  loadSkills,
  loadExperience,
  loadContact,
  loadFooter,
] as const;

const deferredSectionOrder = ['about', 'projects', 'skills', 'experience', 'contact', 'footer'] as const;
type DeferredSectionId = (typeof deferredSectionOrder)[number];

const INITIAL_LOADED_SECTION_INDEX = 0;

function SectionFallback({ id, className }: { id: string; className: string }) {
  return <section id={id} className={className} aria-hidden="true" />;
}

// Navigation items for dots
const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

function App() {
  const mainRef = useRef<HTMLElement>(null);
  const [showParticleField] = useState(true);
  const [particleVisible, setParticleVisible] = useState(false);
  const [loadedSectionIndex, setLoadedSectionIndex] = useState(INITIAL_LOADED_SECTION_INDEX);

  useEffect(() => {
    // Set page title
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }

    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    });

    const refreshId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshId);
    };
  }, []);

  useEffect(() => {
    const fadeInId = window.requestAnimationFrame(() => {
      setParticleVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(fadeInId);
    };
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateLoadedSectionIndex = () => {
      const viewportHeight = Math.max(1, window.innerHeight || 1);
      const projectedScroll = window.scrollY + viewportHeight * 0.65;
      const nextIndex = Math.min(
        deferredSectionOrder.length - 1,
        Math.max(INITIAL_LOADED_SECTION_INDEX, Math.floor(projectedScroll / viewportHeight))
      );

      setLoadedSectionIndex((previousIndex) => (nextIndex > previousIndex ? nextIndex : previousIndex));
    };

    const queueLoadedSectionUpdate = () => {
      if (rafId) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateLoadedSectionIndex();
      });
    };

    const onNavTarget = (event: Event) => {
      const detail = (event as CustomEvent<{ id?: string }>).detail;
      const id = detail?.id;
      if (!id) return;

      const targetIndex = deferredSectionOrder.indexOf(id as DeferredSectionId);
      if (targetIndex < 0) return;

      setLoadedSectionIndex((previousIndex) => (targetIndex > previousIndex ? targetIndex : previousIndex));
    };

    updateLoadedSectionIndex();

    window.addEventListener('scroll', queueLoadedSectionUpdate, { passive: true });
    window.addEventListener('resize', queueLoadedSectionUpdate);
    window.addEventListener('neural-nav-target', onNavTarget);

    return () => {
      window.removeEventListener('scroll', queueLoadedSectionUpdate);
      window.removeEventListener('resize', queueLoadedSectionUpdate);
      window.removeEventListener('neural-nav-target', onNavTarget);

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const nextImport = deferredSectionImports[loadedSectionIndex + 1];
    if (!nextImport) return;

    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const timeoutId = window.setTimeout(() => {
      void nextImport();
    }, 320);

    let idleHandle: number | null = null;
    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(() => {
        void nextImport();
      }, { timeout: 1500 });
    }

    return () => {
      window.clearTimeout(timeoutId);

      if (idleHandle !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleHandle);
      }
    };
  }, [loadedSectionIndex]);

  useEffect(() => {
    const refreshId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshId);
    };
  }, [loadedSectionIndex]);

  const isSectionReady = (index: number) => loadedSectionIndex >= index;

  return (
    <>
      <CustomCursor />

      {/* Global Particle Background */}
      <div
        className={`fixed inset-0 z-0 pointer-events-none transition-opacity ${
          particleVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDuration: '1200ms' }}
      >
        {showParticleField ? <ParticleField /> : null}
      </div>

      {/* Navigation Dots */}
      <NavigationDots items={navItems} />

      {/* Main Content */}
      <main ref={mainRef} className="relative z-10">
        {isSectionReady(0) ? (
          <Suspense fallback={<SectionFallback id="about" className="relative w-full min-h-screen z-20 neural-section-layer-strong" />}>
            <About />
          </Suspense>
        ) : (
          <SectionFallback id="about" className="relative w-full min-h-screen z-20 neural-section-layer-strong" />
        )}

        {isSectionReady(1) ? (
          <Suspense fallback={<SectionFallback id="projects" className="relative w-full h-screen overflow-hidden z-30 neural-section-layer-strong" />}>
            <Projects />
          </Suspense>
        ) : (
          <SectionFallback id="projects" className="relative w-full h-screen overflow-hidden z-30 neural-section-layer-strong" />
        )}

        {isSectionReady(2) ? (
          <Suspense fallback={<SectionFallback id="skills" className="relative w-full h-screen overflow-hidden z-40 neural-section-layer-strong" />}>
            <Skills />
          </Suspense>
        ) : (
          <SectionFallback id="skills" className="relative w-full h-screen overflow-hidden z-40 neural-section-layer-strong" />
        )}

        {isSectionReady(3) ? (
          <Suspense fallback={<SectionFallback id="experience" className="relative w-full min-h-screen py-24 z-50 neural-section-layer-deep" />}>
            <Experience />
          </Suspense>
        ) : (
          <SectionFallback id="experience" className="relative w-full min-h-screen py-24 z-50 neural-section-layer-deep" />
        )}

        {isSectionReady(4) ? (
          <Suspense fallback={<SectionFallback id="contact" className="relative w-full h-screen overflow-hidden z-[60] neural-section-layer" />}>
            <Contact />
          </Suspense>
        ) : (
          <SectionFallback id="contact" className="relative w-full h-screen overflow-hidden z-[60] neural-section-layer" />
        )}

        {isSectionReady(5) ? (
          <Suspense fallback={<SectionFallback id="footer" className="relative w-full py-24 z-[70] neural-footer-layer" />}>
            <Footer />
          </Suspense>
        ) : (
          <SectionFallback id="footer" className="relative w-full py-24 z-[70] neural-footer-layer" />
        )}
      </main>
    </>
  );
}

export default App;
