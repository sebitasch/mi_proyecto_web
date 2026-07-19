import type { Experience } from "@/types";

/* -------------------------------------------------------------------------
 * Sin fechas de forma deliberada: el detalle temporal vive en el CV.
 *
 * ⚠️  Los nombres de cliente (`clients`) son visibles públicamente. Verifica
 * tu NDA con la consultora antes de desplegar: nombrar al cliente final es
 * habitual en LinkedIn, pero algunos contratos lo restringen.
 * ---------------------------------------------------------------------- */

export const experience: Experience[] = [
  {
    company: "Globant",
    role: "Senior Web UI Developer",
    summary:
      "Desarrollo de aplicaciones web escalables, optimizadas y seguras para clientes internacionales y productos internos, colaborando dentro de equipos de más de 500 desarrolladores.",
    highlights: [
      "Implementación de arquitecturas de microfrontends con Module Federation, acotando componentes para que cada equipo despliegue de forma independiente.",
      "Trabajo sobre sistemas monolíticos y de microservicios, migrando capacidades hacia límites más mantenibles sin detener la entrega.",
      "Observabilidad en producción con Datadog y Splunk para diagnosticar incidencias sobre datos reales y no sobre suposiciones.",
      "Integración de IA en el ciclo de desarrollo: GitHub Copilot, LLMs, MCPs y desarrollo guiado por especificación.",
    ],
    clients: ["Disney", "British Airways"],
    stack: [
      "Next.js",
      "React 18+",
      "TypeScript",
      "JavaScript",
      "Tailwind",
      "Node.js",
      "Microfrontends",
      "Module Federation",
      "Docker",
      "Kubernetes",
      "AWS",
      "Jenkins",
      "Datadog",
      "Splunk",
    ],
  },
  {
    company: "Great Place To Work®",
    role: "Web Developer",
    summary:
      "Desarrollo de sitios interactivos, SPAs y landing pages para impulso de marca y eventos profesionales.",
    highlights: [
      "Maquetación responsive con foco en tiempos de carga y compatibilidad entre navegadores.",
      "Publicación y versionado mediante pipelines de CI/CD.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Git", "GitHub", "CI/CD"],
  },
];
