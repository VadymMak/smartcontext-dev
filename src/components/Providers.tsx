"use client";

// ============================================================
// src/components/Providers.tsx
// Wraps app with next-themes ThemeProvider
// ⚠️ Must be placed ABOVE Header in [locale]/layout.tsx
// ============================================================

import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
