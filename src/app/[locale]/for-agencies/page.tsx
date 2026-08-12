// ============================================================
// src/app/[locale]/for-agencies/page.tsx
// Different buyer than the rest of the site: an agency does not
// want packages and project prices — it wants capacity, a rate,
// and clean invoicing.
// ============================================================

import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/lib/seo";

interface AgenciesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AgenciesPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "For Agencies — SmartContext",
    description:
      "Next.js and TypeScript overflow capacity for agencies. White-label, EU invoice with reverse charge, Central European timezone. Rate on request.",
    alternates: alternatesFor(locale, "/for-agencies"),
  };
}

function AgenciesContent() {
  const t = useTranslations("agencies");

  const POINTS = [
    t("point_stack"),
    t("point_invoice"),
    t("point_timezone"),
    t("point_whitelabel"),
    t("point_rate"),
  ] as const;

  return (
    <div className="container">
      <section
        style={{
          paddingBlock: "var(--space-2xl)",
          maxWidth: "72ch",
        }}
      >
        <h1
          style={{
            fontSize: "var(--font-size-4xl)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--text-primary)",
            letterSpacing: "-0.03em",
            marginBottom: "var(--space-md)",
          }}
        >
          {t("title")}
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-lg)",
            color: "var(--text-muted)",
            marginBottom: "var(--space-xl)",
          }}
        >
          {t("subtitle")}
        </p>

        <p
          style={{
            fontSize: "var(--font-size-base)",
            color: "var(--text-secondary)",
            lineHeight: "var(--line-height-relaxed)",
            marginBottom: "var(--space-xl)",
          }}
        >
          {t("lead")}
        </p>

        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-md)",
            marginBottom: "var(--space-2xl)",
            listStyle: "none",
            padding: 0,
          }}
        >
          {POINTS.map((point, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: "var(--space-sm)",
                fontSize: "var(--font-size-base)",
                color: "var(--text-secondary)",
                lineHeight: "var(--line-height-relaxed)",
              }}
            >
              <span
                style={{
                  color: "var(--accent)",
                  fontWeight: "var(--font-weight-bold)",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
                aria-hidden="true"
              >
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            padding: "var(--space-md) var(--space-xl)",
            backgroundColor: "var(--accent)",
            color: "var(--text-inverse)",
            borderRadius: "var(--border-radius)",
            fontWeight: "var(--font-weight-semibold)",
            fontSize: "var(--font-size-sm)",
            textDecoration: "none",
          }}
        >
          {t("cta")} →
        </Link>
      </section>
    </div>
  );
}

export default async function AgenciesPage({ params }: AgenciesPageProps) {
  await params; // satisfy Next.js dynamic API requirement
  return <AgenciesContent />;
}
