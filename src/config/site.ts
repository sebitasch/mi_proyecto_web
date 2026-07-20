import type { SocialLink } from "@/types";

/**
 * Retrato de /sobre-mi. Cadena vacia = la pagina no muestra foto.
 *
 * Tipado explicito como `string` y fuera de `siteConfig`: dentro de un objeto
 * `as const` el valor se estrecharia a su literal y el condicional de la
 * pagina dejaria de compilar al vaciarlo.
 */
export const portraitPhoto: string = "/sebastian-cardona.jpg";

/** Dimensiones reales del archivo, para que next/image reserve el hueco. */
export const portraitSize = { width: 1080, height: 1075 } as const;

export const siteConfig = {
  name: "Sebastian Cardona",
  fullName: "Sebastian Cardona Hernandez",
  role: "Senior Web UI Developer",
  title: "Sebastian Cardona — Senior Web UI Developer",
  description:
    "Desarrollador frontend con más de 5 años construyendo aplicaciones web escalables con React, Next.js y Node.js. Microfrontends, rendimiento medible e IA integrada en el ciclo de desarrollo.",
  location: {
    city: "Bogotá",
    country: "Colombia",
    display: "Bogotá, Colombia",
    timezone: "GMT-5",
  },
  url: "https://mi-portafolio-sigma-self.vercel.app",
  email: "sebastianch9510@gmail.com",
  links: {
    email: "mailto:sebastianch9510@gmail.com",
    github: "https://github.com/sebitasch",
    linkedin:
      "https://www.linkedin.com/in/sebastian-cardona-hernandez-2a4394381/",
    instagram: "https://www.instagram.com/sebascph",
  },
  // `key` indexa el namespace `nav` de los mensajes; la etiqueta visible
  // se resuelve en el componente segun el idioma activo.
  nav: [
    { key: "inicio", href: "/" },
    { key: "proyectos", href: "/proyectos" },
    { key: "sobreMi", href: "/sobre-mi" },
    { key: "contacto", href: "/contacto" },
  ],
} as const;

/**
 * Redes sociales. `iconId` apunta a un simbolo de /public/icons.svg.
 * LinkedIn no lleva iconId: simpleicons retiro ese icono, y el footer
 * degrada a texto en vez de dejar un area clicable invisible.
 */
export const socialLinks: SocialLink[] = [
  {
    platform: "email",
    label: "Email",
    ariaLabel: "Escribir un correo a Sebastian Cardona",
    href: siteConfig.links.email,
    slug: "gmail",
    iconId: "gmail",
    inFooter: true,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    ariaLabel: "Perfil de LinkedIn de Sebastian Cardona",
    href: siteConfig.links.linkedin,
    slug: "linkedin",
    inFooter: true,
  },
  {
    platform: "github",
    label: "GitHub",
    ariaLabel: "Perfil de GitHub de Sebastian Cardona",
    href: siteConfig.links.github,
    slug: "github",
    iconId: "github",
    inFooter: true,
  },
  {
    platform: "instagram",
    label: "Instagram",
    ariaLabel: "Perfil de Instagram de Sebastian Cardona",
    href: siteConfig.links.instagram,
    slug: "instagram",
    iconId: "instagram",
    inFooter: true,
  },
];

export type SiteConfig = typeof siteConfig;
