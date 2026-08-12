// ============================================================
// src/components/home/FeaturedProjects/FeaturedProjects.tsx
// Editorial numbered list — 01 / 02 / 03 style
// Client projects first; own platform last.
// TODO(metrics): replace metric placeholders with real GA data
//                once clients share access.
// ============================================================

import { ScrollReveal } from "@/components/ui";
import styles from "./FeaturedProjects.module.css";

const PROJECTS = [
  {
    num: "01",
    title: "Euroschnell — Airport Transfers",
    description:
      "German-first transfer platform for the Vienna ⇄ Bratislava corridor. Thirteen routes generate 52 landing pages across four languages, each with a fixed price in visible text, distance and driving time. Quote form prefilled from the route, admin panel for fleet and pricing, Impressum and Datenschutzerklärung for the DACH market.",
    tags: ["German-first", "4 languages", "52 route pages"],
    metric: "52 route pages", // TODO(metrics): swap for quote requests/month once the client shares GA
    url: "https://www.euroschnell.eu/de",
  },
  {
    num: "02",
    title: "Transfer SK-EU",
    description:
      "Six-language transfer platform covering four airport corridors — Bratislava, Vienna, Budapest, Prague. Prices come from the database with a build-time fallback, so the operator changes a fare in the admin panel and every localized route page follows. MCP endpoint and a retrieval-augmented chat answering from the site's own content.",
    tags: ["6 languages", "MCP + RAG chat", "DB-driven pricing"],
    metric: "6 languages", // TODO(metrics): swap for quote requests/month
    url: "https://transfersk.eu",
  },
  {
    num: "03",
    title: "VendShop",
    description:
      "Multi-tenant SaaS commerce platform. Five store verticals from one codebase, theme presets with an admin editor, Stripe with webhooks, MCP endpoint exposing nine tools to Claude Desktop.",
    tags: ["Multi-tenant SaaS", "MCP · 9 tools", "Stripe"],
    metric: "Live SaaS",
    url: "https://vendshop.shop",
  },
  {
    num: "04",
    title: "UB Market B2B",
    description:
      "B2B trading platform in six languages with AI-assisted product search and a geo-optimised blog.",
    tags: ["B2B", "6 languages", "AI search"],
    metric: "6 languages",
    url: "https://ub-market.com",
  },
  {
    num: "05",
    title: "FormaInk Studio",
    description:
      "Design studio site — six languages, service packages with transparent pricing, AI-assisted email handling.",
    tags: ["Next.js", "6 languages", "AI email"],
    metric: "6 languages",
    url: "https://formaink.com",
  },
  {
    num: "06",
    title: "Kate Barber Template",
    description:
      "Production booking template: slot-based reservations, AI booking assistant, database-driven theming. Reusable across salons and clinics.",
    tags: ["Booking", "AI assistant", "Theming"],
    metric: "Template",
    url: "https://vendshop-template-services.vercel.app/sk",
  },
] as const;

interface FeaturedProjectsProps {
  title?: string;
  subtitle?: string;
}

export function FeaturedProjects({
  title = "Featured Projects",
  subtitle = "Production work — client projects first",
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
