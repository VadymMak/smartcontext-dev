// ============================================================
// src/app/[locale]/blog/page.tsx — Blog list page
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import styles from "./blog.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartctx.dev";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Blog — Web Development, AI & SEO",
  description:
    "Practical guides on Next.js development, AI integration, SEO and GEO optimization. Real techniques from 6 production sites with Lighthouse 95–100.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  return (
    <div className="container">
      <section className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.subtitle}>
          Web development, AI integration &amp; SEO insights
        </p>
      </section>

      {posts.length === 0 ? (
        <p className={styles.empty}>No posts yet. Check back soon.</p>
      ) : (
        <div className={styles.list}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={styles.card}
            >
              <div className={styles.cardMeta}>
                <time dateTime={post.datePublished} className={styles.date}>
                  {new Date(post.datePublished).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.readingTime}>
                  {post.readingTime} min read
                </span>
              </div>

              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardDesc}>{post.description}</p>

              <div className={styles.tags}>
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
