"use client";
// ============================================================
// src/components/home/FAQ/FAQ.tsx
// Accordion — Variant A (chosen for main page)
// FAQPage schema auto-generated from questions inline
// GEO: specific numbers in answers = +37% AI citation
// ============================================================
import { useState } from "react";
import styles from "./FAQ.module.css";

const FAQ_ITEMS = [
  {
    q: "How much does a Next.js website cost in 2026?",
    a: "A professional Next.js site starts at $1,200 for a Starter package (2 weeks, 2 languages, Lighthouse 95+). Business sites with AI features and 6 languages start at $2,500, delivered in 4 weeks. Monthly retainer starts at $800/mo.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Starter sites take 2 weeks. Business sites with multilingual routing, AI chat, and blog take 4–6 weeks. Timeline depends on content readiness — the faster you provide copy and assets, the faster we ship.",
  },
  {
    q: "Do you integrate AI features like chatbots?",
    a: "Yes — OpenAI-powered chat widgets, email auto-replies, and Telegram notifications are available as add-ons from $500. Integration takes 1–2 weeks and includes a custom knowledge base trained on your content.",
  },
  {
    q: "What is GEO optimization and why does it matter?",
    a: "GEO (Generative Engine Optimization) makes your content cited by ChatGPT, Perplexity, and Google AI — not just ranked by Google. AI referrals grew +527% in 2025. Every site I build includes structured data, FAQ schema, and Quick Answer blocks optimized for AI citation.",
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
