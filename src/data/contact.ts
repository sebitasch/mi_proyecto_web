export interface ContactDetail {
  label: string;
  value: string;
}

/** Titular de la página de contacto. Corto, en segunda persona. */
export const contactHeadline = "Si llegaste hasta aquí, hablemos";

/** Cuerpo del mensaje. Cada string es un párrafo. */
export const contactBody: string[] = [
  "Busco equipos donde el frontend se tome en serio: donde el rendimiento se mida, la arquitectura se discuta y la experiencia de quien desarrolla importe tanto como la de quien usa el producto.",
  "Si estás construyendo algo así, quiero conocerlo. Y si solo quieres contrastar una idea o preguntarme cómo abordaría un problema concreto de tu producto, escríbeme igual: no hace falta que sea una vacante.",
];

/** Frase corta para el CTA del final de la home. */
export const contactCtaText =
  "¿Tienes un proyecto o una vacante en mente? Escríbeme y lo conversamos.";

/** Versión de una línea, para meta descripciones o resúmenes. */
export const contactIntro =
  "Abierto a oportunidades como Senior Web UI Developer. Escríbeme para hablar de un puesto, una colaboración o simplemente contrastar una idea.";

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

export const contactDetails: ContactDetail[] = [
  { label: "Ubicación", value: "Bogotá, Colombia · GMT-5" },
  { label: "Modalidad", value: "Remoto o híbrido" },
  { label: "Disponibilidad", value: "Abierto a propuestas" },
  { label: "Idiomas", value: "Español nativo · Inglés B2-C1" },
  { label: "Respuesta", value: "Normalmente en menos de 48 horas" },
];
