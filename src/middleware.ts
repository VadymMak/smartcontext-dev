import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match only internationalized pathnames
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};
