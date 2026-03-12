// ============================================================
// src/i18n/request.ts
// ⚠️ REQUIRED for next-intl v4
// Configures server-side i18n per request
// Without this file: 'next-intl/config' has no default export error
// ============================================================

import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Get locale from request
  let locale = await requestLocale;

  // Fallback to default if invalid
  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
