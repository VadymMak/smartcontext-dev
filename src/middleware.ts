import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // ⚠️ CRITICAL: exclude API, Next.js internals and static folders
    "/((?!api|_next|_vercel|gallery|favicon|robots|sitemap|og-).*)",

    // ⚠️ CRITICAL: exclude media files — without this middleware returns 404
    "/((?!.*\\.(?:mp4|webm|mov|pdf|ico|png|jpg|jpeg|gif|svg|webp|woff|woff2)$).*)",
  ],
};
