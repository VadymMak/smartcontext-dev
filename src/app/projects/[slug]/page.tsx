import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/layout/CTABanner";
import AnimatedSection from "@/components/shared/AnimatedSection";
import styles from "./project.module.css";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <div className={styles.container}>
          <Link href="/projects" className={styles.breadcrumbLink}>
            ← Projects
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className={styles.header}>
        <div className={styles.container}>
          <div className={styles.meta}>
            <span className={styles.year}>{project.year}</span>
            {project.client && (
              <>
                <span className={styles.dot}>·</span>
                <span>{project.client}</span>
              </>
            )}
          </div>

          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.description}>{project.description}</p>

          <div className={styles.tags}>
            {project.techStack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          <div className={styles.links}>
            {project.liveUrl && (
              <Button href={project.liveUrl} variant="primary" size="md">
                View Live Site ↗
              </Button>
            )}
            {project.githubUrl && (
              <Button href={project.githubUrl} variant="secondary" size="md">
                GitHub ↗
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Hero image placeholder */}
      <div className={styles.heroImage}>
        <div className={styles.container}>
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderIcon}>{"</>"}</span>
            <span className={styles.placeholderText}>Project Screenshot</span>
          </div>
        </div>
      </div>

      {/* Case study content */}
      <article className={styles.article}>
        <div className={styles.content}>
          {/* The Challenge */}
          <AnimatedSection>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>The Challenge</h2>
              <p className={styles.sectionText}>{project.challenge}</p>
            </section>
          </AnimatedSection>

          {/* The Solution */}
          <AnimatedSection delay={0.1}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>The Solution</h2>
              <p className={styles.sectionText}>{project.solution}</p>
            </section>
          </AnimatedSection>

          {/* Key Features */}
          <AnimatedSection delay={0.1}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Key Features</h2>
              <ul className={styles.featureList}>
                {project.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <span className={styles.featureCheck}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </AnimatedSection>

          {/* Technical Details */}
          <AnimatedSection delay={0.1}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Technical Details</h2>
              <div className={styles.techGrid}>
                {project.techStack.map((tech) => (
                  <Tag key={tech} variant="accent">
                    {tech}
                  </Tag>
                ))}
              </div>
            </section>
          </AnimatedSection>

          {/* Results */}
          {project.results && (
            <AnimatedSection delay={0.1}>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Results</h2>
                <div className={styles.resultsGrid}>
                  {project.results.map((result, i) => (
                    <div key={i} className={styles.resultCard}>
                      <span className={styles.resultText}>{result}</span>
                    </div>
                  ))}
                </div>
              </section>
            </AnimatedSection>
          )}
        </div>
      </article>

      <CTABanner
        title="Like what you see?"
        subtitle="Let's discuss your project."
        buttonText="Start a Conversation →"
      />
    </main>
  );
}