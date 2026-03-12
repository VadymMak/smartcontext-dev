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
          "The Starter package ($1,500–$2,500) includes a landing page or business card site of 1–3 pages, mobile-responsive design, contact form with email notifications, Google Analytics, and Lighthouse 95+ performance.",
      },
      {
        question: "What is included in the Business package?",
        answer:
          "The Business package ($3,000–$5,000) includes a corporate site of 5–8 pages, MDX blog system, structured data & SEO, CSS animations, and an optional AI chat add-on. Delivery: 3–4 weeks.",
      },
      {
        question: "What is included in the Growth package?",
        answer:
          "The Growth package ($5,000–$8,000) includes a full site plus AI chatbot with RAG, smart search, content strategy, first 3 blog posts, and a full SEO audit. Delivery: 4–6 weeks.",
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

  "ai-integration": {
    en: [
      {
        question: "What AI features can you add to my website?",
        answer:
          "I build AI chat assistants with RAG (Retrieval-Augmented Generation) using OpenAI GPT-4o-mini. The chatbot answers visitor questions based on your site content — services, pricing, process — 24/7 with streaming responses.",
      },
      {
        question: "How much does an AI chat widget cost?",
        answer:
          "The AI chat widget is included in the Growth package ($5,000–$8,000). It can also be added to an existing site as a standalone feature. OpenAI API usage costs approximately $1–2/month at typical traffic levels.",
      },
      {
        question: "What is RAG and why does it matter?",
        answer:
          "RAG (Retrieval-Augmented Generation) means the AI searches your specific content before answering — not generic internet knowledge. The result: accurate, brand-consistent answers about your services and pricing. No hallucinations about your business.",
      },
      {
        question: "Do you integrate other AI tools?",
        answer:
          "Yes. Beyond chat widgets, I build AI-powered email automation, content generation pipelines, and custom LLM integrations using the OpenAI API and embeddings.",
      },
    ],
  },

  seo: {
    en: [
      {
        question: "What SEO services do you offer?",
        answer:
          "Technical SEO audit, structured data (JSON-LD) implementation, sitemap and robots.txt setup, Core Web Vitals optimisation, and GEO/AEO optimisation for AI citation — based on Princeton KDD 2024 research.",
      },
      {
        question: "How long before I see SEO results?",
        answer:
          "Technical SEO improvements (speed, structured data) are visible in Google Search Console within days. Ranking improvements typically take 2–4 months depending on competition.",
      },
      {
        question: "What is GEO and AEO optimisation?",
        answer:
          "GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) prepare your content to be cited by AI search engines like ChatGPT, Perplexity, and Google AI Mode. Pages with specific numbers and FAQ structure are cited 37% more often (Princeton, KDD 2024).",
      },
      {
        question: "Do you have proven SEO results?",
        answer:
          "Yes. akillustrator.com — built and maintained by SmartContext — achieves Lighthouse SEO 100, has 40+ indexed URLs across 5 languages, and is verified in both Google Search Console and Yandex Webmaster.",
      },
    ],
  },
};
