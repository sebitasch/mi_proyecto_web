export const siteConfig = {
  name: "Sebas",
  title: "Sebas — Portafolio",
  description: "Portafolio personal: proyectos, experiencia y contacto.",
  url: "https://example.com",
  links: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    email: "mailto:sebastianch9510@gmail.com",
  },
  nav: [
    { label: "Inicio", href: "/" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Contacto", href: "/contacto" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
