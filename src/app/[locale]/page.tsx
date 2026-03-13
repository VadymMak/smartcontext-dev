// ============================================================
// src/app/[locale]/page.tsx — Homepage
// WebSite + Person JSON-LD for E-E-A-T signals
// ============================================================
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";
import {
  Hero,
  ServicesPreview,
  FeaturedProjects,
  LatestPosts,
  FAQ,
} from "@/components/home";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";
  const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio";
  return {
    title: SITE_NAME,
    description: t("role"),
    openGraph: {
      url: `${BASE_URL}/${locale}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";
  const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio";
  const AUTHOR = process.env.NEXT_PUBLIC_AUTHOR_NAME ?? "Your Name";

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description: "Fast, multilingual websites for studios and B2B.",
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR,
    url: BASE_URL,
    jobTitle: "Full-Stack Developer & AI Integrator",
    description:
      "Next.js developer with 4+ production sites. Lighthouse 95-100. AI integration and GEO optimization.",
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "SEO",
      "GEO",
      "OpenAI API",
      "Web Performance",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="container">
        <Hero />
        <ServicesPreview />
        <FeaturedProjects />
        <LatestPosts posts={posts} />
        <FAQ />
      </div>
    </>
  );
}
