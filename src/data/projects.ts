import type { Project } from "@/types";

/* -------------------------------------------------------------------------
 * ⚠️  CONTENIDO PLACEHOLDER — NO PUBLICAR
 *
 * Los 6 proyectos de abajo son ficticios. Existen solo para maquetar y probar
 * el layout con datos de forma realista. Reemplaza cada entrada por proyectos
 * reales antes de desplegar.
 *
 * `repoUrl` y `liveUrl` se omiten a propósito: enlaces inventados romperían
 * la credibilidad del portafolio si se publican por error.
 *
 * `slug` e `image` van siempre en ASCII sin tildes: se usan como URL.
 * ---------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    slug: "panel-observabilidad",
    title: "Panel de observabilidad para microfrontends",
    description:
      "Panel que unifica errores, tiempos de carga y versiones desplegadas de seis microfrontends en una sola vista.",
    tags: ["Next.js", "TypeScript", "Module Federation", "Tailwind"],
    year: 2025,
    featured: true,
    role: "Frontend lead",
    problem:
      "Cada equipo desplegaba su microfrontend por separado y no había forma de saber qué versión estaba en producción ni de qué módulo venía un error en runtime.",
    solution:
      "Un host en Next.js que lee el manifiesto de cada remote al arrancar y expone su versión, su estado de salud y los errores agrupados por módulo.",
    highlights: [
      "Reducción del tiempo de diagnóstico de incidencias de 40 a 10 minutos",
      "Trazado de errores hasta el microfrontend y la versión que los origina",
      "Alertas por umbral de errores configurables por equipo",
    ],
    image: "/projects/panel-observabilidad.svg",
  },
  {
    slug: "bff-catalogo",
    title: "BFF para catálogo multi-tienda",
    description:
      "Capa intermedia que agrega cuatro APIs de catálogo y devuelve una respuesta única adaptada a web y móvil.",
    tags: ["Node.js", "Fastify", "TypeScript", "Redis"],
    year: 2025,
    featured: true,
    role: "Fullstack",
    problem:
      "El cliente web hacía siete peticiones para pintar una ficha de producto, con lógica de merge duplicada en web y en la app móvil.",
    solution:
      "Un BFF en Fastify que resuelve la agregación en el servidor, cachea en Redis por SKU y expone un contrato distinto por tipo de cliente.",
    highlights: [
      "De siete peticiones a una por ficha de producto",
      "Cache por SKU con invalidación por evento de stock",
      "Contrato tipado compartido entre backend y frontend",
    ],
    image: "/projects/bff-catalogo.svg",
  },
  {
    slug: "design-system",
    title: "Design system y librería de componentes",
    description:
      "Librería de 34 componentes React con tokens de diseño, documentación en Storybook y tests de regresión visual.",
    tags: ["React", "TypeScript", "Storybook", "Vitest"],
    year: 2024,
    featured: false,
    role: "Frontend",
    problem:
      "Tres productos de la misma empresa usaban botones, inputs y modales distintos, y cada rediseño obligaba a repetir el trabajo en cada repositorio.",
    solution:
      "Un paquete versionado con tokens en CSS custom properties, componentes accesibles y una guía de migración por producto.",
    highlights: [
      "34 componentes con cobertura de tests del 85%",
      "Tokens de color y espaciado consumidos por los tres productos",
      "Auditoría de accesibilidad WCAG AA sobre los componentes interactivos",
    ],
    image: "/projects/design-system.svg",
  },
  {
    slug: "migracion-checkout",
    title: "Migración de checkout con feature flags",
    description:
      "Reescritura del flujo de pago de Pages Router a App Router, liberada de forma progresiva por porcentaje de tráfico.",
    tags: ["Next.js", "TypeScript", "Feature flags", "Playwright"],
    year: 2024,
    featured: false,
    role: "Frontend",
    problem:
      "El checkout antiguo bloqueaba la actualización de Next.js, pero era el flujo que generaba ingresos y no admitía un despliegue de golpe.",
    solution:
      "Convivencia de ambos checkouts tras un feature flag, con reparto de tráfico incremental y métricas de conversión comparadas por variante.",
    highlights: [
      "Migración completada sin caída de la tasa de conversión",
      "Rollout por tramos del 5% al 100% en cuatro semanas",
      "Suite end-to-end en Playwright cubriendo los dos flujos a la vez",
    ],
    image: "/projects/migracion-checkout.svg",
  },
  {
    slug: "portal-documentacion",
    title: "Portal de documentación de APIs",
    description:
      "Sitio que genera documentación navegable a partir de especificaciones OpenAPI, con ejemplos ejecutables por endpoint.",
    tags: ["React", "OpenAPI", "Docker", "Postman"],
    year: 2023,
    featured: false,
    role: "Fullstack",
    problem:
      "La documentación de doce servicios internos vivía en wikis desactualizadas y cada equipo la escribía con un formato distinto.",
    solution:
      "Un pipeline que valida el OpenAPI de cada servicio en CI y publica un portal único, de forma que la documentación se rompe si el contrato cambia.",
    highlights: [
      "Doce servicios documentados desde una fuente única",
      "Validación del contrato en CI antes del merge",
      "Colección de Postman generada automáticamente por servicio",
    ],
    image: "/projects/portal-documentacion.svg",
  },
  {
    slug: "buscador-facetado",
    title: "Buscador de inventario con filtros facetados",
    description:
      "Buscador sobre un inventario de 80.000 referencias, con filtros combinables y estado sincronizado con la URL.",
    tags: ["React", "TypeScript", "Elasticsearch", "AWS"],
    year: 2023,
    featured: false,
    role: "Fullstack",
    problem:
      "La búsqueda existente hacía una consulta SQL con LIKE por cada filtro y tardaba más de cuatro segundos en catálogos grandes.",
    solution:
      "Índice en Elasticsearch con agregaciones por faceta y un frontend que refleja cada filtro en la URL para poder compartir resultados.",
    highlights: [
      "Tiempo de respuesta por debajo de 200 ms en el percentil 95",
      "Filtros combinables reflejados en la URL y navegables con el historial",
      "Reindexado incremental disparado por cambios de stock",
    ],
    image: "/projects/buscador-facetado.svg",
  },
];
