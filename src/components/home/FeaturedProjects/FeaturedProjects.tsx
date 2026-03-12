// ============================================================
// src/components/home/FeaturedProjects/FeaturedProjects.tsx
// Static project showcase — replace with your real projects
// ============================================================

import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ui";
import styles from "./FeaturedProjects.module.css";

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  url?: string; // external live URL
  image?: string; // /projects/slug/cover.jpg
}

// Replace with your real projects
const PROJECTS: Project[] = [
  {
    slug: "formaink",
    title: "FormaInk",
    description:
      "Tattoo studio website with multilingual support, gallery and booking system.",
    tags: ["Next.js", "i18n", "Gallery"],
    url: "https://formaink.com",
  },
  {
    slug: "akillustrator",
    title: "AK Illustrator",
    description:
      "Portfolio site for illustrator with protected image system and light/dark theme.",
    tags: ["Next.js", "CSS Modules", "Portfolio"],
    url: "https://akillustrator.com",
  },
  {
    slug: "ub-market",
    title: "UB Market",
    description:
      "B2B marketplace with AI chat, RAG embeddings and contact automation.",
    tags: ["Next.js", "AI Chat", "RAG", "B2B"],
    url: "https://ub-market.com",
  },
];

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
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </ScrollReveal>

      <div className={styles.grid}>
        {PROJECTS.map((project, i) => (
          <ScrollReveal key={project.slug} delay={i * 100}>
            <article className={styles.card}>
              {/* Image placeholder — replace with next/image when you have assets */}
              <div className={styles.imagePlaceholder} aria-hidden="true">
                <span className={styles.placeholderText}>
                  {project.title.charAt(0)}
                </span>
              </div>

              <div className={styles.content}>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewLink}
                    aria-label={`View ${project.title} live site`}
                  >
                    View Live →
                  </a>
                )}
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
