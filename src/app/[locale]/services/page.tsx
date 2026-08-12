// ============================================================
// src/app/[locale]/services/page.tsx — Services list page
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/components/ui";
import { ScrollReveal } from "@/components/ui";
import { serviceFaqs } from "@/data/serviceFaqs";
import { CTABand } from "@/components/home";
import { alternatesFor } from "@/lib/seo";
import styles from "./services.module.css";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Services — SmartContext",
    description:
      "AI integration (RAG, MCP) from $3,000. Multilingual Next.js development from $1,200. SEO & AI visibility from $600. Fixed prices, real timelines.",
    alternates: alternatesFor(locale, "/services"),
  };
}

// Order: most expensive first, so $1,200 reads as entry option not anchor.
const SERVICES = [
  {
    slug: "ai-chat",
    title: "AI Integration (RAG + MCP)",
    price: "from $3,000",
    timeline: "2–4 weeks",
    desc: "A retrieval-augmented assistant answering from your own content, or an MCP server that lets Claude, Cursor and Windsurf operate your business systems in natural language. Both are running in production on this platform, not in a demo. An AI endpoint costs money per request, so abuse protection is not optional — honeypot, reCAPTCHA v3, and per-IP rate limit before any model call.",
    features: [
      "RAG over your content with embeddings",
      "MCP server + tool schema, auth and rate limiting",
      "Honeypot + reCAPTCHA v3 + heuristic filter before any model call",
      "max_tokens cap and per-IP rate limit",
      "Prompt-prefix caching to hold cost down",
      "Streaming responses",
    ],
  },
  {
    slug: "mcp-integration",
    title: "MCP Integration",
    price: "from $2,000",
    timeline: "1–3 weeks",
    desc: "Build Model Context Protocol endpoints that expose your business systems to AI agents like Claude Desktop, Cursor, and Windsurf. Production MCP server with 9 tools for a multi-tenant SaaS commerce platform — store owners manage products and orders via natural language.",
    features: [
      "Custom MCP server + tool schema",
      "Auth & rate limiting",
      "Claude Desktop config ready",
      "Prisma / PostgreSQL integration",
      "Multi-tenant isolation",
      "Tool discovery documentation",
    ],
  },
  {
    slug: "web-development",
    title: "Multilingual Next.js Site",
    price: "from $1,200",
    timeline: "2–6 weeks",
    desc: "Next.js and TypeScript. Correct hreflang via a manual sitemap route handler (the Next.js generator silently drops alternates in v14–16). Server-rendered structured data, programmatic landing pages for the queries your buyers actually type. Two production German-language platforms delivered.",
    features: [
      "Next.js 15 + TypeScript strict",
      "Correct hreflang (manual sitemap — Next.js drops alternates)",
      "MDX blog with reading time",
      "Contact form + multi-layer spam protection",
      "Server-rendered JSON-LD",
      "Multilingual (up to 6 languages)",
    ],
  },
  {
    slug: "seo",
    title: "SEO & AI Visibility",
    price: "from $600",
    timeline: "1–3 weeks",
    desc: "Ranking is the main driver of AI citation — position 1 gets cited in roughly 43% of queries where the page appears, position 7 in about 5%. So classic SEO is most of the work, not a separate line item. On top of that: concrete facts in visible text and visible freshness dates, which controlled experiments show act as citation gatekeepers. I will not sell you schema markup as an AI-visibility trick — the controlled studies find no effect, and most AI pipelines strip markup before the model sees it.",
    features: [
      "Technical audit + Core Web Vitals",
      "Correct hreflang (manual sitemap — Next.js drops alternates)",
      "Concrete facts and freshness dates in visible copy",
      "Structured data for rich results and entity identity",
      "AI visibility baseline across 5 platforms + 90-day retest",
      "Search Console + GA4 with developer-IP filter",
    ],
  },
];

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const faqs = serviceFaqs["web-development"]?.[locale] ?? serviceFaqs["web-development"]?.["en"] ?? [];

  return (
    <>
      <div className="container">
        <ScrollReveal>
          <section className={styles.header}>
            <h1 className={styles.title}>Services</h1>
            <p className={styles.subtitle}>
              Fixed prices, real timelines, and an honest position on what works.
            </p>
          </section>
        </ScrollReveal>

        <div className={styles.list}>
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 80}>
              <div className={styles.card}>
                <div className={styles.cardLeft}>
                  <div className={styles.cardMeta}>
                    <span className={styles.price}>{service.price}</span>
                    <span className={styles.divider} aria-hidden="true" />
                    <span className={styles.timeline}>{service.timeline}</span>
                  </div>
                  <h2 className={styles.cardTitle}>{service.title}</h2>
                  <p className={styles.cardDesc}>{service.desc}</p>
                  <Link
                    href={`/services/${service.slug}`}
                    className={styles.cardCta}
                  >
                    View details & FAQ →
                  </Link>
                </div>
                <ul className={styles.features}>
                  {service.features.map((f) => (
                    <li key={f} className={styles.feature}>
                      <span className={styles.check} aria-hidden="true">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {faqs.length > 0 && (
          <ScrollReveal>
            <div className={styles.faqWrap}>
              <FAQ items={faqs} />
            </div>
          </ScrollReveal>
        )}

        <CTABand />
      </div>
    </>
  );
}
