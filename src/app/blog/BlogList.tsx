"use client";

import { useSearchParams } from "next/navigation";
import { getAllPosts } from "@/data/blog";
import PostCard from "@/components/blog/PostCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import type { BlogCategory } from "@/data/blog";
import styles from "./blog.module.css";

export default function BlogList() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const posts = getAllPosts().filter((post) => {
    if (!category || category === "all") return true;
    return post.category === (category as BlogCategory);
  });

  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No posts found in this category yet.</p>
      </div>
    );
  }

  return (
    <AnimatedSection>
      <div className={styles.list}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </AnimatedSection>
  );
}