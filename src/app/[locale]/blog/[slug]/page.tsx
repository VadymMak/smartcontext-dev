// ============================================================
// src/app/[locale]/blog/[slug]/page.tsx — Blog post page
// Article + FAQPage JSON-LD for GEO citations
// ============================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";
import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/blog";
import styles from "./post.module.css";

interface PostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("en");
  return slugs.map((slug) => ({ slug, locale: "en" }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartctx.dev";

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      images: [{ url: post.coverOg, width: 1200, height: 630 }],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) notFound();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartctx.dev";

  // Related posts — all posts except current, max 3
  const allPosts = getAllPosts(locale);
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: {
      "@type": "Person",
      name: post.author,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: process.env.NEXT_PUBLIC_SITE_NAME ?? "SmartContext",
      url: BASE_URL,
    },
    image: `${BASE_URL}${post.coverOg}`,
    url: `${BASE_URL}/blog/${slug}`,
    inLanguage: locale,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="container">
        <article className={styles.article}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.meta}>
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

            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.description}>{post.description}</p>

            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className={styles.content}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <footer className={styles.footer}>
            <p className={styles.authorLine}>
              Written by <strong>{post.author}</strong>
            </p>
            <Link href="/blog" className={styles.back}>
              ← All posts
            </Link>
          </footer>
        </article>

        {/* Author card */}
        <div className={styles.authorCard}>
          <Image
            src="/about/photo.jpg"
            alt="Vadym Mak"
            width={64}
            height={64}
            className={styles.authorPhoto}
          />
          <div className={styles.authorInfo}>
            <p className={styles.authorName}>Vadym Mak</p>
            <p className={styles.authorRole}>
              FULL-STACK DEVELOPER & AI INTEGRATOR
            </p>
            <p className={styles.authorBio}>
              Next.js developer with 5+ years experience and 5+ production
              sites. Specializes in AI integration, MCP servers, GEO optimization, and
              Lighthouse 95–100 performance. Based in Europe, working with
              EU/USA clients remotely.
            </p>
            <div className={styles.authorLinks}>
              <a
                href="https://github.com/VadymMak"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.authorLink}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/vadymmakevytss/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.authorLink}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.relatedTitle}>You might also enjoy</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedMeta}>
                    <time
                      dateTime={related.datePublished}
                      className={styles.relatedDate}
                    >
                      {new Date(related.datePublished).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" },
                      )}
                    </time>
                    <span className={styles.relatedDot} aria-hidden="true" />
                    <span className={styles.relatedRead}>
                      {related.readingTime} min read
                    </span>
                  </div>
                  <h3 className={styles.relatedCardTitle}>{related.title}</h3>
                  <p className={styles.relatedCardDesc}>
                    {related.description}
                  </p>
                  <div className={styles.relatedTags}>
                    {related.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className={styles.relatedTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
