export const about: string[] = [
  "Soy Sebastian Cardona, ingeniero de sistemas y desarrollador frontend con más de cinco años construyendo producto web: desde landing pages para campañas de marca hasta aplicaciones que atienden a usuarios en varios países.",
  "Mi trabajo se ha centrado en arquitecturas que aguantan el crecimiento — microfrontends con Module Federation, patrones BFF, feature flags — dentro de equipos de más de 500 desarrolladores. En ese contexto la mantenibilidad deja de ser una preferencia estética: es lo que decide si un equipo entrega o se bloquea.",
  "También me ocupa el rendimiento como métrica y no como intuición. Lighthouse y Core Web Vitals para medir, Datadog y Splunk para saber qué pasa realmente en producción en lugar de suponerlo.",
  "En el último tramo he integrado IA dentro del propio flujo de desarrollo: la API de Anthropic Claude, Model Context Protocol (MCP) y desarrollo guiado por especificación. No por novedad, sino porque acorta de forma medible la distancia entre una idea y algo desplegado.",
];

/** Frase de apoyo bajo el H1 del hero. Máximo dos líneas en desktop. */
export const heroTagline =
  "Construyo aplicaciones web escalables con React, Next.js y Node.js: arquitecturas de microfrontends, rendimiento medible e IA integrada en el ciclo de desarrollo.";

/** Datos de cabecera para la página Sobre mí. */
export const aboutFacts = [
  { label: "Rol", value: "Senior Web UI Developer" },
  { label: "Formación", value: "Ingeniería de Sistemas" },
  { label: "Experiencia", value: "5+ años en desarrollo web" },
  { label: "Ubicación", value: "Bogotá, Colombia" },
] as const;
