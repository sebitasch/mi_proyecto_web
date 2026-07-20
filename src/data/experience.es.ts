import type { ExperienceId } from "@/data/experience";
import type { ExperienceContent } from "@/types";

/**
 * Prosa de la experiencia en español.
 *
 * `role` se traduce, y por eso NO puede usarse como key de React: para eso
 * está el `id` estable de `experience.ts`.
 */
export const experienceEs: Record<ExperienceId, ExperienceContent> = {
  globant: {
    role: "Senior Web UI Developer",
    summary:
      "Desarrollo de aplicaciones web escalables, optimizadas y seguras para clientes internacionales y productos internos, colaborando dentro de equipos de más de 500 desarrolladores.",
    highlights: [
      "Implementación de arquitecturas de microfrontends con Module Federation, acotando componentes para que cada equipo despliegue de forma independiente.",
      "Trabajo sobre sistemas monolíticos y de microservicios, migrando capacidades hacia límites más mantenibles sin detener la entrega.",
      "Observabilidad en producción con Datadog y Splunk para diagnosticar incidencias sobre datos reales y no sobre suposiciones.",
      "Integración de IA en el ciclo de desarrollo: GitHub Copilot, LLMs, MCPs y desarrollo guiado por especificación.",
    ],
  },
  gptw: {
    role: "Web Developer",
    summary:
      "Desarrollo de sitios interactivos, SPAs y landing pages para impulso de marca y eventos profesionales.",
    highlights: [
      "Maquetación responsive con foco en tiempos de carga y compatibilidad entre navegadores.",
      "Publicación y versionado mediante pipelines de CI/CD.",
    ],
  },
};
