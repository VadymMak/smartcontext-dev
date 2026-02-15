import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts } from "@/data/blog";
import PostCard from "@/components/blog/PostCard";
import TagFilter from "@/components/blog/TagFilter";
import CTABanner from "@/components/layout/CTABanner";
import AnimatedSection from "@/components/shared/AnimatedSection";
import BlogList from "./BlogList";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on web development, AI integration, and building digital products. Technical deep dives, SEO guides, and career insights.",
};

export default function BlogPage() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>
            Thoughts on web development, AI, and building digital products.
          </p>
        </div>
      </section>

      <div className={styles.container}>
        <Suspense fallback={null}>
          <TagFilter />
        </Suspense>
        <Suspense fallback={null}>
          <BlogList />
        </Suspense>
      </div>

      <CTABanner
        title="Need help with your project?"
        subtitle="Let's discuss how I can help you build something great."
        buttonText="Get in Touch →"
      />
    </main>
  );
}