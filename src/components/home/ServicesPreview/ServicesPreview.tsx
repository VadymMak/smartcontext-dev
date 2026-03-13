// ============================================================
// src/components/home/ServicesPreview/ServicesPreview.tsx
// Bento Grid — static EN content, prices hardcoded for GEO/AI indexing
// ============================================================

import Link from "next/link";
import { ScrollReveal } from "@/components/ui";
import styles from "./ServicesPreview.module.css";

// Inline SVG icons — no icon library dependency
const IconCode = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconBot = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="2" strokeLinecap="round" />
    <line
      x1="12"
      y1="16"
      x2="12"
      y2="16"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="16"
      y1="16"
      x2="16"
      y2="16"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconTrendingUp = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export function ServicesPreview() {
  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.header}>
          <h2 className={styles.title}>Services</h2>
          <p className={styles.subtitle}>
            What I build for you — with real timelines and prices.
          </p>
        </div>
      </ScrollReveal>

      <div className={styles.bento}>
        {/* Wide card — Web Development */}
        <ScrollReveal>
          <Link
            href="/services/web-development"
            className={`${styles.card} ${styles.cardWide}`}
          >
            <div className={styles.cardTop}>
              <span className={styles.iconWrap}>
                <IconCode />
              </span>
              <span className={styles.badge}>Most popular</span>
            </div>
            <h3 className={styles.cardTitle}>Next.js Web Development</h3>
            <p className={styles.cardDesc}>
              Fast, SEO-ready websites built on Next.js + TypeScript. Lighthouse
              95+, mobile-first, AI-ready architecture. From landing pages to
              full B2B platforms.
            </p>
            <div className={styles.cardMeta}>
              <span className={styles.price}>from $1,200</span>
              <span className={styles.divider} aria-hidden="true" />
              <span className={styles.timeline}>2–6 weeks</span>
            </div>
            <span className={styles.cta}>View details →</span>
          </Link>
        </ScrollReveal>

        {/* Narrow card — AI Chat */}
        <ScrollReveal delay={100}>
          <Link
            href="/services/ai-chat"
            className={`${styles.card} ${styles.cardNarrow}`}
          >
            <div className={styles.cardTop}>
              <span className={styles.iconWrap}>
                <IconBot />
              </span>
            </div>
            <h3 className={styles.cardTitle}>AI Chat Integration</h3>
            <p className={styles.cardDesc}>
              RAG-powered assistant trained on your content. Answers client
              questions 24/7.
            </p>
            <div className={styles.cardMeta}>
              <span className={styles.price}>from $500</span>
              <span className={styles.divider} aria-hidden="true" />
              <span className={styles.timeline}>1–2 weeks</span>
            </div>
            <span className={styles.cta}>Learn more →</span>
          </Link>
        </ScrollReveal>

        {/* Narrow card — SEO/GEO */}
        <ScrollReveal delay={200}>
          <Link
            href="/services/seo"
            className={`${styles.card} ${styles.cardNarrow}`}
          >
            <div className={styles.cardTop}>
              <span className={styles.iconWrap}>
                <IconTrendingUp />
              </span>
            </div>
            <h3 className={styles.cardTitle}>SEO & GEO Optimization</h3>
            <p className={styles.cardDesc}>
              Rank in Google and get cited by ChatGPT. Technical SEO, schema
              markup, GEO content.
            </p>
            <div className={styles.cardMeta}>
              <span className={styles.price}>from $600</span>
              <span className={styles.divider} aria-hidden="true" />
              <span className={styles.timeline}>1–3 weeks</span>
            </div>
            <span className={styles.cta}>Learn more →</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
