// ============================================================
// src/app/robots.ts
// ============================================================

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";

  const disallow = ["/_next/static/", "/_next/image/", "/_vercel/", "/api/"];

  return {
    rules: [
      { userAgent: "*",             allow: "/", disallow },
      { userAgent: "GPTBot",        allow: "/", disallow },
      { userAgent: "ChatGPT-User",  allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "ClaudeBot",     allow: "/", disallow },
      { userAgent: "anthropic-ai",  allow: "/", disallow },
      { userAgent: "CCBot",         allow: "/", disallow },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
