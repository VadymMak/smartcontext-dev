import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// ⚠️ Must point to src/i18n/request.ts — required config file for next-intl v4
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  trailingSlash: false,

  images: {
    qualities: [75, 85, 90],
    formats: ["image/webp", "image/avif"],
    remotePatterns: [],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
