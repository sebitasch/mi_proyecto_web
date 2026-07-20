import { defineRouting } from "next-intl/routing";

/**
 * Rutas con segmento de idioma y segmentos traducidos.
 *
 * Las claves son las rutas INTERNAS (las que existen en `src/app/[locale]/`),
 * en español, para que el árbol de archivos no dependa del idioma. next-intl
 * reescribe de la ruta pública a la interna.
 *
 * Los slugs de proyecto NO se traducen: son identificadores, `image` deriva
 * de ellos 1:1, y hay enlaces publicados que deben seguir funcionando.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // `always` para que /es/... y /en/... sean explícitos y simétricos: sin
  // esto el idioma por defecto viviría en la raíz y las URLs no serían
  // comparables entre sí.
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/proyectos": {
      es: "/proyectos",
      en: "/projects",
    },
    "/proyectos/[slug]": {
      es: "/proyectos/[slug]",
      en: "/projects/[slug]",
    },
    "/sobre-mi": {
      es: "/sobre-mi",
      en: "/about",
    },
    "/contacto": {
      es: "/contacto",
      en: "/contact",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
