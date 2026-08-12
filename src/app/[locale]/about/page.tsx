// ============================================================
// src/app/[locale]/about/page.tsx
// E-E-A-T optimized — Person JSON-LD, credentials, photo
// ============================================================
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { alternatesFor } from "@/lib/seo";
import styles from "./about.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartctx.dev";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "About Vadym Mak — SmartContext",
    description:
      "Full-stack developer since 2019. React Native (iOS/Android), Next.js, AI integration, MCP servers. Two production German-language transfer platforms. Based in Slovakia, 100 km from Vienna.",
    alternates: alternatesFor(locale, "/about"),
  };
}

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
  { value: "6+", label: "Years of experience" },
  { value: "8+", label: "Production sites live" },
  { value: "6", label: "Languages per site" },
  { value: "1", label: "MCP endpoint in production" },
];

const TIMELINE = [
  {
    year: "2026",
    title: "SmartContext.dev launched + Lead Web Developer role",
    desc: "Full rebrand with RAG chat, MCP endpoint, and AI visibility baseline. Joined UB Market LTD as Lead Web Developer, leading B2B platform development.",
  },
  {
    year: "2025",
    title: "AI integration focus",
    desc: "RAG chatbots, embeddings, OpenAI API across 3 client sites.",
  },
  {
    year: "2024",
    title: "Next.js production sites",
    desc: "akillustrator.com, ub-market.com, formaink.com — delivered and live.",
  },
  {
    year: "2023",
    title: "Next.js & full-stack web",
    desc: "Transitioned from mobile to Next.js App Router. TypeScript-first development.",
  },
  {
    year: "2022",
    title: "Transition to freelance",
    desc: "Started freelance work focused on Next.js multilingual websites for European SMBs.",
  },
  {
    year: "2021",
    title: "Mobile & enterprise development",
    desc: "Joined Requestum as React Native developer. Built CRM system with admin frontend and large-scale backend, international company website, and sports totalizer mobile app for Taiwan market.",
  },
  {
    year: "2019",
    title: "Career start",
    desc: "Started professional development at Mate Academy as React Native developer (iOS & Android).",
  },
];

export default async function AboutPage({ params }: AboutPageProps) {
  await params; // satisfy Next.js dynamic API requirement

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vadym Mak",
    url: BASE_URL,
    jobTitle: "Full-Stack Developer & AI Integrator",
    description:
      "Full-stack developer since 2019. React Native (iOS/Android) — CRM systems, enterprise apps. Next.js with 8+ production sites across six languages. AI integration (RAG, MCP servers). Based in Slovakia, 100 km from Vienna.",
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "React",
      "OpenAI API",
      "SEO",
      "Retrieval-Augmented Generation",
      "Model Context Protocol",
      "Web Performance",
      "Multilingual web development",
    ],
    worksFor: {
      "@type": "Organization",
      name: "SmartContext.dev",
      url: BASE_URL,
    },
    sameAs: [
      "https://github.com/VadymMak",
      "https://www.linkedin.com/in/vadymmakevytss/",
    ],
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
              📍 Slovakia · 100 km from Vienna · Remote worldwide
            </p>
            <p className={styles.bio}>
              Developer since 2019. I build multilingual Next.js sites for
              European companies and connect business systems to AI — RAG
              assistants trained on your own content, and MCP servers that let
              Claude, Cursor and Windsurf operate your systems in natural
              language. Two production transfer platforms in German (Austrian
              corridor). Invoiced from the EU with reverse charge.
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
                Multilingual sites on Next.js 15 + TypeScript. App Router, CSS
                Modules, MDX blog, contact forms with spam protection. Correct
                hreflang via manual sitemap — the Next.js generator silently
                drops alternates.
              </p>
            </div>
            <div className={styles.whatCard}>
              <h3>AI Integration</h3>
              <p>
                RAG-powered chat assistants trained on your content. Streaming
                responses, cosine similarity search, OpenAI API. Honeypot +
                reCAPTCHA v3 + per-IP rate limit before any model call — because
                an unprotected AI endpoint passes the cost to the client.
              </p>
            </div>
            <div className={styles.whatCard}>
              <h3>SEO & AI Visibility</h3>
              <p>
                Classic SEO is the primary AI-citation driver — position 1 is
                cited in ~43% of queries, position 7 in ~5%. On top of that:
                concrete facts and freshness dates in visible copy, which
                controlled experiments show act as citation gatekeepers.
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
