// ============================================================
// src/app/[locale]/page.tsx — Homepage
// WebSite + Person + Organization JSON-LD for E-E-A-T signals
// All JSON-LD is server-rendered — AI crawlers frequently do
// not execute JavaScript, so client-side injection is unreliable.
// ============================================================
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { alternatesFor } from "@/lib/seo";
import {
  Hero,
  ServicesPreview,
  FeaturedProjects,
  LatestPosts,
  FAQ,
  CTABand,
} from "@/components/home";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartctx.dev";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "SmartContext";
const AUTHOR = process.env.NEXT_PUBLIC_AUTHOR_NAME ?? "Vadym Mak";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `${SITE_NAME} — AI Integration & Multilingual Next.js Development`,
    description:
      "AI integration (RAG, MCP) from $3,000. Multilingual Next.js builds from $1,200. Fixed price, EU invoice. Based in Slovakia, 100 km from Vienna.",
    alternates: alternatesFor(locale, "/"),
    openGraph: {
      url: BASE_URL,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description:
      "AI integration and multilingual web development for European companies.",
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
      "Full-stack developer since 2019. Multilingual Next.js sites with AI integration (RAG, MCP servers) for European companies.",
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "Retrieval-Augmented Generation",
      "Model Context Protocol",
      "SEO",
      "Multilingual web development",
      "OpenAI API",
      "Web Performance",
    ],
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    // TODO(vadym): fill in the real registry values before deploying
    identifier: "SK-ICO-XXXXXXXX", // IČO
    // vatID: "SKXXXXXXXXXX",       // IČ DPH once §7a registration is done
    address: {
      "@type": "PostalAddress",
      addressLocality: "Trenčín",
      addressCountry: "SK",
    },
    areaServed: ["SK", "AT", "DE", "CZ"],
    sameAs: [
      "https://github.com/VadymMak",
      "https://www.linkedin.com/in/vadymmakevytss/",
      // TODO(vadym): add official Slovak business register entry
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <div className="container">
        <Hero />
        <ServicesPreview />
        <FeaturedProjects />
        <LatestPosts posts={posts} />
        <FAQ />
        <CTABand />
      </div>
    </>
  );
}
