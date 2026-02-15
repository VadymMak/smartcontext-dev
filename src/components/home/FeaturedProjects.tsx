import Link from "next/link";
import Tag from "@/components/ui/Tag";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import styles from "./FeaturedProjects.module.css";

// Placeholder data — will be replaced with MDX content later
const PROJECTS = [
  {
    slug: "ak-illustrator",
    title: "AK Illustrator Portfolio",
    description:
      "Artist portfolio with Lighthouse SEO score 100. Custom gallery, animations, and multilingual support.",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "i18n"],
    image: null,
  },
  {
    slug: "multi-ai-assistant",
    title: "Multi-AI Assistant",
    description:
      "Chat application integrating multiple LLM providers with streaming responses and conversation management.",
    techStack: ["React", "Python", "FastAPI", "OpenAI API", "PostgreSQL"],
    image: null,
  },
  {
    slug: "vscode-extension",
    title: "VS Code Extension",
    description:
      "Developer productivity tool extending VS Code with custom commands and workspace management features.",
    techStack: ["TypeScript", "VS Code API", "Node.js"],
    image: null,
  },
];

export default function FeaturedProjects() {
  return (
    <AnimatedSection className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          title="Featured Projects"
          subtitle="Recent work showcasing web development and AI integration."
          align="center"
        />

        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={styles.card}
            >
              {/* Image placeholder */}
              <div className={styles.imageWrapper}>
                <div className={styles.imagePlaceholder}>
                  <span className={styles.placeholderIcon}>{"</>"}</span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>
                <div className={styles.tags}>
                  {project.techStack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
                <span className={styles.viewLink}>View Case Study →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.linkWrapper}>
          <Link href="/projects" className={styles.link}>
            All Projects →
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}