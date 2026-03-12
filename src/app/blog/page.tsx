// ============================================================
// src/app/[locale]/blog/page.tsx — Blog listing
// ============================================================

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "@/lib/blog";
import { ScrollReveal } from "@/components/ui";
import styles from "./blog.module.css";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
    },
    openGraph: {
      images: [{ url: "/og/blog.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getAllPosts(locale);

  return (
    <div className="container">
      <section className={styles.section}>
        <ScrollReveal>
          <div className={styles.header}>
            <h1>{t("title")}</h1>
            <p>{t("subtitle")}</p>
          </div>
        </ScrollReveal>

        {posts.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No posts yet.</p>
        ) : (
          <div className={styles.grid}>
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 80}>
                <Link href={`/blog/${post.slug}`} className={styles.card}>
                  <div className={styles.meta}>
                    <time dateTime={post.datePublished} className={styles.date}>
                      {new Date(post.datePublished).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className={styles.readTime}>
                      {post.readingTime} {t("minutes_read")}
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
                  <span className={styles.readMore}>{t("read_more")} →</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
