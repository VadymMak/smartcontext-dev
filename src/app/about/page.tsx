// ============================================================
// src/app/about/page.tsx
// ============================================================
import type { Metadata } from "next";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vadym Mak — Full-Stack Developer & AI Integrator. Next.js, TypeScript, OpenAI API.",
};

const STACK = [
  "Next.js 15",
  "TypeScript",
  "React",
  "CSS Modules",
  "OpenAI API",
  "MDX",
  "Resend",
  "Vercel",
];

export default function AboutPage() {
  return (
    <div className="container">
      <section className={styles.section}>
        <div className={styles.header}>
          <h1>About</h1>
          <p>Full-Stack Developer & AI Integrator based in Europe.</p>
        </div>

        <div className={styles.content}>
          <div className={styles.bio}>
            <h2>Hi, I'm Vadym</h2>
            <p>
              I build fast, conversion-focused websites for studios and B2B
              companies. My focus is on performance (Lighthouse 95–100), SEO,
              and AI integration that actually helps your business.
            </p>
            <p>
              Every project I deliver includes structured data, GEO optimization
              for AI search engines, and clean TypeScript code you can maintain
              yourself.
            </p>
            <p>
              I work under the brand <strong>SmartContext.dev</strong> —
              delivering sites that are not just beautiful, but fast, indexed,
              and built to convert.
            </p>
          </div>

          <div className={styles.stackSection}>
            <h2>Tech Stack</h2>
            <div className={styles.stack}>
              {STACK.map((item) => (
                <span key={item} className={styles.stackItem}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
