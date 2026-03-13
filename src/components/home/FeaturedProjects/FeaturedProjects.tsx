// ============================================================
// src/components/home/FeaturedProjects/FeaturedProjects.tsx
// Editorial numbered list — 01 / 02 / 03 style
// ============================================================

import { ScrollReveal } from "@/components/ui";
import styles from "./FeaturedProjects.module.css";

const PROJECTS = [
  {
    num: "01",
    title: "FormaInk Studio",
    description:
      "Design studio website with conversion-first UX, 6 languages, service packages with pricing.",
    tags: ["Next.js", "6 langs", "AI email"],
    metric: "Lighthouse 98",
    url: "https://formaink.com",
  },
  {
    num: "02",
    title: "AK Illustrator",
    description:
      "Artist portfolio with protected gallery, AI chat assistant, and Telegram notifications.",
    tags: ["Portfolio", "AI Chat", "Telegram"],
    metric: "AI Features",
    url: "https://akillustrator.com",
  },
  {
    num: "03",
    title: "UB Market B2B",
    description:
      "B2B trading platform with 6 languages, 12 blog posts, GEO optimization, and AI email replies.",
    tags: ["6 langs", "12 blog posts", "GEO"],
    metric: "Lighthouse 97",
    url: "https://ub-market.com",
  },
] as const;

interface FeaturedProjectsProps {
  title?: string;
  subtitle?: string;
}

export function FeaturedProjects({
  title = "Featured Projects",
  subtitle = "Selected work from recent clients",
}: FeaturedProjectsProps) {
  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </ScrollReveal>

      <div className={styles.list}>
        {PROJECTS.map((project, i) => (
          <ScrollReveal key={project.num} delay={i * 80}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.row}
              aria-label={`View ${project.title}`}
            >
              <span className={styles.num}>{project.num}</span>

              <div className={styles.info}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.desc}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.right}>
                <span className={styles.metric}>{project.metric}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
