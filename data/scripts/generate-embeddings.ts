import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ContentChunk {
  id: string;
  text: string;
  source: string;
  section: string;
}

// All site content to embed
const CONTENT_CHUNKS: ContentChunk[] = [
  // Services
  {
    id: "services-web",
    source: "Services",
    section: "Web Development",
    text: "SmartContext offers custom web development. Modern websites and web apps built on Next.js, React, TypeScript. Features include custom design & development, responsive mobile-first design, SEO optimization included, performance optimization, and analytics setup. Deployed on Vercel.",
  },
  {
    id: "services-ai",
    source: "Services",
    section: "AI Integration",
    text: "SmartContext offers AI integration services. Add intelligence to your product with chatbots, content generation, smart search, and automation. Custom AI chatbots trained on your content, semantic search (not just keyword matching), content automation for meta descriptions and alt texts, LLM integration with OpenAI and Anthropic, RAG architecture for knowledge bases. Stack includes OpenAI API, LangChain, Embeddings, pgvector.",
  },
  {
    id: "services-seo",
    source: "Services",
    section: "SEO & Content Strategy",
    text: "SmartContext offers SEO and content strategy services. Blog systems that bring organic traffic. Technical SEO audit and optimization, structured data (JSON-LD) on all pages, blog system with MDX, content strategy and planning, Core Web Vitals optimization. Proven results: Lighthouse SEO score of 100 on akillustrator.com.",
  },
  {
    id: "services-support",
    source: "Services",
    section: "Support & Maintenance",
    text: "SmartContext offers ongoing support and maintenance. Hosting monitoring and security updates, performance checks and optimization, content updates and minor edits, analytics reports, priority bug fixes. Packages start at $200/month. Every client gets 30 days of free support after launch.",
  },
  // Pricing
  {
    id: "pricing-packages",
    source: "Services",
    section: "Pricing",
    text: "SmartContext pricing packages: Starter Package ($1,500-$2,500) for landing pages, 1-3 pages, 1-2 weeks. Business Package ($3,000-$5,000) for corporate sites, 5-8 pages with blog and SEO, 3-4 weeks. Growth Package ($5,000-$8,000) for full sites with AI features, content strategy, and first blog posts, 4-6 weeks. All packages include responsive design, SEO optimization, and analytics. Fixed prices for budget predictability.",
  },
  // Process
  {
    id: "process",
    source: "Services",
    section: "How I Work",
    text: "SmartContext development process: Step 1 Discovery - discuss goals and requirements. Step 2 Proposal - detailed plan, timeline, and fixed price quote. Step 3 Development - build and review at each milestone with full transparency. Step 4 Launch - deployment, testing, and go live, everything optimized. Step 5 Support - ongoing maintenance, updates, and growth support.",
  },
  // FAQ
  {
    id: "faq-timeline",
    source: "FAQ",
    section: "Project Timeline",
    text: "How long does a project take? A landing page takes 1-2 weeks. A full business site with blog and SEO takes 3-4 weeks. Projects with AI features typically take 4-6 weeks. Vadym provides a specific timeline in the proposal.",
  },
  {
    id: "faq-budget",
    source: "FAQ",
    section: "Budget",
    text: "What's the typical budget range? Landing pages start at $1,500. Business sites range from $3,000-$5,000. Full-featured sites with AI integration are $5,000-$8,000. SmartContext works with fixed prices so clients know exactly what to expect.",
  },
  {
    id: "faq-international",
    source: "FAQ",
    section: "International Clients",
    text: "Does SmartContext work with international clients? Yes, most clients are based in the US, EU, and UK. Vadym communicates in English and Russian, and is experienced with remote collaboration across time zones.",
  },
  {
    id: "faq-technologies",
    source: "FAQ",
    section: "Technologies",
    text: "What technologies does SmartContext use? Core stack is Next.js, React, and TypeScript. For AI features: OpenAI API and LangChain. Database: PostgreSQL. Hosting: Vercel. Everything is chosen for performance, developer experience, and long-term maintainability.",
  },
  {
    id: "faq-support",
    source: "FAQ",
    section: "Ongoing Support",
    text: "Does SmartContext provide ongoing support? Yes, maintenance packages starting at $200/month cover hosting monitoring, security updates, performance checks, content updates, and priority bug fixes. Every client gets 30 days of free support after launch.",
  },
  // About
  {
    id: "about-vadym",
    source: "About",
    section: "About Vadym Mak",
    text: "Vadym Mak is a full-stack developer and founder of SmartContext based in Erdemli, Turkey. He builds modern web applications and explores the intersection of web development and AI. He specializes in custom development on modern stack with SEO optimization and AI integration. Languages spoken: English, Russian, Ukrainian.",
  },
  {
    id: "about-experience",
    source: "About",
    section: "Experience",
    text: "Vadym Mak's experience: 2026 - Founded SmartContext, combining web development with AI integration. 2025 - AI Integration Projects, built multi-provider AI chat assistant, explored RAG architectures. 2024 - Full-Stack Development, focused on Next.js and TypeScript, built client portfolios and VS Code extensions.",
  },
  // Projects
  {
    id: "project-ak",
    source: "Projects",
    section: "AK Illustrator Portfolio",
    text: "AK Illustrator Portfolio project - Artist portfolio website with perfect Lighthouse SEO score 100, custom gallery, smooth animations with Framer Motion, and full multilingual support (English/Russian). Built with Next.js, TypeScript, Framer Motion, next-intl, CSS Modules, deployed on Vercel. Achieved Lighthouse Performance 95+, page load under 1.5 seconds, first page Google results.",
  },
  {
    id: "project-ai-chat",
    source: "Projects",
    section: "Multi-AI Chat Assistant",
    text: "Multi-AI Chat Assistant project - Full-stack chat application integrating multiple LLM providers (OpenAI, Anthropic) with streaming responses via Server-Sent Events, conversation history with semantic search using pgvector, and intelligent context management. Built with React, Python, FastAPI, PostgreSQL, pgvector, Railway. Sub-200ms time to first token.",
  },
  {
    id: "project-vscode",
    source: "Projects",
    section: "VS Code Extension",
    text: "VS Code Extension project - Developer productivity extension for Visual Studio Code with custom commands, workspace management, and intelligent code assistance. Built with TypeScript, VS Code API, Node.js, Webpack. Lightweight bundle of approximately 50KB for fast activation.",
  },
  {
    id: "project-smartcontext",
    source: "Projects",
    section: "SmartContext.dev",
    text: "SmartContext.dev - Developer portfolio built with Next.js 16, featuring AI chat assistant using RAG with JSON embeddings, CSS Modules design system, dark/light mode, blog system, and perfect SEO scores. Lighthouse Performance 95+, SEO 100/100, Accessibility 98+, total page weight under 500KB.",
  },
  // Contact
  {
    id: "contact",
    source: "Contact",
    section: "How to Reach",
    text: "Contact SmartContext: Email hello@smartcontext.dev. LinkedIn /in/vadymmak. GitHub /VadymMak. Located in Erdemli, Turkey. Typical response time within 24 hours. Contact form available on the website to discuss project type and budget range.",
  },
  // Tech Stack
  {
    id: "tech-stack",
    source: "About",
    section: "Tech Stack",
    text: "SmartContext tech stack: Frontend - React, Next.js, TypeScript, Framer Motion, CSS Modules. Backend - Node.js, Python, FastAPI, PostgreSQL. AI & Tools - OpenAI API, LangChain, Embeddings, RAG. DevOps - Vercel, Railway, Docker, Git, GitHub Actions.",
  },
];

async function generateEmbeddings() {
  console.log(`Generating embeddings for ${CONTENT_CHUNKS.length} chunks...`);

  const results = [];

  for (const chunk of CONTENT_CHUNKS) {
    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk.text,
      });

      results.push({
        ...chunk,
        embedding: response.data[0].embedding,
      });

      console.log(`✓ ${chunk.id} (${chunk.source} — ${chunk.section})`);
    } catch (error) {
      console.error(`✗ Failed for ${chunk.id}:`, error);
    }

    // Small delay to avoid rate limits
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const outputPath = path.join(process.cwd(), "data", "embeddings.json");

  // Ensure data directory exists
  const dataDir = path.dirname(outputPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Saved ${results.length} embeddings to ${outputPath}`);
  console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);
}

generateEmbeddings();