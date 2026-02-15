import Link from "next/link";
import Tag from "@/components/ui/Tag";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import styles from "./LatestPosts.module.css";

// Placeholder data — will be replaced with actual MDX blog posts
const POSTS = [
  {
    slug: "how-i-built-smartcontext-dev",
    title: "How I Built SmartContext.dev: Technical Deep Dive",
    description:
      "A complete walkthrough of building a developer portfolio with Next.js 16, MDX blog, and AI chat assistant.",
    date: "Coming soon",
    readingTime: "12 min",
    tags: ["Next.js", "TypeScript"],
  },
  {
    slug: "how-much-does-a-website-cost-2026",
    title: "How Much Does a Website Cost in 2026?",
    description:
      "A complete breakdown of website pricing for business owners. What to expect at every budget level.",
    date: "Coming soon",
    readingTime: "8 min",
    tags: ["Business", "SEO"],
  },
  {
    slug: "building-multi-ai-assistant",
    title: "Building a Multi-AI Assistant: Lessons Learned",
    description:
      "Architecture decisions, LLM integration patterns, and real challenges from building a multi-provider AI chat app.",
    date: "Coming soon",
    readingTime: "10 min",
    tags: ["AI", "Architecture"],
  },
];

export default function LatestPosts() {
  return (
    <AnimatedSection className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          title="Latest Articles"
          subtitle="Thoughts on web development, AI, and building digital products."
          align="center"
        />

        <div className={styles.grid}>
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={styles.card}
            >
              {/* Cover placeholder */}
              <div className={styles.coverPlaceholder}>
                <span className={styles.coverIcon}>📝</span>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardDescription}>{post.description}</p>
                <div className={styles.meta}>
                  <span className={styles.date}>{post.date}</span>
                  <span className={styles.dot}>·</span>
                  <span className={styles.readingTime}>{post.readingTime}</span>
                </div>
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.linkWrapper}>
          <Link href="/blog" className={styles.link}>
            Read the Blog →
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}