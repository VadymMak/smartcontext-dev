import Link from "next/link";
import Tag from "@/components/ui/Tag";
import type { ProjectData } from "@/data/projects";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className={styles.card}>
      {/* Image placeholder */}
      <div className={styles.imageWrapper}>
        <div className={styles.imagePlaceholder}>
          <span className={styles.placeholderIcon}>{"</>"}</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.year}>{project.year}</span>
          {project.client && (
            <>
              <span className={styles.dot}>·</span>
              <span className={styles.client}>{project.client}</span>
            </>
          )}
        </div>

        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.tags}>
          {project.techStack.slice(0, 4).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
          {project.techStack.length > 4 && (
            <Tag>+{project.techStack.length - 4}</Tag>
          )}
        </div>

        <span className={styles.viewLink}>View Case Study →</span>
      </div>
    </Link>
  );
}