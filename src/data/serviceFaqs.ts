// ============================================================
// src/data/serviceFaqs.ts
// FAQ content per service — EN only
// ⚠️ This is RUNTIME data — NOT UI strings (those go in messages/)
// ⚠️ FAQPage JSON-LD is generated FROM this file in each service page
// ============================================================

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceFAQs {
  [locale: string]: FAQ[];
}

export interface AllServiceFAQs {
  [service: string]: ServiceFAQs;
}

export const serviceFaqs: AllServiceFAQs = {
  "web-development": {
    en: [
      {
        question: "How long does a website project take?",
        answer:
          "A typical project takes 1–4 weeks depending on scope. A landing page (Starter) is 1–2 weeks. A multi-page business site with blog takes 3–4 weeks. A full site with AI chat and SEO audit takes 4–6 weeks.",
      },
      {
        question: "What is included in the Starter package?",
        answer:
          "The Starter package ($1,200–$2,500) includes a landing page or business card site of 1–3 pages, mobile-responsive design, contact form with email notifications, Google Analytics, and Lighthouse 95+ performance.",
      },
      {
        question: "What is included in the Business package?",
        answer:
          "The Business package ($2,500–$5,000) includes a corporate site of 5–8 pages, MDX blog system, structured data & SEO, CSS animations, and an optional AI chat add-on. Delivery: 3–4 weeks.",
      },
      {
        question: "What is included in the Growth package?",
        answer:
          "The Growth package ($800/month) includes monthly GEO-optimized blog posts, content strategy, performance monitoring, and priority support. Minimum 3-month commitment.",
      },
      {
        question: "What is your revision policy?",
        answer:
          "Each package includes 2 rounds of revisions after the initial concept. Additional revision rounds are billed at $85/hour.",
      },
      {
        question: "Will my site rank on Google?",
        answer:
          "All sites are built with a 100 Lighthouse SEO score, structured data (JSON-LD), canonical URLs, and a valid sitemap. Proven on akillustrator.com — SEO score 100, 40+ indexed URLs. Results depend on content quality and competition.",
      },
    ],
  },

  "ai-chat": {
    en: [
      {
        question: "What AI features can you add to my website?",
        answer:
          "I build AI chat assistants with RAG (Retrieval-Augmented Generation) using OpenAI GPT-4o-mini. The chatbot answers visitor questions based on your site content — services, pricing, process — 24/7 with streaming responses.",
      },
      {
        question: "How much does AI integration cost?",
        answer:
          "AI integration (RAG assistant or MCP server) starts from $3,000. This includes the full stack: embeddings, retrieval layer, abuse protection (honeypot + reCAPTCHA v3 + per-IP rate limit), and streaming UI. OpenAI API usage typically costs $1–2/month at moderate traffic.",
      },
      {
        question: "How long does AI chat integration take?",
        answer:
          "A standalone AI chat widget integration takes 1–2 weeks. This includes RAG setup, embedding generation from your content, streaming API route, and the chat UI component.",
      },
      {
        question: "What is RAG and why does it matter?",
        answer:
          "RAG (Retrieval-Augmented Generation) means the AI searches your specific content before answering — not generic internet knowledge. The result: accurate, brand-consistent answers about your services and pricing. No hallucinations about your business.",
      },
      {
        question: "Will the chatbot answer questions about my pricing?",
        answer:
          "Yes — that is the main use case. The chatbot is trained on your content: services, pricing packages, process, and FAQ. Visitors get instant accurate answers instead of leaving to find information elsewhere.",
      },
      {
        question: "Do you integrate other AI tools beyond chat?",
        answer:
          "Yes. Beyond chat widgets, I build AI-powered email automation, content generation pipelines, MCP endpoints, and custom LLM integrations using the OpenAI API and embeddings.",
      },
    ],
  },

  seo: {
    en: [
      {
        question: "What SEO services do you offer?",
        answer:
          "Technical audit, Core Web Vitals, correct hreflang via manual sitemap (the Next.js generator silently drops alternates), structured data for rich results and entity identity, concrete facts and freshness dates in visible copy, AI visibility baseline across 5 platforms with 90-day retest.",
      },
      {
        question: "How long before I see SEO results?",
        answer:
          "Technical improvements are visible in Google Search Console within days. Ranking improvements typically take 2–4 months. The AI visibility baseline (before-state measurement) is recorded at the start so progress is measurable.",
      },
      {
        question: "What actually drives AI citation?",
        answer:
          "Ranking is the primary driver — position 1 gets cited in roughly 43% of queries where the page appears, position 7 in about 5%. Schema markup has no measurable effect in controlled experiments; most AI pipelines strip it before the model sees it. Concrete facts and freshness dates in visible text act as secondary citation gatekeepers.",
      },
      {
        question: "How much does SEO & AI visibility cost?",
        answer:
          "SEO & AI visibility starts from $600 for a technical audit and implementation. Timeline: 1–3 weeks. Ongoing support is available from $800/month as part of the Growth retainer.",
      },
      {
        question: "Do you measure AI visibility before and after?",
        answer:
          "Yes — that is the differentiator. Three buyer queries are run across Google AI Overviews, ChatGPT, Perplexity, Copilot and Claude in fresh sessions before any change, recorded verbatim, retested at 90 days. This creates an honest before/after rather than an assumed improvement.",
      },
    ],
  },

  "mcp-integration": {
    en: [
      {
        question: "What is MCP and why does it matter in 2026?",
        answer:
          "MCP (Model Context Protocol) is the 2025 standard that lets AI agents like Claude Desktop, Cursor, and Windsurf interact with your business systems through a stable interface. Instead of copy-pasting data into a chat window, your team connects an AI agent directly to your database, APIs, and workflows. I built a production MCP endpoint with 9 tools for a multi-tenant SaaS commerce platform — store owners manage products and orders via natural language.",
      },
      {
        question: "What does an MCP server cost?",
        answer:
          "Pricing depends on scope. Starter ($2,000): 3–5 read-only tools, single data source, basic API key auth, delivered in 1 week. Standard ($4,000): 5–10 tools with read/write, 2–3 data sources, role-based auth, 2 weeks. Enterprise ($6,000+): unlimited tools, multi-tenant isolation, audit logging, custom auth flows, 3+ weeks.",
      },
      {
        question: "What AI agents can connect to an MCP endpoint?",
        answer:
          "Any MCP-compatible client: Claude Desktop (Anthropic), Cursor, Windsurf, Continue.dev, and any application built with the MCP SDK. The endpoint uses a standard JSON-RPC protocol, so new clients connect without code changes on your server.",
      },
      {
        question: "What business systems can you expose via MCP?",
        answer:
          "Any system with a database or API: e-commerce platforms (products, orders, customers), booking systems (slots, appointments), CRM data (leads, deals), internal knowledge bases, analytics dashboards. I work primarily with Prisma + PostgreSQL stacks but can adapt to REST APIs or other data sources.",
      },
      {
        question: "Is the MCP endpoint secure?",
        answer:
          "Yes. Every MCP server I build includes authentication (API key, OAuth, or session-based), rate limiting per client, and input validation on all tool parameters. Multi-tenant deployments include STORE_SLUG-based isolation so one tenant cannot access another's data.",
      },
      {
        question: "Do you have a real production MCP example?",
        answer:
          "Yes. I built an MCP endpoint at /api/mcp for a multi-tenant SaaS commerce platform with 9 tools: get_products, update_product_price, bulk_update_prices, get_orders, update_order_status, get_customers, get_analytics, create_promotion, and search_knowledge. Full case study: smartctx.dev/blog/custom-nextjs-vs-shopify-2026.",
      },
    ],
  },
};
