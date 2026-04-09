import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except static files, API routes, and Sanity Studio
    "/((?!_next|_vercel|api|studio|.*\\..*).*)",
  ],
};
