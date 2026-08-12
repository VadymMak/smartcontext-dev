// ============================================================
// src/app/[locale]/services/[service]/page.tsx
// Service page with Service + FAQ JSON-LD schemas
// ============================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FAQ } from "@/components/ui";
import { serviceFaqs } from "@/data/serviceFaqs";
import { ScrollReveal } from "@/components/ui";
import { alternatesFor } from "@/lib/seo";

const SERVICES = ["web-development", "seo", "ai-chat", "mcp-integration"] as const;
type ServiceSlug = (typeof SERVICES)[number];

interface ServicePageProps {
  params: Promise<{ locale: string; service: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { locale, service } = await params;

  const descriptions: Record<string, string> = {
    "web-development":
      "Multilingual Next.js development from $1,200. Correct hreflang via manual sitemap, server-rendered structured data, TypeScript strict. 2–6 weeks delivery.",
    "ai-chat":
      "AI integration (RAG + MCP) from $3,000. Retrieval-augmented assistant or MCP server for Claude, Cursor and Windsurf. Abuse protection included. 2–4 weeks.",
    seo: "SEO & AI visibility from $600. Classic SEO is the primary AI-citation driver. Concrete facts in visible copy, AI baseline across 5 platforms with 90-day retest.",
    "mcp-integration":
      "MCP Integration from $2,000. Build Model Context Protocol endpoints for Claude Desktop, Cursor, and Windsurf. 1–3 weeks delivery.",
  };

  return {
    title: service.replace(/-/g, " "),
    description:
      descriptions[service] ??
      "Professional web development service by SmartContext.",
    alternates: alternatesFor(locale, `/services/${service}`),
    openGraph: {
      images: [{ url: `/og/services.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, service } = await params;

  // Validate service slug
  if (!SERVICES.includes(service as ServiceSlug)) notFound();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartctx.dev";
  const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "SmartContext";

  // FAQ content for this service + locale
  const faqs =
    serviceFaqs[service]?.[locale] ?? serviceFaqs[service]?.["en"] ?? [];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.replace(/-/g, " "),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    areaServed: ["SK", "AT", "DE", "CZ", "Worldwide"],
    url: `${BASE_URL}/services/${service}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="container">
        <ScrollReveal>
          <section style={{ paddingBlock: "var(--space-2xl)" }}>
            <h1 style={{ textTransform: "capitalize" }}>
              {service.replace(/-/g, " ")}
            </h1>
            <p style={{ marginTop: "var(--space-md)", maxWidth: "60ch" }}>
              Professional {service.replace(/-/g, " ")} service. Fast delivery,
              measurable results, multilingual support.
            </p>
          </section>
        </ScrollReveal>

        {faqs.length > 0 && (
          <ScrollReveal>
            <div style={{ paddingBottom: "var(--space-2xl)" }}>
              <FAQ items={faqs} />
            </div>
          </ScrollReveal>
        )}
      </div>
    </>
  );
}
