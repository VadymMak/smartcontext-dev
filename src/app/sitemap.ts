// ============================================================
// src/app/sitemap.ts
// ⚠️ Must be async — required for filesystem blog post reads
// Includes hreflang alternates for each locale
// ============================================================

import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { routing } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";
const LOCALES = routing.locales;

type SitemapEntry = MetadataRoute.Sitemap[number];

// Build hreflang alternates for a given path
function buildAlternates(path: string) {
  return Object.fromEntries(
    LOCALES.map((locale) => {
      const url =
        locale === routing.defaultLocale
          ? `${BASE_URL}${path}`
          : `${BASE_URL}/${locale}${path}`;
      return [locale, url];
    }),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: SitemapEntry[] = [];
  const now = new Date().toISOString();

  // --- Static pages ----------------------------------------
  const staticPages = [
    "",
    "/services",
    "/services/web-development",
    "/services/ai-chat",
    "/services/seo",
    "/blog",
    "/contact",
    "/about",
  ];

  for (const page of staticPages) {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: now,
      changeFrequency: page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1.0 : 0.8,
      alternates: { languages: buildAlternates(page) },
    });
  }

  // --- Blog posts ------------------------------------------
  // Use default locale to get all slugs (slugs are same across locales)
  const defaultLocale = routing.defaultLocale;
  const slugs = getAllSlugs(defaultLocale);

  for (const slug of slugs) {
    entries.push({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: buildAlternates(`/blog/${slug}`) },
    });
  }

  return entries;
}
