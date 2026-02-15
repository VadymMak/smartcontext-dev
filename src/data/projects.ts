export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  year: number;
  client?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  challenge: string;
  solution: string;
  features: string[];
  results?: string[];
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "ak-illustrator",
    title: "AK Illustrator Portfolio",
    description:
      "Artist portfolio website with perfect Lighthouse SEO score, custom gallery, smooth animations, and full multilingual support.",
    year: 2025,
    client: "AK Illustrator",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "next-intl", "CSS Modules", "Vercel"],
    liveUrl: "https://akillustrator.com",
    challenge:
      "The client needed an artist portfolio that would rank well on Google, load instantly, and showcase artwork beautifully across all devices. The existing online presence was minimal — just social media profiles with no dedicated website. The site needed to support multiple languages (English and Russian) to reach an international audience.",
    solution:
      "Built a custom Next.js application with server-side rendering for optimal SEO performance. Implemented a responsive image gallery with lazy loading and WebP optimization. Used Framer Motion for smooth page transitions and scroll-triggered animations that enhance the visual experience without hurting performance. Set up next-intl for seamless English/Russian language switching with SEO-friendly URL structure.",
    features: [
      "Responsive image gallery with lightbox and lazy loading",
      "Smooth page transitions and scroll animations (Framer Motion)",
      "Full multilingual support (EN/RU) with SEO-friendly routing",
      "Perfect Lighthouse SEO score (100/100)",
      "Contact form with email delivery",
      "Mobile-first responsive design",
      "Optimized Core Web Vitals (LCP < 1.5s)",
    ],
    results: [
      "Lighthouse SEO Score: 100/100",
      "Lighthouse Performance: 95+",
      "Page load time under 1.5 seconds",
      "First page Google results for target keywords",
    ],
  },
  {
    slug: "multi-ai-assistant",
    title: "Multi-AI Chat Assistant",
    description:
      "Full-stack chat application integrating multiple LLM providers with streaming responses, conversation history, and intelligent context management.",
    year: 2025,
    techStack: ["React", "Python", "FastAPI", "OpenAI API", "PostgreSQL", "pgvector", "Railway", "WebSocket"],
    githubUrl: "https://github.com/VadymMak",
    challenge:
      "Wanted to build a unified chat interface that could work with multiple AI providers (OpenAI, Anthropic, etc.) while maintaining conversation context, handling streaming responses efficiently, and storing conversation history for future reference. The challenge was designing an architecture that was provider-agnostic and could easily add new LLM providers.",
    solution:
      "Designed a modular backend architecture with FastAPI that abstracts LLM provider differences behind a unified interface. Implemented streaming responses using Server-Sent Events for real-time token display. Used PostgreSQL with pgvector extension for conversation storage and semantic search across past conversations. Built a React frontend with optimistic UI updates and smooth streaming text rendering.",
    features: [
      "Multi-provider support (OpenAI, Anthropic) with unified API",
      "Real-time streaming responses via Server-Sent Events",
      "Conversation history with semantic search (pgvector)",
      "Context management with token counting and optimization",
      "Responsive chat interface with markdown rendering",
      "Provider switching mid-conversation",
      "Rate limiting and cost tracking per conversation",
    ],
    results: [
      "Sub-200ms time to first token",
      "Supports conversations up to 100k tokens",
      "Semantic search across 1000+ stored conversations",
    ],
  },
  {
    slug: "vscode-extension",
    title: "VS Code Extension",
    description:
      "Developer productivity extension for Visual Studio Code with custom commands, workspace management, and intelligent code assistance features.",
    year: 2024,
    techStack: ["TypeScript", "VS Code API", "Node.js", "Webpack"],
    githubUrl: "https://github.com/VadymMak",
    challenge:
      "Needed a set of productivity tools that weren't available in existing VS Code extensions. The goal was to automate repetitive development tasks, improve workspace navigation, and add intelligent code snippets that adapt to the project context.",
    solution:
      "Built a VS Code extension using the VS Code Extension API with TypeScript. Implemented custom commands for common development workflows, workspace management features for multi-project setups, and context-aware code generation. Used Webpack for bundling to keep the extension lightweight and fast-loading.",
    features: [
      "Custom commands for common development workflows",
      "Workspace management for multi-project setups",
      "Context-aware code snippet generation",
      "Keyboard shortcuts for rapid navigation",
      "Status bar integration with project info",
      "Lightweight bundle (~50KB) for fast activation",
    ],
  },
  {
    slug: "smartcontext-dev",
    title: "SmartContext.dev",
    description:
      "This very website — a developer portfolio built with Next.js 16, featuring an AI chat assistant, MDX blog system, and perfect SEO scores.",
    year: 2026,
    techStack: ["Next.js 16", "TypeScript", "CSS Modules", "Framer Motion", "MDX", "OpenAI API", "Vercel"],
    liveUrl: "https://smartcontext.dev",
    githubUrl: "https://github.com/VadymMak/smartcontext-dev",
    challenge:
      "Needed a portfolio that would serve as both a showcase of technical skills and a client acquisition tool. The site had to demonstrate expertise in modern web development and AI integration while achieving top Lighthouse scores across all metrics. It also needed a blog system for SEO content and an AI assistant to answer visitor questions.",
    solution:
      "Built from scratch with Next.js 16 App Router and TypeScript. Designed a complete CSS design system with dark/light mode using CSS custom properties. Implemented an MDX-based blog with syntax highlighting, table of contents, and reading time. Added an AI chat assistant using RAG (Retrieval-Augmented Generation) with JSON-based vector search — no external database needed.",
    features: [
      "Dark/light mode with system preference detection",
      "AI chat assistant (RAG with JSON embeddings)",
      "MDX blog with syntax highlighting and TOC",
      "Full i18n support (English/Russian)",
      "Sticky header with scroll-aware behavior",
      "Framer Motion animations throughout",
      "Perfect Lighthouse scores (95+ Performance, 100 SEO)",
      "Responsive design (mobile-first)",
    ],
    results: [
      "Lighthouse Performance: 95+",
      "Lighthouse SEO: 100/100",
      "Lighthouse Accessibility: 98+",
      "Total page weight under 500KB",
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}