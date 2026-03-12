// ============================================================
// src/lib/blog.ts
// Blog utilities: getAllPosts + getPostBySlug
// Uses gray-matter for frontmatter parsing
// ⚠️ Sitemap must be async — required for filesystem reads
// ============================================================

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// --- Types ---------------------------------------------------

export interface PostFrontmatter {
  title: string;
  description: string;
  datePublished: string; // ISO: "2026-03-01"
  dateModified?: string;
  author: string;
  coverImage: string; // /blog/my-post/cover.jpg
  coverOg: string; // ⚠️ must match this post — common bug
  coverAlt: string;
  tags: string[];
  locale: string;
  slug: string;
  readingTime?: number; // minutes — calculated if not set
  draft?: boolean;
  videoUrl?: string; // YouTube embed URL [optional]
  videoTitle?: string; // required if videoUrl set
}

export interface Post extends PostFrontmatter {
  content: string;
}

// --- Helpers -------------------------------------------------

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// Timezone fix: plain date causes Google Search Console warning
export function toEUDate(date: string): string {
  if (!date || date.includes("T")) return date;
  return `${date}T00:00:00+01:00`;
}

// Estimate reading time from markdown content
function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200); // 200 wpm average
}

// --- Core functions ------------------------------------------

export function getAllPosts(locale: string): PostFrontmatter[] {
  const dir = path.join(BLOG_DIR, locale);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.md$/, "");

      return {
        ...(data as Omit<PostFrontmatter, "slug" | "locale" | "readingTime">),
        slug,
        locale,
        readingTime: data.readingTime ?? calcReadingTime(content),
        datePublished: toEUDate(data.datePublished),
        dateModified: data.dateModified
          ? toEUDate(data.dateModified)
          : undefined,
      } as PostFrontmatter;
    })
    // Filter out drafts in production
    .filter((post) => process.env.NODE_ENV === "development" || !post.draft)
    // Sort newest first
    .sort(
      (a, b) =>
        new Date(b.datePublished).getTime() -
        new Date(a.datePublished).getTime(),
    );

  return posts;
}

export function getPostBySlug(slug: string, locale: string): Post | null {
  const filePath = path.join(BLOG_DIR, locale, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    ...(data as Omit<PostFrontmatter, "slug" | "locale" | "readingTime">),
    slug,
    locale,
    content,
    readingTime: data.readingTime ?? calcReadingTime(content),
    datePublished: toEUDate(data.datePublished),
    dateModified: data.dateModified ? toEUDate(data.dateModified) : undefined,
  } as Post;
}

// Get all slugs for generateStaticParams
export function getAllSlugs(locale: string): string[] {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
