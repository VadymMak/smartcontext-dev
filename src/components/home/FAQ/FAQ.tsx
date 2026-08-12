"use client";
// ============================================================
// src/components/home/FAQ/FAQ.tsx
// Accordion — Variant A (chosen for main page)
// FAQPage schema auto-generated from questions inline
// ============================================================
import { useState } from "react";
import styles from "./FAQ.module.css";

const FAQ_ITEMS = [
  {
    q: "How much does a Next.js website cost in 2026?",
    a: "A multilingual Next.js site starts at $1,200 (2–6 weeks, up to 6 languages, server-rendered structured data). AI integration (RAG assistant or MCP server) starts at $3,000, delivered in 2–4 weeks. Growth retainer from $800/month — minimum three months, because nothing moves faster than that.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Starter sites take 2 weeks. Business sites with multilingual routing, AI chat, and blog take 4–6 weeks. Timeline depends on content readiness — the faster you provide copy and assets, the faster we ship.",
  },
  {
    q: "Do you build AI integrations like RAG assistants and MCP servers?",
    a: "Yes — both are in production on this site and on client projects. A RAG assistant answers visitor questions from your own content. An MCP server exposes your business systems to Claude, Cursor and Windsurf so they can operate them in natural language. AI integration starts from $3,000 and includes abuse protection: honeypot, reCAPTCHA v3, and per-IP rate limiting before any model call.",
  },
  {
    q: "What actually drives AI citation — schema markup or ranking?",
    a: "Ranking is the primary driver. Position 1 gets cited in roughly 43% of queries where the page appears; position 7 in about 5%. Schema markup has no measurable effect in controlled experiments — most AI pipelines strip markup before the model sees it. Concrete facts in visible text and freshness dates act as secondary gatekeepers.",
  },
  {
    q: "Do you offer ongoing support and maintenance?",
    a: "Yes — monthly retainer from $800/mo includes content updates, GEO blog posts, performance monitoring, and priority support. No long-term contract required.",
  },
] as const;

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={styles.section} aria-label="FAQ">
      <div className={styles.header}>
        <span className={styles.eyebrow}>FAQ</span>
        <h2 className={styles.heading}>Common questions</h2>
        <p className={styles.sub}>
          Answered with specific numbers — because that&apos;s what Google and
          ChatGPT look for.
        </p>
      </div>

      <div className={styles.list}>
        {FAQ_ITEMS.map(({ q, a }, i) => (
          <div key={i} className={styles.item}>
            <button
              className={`${styles.question} ${open === i ? styles.questionOpen : ""}`}
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{q}</span>
              <span className={styles.icon} aria-hidden="true">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className={styles.answer}>
                <p>{a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />
    </section>
  );
}
