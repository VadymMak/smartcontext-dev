// ============================================================
// src/app/blog/[slug]/page.tsx
// Article + FAQ JSON-LD + speakable schema — EN only
// ============================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, toEUDate } from "@/lib/blog";
import { FAQ, ScrollReveal } from "@/components/ui";
import { extractFAQs } from "@/lib/extractFAQs";
import styles from "./slug.module.css";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs("en").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "en");
  if (!post) return {};

  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartcontext.dev";

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      images: [{ url: post.coverOg, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [post.coverOg],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "en");
  if (!post) notFound();

  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartcontext.dev";
  const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "SmartContext";
  const AUTHOR = process.env.NEXT_PUBLIC_AUTHOR_NAME ?? "Vadym Mak";

  const faqs = extractFAQs(post.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${BASE_URL}${post.coverOg}`,
    datePublished: toEUDate(post.datePublished),
    dateModified: post.dateModified
      ? toEUDate(post.dateModified)
      : toEUDate(post.datePublished),
    author: {
      "@type": "Person",
      name: AUTHOR,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".article-summary"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="container">
        <article className={styles.article}>
          <header className={styles.header}>
            <div className={styles.meta}>
              <time dateTime={post.datePublished} className={styles.date}>
                {new Date(post.datePublished).toLocaleDateString("en", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className={styles.readTime}>
                {post.readingTime} min read
              </span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={`${styles.description} article-summary`}>
              {post.description}
            </p>
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {faqs.length > 0 && (
            <ScrollReveal>
              <div className={styles.faqSection}>
                <FAQ items={faqs} title="Frequently Asked Questions" />
              </div>
            </ScrollReveal>
          )}
        </article>
      </div>
    </>
  );
}
