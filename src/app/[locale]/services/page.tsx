// ============================================================
// src/app/[locale]/services/page.tsx — Services list page
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/components/ui";
import { ScrollReveal } from "@/components/ui";
import { serviceFaqs } from "@/data/serviceFaqs";
import { CTABand } from "@/components/home";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services — SmartContext",
  description:
    "Next.js web development from $1,200. AI chat integration from $500. SEO & GEO optimization from $600. Fast delivery, Lighthouse 95–100.",
};

const SERVICES = [
  {
    slug: "web-development",
    title: "Next.js Web Development",
    price: "from $1,200",
    timeline: "2–6 weeks",
    desc: "Fast, SEO-ready websites built on Next.js + TypeScript. Lighthouse 95+, mobile-first, AI-ready architecture. From landing pages to full B2B platforms with blog and multilingual support.",
    features: [
      "Next.js 15 + TypeScript",
      "Lighthouse 95–100",
      "MDX blog system",
      "Contact form + spam protection",
      "Structured data (JSON-LD)",
      "Multilingual (up to 6 languages)",
    ],
  },
  {
    slug: "ai-chat",
    title: "AI Chat Integration",
    price: "from $500",
    timeline: "1–2 weeks",
    desc: "RAG-powered assistant trained on your content. Answers client questions 24/7 with streaming responses. Accurate, brand-consistent answers — no hallucinations about your business.",
    features: [
      "OpenAI GPT-4o-mini",
      "RAG with embeddings",
      "Streaming responses",
      "Trained on your content",
      "~$1–2/month running cost",
      "3-layer spam protection",
    ],
  },
  {
    slug: "seo",
    title: "SEO & GEO Optimization",
    price: "from $600",
    timeline: "1–3 weeks",
    desc: "Rank in Google and get cited by ChatGPT. Technical SEO audit, structured data implementation, and GEO optimization based on Princeton KDD 2024 research.",
    features: [
      "Lighthouse SEO 100",
      "FAQPage + Article JSON-LD",
      "GEO/AEO optimization",
      "Core Web Vitals",
      "Sitemap + robots.txt",
      "Google Search Console setup",
    ],
  },
];

export default function ServicesPage() {
  // Use web-development FAQs for the services index page
  const faqs = serviceFaqs["web-development"]?.["en"] ?? [];

  return (
    <>
      <div className="container">
        {/* Header */}
        <ScrollReveal>
          <section className={styles.header}>
            <h1 className={styles.title}>Services</h1>
            <p className={styles.subtitle}>
              Full-stack web development, AI integration, and SEO optimization.
              Fixed prices, real timelines, measurable results.
            </p>
          </section>
        </ScrollReveal>

        {/* Service cards */}
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

        {/* FAQ */}
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
