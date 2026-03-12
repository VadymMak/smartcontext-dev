// ============================================================
// src/app/projects/page.tsx
// ============================================================
import type { Metadata } from "next";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected client work — Next.js, TypeScript, AI integration, SEO.",
};

const PROJECTS = [
  {
    name: "FormaInk",
    url: "https://formaink.com",
    tech: ["Next.js", "i18n", "CSS Modules"],
    desc: "Tattoo studio website with multilingual support, gallery and booking system.",
  },
  {
    name: "AK Illustrator",
    url: "https://akillustrator.com",
    tech: ["Next.js", "AI Chat", "Portfolio"],
    desc: "Portfolio site for illustrator with protected image system and light/dark theme.",
  },
  {
    name: "UB Market",
    url: "https://ub-market.com",
    tech: ["Next.js", "AI Chat", "RAG", "B2B"],
    desc: "B2B marketplace with AI chat, RAG embeddings and contact automation.",
  },
  {
    name: "Baloon Party",
    url: "https://baloon-party00.sk",
    tech: ["Next.js", "i18n", "Events"],
    desc: "Event decoration website with gallery and contact form.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="container">
      <section className={styles.section}>
        <div className={styles.header}>
          <h1>Projects</h1>
          <p>
            Selected client work built with Next.js, TypeScript, and AI
            integration.
          </p>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <h2 className={styles.cardTitle}>{project.name}</h2>
                <span className={styles.cardArrow}>→</span>
              </div>
              <p className={styles.cardDesc}>{project.desc}</p>
              <div className={styles.tags}>
                {project.tech.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
