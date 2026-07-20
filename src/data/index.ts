import { aboutEn } from "@/data/about.en";
import { aboutEs } from "@/data/about.es";
import { experienceBase } from "@/data/experience";
import { experienceEn } from "@/data/experience.en";
import { experienceEs } from "@/data/experience.es";
import { projectsBase } from "@/data/projects";
import { projectsEn } from "@/data/projects.en";
import { projectsEs } from "@/data/projects.es";
import type { AboutContent } from "@/data/about";
import type { Locale } from "@/i18n/routing";
import type { Experience, Project } from "@/types";

/**
 * Resuelve los datos invariantes con la prosa del idioma pedido.
 *
 * Los `Record<Locale, ...>` son los que obligan a que al añadir un idioma a
 * `routing.ts` haya que registrarlo también aquí: sin su diccionario, esto
 * no compila.
 */
const PROJECT_CONTENT: Record<Locale, typeof projectsEs> = {
  es: projectsEs,
  en: projectsEn,
};

const EXPERIENCE_CONTENT: Record<Locale, typeof experienceEs> = {
  es: experienceEs,
  en: experienceEn,
};

const ABOUT_CONTENT: Record<Locale, AboutContent> = {
  es: aboutEs,
  en: aboutEn,
};

export function getProjects(locale: Locale): Project[] {
  const content = PROJECT_CONTENT[locale];
  return projectsBase.map((base) => ({ ...base, ...content[base.slug] }));
}

export function getExperience(locale: Locale): Experience[] {
  const content = EXPERIENCE_CONTENT[locale];
  return experienceBase.map((base) => ({ ...base, ...content[base.id] }));
}

export function getAbout(locale: Locale): AboutContent {
  return ABOUT_CONTENT[locale];
}
