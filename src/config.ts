// =============================================================================
// Site Configuration
// Edit ONLY this file to customize all content across the site.
// All animations, layouts, and styles are controlled by the components.
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  cvUrl?: string;
}

export const siteConfig: SiteConfig = {
  title: 'Surya Prakash — Neural Interface Portfolio',
  description: 'Building the future by blending AI innovation with strong engineering. AI Innovator | Stack Engineer | Product Builder',
  language: 'en',
  cvUrl: '#',
};

// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string;
  sectionId: string;
  icon: 'disc' | 'play' | 'calendar' | 'music';
}

export interface HeroConfig {
  backgroundImage: string;
  brandName: string;
  decodeText: string;
  decodeChars: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  cornerLabel: string;
  cornerDetail: string;
  navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: '',
  brandName: 'SURYA PRAKASH',
  decodeText: 'SURYA PRAKASH',
  decodeChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()',
  subtitle: 'AI Innovator · Stack Engineer · Product Builder',
  ctaPrimary: 'Enter System',
  ctaPrimaryTarget: 'about',
  ctaSecondary: 'Download CV',
  ctaSecondaryTarget: 'contact',
  cornerLabel: 'Neural Interface',
  cornerDetail: 'v2.7',
  navItems: [
    { label: 'About', sectionId: 'about', icon: 'disc' },
    { label: 'Projects', sectionId: 'projects', icon: 'play' },
    { label: 'Skills', sectionId: 'skills', icon: 'music' },
    { label: 'Contact', sectionId: 'contact', icon: 'calendar' },
  ],
};

// -- About Section ------------------------------------------------------------
export interface AboutConfig {
  title: string;
  name: string;
  role: string;
  description: string[];
  stats: {
    value: string;
    label: string;
  }[];
}

export const aboutConfig: AboutConfig = {
  title: 'Identity Core',
  name: 'Surya Prakash',
  role: 'AI Engineer · Systems Builder',
  description: [
    'I design end-to-end systems that turn noisy data into reliable decisions. From prototype to production, I optimize for latency, cost, and maintainability.',
    'Currently building intelligent infrastructure at the intersection of ML and backend. My work spans conversational AI, predictive maintenance, and edge vision systems.',
    'I believe in the power of blending research rigor with engineering pragmatism to create systems that not only work in theory but scale in practice.',
  ],
  stats: [
    { value: '7+', label: 'Years' },
    { value: '40+', label: 'Projects' },
    { value: '12', label: 'Publications' },
  ],
};

// -- Projects Section ---------------------------------------------------------
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  icon: string;
}

export interface ProjectsConfig {
  title: string;
  subtitle: string;
  projects: Project[];
}

export const projectsConfig: ProjectsConfig = {
  title: 'Innovation Lab',
  subtitle: 'Selected builds. Real impact.',
  projects: [
    {
      id: 1,
      title: 'Predictive Maintenance Pipeline',
      description: 'Anomaly detection on sensor streams with sub-second latency. Reduces downtime by 40% through real-time failure prediction.',
      tags: ['MLOps', 'Time Series', 'Edge Computing'],
      icon: 'Cpu',
    },
    {
      id: 2,
      title: 'Conversational AI Platform',
      description: 'Multi-turn dialogue system with retrieval-augmented generation. Handles 10K+ concurrent conversations with sub-200ms response time.',
      tags: ['NLP', 'RAG', 'LLM'],
      icon: 'MessageSquare',
    },
    {
      id: 3,
      title: 'Edge Vision Stack',
      description: 'Lightweight detection models optimized for ARM devices. Achieves 30fps on Raspberry Pi 4 with 95%+ accuracy.',
      tags: ['Computer Vision', 'Edge AI', 'Optimization'],
      icon: 'Eye',
    },
  ],
};

// -- Skills Section -----------------------------------------------------------
export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface SkillsConfig {
  title: string;
  subtitle: string;
  categories: SkillCategory[];
}

export const skillsConfig: SkillsConfig = {
  title: 'System Capabilities',
  subtitle: 'Languages · Frameworks · Infrastructure',
  categories: [
    {
      title: 'AI / ML',
      icon: 'Brain',
      skills: [
        { name: 'PyTorch / TensorFlow', level: 95 },
        { name: 'LLMs & RAG', level: 90 },
        { name: 'Computer Vision', level: 88 },
        { name: 'MLOps', level: 85 },
        { name: 'NLP', level: 82 },
        { name: 'Reinforcement Learning', level: 75 },
      ],
    },
    {
      title: 'Backend / Systems',
      icon: 'Server',
      skills: [
        { name: 'Python / Go / Rust', level: 92 },
        { name: 'Distributed Systems', level: 88 },
        { name: 'Kubernetes', level: 85 },
        { name: 'Kafka / Redis', level: 82 },
        { name: 'PostgreSQL / MongoDB', level: 80 },
        { name: 'gRPC / GraphQL', level: 78 },
      ],
    },
    {
      title: 'Tools / Platforms',
      icon: 'Wrench',
      skills: [
        { name: 'AWS / GCP / Azure', level: 88 },
        { name: 'Docker / Terraform', level: 85 },
        { name: 'Git / CI/CD', level: 90 },
        { name: 'Prometheus / Grafana', level: 80 },
        { name: 'Jupyter / MLflow', level: 85 },
        { name: 'Linux / Bash', level: 88 },
      ],
    },
  ],
};

// -- Experience Section -------------------------------------------------------
export interface ExperienceItem {
  id: number;
  type: 'work' | 'education' | 'award';
  period: string;
  role: string;
  company: string;
  description: string[];
}

export interface ExperienceConfig {
  title: string;
  subtitle: string;
  items: ExperienceItem[];
}

export const experienceConfig: ExperienceConfig = {
  title: 'Timeline Stream',
  subtitle: 'Journey through the neural network of my career',
  items: [
    {
      id: 1,
      type: 'work',
      period: '2022 — Present',
      role: 'Staff AI Engineer',
      company: 'CoreSystems',
      description: [
        'Leading model serving infrastructure; reduced p99 latency by 40%',
        'Architected distributed training pipeline handling 10M+ samples/day',
        'Mentoring team of 8 engineers on MLOps best practices',
      ],
    },
    {
      id: 2,
      type: 'work',
      period: '2019 — 2022',
      role: 'Senior ML Engineer',
      company: 'DataFlow Labs',
      description: [
        'Shipped forecasting pipelines used by 3 enterprise clients',
        'Built real-time anomaly detection reducing false positives by 60%',
        'Published 3 papers on time-series forecasting at top conferences',
      ],
    },
    {
      id: 3,
      type: 'work',
      period: '2017 — 2019',
      role: 'Software Engineer',
      company: 'CloudScale',
      description: [
        'Built distributed task queues processing 1M+ jobs/day',
        'Designed monitoring dashboards used by 50+ engineers',
        'Contributed to open-source Kubernetes operators',
      ],
    },
    {
      id: 4,
      type: 'education',
      period: '2015 — 2017',
      role: 'M.S. Computer Science',
      company: 'Indian Institute of Technology',
      description: [
        'Specialization in Machine Learning and Distributed Systems',
        'Thesis: "Scalable Deep Learning for Edge Devices"',
        'GPA: 9.2/10',
      ],
    },
    {
      id: 5,
      type: 'award',
      period: '2023',
      role: 'Best AI Innovation Award',
      company: 'Tech Summit India',
      description: [
        'Recognized for predictive maintenance system reducing industrial downtime',
        'Featured in TechCrunch and Analytics India Magazine',
      ],
    },
  ],
};

// -- Contact Section ----------------------------------------------------------
export interface ContactConfig {
  title: string;
  subtitle: string;
  email: string;
  linkedin: string;
  github: string;
  availability: string;
  responseTime: string;
}

export const contactConfig: ContactConfig = {
  title: 'Send a Signal',
  subtitle: 'Open to collaborations, research, and hard problems.',
  email: 'surya@example.com',
  linkedin: '/in/suryaprakash',
  github: '@suryaprakash',
  availability: 'Available for new projects',
  responseTime: 'Response time: ~24h',
};

// -- Footer Section -----------------------------------------------------------
export interface FooterConfig {
  wordmark: string;
  tagline: string;
  copyright: string;
  location: string;
}

export const footerConfig: FooterConfig = {
  wordmark: 'SURYA.',
  tagline: 'Built with curiosity. Optimized for impact.',
  copyright: '© 2026 — Neural Interface Portfolio',
  location: 'Bangalore',
};

// -- Album Cube Section (Template placeholder) --------------------------------
export interface Album {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export interface AlbumCubeConfig {
  albums: Album[];
  cubeTextures: string[];
  scrollHint: string;
}

export const albumCubeConfig: AlbumCubeConfig = {
  albums: [],
  cubeTextures: [],
  scrollHint: '',
};

// -- Parallax Gallery Section (Template placeholder) --------------------------
export interface ParallaxImage {
  id: number;
  src: string;
  alt: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  date: string;
}

export interface ParallaxGalleryConfig {
  sectionLabel: string;
  sectionTitle: string;
  galleryLabel: string;
  galleryTitle: string;
  marqueeTexts: string[];
  endCtaText: string;
  parallaxImagesTop: ParallaxImage[];
  parallaxImagesBottom: ParallaxImage[];
  galleryImages: GalleryImage[];
}

export const parallaxGalleryConfig: ParallaxGalleryConfig = {
  sectionLabel: '',
  sectionTitle: '',
  galleryLabel: '',
  galleryTitle: '',
  marqueeTexts: [],
  endCtaText: '',
  parallaxImagesTop: [],
  parallaxImagesBottom: [],
  galleryImages: [],
};

// -- Tour Schedule Section (Template placeholder) -----------------------------
export interface TourDate {
  id: number;
  date: string;
  time: string;
  city: string;
  venue: string;
  status: 'on-sale' | 'sold-out' | 'coming-soon';
  image: string;
}

export interface TourStatusLabels {
  onSale: string;
  soldOut: string;
  comingSoon: string;
  default: string;
}

export interface TourScheduleConfig {
  sectionLabel: string;
  sectionTitle: string;
  vinylImage: string;
  buyButtonText: string;
  detailsButtonText: string;
  bottomNote: string;
  bottomCtaText: string;
  statusLabels: TourStatusLabels;
  tourDates: TourDate[];
}

export const tourScheduleConfig: TourScheduleConfig = {
  sectionLabel: '',
  sectionTitle: '',
  vinylImage: '',
  buyButtonText: '',
  detailsButtonText: '',
  bottomNote: '',
  bottomCtaText: '',
  statusLabels: {
    onSale: '',
    soldOut: '',
    comingSoon: '',
    default: '',
  },
  tourDates: [],
};
