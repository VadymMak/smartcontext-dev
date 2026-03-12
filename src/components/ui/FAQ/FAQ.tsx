"use client";

// ============================================================
// src/components/ui/FAQ/FAQ.tsx
// Accordion FAQ + FAQPage JSON-LD structured data
// ✅ Confirmed: Google Rich Results Test shows '1 valid FAQPage item'
// ⚠️ CRITICAL: FAQPage JSON-LD must be a SEPARATE <script> tag
//    Never merge with Service or Article schemas
// ============================================================

import { useState } from "react";
import type { FAQ as FAQType } from "@/data/serviceFaqs";
import styles from "./FAQ.module.css";

interface FAQProps {
  items: FAQType[];
  title?: string;
}

export function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  // FAQPage JSON-LD — separate script tag, never merged with other schemas
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className={styles.section} aria-label={title}>
      {/* ⚠️ Separate script tag — never merge with other JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {title && <h2 className={styles.title}>{title}</h2>}

      <div className={styles.list}>
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
            >
              <button
                className={styles.question}
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span>{item.question}</span>
                {/* Chevron icon — inline SVG */}
                <svg
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                className={styles.answerWrapper}
                style={
                  isOpen
                    ? { maxHeight: "500px", opacity: 1 }
                    : { maxHeight: "0px", opacity: 0 }
                }
              >
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
