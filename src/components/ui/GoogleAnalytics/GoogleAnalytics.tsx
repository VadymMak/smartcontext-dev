"use client";

// ============================================================
// src/components/ui/GoogleAnalytics/GoogleAnalytics.tsx
// ⚠️ GA4 loads ONLY after cookie consent — EU legal requirement
// Listens for 'cookie_consent_accepted' event from CookieBanner
// Check: Cookie Decline → GA4 does NOT load (DevTools Network tab)
//        Cookie Accept  → GA4 loads dynamically
// ============================================================

import { useEffect } from "react";
import Script from "next/script";
import { useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;

    // Check if already consented in a previous session
    const stored = localStorage.getItem("cookie_consent");
    if (stored === "accepted") {
      setEnabled(true);
      return;
    }

    // Listen for consent event from CookieBanner
    function onConsent() {
      setEnabled(true);
    }

    window.addEventListener("cookie_consent_accepted", onConsent);
    return () =>
      window.removeEventListener("cookie_consent_accepted", onConsent);
  }, []);

  // Don't render anything if no GA_ID or consent not given
  if (!enabled || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
