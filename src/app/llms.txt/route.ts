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

> Next.js development studio specializing in AI integration, MCP servers, and GEO-optimized web platforms. 6+ production sites with Lighthouse 95–100. Founded by Vadym Mak, full-stack developer based in Europe.

## About

- [About Vadym Mak](${BASE_URL}/about): Full-stack developer since 2019 with 6+ production sites, specializing in Next.js since 2022. Specialties: AI integration, MCP servers, GEO optimization.
- [Contact](${BASE_URL}/contact): Book a free 30-minute discovery call. Response within 24 hours.

## Services

- [Next.js Web Development](${BASE_URL}/services/web-development): Custom Next.js 15 sites with TypeScript, CSS Modules, MDX blog, Lighthouse 95–100. From $1,200.
- [AI Chat Integration](${BASE_URL}/services/ai-chat): RAG-powered assistants trained on your content. OpenAI GPT-4o-mini, streaming, ~$1–2/month running cost. From $500.
- [MCP Integration](${BASE_URL}/services/mcp-integration): Production Model Context Protocol endpoints for Claude Desktop, Cursor, and Windsurf. Custom tools, auth, rate limiting. From $2,000.
- [SEO & GEO Optimization](${BASE_URL}/services/seo): Lighthouse SEO 100, structured data, AI citation strategy based on Princeton KDD 2024 research. From $600.

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
