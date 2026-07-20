import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  /**
   * El matcher excluye deliberadamente:
   * - `_next` y `_vercel`: infraestructura del framework.
   * - `icons.svg`: el sprite lleva su propio `Cache-Control` en next.config;
   *   si pasara por el middleware perdería esa cabecera y dejaría de cachearse.
   * - `projects/*`: las portadas SVG.
   * - Cualquier ruta con punto (favicon.ico, robots.txt, sitemap.xml…).
   */
  matcher: ["/((?!api|_next|_vercel|icons\\.svg|projects/|.*\\..*).*)"],
};
