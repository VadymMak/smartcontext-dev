import Tag from "@/components/ui/Tag";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import styles from "./TechStack.module.css";

const STACK = {
  Frontend: ["React", "Next.js", "TypeScript", "Framer Motion", "CSS Modules"],
  Backend: ["Node.js", "Python", "FastAPI", "PostgreSQL"],
  "AI & Tools": ["OpenAI API", "LangChain", "Embeddings", "RAG"],
  DevOps: ["Vercel", "Railway", "Docker", "Git", "GitHub Actions"],
};

export default function TechStack() {
  return (
    <AnimatedSection className={styles.section}>
      <div className={styles.container}>
        <SectionHeading title="Tech Stack" align="center" />

        <div className={styles.groups}>
          {Object.entries(STACK).map(([group, techs]) => (
            <div key={group} className={styles.group}>
              <h3 className={styles.groupTitle}>{group}</h3>
              <div className={styles.tags}>
                {techs.map((tech) => (
                  <Tag
                    key={tech}
                    variant={
                      tech.includes("AI") || tech.includes("Open") || tech.includes("RAG")
                        ? "accent"
                        : "default"
                    }
                  >
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}