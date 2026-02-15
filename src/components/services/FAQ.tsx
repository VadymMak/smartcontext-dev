"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

const FAQ_ITEMS = [
  {
    question: "How long does a project take?",
    answer:
      "A landing page takes 1-2 weeks. A full business site with blog and SEO takes 3-4 weeks. Projects with AI features typically take 4-6 weeks. I'll give you a specific timeline in the proposal.",
  },
  {
    question: "What's the typical budget range?",
    answer:
      "Landing pages start at $1,500. Business sites range from $3,000-$5,000. Full-featured sites with AI integration are $5,000-$8,000. I work with fixed prices so you know exactly what to expect.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, most of my clients are based in the US, EU, and UK. I communicate in English and Russian, and I'm experienced with remote collaboration across time zones.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "My core stack is Next.js, React, and TypeScript. For AI features I use OpenAI API and LangChain. Databases: PostgreSQL. Hosting: Vercel. Everything is chosen for performance, developer experience, and long-term maintainability.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. I offer maintenance packages starting at $200/month that cover hosting monitoring, security updates, performance checks, content updates, and priority bug fixes. Every client gets 30 days of free support after launch.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faq}>
      {FAQ_ITEMS.map((item, i) => (
        <div
          key={i}
          className={`${styles.item} ${openIndex === i ? styles.open : ""}`}
        >
          <button className={styles.question} onClick={() => toggle(i)}>
            <span>{item.question}</span>
            <span className={styles.icon}>{openIndex === i ? "−" : "+"}</span>
          </button>
          <div className={styles.answerWrapper}>
            <p className={styles.answer}>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}