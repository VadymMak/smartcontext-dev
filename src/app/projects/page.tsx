import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import CTABanner from "@/components/layout/CTABanner";
import AnimatedSection from "@/components/shared/AnimatedSection";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web development and AI integration projects. Case studies showcasing modern web applications built with Next.js, React, and AI technologies.",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>
            Case studies from web development and AI integration work.
            Each project tells the story from challenge to solution.
          </p>
        </div>
      </section>

      <AnimatedSection>
        <div className={styles.container}>
          <div className={styles.grid}>
            {PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <CTABanner
        title="Like what you see?"
        subtitle="Let's discuss your project."
        buttonText="Get in Touch →"
      />
    </main>
  );
}