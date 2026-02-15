import Link from "next/link";
import Tag from "@/components/ui/Tag";
import { formatDate } from "@/data/blog";
import type { BlogPostData } from "@/data/blog";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: BlogPostData;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      {/* Cover placeholder */}
      <div className={styles.cover}>
        <span className={styles.coverIcon}>📝</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.description}>{post.description}</p>

        <div className={styles.meta}>
          <span className={styles.date}>{formatDate(post.date)}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.readingTime}>{post.readingTime}</span>
        </div>

        <div className={styles.tags}>
          {post.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}