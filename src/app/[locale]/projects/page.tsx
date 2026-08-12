// ============================================================
// src/app/[locale]/projects/page.tsx
// ============================================================
import type { Metadata } from "next";
import { alternatesFor } from "@/lib/seo";
import styles from "./projects.module.css";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Projects — SmartContext",
    description:
      "Client work — Next.js, TypeScript, AI integration, MCP servers, multilingual sites. Transfer platforms, SaaS, B2B.",
    alternates: alternatesFor(locale, "/projects"),
  };
}

const PROJECTS = [
  {
    number: "01",
    name: "Kate Barber Template",
    url: "https://vendshop-template-services.vercel.app/sk",
    tech: ["Next.js 15", "TypeScript", "Prisma v7", "pgvector", "GPT-4o-mini"],
    desc: "Production barbershop template with AI booking assistant, slot-based reservations, Sharp WebP pipeline, and admin-controlled CSS theming via database.",
    metrics: [
      { label: "Lighthouse Mobile", value: "96" },
      { label: "SEO Score", value: "100" },
      { label: "LCP Mobile", value: "1.1s" },
    ],
    highlights: [
      "AI booking assistant: GPT-4o-mini + pgvector RAG over knowledge base",
      "Slot-based reservations with 409 conflict detection prevents double-booking",
      "Admin CSS theming — colors stored in DB, change without redeploy",
      "Reusable via STORE_SLUG: barbershops, nail salons, dental clinics",
    ],
  },
  {
    number: "02",
    name: "VendShop",
    url: "https://vendshop.shop",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "Prisma", "Neon PostgreSQL", "Stripe", "Replicate"],
    desc: "European done-for-you website service for small businesses. 48-hour delivery, multilingual templates, integrated AI Studio for image and video generation, Stripe payments.",
    metrics: [
      { label: "Delivery Time", value: "48h" },
      { label: "Languages", value: "5" },
      { label: "Projects Shipped", value: "11" },
    ],
    highlights: [
      "Done-for-you model: clients send brief, finished site delivered in 48 hours",
      "AI Studio integrated: image generation, video, photo editing, slideshow renderer",
      "5 native languages: Slovak, Czech, Ukrainian, German, English (next-intl)",
      "6 industry-specific templates: food, restaurant, beauty, repair, medical, e-commerce",
    ],
  },
  {
    number: "03",
    name: "SmartContext.dev",
    url: "https://smartctx.dev",
    tech: ["Next.js 15", "TypeScript", "CSS Modules", "MDX", "RAG"],
    desc: "Personal developer portfolio built as a live demonstration of the stack and SEO approach used for all client projects. GEO-optimized blog, AI chat, Lighthouse 100.",
    metrics: [
      { label: "Lighthouse Desktop", value: "100" },
      { label: "SEO Score", value: "100" },
      { label: "Blog posts", value: "7" },
    ],
    highlights: [
      "Lighthouse 100/100/100/100 desktop, 99 mobile",
      "7 GEO-optimized blog posts for AI citation",
      "RAG-powered AI chat trained on service content",
      "Built as proof of concept for the stack sold to clients",
    ],
  },
  {
    number: "04",
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
    number: "05",
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
    number: "06",
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
    number: "07",
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

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  await params; // satisfy Next.js dynamic API requirement
  return (
    <div className="container">
      <section className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>
          Client work — Next.js, TypeScript, AI integration, MCP servers, and
          multilingual sites for European companies.
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
