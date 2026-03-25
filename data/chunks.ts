// ============================================================
// data/chunks.ts — RAG pipeline content
// Updated: March 2026
// After editing:
//   npx tsx data/scripts/generate-embeddings.ts
// ⚠️ ONLY npx tsx works — not ts-node, not node
// Regenerate after: new posts, pricing changes, credential updates
// ============================================================

export interface Chunk {
  id: string;
  category: "about" | "services" | "pricing" | "process" | "contact" | "blog";
  content: string;
}

export const chunks: Chunk[] = [
  // --- About ---
  {
    id: "about-studio",
    category: "about",
    content:
      "SmartContext is a Next.js development studio specializing in fast, AI-powered websites for studios and B2B businesses. " +
      "Founded by Vadym Mak, a full-stack developer and AI integrator with 5+ years of experience. " +
      "4 production sites delivered: formaink.com, akillustrator.com, ub-market.com, baloon-party00.sk. " +
      "Tech stack: Next.js 15, TypeScript, CSS Modules. No page builders, no WordPress. " +
      "Based in Europe, working remotely with EU/USA clients.",
  },
  {
    id: "about-credentials",
    category: "about",
    content:
      "Vadym Mak — Full-Stack Developer & AI Integrator. " +
      "5+ years experience. 4 production sites. Clients in 5+ countries. " +
      "Lighthouse scores: 95–100 Performance, 100 SEO, 100 Best Practices on all production sites. " +
      "Specializes in: Next.js 15, TypeScript, OpenAI API, RAG chatbots, GEO/AEO optimization. " +
      "GitHub: github.com/VadymMak. LinkedIn: linkedin.com/in/vadymmak. Portfolio: smartctx.dev.",
  },

  // --- Services ---
  {
    id: "services-overview",
    category: "services",
    content:
      "SmartContext offers three core services: " +
      "(1) Web Development — Next.js 15 sites with Lighthouse 95–100, SEO 100, mobile-first. " +
      "(2) AI Chat Integration — RAG-powered chatbots trained on your content, running cost $1–2/month. " +
      "(3) SEO & GEO Optimization — get cited by ChatGPT and Perplexity, FAQPage schema, Quick Answer pattern.",
  },
  {
    id: "services-ai-chat",
    category: "services",
    content:
      "AI Chat Widget with RAG (Retrieval-Augmented Generation): chatbot trained on your website content. " +
      "Answers questions about your services, pricing, and process automatically. " +
      "Running cost: $1–2/month via OpenAI API. " +
      "Includes: spam protection (honeypot + reCAPTCHA + scoring), Telegram notifications, conversation history. " +
      "Example: akillustrator.com has RAG chat trained on illustrator portfolio and pricing.",
  },
  {
    id: "services-geo",
    category: "services",
    content:
      "GEO (Generative Engine Optimization) — making your website cited by ChatGPT, Perplexity, and Google AI Overviews. " +
      "Techniques: Quick Answer pattern, question-based H2/H3 headings, FAQPage JSON-LD schema, E-E-A-T signals. " +
      "Based on Princeton GEO research (KDD 2024): proper GEO increases AI citations by up to 40%. " +
      "All SmartContext sites include GEO optimization from day one.",
  },
  {
    id: "services-technical",
    category: "services",
    content:
      "All SmartContext sites include: FAQPage JSON-LD, Article schema, Person schema, hreflang tags, " +
      "robots.txt, sitemap.xml, Google Search Console setup, inlineCss optimization, " +
      "dynamic widget loading, Lighthouse 95–100 Performance / 100 SEO / 100 Best Practices. " +
      "Optional: multilingual (up to 6 languages), gallery with lightbox, protected images, cookie banner, Google Analytics.",
  },

  // --- Pricing ---
  {
    id: "pricing-quick-answer",
    category: "pricing",
    content:
      "Quick Answer: SmartContext pricing in 2026. " +
      "Starter package: $1,200. Landing page or business card site, 1–3 pages, responsive, contact form, basic SEO, Lighthouse 95+. " +
      "Business package: $2,500. Corporate site 5–8 pages, blog (MDX), structured data, Google Analytics, Lighthouse 95+. " +
      "Growth package: $800/month. Monthly GEO blog posts, content strategy, performance monitoring, priority support. " +
      "All packages include: deployment to Vercel, 30 days post-launch support.",
  },
  {
    id: "pricing-starter",
    category: "pricing",
    content:
      "Starter package — $1,200. " +
      "Includes: landing page or business card site, 1–3 pages, mobile-first responsive design, " +
      "contact form with spam protection, basic SEO setup (meta tags, sitemap, robots.txt), " +
      "Lighthouse 95+ Performance, deployment to Vercel, 30 days support. " +
      "Timeline: 2–3 weeks. Best for: freelancers, small studios, personal brands.",
  },
  {
    id: "pricing-business",
    category: "pricing",
    content:
      "Business package — $2,500. " +
      "Includes: corporate website 5–8 pages, blog with MDX markdown, structured data (Article, FAQPage, Person schema), " +
      "Google Analytics 4 integration, light/dark theme, cookie banner, Lighthouse 95+ Performance, SEO 100, " +
      "deployment to Vercel, 30 days support. " +
      "Optional add-ons: multilingual (+$500/language), AI chat widget (+$800), RAG embeddings (+$400). " +
      "Timeline: 3–4 weeks. Best for: agencies, studios, B2B companies.",
  },
  {
    id: "pricing-growth",
    category: "pricing",
    content:
      "Growth package — $800/month (ongoing). " +
      "Includes: 2 GEO-optimized blog posts per month, content strategy, keyword research, " +
      "performance monitoring, monthly Lighthouse audits, priority support (24h response). " +
      "Best for: businesses that want consistent AI search visibility and organic growth. " +
      "Minimum commitment: 3 months.",
  },
  {
    id: "pricing-addons",
    category: "pricing",
    content:
      "Add-on services: " +
      "AI Chat Widget with RAG: $800 one-time setup + $1–2/month running cost. " +
      "Additional language: $500 per language. " +
      "GEO optimization audit: $400 one-time. " +
      "Monthly support & updates: $200/month. " +
      "Performance optimization (Lighthouse): $300 one-time.",
  },

  // --- Process ---
  {
    id: "process-steps",
    category: "process",
    content:
      "SmartContext project process: " +
      "1. Discovery call (30 min, free) — understand goals, audience, and content. " +
      "2. Proposal within 48 hours — package recommendation with exact price and timeline. " +
      "3. Design concept (3–5 days) — mockup for approval before development. " +
      "4. Development — full build with all agreed features. " +
      "5. Review — 2 rounds of revisions included. " +
      "6. Launch — deployment to Vercel, GSC setup, sitemap submission, handover documentation.",
  },
  {
    id: "process-communication",
    category: "process",
    content:
      "Communication: weekly progress updates via email. " +
      "Response time: within 24 hours on business days. " +
      "Languages: English. " +
      "Timezone: CET (Central European Time). " +
      "Tools: GitHub for code, Vercel for deployment, email + WhatsApp for communication.",
  },

  // --- Contact ---
  {
    id: "contact-info",
    category: "contact",
    content:
      "Contact SmartContext: " +
      "Email: hello@smartctx.dev. " +
      "WhatsApp: +380 93 827 2293. " +
      "Website: smartctx.dev. " +
      "GitHub: github.com/VadymMak. " +
      "LinkedIn: linkedin.com/in/vadymmak. " +
      "Upwork: upwork.com/freelancers/~011e4555f7ff90ae84. " +
      "Response time: within 24 hours. Free 30-min discovery call available.",
  },

  // --- Blog ---
  {
    id: "blog-nextjs-cost",
    category: "blog",
    content:
      "Blog post: How Much Does a Next.js Website Cost in 2026? " +
      "Landing page: $1,200–$2,500. Corporate site: $3,500–$6,000. Multilingual with AI: $5,000–$12,000. " +
      "Timeline: 2–6 weeks. Maintenance: $100–$300/month. " +
      "URL: smartctx.dev/blog/how-much-does-nextjs-website-cost-2026",
  },
  {
    id: "blog-fast-nextjs",
    category: "blog",
    content:
      "Blog post: How to Build a Fast Next.js Website in 2026? " +
      "Key techniques: inlineCss experimental feature, dynamic imports with ssr:false for widgets, " +
      "CSS Modules instead of Tailwind, server components, next-intl for i18n. " +
      "Result: Lighthouse 99/100/100/100 on mobile and desktop. " +
      "URL: smartctx.dev/blog/how-to-build-fast-nextjs-website-2026",
  },
  {
    id: "blog-geo-optimization",
    category: "blog",
    content:
      "Blog post: What is GEO Optimization and How Does It Work in 2026? " +
      "GEO = Generative Engine Optimization. Makes websites cited by ChatGPT and Perplexity. " +
      "Key techniques: Quick Answer pattern, question headings, FAQ schema, statistics every 150 words. " +
      "URL: smartctx.dev/blog/what-is-geo-optimization-2026",
  },
  {
    id: "blog-chatgpt-citations",
    category: "blog",
    content:
      "Blog post: How to Get Your Website Cited by ChatGPT and Perplexity in 2026? " +
      "5 GEO techniques: answer-first structure, FAQ schema, statistics every 150 words, author credentials, fast server-rendered pages. " +
      "Sites using these see up to 40% more AI citations (Princeton GEO Study, KDD 2024). " +
      "Implementation takes 3–6 weeks, costs $600–$2,500. " +
      "URL: smartctx.dev/blog/how-to-get-cited-by-chatgpt-perplexity-2026",
  },
];
