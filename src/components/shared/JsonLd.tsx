interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Pre-built schemas

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "SmartContext",
        url: "https://smartcontext.dev",
        description:
          "Web development and AI integration services. Modern websites built with Next.js, React, and TypeScript.",
        author: {
          "@type": "Person",
          name: "Vadym Mak",
        },
      }}
    />
  );
}

export function PersonSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Vadym Mak",
        url: "https://smartcontext.dev",
        jobTitle: "Full-Stack Developer",
        worksFor: {
          "@type": "Organization",
          name: "SmartContext",
        },
        sameAs: [
          "https://github.com/VadymMak",
          "https://linkedin.com/in/vadymmak",
        ],
        knowsLanguage: ["English", "Russian", "Ukrainian"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Erdemli",
          addressCountry: "TR",
        },
      }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  date,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished: date,
        dateModified: date,
        author: {
          "@type": "Person",
          name: "Vadym Mak",
          url: "https://smartcontext.dev/about",
        },
        publisher: {
          "@type": "Organization",
          name: "SmartContext",
          url: "https://smartcontext.dev",
        },
        mainEntityOfPage: `https://smartcontext.dev/blog/${slug}`,
      }}
    />
  );
}

export function FAQSchema({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}