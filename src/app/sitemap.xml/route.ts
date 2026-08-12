// ============================================================
// src/app/sitemap.xml/route.ts
//
// ⚠️ WHY THIS IS A ROUTE HANDLER AND NOT app/sitemap.ts
//
// Next.js (14–16) silently drops hreflang alternates from the
// MetadataRoute.Sitemap generator. The TypeScript compiles, the
// code looks correct, and the emitted XML simply has no
// <xhtml:link> tags — so Google reads a multi-language site as
// duplicate content.
//
// Generating the XML by hand is the only reliable fix. After any
// change here, open /sitemap.xml and confirm
// <xhtml:link rel="alternate"> is actually present in the output.
// ============================================================

import { getAllSlugs } from "@/lib/blog";
import { routing } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartctx.dev";
const LOCALES = routing.locales;
const DEFAULT_LOCALE = routing.defaultLocale;

// localePrefix is "as-needed": the default locale has no prefix.
function localeUrl(locale: string, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === DEFAULT_LOCALE
    ? `${BASE_URL}${clean}`
    : `${BASE_URL}/${locale}${clean}`;
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

interface PageEntry {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  lastmod?: string;
}

/**
 * One <url> block per locale, each carrying the full set of
 * <xhtml:link rel="alternate"> pointers plus x-default.
 */
function urlBlocks(entry: PageEntry, lastmod: string): string {
  const alternates = LOCALES.map(
    (l) =>
      `    <xhtml:link rel="alternate" hreflang="${l}" href="${xmlEscape(
        localeUrl(l, entry.path),
      )}" />`,
  ).join("\n");

  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(
    localeUrl(DEFAULT_LOCALE, entry.path),
  )}" />`;

  return LOCALES.map(
    (locale) => `  <url>
    <loc>${xmlEscape(localeUrl(locale, entry.path))}</loc>
    <lastmod>${entry.lastmod ?? lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
${alternates}
${xDefault}
  </url>`,
  ).join("\n");
}

export async function GET(): Promise<Response> {
  const lastmod = new Date().toISOString();

  const staticPages: PageEntry[] = [
    { path: "/", changefreq: "weekly", priority: 1.0 },
    { path: "/services", changefreq: "monthly", priority: 0.9 },
    { path: "/services/ai-chat", changefreq: "monthly", priority: 0.9 },
    {
      path: "/services/mcp-integration",
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      path: "/services/web-development",
      changefreq: "monthly",
      priority: 0.8,
    },
    { path: "/services/seo", changefreq: "monthly", priority: 0.8 },
    { path: "/for-agencies", changefreq: "monthly", priority: 0.8 },
    { path: "/projects", changefreq: "monthly", priority: 0.8 },
    { path: "/about", changefreq: "monthly", priority: 0.6 },
    { path: "/contact", changefreq: "monthly", priority: 0.7 },
    { path: "/blog", changefreq: "weekly", priority: 0.7 },
  ];

  // Blog slugs can differ per locale, so each locale is emitted on its own
  // and only gets alternates for the locales that actually have that post.
  const slugsByLocale = new Map<string, Set<string>>();
  for (const locale of LOCALES) {
    slugsByLocale.set(locale, new Set(getAllSlugs(locale)));
  }

  const blogBlocks: string[] = [];
  for (const locale of LOCALES) {
    for (const slug of slugsByLocale.get(locale) ?? []) {
      const availableIn = LOCALES.filter((l) =>
        slugsByLocale.get(l)?.has(slug),
      );

      const alternates = availableIn
        .map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l}" href="${xmlEscape(
              localeUrl(l, `/blog/${slug}`),
            )}" />`,
        )
        .join("\n");

      const xDefaultLocale = availableIn.includes(DEFAULT_LOCALE)
        ? DEFAULT_LOCALE
        : availableIn[0];

      blogBlocks.push(`  <url>
    <loc>${xmlEscape(localeUrl(locale, `/blog/${slug}`))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(
      localeUrl(xDefaultLocale, `/blog/${slug}`),
    )}" />
  </url>`);
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticPages.map((p) => urlBlocks(p, lastmod)).join("\n")}
${blogBlocks.join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
