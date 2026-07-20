import type { Tech } from "@/types";

/**
 * Los paths SVG NO viven aqui: estan en scripts/icon-paths.json y se
 * compilan a /public/icons.svg. Mantenerlos fuera de src/ garantiza que no
 * puedan colarse en el bundle ni en el payload RSC.
 *
 * `slug` es el identificador del simbolo dentro del sprite.
 */
export const stack: Tech[] = [
  { name: "React", slug: "react", category: "frontend" },
  { name: "Next.js", slug: "nextdotjs", category: "frontend" },
  { name: "Tailwind CSS", slug: "tailwindcss", category: "frontend" },
  { name: "Webpack", slug: "webpack", category: "frontend" },
  { name: "TypeScript", slug: "typescript", category: "lenguaje" },
  { name: "JavaScript", slug: "javascript", category: "lenguaje" },
  { name: "HTML5", slug: "html5", category: "lenguaje" },
  { name: "CSS3", slug: "css", category: "lenguaje" },
  { name: "Node.js", slug: "nodedotjs", category: "backend" },
  { name: "MySQL", slug: "mysql", category: "backend" },
  { name: "Vitest", slug: "vitest", category: "testing" },
  { name: "Jest", slug: "jest", category: "testing" },
  { name: "Cypress", slug: "cypress", category: "testing" },
  { name: "Postman", slug: "postman", category: "testing" },
  { name: "Bruno", slug: "bruno", category: "testing" },
  { name: "Lighthouse", slug: "lighthouse", category: "testing" },
  { name: "Git", slug: "git", category: "devops" },
  { name: "GitHub", slug: "github", category: "devops" },
  { name: "GitLab", slug: "gitlab", category: "devops" },
  { name: "Jenkins", slug: "jenkins", category: "devops" },
  { name: "Docker", slug: "docker", category: "devops" },
  { name: "Kubernetes", slug: "kubernetes", category: "devops" },
  { name: "AWS", slug: "aws", category: "devops" },
  { name: "Splunk", slug: "splunk", category: "observabilidad" },
  { name: "Datadog", slug: "datadog", category: "observabilidad" },
  { name: "Jira", slug: "jira", category: "observabilidad" },
  { name: "Anthropic Claude", slug: "claude", category: "ia" },
  { name: "GitHub Copilot", slug: "githubcopilot", category: "ia" },
];

/**
 * Practicas y patrones, no productos: no son marcas y por eso no llevan
 * icono. Se renderizan como Pill en un bloque aparte.
 */
export const methodologies: string[] = [
  "Microfrontends",
  "Module Federation",
  "Microservicios",
  "Arquitectura BFF",
  "REST APIs",
  "CI/CD",
  "SCRUM",
  "Spec-Driven Development",
  "MCP",
  "Prompt Engineering",
  "Responsive Design",
];
