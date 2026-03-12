// ============================================================
// src/components/home/LatestPosts/LatestPosts.tsx
// Shows latest 3 blog posts on homepage
// ============================================================

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ui";
import type { PostFrontmatter } from "@/lib/blog";
import styles from "./LatestPosts.module.css";

interface LatestPostsProps {
  posts: PostFrontmatter[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  const t = useTranslations("blog");

  if (!posts.length) return null;

  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.header}>
          <h2>{t("title")}</h2>
          <Link href="/blog" className={styles.viewAll}>
            {t("all_posts")} →
          </Link>
        </div>
      </ScrollReveal>

      <div className={styles.grid}>
        {posts.slice(0, 3).map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 100}>
            <Link href={`/blog/${post.slug}`} className={styles.card}>
              <div className={styles.meta}>
                <time dateTime={post.datePublished} className={styles.date}>
                  {new Date(post.datePublished).toLocaleDateString("en", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className={styles.readTime}>
                  {post.readingTime} {t("minutes_read")}
                </span>
              </div>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <p className={styles.cardDesc}>{post.description}</p>
              <span className={styles.readMore}>{t("read_more")} →</span>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
