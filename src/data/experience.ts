import type { Experience } from "@/types";

/* -------------------------------------------------------------------------
 * ⚠️  CONTENIDO PLACEHOLDER — NO PUBLICAR
 *
 * Las 3 entradas de abajo son ficticias. Existen solo para maquetar y probar
 * el timeline con datos de forma realista. Reemplaza cada entrada por
 * experiencia real antes de desplegar.
 *
 * La entrada más reciente lleva `confidential: true`: describe solo tipos de
 * tarea y skills, sin nombre de empresa, arquitectura interna ni datos de
 * cliente (ver nota de privacidad en CLAUDE.md).
 * ---------------------------------------------------------------------- */

export const experience: Experience[] = [
  {
    company: "",
    role: "Frontend / Fullstack Developer",
    startDate: "2024-03",
    endDate: null,
    summary:
      "Desarrollo de features en arquitectura de microfrontends, diseño de endpoints BFF y consumo de APIs REST, con pruebas unitarias en Vitest.",
    stack: ["React", "Next.js", "TypeScript", "Node.js"],
    confidential: true,
  },
  {
    company: "Nimbus Retail",
    role: "Frontend Developer",
    startDate: "2022-06",
    endDate: "2024-02",
    summary:
      "Construcción de un catálogo de producto en Next.js y migración progresiva de un sitio legacy con feature flags, coordinando releases con el equipo de backend.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    company: "Estudio Craft",
    role: "Frontend Developer Jr.",
    startDate: "2020-09",
    endDate: "2022-05",
    summary:
      "Maquetación y desarrollo de sitios a medida para clientes pequeños, integrando formularios con APIs de terceros y optimizando rendimiento.",
    stack: ["React", "JavaScript", "CSS"],
  },
];
