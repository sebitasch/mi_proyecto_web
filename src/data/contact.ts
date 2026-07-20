export interface ContactDetail {
  label: string;
  value: string;
}

export const CONTACT_DETAIL_KEYS = [
  "location",
  "mode",
  "availability",
  "languages",
  "responseTime",
] as const;

export type ContactDetailKey = (typeof CONTACT_DETAIL_KEYS)[number];

export interface ContactContent {
  headline: string;
  body: string[];
  details: Record<ContactDetailKey, { label: string; value: string }>;
}

/**
 * Opciones del select "Tipo de consulta".
 *
 * `value` es lo que se ENVÍA a Web3Forms y por tanto lo que llega al correo:
 * no debe cambiar nunca, ni al traducir. `id` indexa la etiqueta visible en
 * los mensajes de i18n.
 */
export const contactSubjectOptions = [
  { id: "vacancy", value: "Vacante" },
  { id: "collaboration", value: "Colaboración" },
  { id: "inquiry", value: "Consulta" },
] as const;

export type ContactSubjectId = (typeof contactSubjectOptions)[number]["id"];
