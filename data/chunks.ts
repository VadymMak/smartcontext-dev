// ============================================================
// data/chunks.ts — RAG pipeline content
// Replace with your real content before generating embeddings
// Categories: about | services | pricing | process | contact | blog
//
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
      "We are a web studio specialising in fast, multilingual websites for creative studios and B2B businesses. " +
      "Founded in 2021, we have delivered 40+ projects across Europe. " +
      "Tech stack: Next.js, TypeScript, CSS Modules. No page builders, no WordPress.",
  },
  {
    id: "about-team",
    category: "about",
    content:
      "Our team consists of a designer-developer duo with deep expertise in Next.js, SEO, and conversion-focused UI. " +
      "We work with clients remotely from Slovakia and Ukraine.",
  },

  // --- Services ---
  {
    id: "services-overview",
    category: "services",
    content:
      "We offer three core services: (1) Landing pages — single-page sites for studios and freelancers. " +
      "(2) Portfolio websites — multilingual, with gallery and blog. " +
      "(3) B2B websites — with AI chat, contact automation, and SEO optimisation.",
  },
  {
    id: "services-seo",
    category: "services",
    content:
      "All sites include: FAQPage JSON-LD, Article schema, hreflang tags, robots.txt, sitemap.xml, " +
      "Google Search Console setup, and Lighthouse score ≥85 Performance / 100 SEO.",
  },

  // --- Pricing ---
  {
    id: "pricing-summary",
    category: "pricing",
    content:
      "Starter package: €499–€799. Includes landing page, contact form, basic SEO, deployment. " +
      "Business package: €999–€1499. Includes portfolio site, blog, multilingual (2 locales), full SEO. " +
      "Growth package: €1799–€2499. Includes B2B site, AI chat, RAG, Telegram notifications, 3 locales.",
  },
  {
    id: "pricing-timeline",
    category: "pricing",
    content:
      "Typical timelines: Starter — 1–2 weeks. Business — 2–3 weeks. Growth — 3–5 weeks. " +
      "Timeline depends on how quickly the client provides content and feedback.",
  },

  // --- Process ---
  {
    id: "process-steps",
    category: "process",
    content:
      "1. Discovery call (30 min) — understand your goals, audience, and content. " +
      "2. Proposal — package recommendation with exact price and timeline. " +
      "3. Design concept (3–5 days) — initial mockup for approval. " +
      "4. Development — full build with all agreed features. " +
      "5. Review — 2 rounds of revisions included. " +
      "6. Launch — deployment to Vercel, GSC setup, handover.",
  },
  {
    id: "process-revisions",
    category: "process",
    content:
      "Each package includes 2 rounds of revisions after the initial build. " +
      "Additional revisions are billed at €50/hour.",
  },

  // --- Contact ---
  {
    id: "contact-info",
    category: "contact",
    content:
      "The fastest way to reach us is via the contact form on our website. " +
      "We respond within 24 hours on business days. " +
      "For urgent requests, use the WhatsApp button.",
  },
  {
    id: "contact-languages",
    category: "contact",
    content:
      "We communicate in English, Slovak, and Ukrainian. " +
      "All deliverables (code, documentation) are in English.",
  },
];
