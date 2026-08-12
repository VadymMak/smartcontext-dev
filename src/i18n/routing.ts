import { defineRouting } from "next-intl/routing";

// ⚠️ Adding a locale here also requires:
//   1. src/messages/<locale>.json
//   2. content/blog/<locale>/ (may stay empty — getAllPosts returns [])
//   3. a check that /sitemap.xml still emits <xhtml:link> alternates
export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
