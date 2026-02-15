import type { Metadata } from "next";
import Tag from "@/components/ui/Tag";
import CTABanner from "@/components/layout/CTABanner";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Vadym Mak",
  description:
    "Full-stack developer specializing in React, Next.js, and AI integration. Building modern web applications at SmartContext.",
};

const TIMELINE = [
  {
    year: "2026",
    title: "Founded SmartContext",
    description:
      "Launched SmartContext.dev — combining web development with AI integration to help businesses grow online.",
  },
  {
    year: "2025",
    title: "AI Integration Projects",
    description:
      "Built multi-provider AI chat assistant, explored RAG architectures, and started integrating LLMs into client projects.",
  },
  {
    year: "2024",
    title: "Full-Stack Development",
    description:
      "Focused on Next.js and TypeScript ecosystem. Built client portfolios, VS Code extensions, and developer tools.",
  },
];

const TECH_GROUPS = [
  {
    label: "FRONTEND",
    techs: ["React", "Next.js", "TypeScript", "Framer Motion", "CSS Modules"],
  },
  {
    label: "BACKEND",
    techs: ["Node.js", "Python", "FastAPI", "PostgreSQL"],
  },
  {
    label: "AI & TOOLS",
    techs: ["OpenAI API", "LangChain", "Embeddings", "RAG"],
  },
  {
    label: "DEVOPS",
    techs: ["Vercel", "Railway", "Docker", "Git"],
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Intro */}
      <section className={styles.intro}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div className={styles.photoPlaceholder}>
              <span className={styles.photoIcon}>VM</span>
            </div>
            <div className={styles.introContent}>
              <h1 className={styles.title}>About Me</h1>
              <p className={styles.lead}>
                I&apos;m Vadym Mak, a full-stack developer and the founder of
                SmartContext. I build modern web applications and explore the
                intersection of web development and AI.
              </p>
              <p className={styles.text}>
                SmartContext started from a simple observation: businesses need
                more than just a website — they need a digital presence that
                actively works for them. That means fast-loading pages, strong
                SEO, and increasingly, AI features that engage visitors and
                automate routine tasks.
              </p>
              <p className={styles.text}>
                I specialize in building exactly that. Every project I take on
                gets the full package: custom development on a modern stack,
                SEO optimization with proven results (Lighthouse 100), and
                AI integration where it adds real value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience timeline */}
      <div className="section-alt">
        <AnimatedSection>
          <section className={styles.experience}>
            <div className={styles.container}>
              <SectionHeading title="Experience" align="center" />
              <div className={styles.timeline}>
                {TIMELINE.map((item) => (
                  <div key={item.year} className={styles.timelineItem}>
                    <span className={styles.timelineYear}>{item.year}</span>
                    <div>
                      <h3 className={styles.timelineTitle}>{item.title}</h3>
                      <p className={styles.timelineDescription}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>

      {/* Tech stack */}
      <AnimatedSection>
        <section className={styles.techSection}>
          <div className={styles.container}>
            <SectionHeading title="Tech Stack" align="center" />
            <div className={styles.techGrid}>
              {TECH_GROUPS.map((group) => (
                <div key={group.label} className={styles.techGroup}>
                  <h3 className={styles.techLabel}>{group.label}</h3>
                  <div className={styles.techTags}>
                    {group.techs.map((tech) => (
                      <Tag
                        key={tech}
                        variant={
                          group.label === "AI & TOOLS" ? "accent" : "default"
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
        </section>
      </AnimatedSection>

      {/* Languages & Beyond Code */}
      <div className="section-alt">
        <AnimatedSection>
          <section className={styles.personal}>
            <div className={styles.container}>
              <div className={styles.personalGrid}>
                <div>
                  <h2 className={styles.personalTitle}>Languages</h2>
                  <p className={styles.text}>
                    English, Russian, Ukrainian — I work comfortably with
                    international clients across time zones.
                  </p>
                </div>
                <div>
                  <h2 className={styles.personalTitle}>Beyond Code</h2>
                  <p className={styles.text}>
                    When I&apos;m not coding, you&apos;ll find me exploring AI
                    research papers, contributing to open source, or enjoying
                    the Mediterranean coast in Erdemli, Turkey.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>

      {/* Connect */}
      <AnimatedSection>
        <section className={styles.connect}>
          <div className={styles.container}>
            <SectionHeading
              title="Let's Connect"
              subtitle="Find me on these platforms or send me an email."
              align="center"
            />
            <div className={styles.links}>
              <a
                href="https://github.com/VadymMak"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                GitHub →
              </a>
              <a
                href="https://linkedin.com/in/vadymmak"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                LinkedIn →
              </a>
              <a
                href="mailto:hello@smartcontext.dev"
                className={styles.socialLink}
              >
                Email →
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <CTABanner
        title="Want to work together?"
        subtitle="Let's build something great."
        buttonText="Get in Touch →"
      />
    </main>
  );
}