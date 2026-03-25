// ============================================================
// src/app/projects/page.tsx
// ============================================================
import type { Metadata } from "next";
import styles from "./projects.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartctx.dev";

export const metadata: Metadata = {
  title: "Projects — SmartContext",
  description:
    "Selected client work — Next.js, TypeScript, AI integration, SEO. 4 production sites with Lighthouse 95–100.",
  alternates: {
    canonical: `${BASE_URL}/projects`,
  },
};

const PROJECTS = [
  {
    number: "01",
    name: "FormaInk Studio",
    url: "https://formaink.com",
    tech: ["Next.js 15", "TypeScript", "CSS Modules", "next-intl", "Resend"],
    desc: "Conversion-first website for a tattoo & design studio. 6 languages, service pages with pricing packages, AI email automation, and GEO-optimized content.",
    metrics: [
      { label: "Lighthouse Performance", value: "98" },
      { label: "SEO Score", value: "100" },
      { label: "Languages", value: "6" },
    ],
    highlights: [
      "Conversion-first UX — pricing packages above the fold",
      "AI-powered email responses via OpenAI",
      "Full i18n: SK, EN, DE, UK, CS, PL",
      "GEO/AEO optimized for AI search citation",
    ],
  },
  {
    number: "02",
    name: "AK Illustrator",
    url: "https://akillustrator.com",
    tech: ["Next.js 15", "TypeScript", "OpenAI API", "RAG", "Telegram Bot"],
    desc: "Portfolio site for a children's book illustrator with AI chat assistant, protected image gallery, email automation, and Telegram notifications.",
    metrics: [
      { label: "Lighthouse Performance", value: "96" },
      { label: "SEO Score", value: "100" },
      { label: "AI Chat", value: "RAG" },
    ],
    highlights: [
      "RAG-powered AI chat trained on illustrator's content",
      "Protected image system — no right-click downloads",
      "Telegram bot notifications for new inquiries",
      "Light/dark theme with CSS-only animations",
    ],
  },
  {
    number: "03",
    name: "UB Market B2B",
    url: "https://ub-market.com",
    tech: ["Next.js 15", "TypeScript", "OpenAI API", "RAG", "next-intl"],
    desc: "B2B trading platform with 6 languages, 12 GEO-optimized blog posts, AI email responses, and RAG-powered product search.",
    metrics: [
      { label: "Lighthouse Performance", value: "97" },
      { label: "SEO Score", value: "100" },
      { label: "Blog posts", value: "12" },
    ],
    highlights: [
      "6-language B2B platform (EN, SK, CZ, DE, UK, RU)",
      "12 GEO-optimized blog posts for AI citation",
      "AI email automation for supplier inquiries",
      "RAG embeddings for smart product search",
    ],
  },
  {
    number: "04",
    name: "Baloon Party",
    url: "https://baloon-party00.sk",
    tech: ["Next.js 15", "TypeScript", "CSS Modules", "next-intl"],
    desc: "Event decoration website for a Slovak balloon studio. Multilingual, gallery, contact form with spam protection.",
    metrics: [
      { label: "Lighthouse Performance", value: "95" },
      { label: "SEO Score", value: "100" },
      { label: "Languages", value: "3" },
    ],
    highlights: [
      "Mobile-first event services showcase",
      "3 languages: SK, EN, CZ",
      "Gallery with lightbox",
      "Contact form with honeypot spam protection",
    ],
  },
];

export default function ProjectsPage() {
  return (
    <div className="container">
      <section className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>
          Selected client work built with Next.js, TypeScript, and AI
          integration. Every site ships with Lighthouse 95+ and SEO 100.
        </p>
      </section>

      <div className={styles.list}>
        {PROJECTS.map((project) => (
          <div key={project.name} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.number}>{project.number}</span>
              <div className={styles.cardMain}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>{project.name}</h2>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    View site →
                  </a>
                </div>
                <p className={styles.cardDesc}>{project.desc}</p>

                {/* Metrics */}
                <div className={styles.metrics}>
                  {project.metrics.map((m) => (
                    <div key={m.label} className={styles.metric}>
                      <span className={styles.metricValue}>{m.value}</span>
                      <span className={styles.metricLabel}>{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <ul className={styles.highlights}>
                  {project.highlights.map((h) => (
                    <li key={h} className={styles.highlight}>
                      <span className={styles.check}>✓</span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className={styles.tags}>
                  {project.tech.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
