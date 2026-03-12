import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Supported locales
  locales: ["en", "sk"],

  // Default locale — no prefix in URL (e.g. / instead of /en)
  defaultLocale: "en",

  // URL prefix strategy
  localePrefix: "as-needed",
});
