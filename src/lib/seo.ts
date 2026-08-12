import { routing } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartctx.dev";

export function localeUrl(locale: string, path = "/"): string {
  const clean = path === "/" ? "" : path;
  return locale === routing.defaultLocale
    ? `${BASE_URL}${clean}`
    : `${BASE_URL}/${locale}${clean}`;
}

/** canonical + hreflang alternates for a given locale/path */
export function alternatesFor(locale: string, path = "/") {
  return {
    canonical: localeUrl(locale, path),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((l) => [l, localeUrl(l, path)]),
      ),
      "x-default": localeUrl(routing.defaultLocale, path),
    },
  };
}
