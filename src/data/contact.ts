/* -------------------------------------------------------------------------
 * ⚠️  CONTIENE DATOS PLACEHOLDER — REVISAR ANTES DE PUBLICAR
 *
 * Reales (vienen de site.ts / CLAUDE.md):
 *   - email y GitHub
 *   - idiomas
 *
 * Ficticios, reemplázalos por los tuyos:
 *   - ubicación, disponibilidad y tiempo de respuesta
 *
 * No prometas un tiempo de respuesta que no vayas a cumplir: un recruiter que
 * no recibe contestación en el plazo anunciado lo nota.
 * ---------------------------------------------------------------------- */

export interface ContactDetail {
  label: string;
  value: string;
}

export const contactIntro =
  "Abierto a oportunidades como frontend o fullstack developer. Escríbeme si quieres hablar de un puesto, una colaboración o revisar mi trabajo con más detalle.";

export const contactDetails: ContactDetail[] = [
  { label: "Ubicación", value: "Santiago, Chile · GMT-3" },
  { label: "Disponibilidad", value: "Abierto a propuestas · incorporación en 30 días" },
  { label: "Modalidad", value: "Remoto o híbrido" },
  { label: "Idiomas", value: "Español nativo · Inglés B2-C1" },
  { label: "Respuesta", value: "Normalmente en menos de 48 horas" },
];
