import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, formatDate, BLOG_POSTS } from "@/data/blog";
import Tag from "@/components/ui/Tag";
import BlogContent from "@/components/blog/BlogContent";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import PostCard from "@/components/blog/PostCard";
import CTABanner from "@/components/layout/CTABanner";
import { ArticleSchema, BreadcrumbSchema } from "@/components/shared/JsonLd";
import styles from "./post.module.css";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);

  return (
    <main>
    <ArticleSchema title={post.title} description={post.description} date={post.date} slug={post.slug} />
    <BreadcrumbSchema items={[
    { name: "Blog", url: "https://smartcontext.dev/blog" },
    { name: post.title, url: `https://smartcontext.dev/blog/${post.slug}` },
    ]} />
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <div className={styles.maxWidth}>
          <Link href="/blog" className={styles.breadcrumbLink}>
            ← Blog
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{post.category.replace("-", " ")}</span>
        </div>
      </div>

      {/* Post header */}
      <header className={styles.header}>
        <div className={styles.maxWidth}>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>
          <div className={styles.meta}>
            <span>Vadym Mak</span>
            <span className={styles.dot}>·</span>
            <span>{formatDate(post.date)}</span>
            <span className={styles.dot}>·</span>
            <span>{post.readingTime} read</span>
          </div>
        </div>
      </header>

      {/* Content with sidebar TOC */}
      <div className={styles.layout}>
        {/* TOC sidebar (desktop) */}
        <aside className={styles.sidebar}>
          <TableOfContents content={post.content} />
        </aside>

        {/* Article */}
        <article className={styles.article}>
          <BlogContent content={post.content} />
          <ShareButtons title={post.title} slug={post.slug} />
        </article>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className={styles.related}>
          <div className={styles.maxWidth}>
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((rp) => (
                <PostCard key={rp.slug} post={rp} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        title="Need help with your project?"
        subtitle="Let's discuss how I can help."
        buttonText="Get in Touch →"
      />
    </main>
  );
}