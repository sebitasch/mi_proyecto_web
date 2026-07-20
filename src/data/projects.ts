import type { ProjectBase } from "@/types";

/* -------------------------------------------------------------------------
 * Datos INVARIANTES entre idiomas. La prosa vive en `projects.<locale>.ts`.
 *
 * `slug` e `image` van en ASCII sin tildes: se usan como URL, e `image`
 * deriva del slug 1:1. No se traducen: los enlaces ya están publicados.
 * `client` y `tags` son nombres propios y de tecnología.
 * ---------------------------------------------------------------------- */

export const projectsBase = [
  {
    slug: "juliana-fashionart",
    kind: "freelance",
    client: "Juliana Fashion Art",
    /* Verificado abriendo el sitio: rutas `wp-content/uploads/`, paginacion y
       valoraciones de WooCommerce. Solo se listan esas dos mas lo observable
       de la tienda; nada de SEO o analitica que no se pueda comprobar. */
    tags: ["WordPress", "WooCommerce", "E-commerce", "Responsive"],
    year: 2025,
    image: "/projects/juliana-fashionart.svg",
    url: "https://julianafashionart.com/",
    featured: true,
  },
  {
    slug: "line-visualization",
    kind: "freelance",
    client: "Line Visualization",
    /* Sin React/Next a proposito: el sitio esta hecho en Framer y el
       `meta-generator` lo delata. Listar aqui lo que no se uso es falso y un
       recruiter tecnico lo detecta al abrirlo. */
    tags: ["Framer", "Diseño UI", "Responsive", "SEO"],
    year: 2025,
    image: "/projects/line-visualization.svg",
    url: "https://www.linevisualization.com/",
    featured: true,
  },
  {
    slug: "refactorizacion-monolito",
    kind: "corporativo",
    client: "Disney Parks",
    tags: ["React", "Next.js", "Jenkins", "Splunk", "TypeScript", "JavaScript"],
    year: 2023,
    image: "/projects/refactorizacion-monolito.svg",
    featured: true,
  },
  {
    slug: "optimizacion-seo",
    kind: "corporativo",
    client: "Disney Parks",
    tags: ["React", "Next.js", "Jenkins", "Splunk", "TypeScript", "JavaScript"],
    year: 2023,
    image: "/projects/optimizacion-seo.svg",
    featured: false,
  },
  {
    slug: "modulos-producto",
    kind: "corporativo",
    client: "British Airways",
    tags: [
      "React",
      "Next.js",
      "ARGO",
      "Datadog",
      "TypeScript",
      "JavaScript",
      "GitHub CI/CD",
      "Git",
    ],
    year: 2026,
    image: "/projects/modulos-producto.svg",
    featured: true,
  },
  {
    slug: "git-submodulos",
    kind: "corporativo",
    client: "British Airways",
    tags: [
      "Git",
      "GitHub CI/CD",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Datadog",
      "ARGO",
    ],
    year: 2026,
    image: "/projects/git-submodulos.svg",
    featured: false,
  },
  {
    slug: "web-apis-globales",
    kind: "corporativo",
    client: "British Airways",
    tags: ["Next.js", "API REST"],
    year: 2026,
    image: "/projects/web-apis-globales.svg",
    featured: false,
  },
  {
    slug: "internacionalizacion",
    kind: "corporativo",
    client: "British Airways",
    tags: ["i18n", "CDN", "SSR", "CSR", "React", "Next.js"],
    year: 2026,
    image: "/projects/internacionalizacion.svg",
    featured: false,
  },
] as const satisfies readonly ProjectBase[];

/** Unión literal de los 6 slugs: obliga a que cada idioma los cubra todos. */
export type ProjectSlug = (typeof projectsBase)[number]["slug"];
