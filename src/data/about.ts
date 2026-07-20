/**
 * Contenido invariante del hero y de Sobre mí.
 *
 * La prosa localizada vive en `about.<locale>.ts`. Aquí solo queda lo que no
 * cambia con el idioma.
 */

/**
 * Línea decorativa del hero. Se revela con un barrido de `clip-path`, no con
 * un tecleo carácter a carácter: eso exige tipografía monoespaciada, y la
 * identidad visual usa Inter en todo.
 *
 * Es código literal: NO se traduce. Una sola línea, 40-55 caracteres.
 */
export const heroCodeLine = 'const developer = { focus: "performance" }';

/** Claves de los datos de cabecera. El valor visible se traduce. */
export const ABOUT_FACT_KEYS = [
  "role",
  "education",
  "experience",
  "location",
] as const;

export type AboutFactKey = (typeof ABOUT_FACT_KEYS)[number];

export interface AboutContent {
  /** Párrafos de la bio. */
  paragraphs: string[];
  /** Frase de apoyo bajo el H1 del hero. */
  tagline: string;
  /** Etiqueta y valor de cada dato de cabecera. */
  facts: Record<AboutFactKey, { label: string; value: string }>;
}
