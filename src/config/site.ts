export const siteConfig = {
  name: "Sebas",
  title: "Sebas — Portafolio",
  description: "Portafolio personal: proyectos, experiencia y contacto.",
  url: "https://mi-portafolio-sigma-self.vercel.app/",
  links: {
    github: "https://github.com/sebitasch",
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
