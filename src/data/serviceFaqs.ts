// ============================================================
// src/data/serviceFaqs.ts
// FAQ content per service per locale
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
  "web-design": {
    en: [
      {
        question: "How long does a website project take?",
        answer:
          "A typical project takes 2–4 weeks depending on scope. A landing page is usually 1–2 weeks. A multi-page business site with blog takes 3–4 weeks.",
      },
      {
        question: "What is included in the Starter package?",
        answer:
          "The Starter package (€799) includes a single landing page, mobile-responsive design, contact form with email notifications, basic SEO setup, and 30 days of post-launch support.",
      },
      {
        question: "Do you build multilingual websites?",
        answer:
          "Yes. All sites are built with next-intl for full multilingual support. English + Slovak is the default. Additional languages can be added for an extra fee.",
      },
      {
        question: "What is your revision policy?",
        answer:
          "Each package includes 2 rounds of revisions after the initial concept. Additional revision rounds are billed at €75/hour.",
      },
      {
        question: "Will my site rank on Google?",
        answer:
          "All sites are built with a 100 Lighthouse SEO score, structured data (JSON-LD), hreflang for multilingual, canonical URLs, and a valid sitemap. SEO results depend on content quality and competition.",
      },
    ],
    sk: [
      {
        question: "Ako dlho trvá projekt webstránky?",
        answer:
          "Typický projekt trvá 2–4 týždne v závislosti od rozsahu. Úvodná stránka zvyčajne 1–2 týždne. Viacstránkový firemný web s blogom trvá 3–4 týždne.",
      },
      {
        question: "Čo je zahrnuté v balíku Štarter?",
        answer:
          "Balík Štarter (€799) zahŕňa jednu úvodnú stránku, responzívny dizajn, kontaktný formulár s e-mailovými notifikáciami, základné SEO nastavenie a 30 dní podpory po spustení.",
      },
      {
        question: "Vytvárate viacjazyčné webstránky?",
        answer:
          "Áno. Všetky stránky sú postavené s next-intl pre plnú viacjazyčnú podporu. Angličtina + slovenčina je predvolená. Ďalšie jazyky je možné pridať za príplatok.",
      },
      {
        question: "Aká je vaša politika revízií?",
        answer:
          "Každý balík zahŕňa 2 kola revízií po počiatočnom koncepte. Ďalšie kola revízií sa fakturujú na €75/hodinu.",
      },
      {
        question: "Bude môj web dobre hodnotený na Google?",
        answer:
          "Všetky stránky sú postavené so skóre 100 Lighthouse SEO, štruktúrovanými dátami (JSON-LD), hreflang pre viacjazyčnosť, kanonickými URL a platnou sitemapou.",
      },
    ],
  },

  seo: {
    en: [
      {
        question: "What SEO services do you offer?",
        answer:
          "Technical SEO audit, structured data (JSON-LD) implementation, sitemap and robots.txt setup, Core Web Vitals optimisation, and GEO/AEO optimisation for AI citation in 2026.",
      },
      {
        question: "How long before I see SEO results?",
        answer:
          "Technical SEO improvements (speed, structured data) are visible in Google Search Console within days. Ranking improvements typically take 2–4 months depending on competition.",
      },
    ],
    sk: [
      {
        question: "Aké SEO služby ponúkate?",
        answer:
          "Technický SEO audit, implementácia štruktúrovaných dát (JSON-LD), nastavenie sitemapy a robots.txt, optimalizácia Core Web Vitals a GEO/AEO optimalizácia pre AI citácie.",
      },
      {
        question: "Za ako dlho uvidím výsledky SEO?",
        answer:
          "Technické SEO vylepšenia sú viditeľné v Google Search Console v priebehu dní. Zlepšenie pozícií zvyčajne trvá 2–4 mesiace v závislosti od konkurencie.",
      },
    ],
  },
};
