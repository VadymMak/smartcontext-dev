"use client";

import dynamic from "next/dynamic";

const DynamicChatWidget = dynamic(
  () =>
    import("@/components/ui/ChatWidget/ChatWidget").then((m) => m.ChatWidget),
  { ssr: false, loading: () => null },
);

const DynamicWhatsAppButton = dynamic(
  () =>
    import("@/components/ui/WhatsAppButton/WhatsAppButton").then(
      (m) => m.WhatsAppButton,
    ),
  { ssr: false, loading: () => null },
);

const DynamicCookieBanner = dynamic(
  () =>
    import("@/components/ui/CookieBanner/CookieBanner").then(
      (m) => m.CookieBanner,
    ),
  { ssr: false, loading: () => null },
);

export function DynamicWidgets() {
  return (
    <>
      <DynamicChatWidget />
      <DynamicWhatsAppButton />
      <DynamicCookieBanner />
    </>
  );
}
