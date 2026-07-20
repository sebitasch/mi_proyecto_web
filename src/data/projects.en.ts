import type { ProjectSlug } from "@/data/projects";
import type { ProjectContent } from "@/types";

/**
 * Project prose in English.
 *
 * ⚠️ TRANSLATION PENDING REVIEW. This describes real work for real clients:
 * read it before publishing. `impact` stays qualitative on purpose — no
 * invented metrics.
 */
export const projectsEn: Record<ProjectSlug, ProjectContent> = {
  "refactorizacion-monolito": {
    title: "Monolith architecture refactor",
    description:
      "Removed duplicated code through architectural patterns, restoring readability and room to grow in the monolith.",
    context:
      "Duplicated code had piled up across the monolithic application. Every change had to be repeated in several places, and the risk of missing one grew with each iteration.",
    approach:
      "Identified the recurring duplication and extracted it into shared abstractions, applying architectural patterns and conventions agreed with the team.",
    impact: [
      "A change is made in one place instead of being repeated across the codebase",
      "A more readable base for anyone joining the project",
      "Room to scale without carrying the previous debt",
    ],
  },
  "optimizacion-seo": {
    title: "International SEO optimisation",
    description:
      "Search positioning strategy adapted to each international market, within the client's business rules.",
    context:
      "The brand competed in several markets with different positioning needs, and each region brought its own business rules that the implementation had to respect.",
    approach:
      "A per-market SEO strategy, fitting the technical implementation to each region's business constraints rather than applying a single global configuration.",
    impact: [
      "Positioning tailored to each market instead of a generic setup",
      "Business rules respected without giving up visibility",
    ],
  },
  "modulos-producto": {
    title: "Product modules in React and Next.js",
    description:
      "Design and delivery of product modules: checkout flow, seat selection and flight order management.",
    context:
      "The airline's application needed to extend its product with new flows, on a codebase already in production and carrying real passenger traffic.",
    approach:
      "End-to-end design and implementation of three modules — checkout, seat selection and order management — integrated into the existing architecture.",
    impact: [
      "Three business-critical flows delivered on a live production system",
      "Observability with Datadog to diagnose against real data",
      "Continuous delivery through GitHub CI/CD and ARGO",
    ],
  },
  "git-submodulos": {
    title: "Standardisation with Git submodules",
    description:
      "A shared artifact distributed as a submodule, unifying functions and components across teams that had been defining them separately.",
    context:
      "Each team defined its own functions, components and pages. Whatever was common ended up implemented several times, with different criteria each time.",
    approach:
      "Built a shared artifact, distributed as a Git submodule, that centralises general-purpose functions and sets a single convention for every team.",
    impact: [
      "One definition for what each team used to solve on its own",
      "Changes to shared code propagate without coordinating team by team",
      "An explicit convention instead of individual judgement",
    ],
  },
  "web-apis-globales": {
    title: "Web APIs for global content",
    description:
      "Centralised header and footer for every flow of a microservices application, served from a dedicated API.",
    context:
      "With the application split across microservices, each flow solved common elements such as the header and footer on its own, risking divergence between them.",
    approach:
      "Dedicated Next.js APIs serving that global content to every flow from a single source, regardless of which microservice consumes it.",
    impact: [
      "A consistent header and footer across the whole application",
      "A global change no longer means touching every microservice",
    ],
  },
  internacionalizacion: {
    title: "Internationalisation and multi-language support",
    description:
      "Translation optimised for the client's markets and languages, with CDN caching and combined SSR/CSR rendering.",
    context:
      "The client operates in several markets with different languages. Translations had to be served fast and without hurting application performance.",
    approach:
      "Per-language and per-market translation backed by CDN caching, combining server and client rendering depending on what suited each flow.",
    impact: [
      "Content in the right language for the visitor's market",
      "Translation cost absorbed by CDN caching",
    ],
  },
};
