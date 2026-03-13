// ============================================================
// src/app/[locale]/services/[service]/page.tsx
// Service page with Service + FAQ JSON-LD schemas
// ============================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FAQ } from "@/components/ui";
import { serviceFaqs } from "@/data/serviceFaqs";
import { ScrollReveal } from "@/components/ui";

const SERVICES = ["web-development", "seo", "ai-chat"] as const;
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
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";

  const descriptions: Record<string, string> = {
    "web-development":
      "Next.js web development from $1,200. Lighthouse 95–100, SEO-ready, multilingual. 2–6 weeks delivery.",
    "ai-chat":
      "AI chat integration from $500. RAG-powered assistant trained on your content. OpenAI GPT-4o-mini, streaming responses.",
    seo: "SEO & GEO optimization from $600. Lighthouse SEO 100, structured data, AI search citations. 1–3 weeks.",
  };

  return {
    title: service.replace("-", " "),
    description:
      descriptions[service] ??
      "Professional web development service by SmartContext.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/services/${service}`,
    },
    openGraph: {
      images: [{ url: `/og/services.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, service } = await params;

  // Validate service slug
  if (!SERVICES.includes(service as ServiceSlug)) notFound();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";
  const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio";

  // FAQ content for this service + locale
  const faqs =
    serviceFaqs[service]?.[locale] ?? serviceFaqs[service]?.["en"] ?? [];

  // Service JSON-LD schema
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.replace("-", " "),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    areaServed: "Worldwide",
    url: `${BASE_URL}/${locale}/services/${service}`,
  };

  return (
    <>
      {/* Service schema — separate script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="container">
        {/* Quick Answer — above fold for AI citation */}
        <ScrollReveal>
          <section style={{ paddingBlock: "var(--space-2xl)" }}>
            <h1 style={{ textTransform: "capitalize" }}>
              {service.replace("-", " ")}
            </h1>
            <p style={{ marginTop: "var(--space-md)", maxWidth: "60ch" }}>
              Professional {service.replace("-", " ")} service. Fast delivery,
              measurable results, multilingual support.
            </p>
          </section>
        </ScrollReveal>

        {/* FAQ — generates FAQPage JSON-LD internally */}
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
