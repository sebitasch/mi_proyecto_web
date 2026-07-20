import type { SocialLink } from "@/types";

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
  nav: [
    { label: "Inicio", href: "/" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Contacto", href: "/contacto" },
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
