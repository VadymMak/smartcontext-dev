"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BLOG_CATEGORIES } from "@/data/blog";
import styles from "./TagFilter.module.css";

export default function TagFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const handleFilter = (category: string) => {
    if (category === "all") {
      router.push("/blog");
    } else {
      router.push(`/blog?category=${category}`);
    }
  };

  return (
    <div className={styles.filter}>
      {BLOG_CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          className={`${styles.tag} ${activeCategory === cat.value ? styles.active : ""}`}
          onClick={() => handleFilter(cat.value)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}