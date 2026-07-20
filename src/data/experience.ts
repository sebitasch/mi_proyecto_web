import type { ExperienceBase } from "@/types";

/* -------------------------------------------------------------------------
 * Datos INVARIANTES entre idiomas. La prosa vive en `experience.<locale>.ts`.
 *
 * Sin fechas de forma deliberada: el detalle temporal vive en el CV.
 *
 * ⚠️  Los nombres de cliente (`clients`) son visibles públicamente. Verifica
 * tu NDA con la consultora antes de desplegar: nombrar al cliente final es
 * habitual en LinkedIn, pero algunos contratos lo restringen.
 * ---------------------------------------------------------------------- */

export const experienceBase = [
  {
    id: "globant",
    company: "Globant",
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
    id: "gptw",
    company: "Great Place To Work®",
    stack: ["HTML5", "CSS3", "JavaScript", "Git", "GitHub", "CI/CD"],
  },
] as const satisfies readonly ExperienceBase[];

export const notableClients: string[] = experienceBase.flatMap(
  (entry) => ("clients" in entry ? entry.clients : []),
);

/** Unión literal de los ids: obliga a que cada idioma los cubra todos. */
export type ExperienceId = (typeof experienceBase)[number]["id"];
