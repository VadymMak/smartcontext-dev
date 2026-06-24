// ============================================================
// src/app/[locale]/about/page.tsx
// E-E-A-T optimized — Person JSON-LD, credentials, photo
// ============================================================
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartctx.dev";

export const metadata: Metadata = {
  title: "About Vadym Mak — SmartContext",
  description:
    "Full-stack developer since 2019 with 6+ production sites. React Native (iOS/Android), Next.js, enterprise CRM systems. AI integration, MCP servers. Lighthouse 95–100.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
};

const STACK = [
  "Next.js 15",
  "TypeScript",
  "React",
  "React Native",
  "CSS Modules",
  "OpenAI API",
  "MDX",
  "Resend",
  "Vercel",
  "PostgreSQL",
  "pgvector",
];

const STATS = [
  { value: "5+", label: "Years of experience" },
  { value: "6+", label: "Production sites live" },
  { value: "95–100", label: "Lighthouse score" },
  { value: "6", label: "Languages per site" },
  { value: "1", label: "MCP endpoint in production" },
];

const TIMELINE = [
  {
    year: "2026",
    title: "SmartContext.dev launched",
    desc: "Full rebrand. v6.0 boilerplate. GEO/AEO optimization for AI search engines.",
  },
  {
    year: "2025",
    title: "AI integration focus",
    desc: "RAG chatbots, embeddings, OpenAI API across 3 client sites.",
  },
  {
    year: "2024",
    title: "Next.js production sites",
    desc: "akillustrator.com, ub-market.com, formaink.com — all Lighthouse 95+.",
  },
  {
    year: "2023",
    title: "Next.js & full-stack web",
    desc: "Transitioned from mobile to Next.js App Router. TypeScript-first development.",
  },
  {
    year: "2021",
    title: "Mobile & enterprise development",
    desc: "React Native (iOS & Android) — CRM system with admin frontend, large-scale backend. International company website. Sports totalizator mobile app for Taiwan market.",
  },
];

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vadym Mak",
    url: BASE_URL,
    jobTitle: "Full-Stack Developer & AI Integrator",
    description:
      "Full-stack developer since 2019. React Native (iOS/Android) — CRM systems, enterprise apps. Next.js developer with 6+ production sites. Lighthouse 95–100. AI integration, MCP servers, and GEO optimization.",
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "React",
      "OpenAI API",
      "SEO",
      "GEO Optimization",
      "Web Performance",
      "RAG",
    ],
    worksFor: {
      "@type": "Organization",
      name: "SmartContext.dev",
      url: BASE_URL,
    },
    sameAs: ["https://github.com/VadymMak", "https://www.linkedin.com/in/vadymmakevytss/"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className="container">
        <section className={styles.hero}>
          <div className={styles.photoWrap}>
            <Image
              src="/about/photo.jpg"
              alt="Vadym Mak — Full-Stack Developer"
              width={160}
              height={160}
              className={styles.photo}
              priority
            />
            <span className={styles.availBadge}>
              <span className={styles.availDot} aria-hidden="true" />
              Available for projects
            </span>
          </div>

          <div className={styles.heroText}>
            <h1 className={styles.name}>Vadym Mak</h1>
            <p className={styles.role}>Full-Stack Developer & AI Integrator</p>
            <p className={styles.location}>
              📍 Based in Europe · Remote worldwide
            </p>
            <p className={styles.bio}>
              In 2026, Google SEO is not enough — 93% of AI Mode searches end
              without a click. I build sites that rank on Google AND get cited
              by ChatGPT, Perplexity, and Google AI Overviews. This approach is
              GEO (Generative Engine Optimization) and AEO (Answer Engine
              Optimization), based on Princeton University research (KDD 2024).
              Developer since 2019, with 4+ years focused on multilingual
              Next.js websites for European SMBs.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.ctaPrimary}>
                Book a free call →
              </Link>
              <a
                href="https://github.com/VadymMak"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/vadymmakevytss/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <section className={styles.statsBar}>
          {STATS.map(({ value, label }) => (
            <div key={label} className={styles.statItem}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What I do</h2>
          <div className={styles.whatGrid}>
            <div className={styles.whatCard}>
              <h3>Next.js Development</h3>
              <p>
                Full-stack sites on Next.js 15 + TypeScript. App Router, CSS
                Modules, MDX blog, contact forms with spam protection. Every
                site ships with Lighthouse 95+ out of the box.
              </p>
            </div>
            <div className={styles.whatCard}>
              <h3>AI Integration</h3>
              <p>
                RAG-powered chat assistants trained on your content. Streaming
                responses, cosine similarity search, OpenAI API. ~$1–2/month
                running cost at typical traffic.
              </p>
            </div>
            <div className={styles.whatCard}>
              <h3>SEO & GEO</h3>
              <p>
                Technical SEO + GEO optimization for AI search engines (ChatGPT,
                Perplexity). FAQPage schema, structured data, Princeton KDD 2024
                methodology. Proven: SEO 100 on all sites.
              </p>
            </div>
            <div className={styles.whatCard}>
              <h3>MCP Integration</h3>
              <p>
                Model Context Protocol endpoints that expose your business
                systems to AI agents (Claude Desktop, Cursor, Windsurf).
                Production MCP server: 9 tools, multi-tenant isolation, auth,
                rate limiting. Store owners manage products via natural language.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tech Stack</h2>
          <div className={styles.stack}>
            {STACK.map((item) => (
              <span key={item} className={styles.stackItem}>
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Timeline</h2>
          <div className={styles.timeline}>
            {TIMELINE.map(({ year, title, desc }) => (
              <div key={year} className={styles.timelineRow}>
                <span className={styles.timelineYear}>{year}</span>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>{title}</h3>
                  <p className={styles.timelineDesc}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
