// ============================================================
// src/app/llms.txt/route.ts
// Dynamic /llms.txt for AI search engine optimization
// Spec: https://llmstxt.org
// Auto-updates when blog posts are added — no manual edits needed
// ============================================================

import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartctx.dev";

export async function GET() {
  const posts = getAllPosts("en");

  const blogSection = posts
    .map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const content = `# SmartContext

> AI integration and multilingual web development for European companies. RAG assistants, MCP servers, and Next.js sites. Founded by Vadym Mak, full-stack developer based in Slovakia, 100 km from Vienna.

## About

- [About Vadym Mak](${BASE_URL}/about): Full-stack developer since 2019. React Native (iOS/Android) and Next.js. AI integration (RAG, MCP servers), multilingual sites, EU invoice with reverse charge.
- [Contact](${BASE_URL}/contact): Book a free 30-minute call. Response within 24 hours.
- [For agencies](${BASE_URL}/for-agencies): Next.js overflow capacity. White-label, EU VAT, Central European timezone.

## Services

- [AI Integration (RAG + MCP)](${BASE_URL}/services/ai-chat): Retrieval-augmented assistant over your own data, or an MCP server for Claude, Cursor and Windsurf. Abuse protection included. From $3,000.
- [MCP Integration](${BASE_URL}/services/mcp-integration): Model Context Protocol endpoints exposing your business systems to AI agents. Custom tools, auth, rate limiting. From $2,000.
- [Multilingual Next.js Site](${BASE_URL}/services/web-development): Next.js 15 + TypeScript. Correct hreflang via manual sitemap, server-rendered structured data, up to 6 languages. From $1,200.
- [SEO & AI Visibility](${BASE_URL}/services/seo): Classic SEO is the primary AI-citation driver. Baseline across 5 platforms with 90-day retest. From $600.

## Blog Posts

${blogSection}

## Featured Projects

- [Kate Barber Template](https://vendshop-template-services.vercel.app/sk): Production Next.js 15 barbershop template with AI booking assistant, slot-based reservations, and Lighthouse 96 mobile.
- [VendShop](https://vendshop.shop): Multi-tenant SaaS commerce platform. 5 store verticals from one codebase, MCP endpoint with 9 tools, AI admin panel.
- [SmartContext.dev](${BASE_URL}): Portfolio site with RAG-powered AI chat, 8-post blog, GEO optimization, and cite-and-link AI assistant.
- [FormaInk Studio](https://formaink.com): Tattoo studio website with 6 languages, Lighthouse 98, and AI-powered email automation.
- [AK Illustrator](https://akillustrator.com): Artist portfolio with protected gallery, AI chat trained on portfolio content, and Telegram notifications.
- [UB Market B2B](https://ub-market.com): B2B trading platform with 6 languages, 12 GEO-optimized blog posts, Lighthouse 97.
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
