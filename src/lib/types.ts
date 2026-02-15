/* ============================================
   SmartContext.dev — Shared TypeScript Types
   ============================================ */

// --- Blog ---
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage: string;
  coverImageOg?: string;
  category: BlogCategory;
  locale: Locale;
  published: boolean;
}

export type BlogCategory = "web-dev" | "ai-llm" | "career" | "seo";

// --- Projects ---
export interface Project {
  slug: string;
  title: string;
  description: string;
  year: number;
  client?: string;
  techStack: string[];
  coverImage: string;
  liveUrl?: string;
  githubUrl?: string;
  locale: Locale;
}

// --- AI Chat ---
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface EmbeddingEntry {
  id: string;
  text: string;
  embedding: number[];
  metadata: {
    source: string;
    section: string;
  };
}

export interface SearchResult {
  id: string;
  text: string;
  score: number;
  metadata: {
    source: string;
    section: string;
  };
}

// --- i18n ---
export type Locale = "en" | "ru";

// --- Navigation ---
export interface NavLink {
  href: string;
  label: string;
}

// --- Contact Form ---
export interface ContactFormData {
  name: string;
  email: string;
  projectType: ProjectType;
  budgetRange: BudgetRange;
  message: string;
}

export type ProjectType =
  | "website"
  | "web-app"
  | "ai-integration"
  | "seo-blog"
  | "other";

export type BudgetRange =
  | "1k-3k"
  | "3k-5k"
  | "5k-10k"
  | "10k-plus"
  | "not-sure";