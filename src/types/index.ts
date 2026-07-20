export type TechCategory =
  | "frontend"
  | "lenguaje"
  | "backend"
  | "testing"
  | "devops"
  | "observabilidad"
  | "ia";

export interface Tech {
  name: string;
  /** Identificador del simbolo en /public/icons.svg. */
  slug: string;
  category: TechCategory;
}

export type ProjectKind = "corporativo" | "freelance";

/* -------------------------------------------------------------------------
 * Los tipos se parten en `Base` (invariante entre idiomas) y `Content`
 * (traducible). El objetivo es que sea IMPOSIBLE traducir por error un slug,
 * una ruta de imagen, un nombre de cliente o una tecnología: si aparecen en
 * un archivo de contenido localizado, TypeScript falla por exceso de
 * propiedades.
 * ---------------------------------------------------------------------- */

/** Datos de proyecto que NO cambian con el idioma. */
export interface ProjectBase {
  slug: string;
  kind: ProjectKind;
  /** Cliente final. En corporativo, el cliente de Globant. Nombre propio. */
  client: string;
  /** Nombres de tecnología: no se traducen. */
  tags: string[];
  year: number;
  /** Ruta a la portada en /public/projects. Deriva del slug. */
  image: string;
  /** Solo freelance: enlace al sitio publicado. */
  url?: string;
  featured: boolean;
}

/** Prosa de proyecto, una versión por idioma. */
export interface ProjectContent {
  title: string;
  description: string;
  /** Situación de partida: qué problema existía antes. */
  context: string;
  /** Qué se hizo para resolverlo. */
  approach: string;
  /**
   * Resultado en términos cualitativos. Sin métricas inventadas: si algún día
   * hay cifras reales medidas, añádelas aquí.
   */
  impact: string[];
}

/** Proyecto ya resuelto para un idioma concreto: lo que consume la UI. */
export type Project = ProjectBase & ProjectContent;

/** Datos de experiencia que NO cambian con el idioma. */
export interface ExperienceBase {
  /**
   * Identificador estable. NO se deriva del rol: `role` se traduce, y una key
   * de React que cambia entre idiomas provoca remontajes innecesarios.
   */
  id: string;
  company: string;
  /** Nombres de tecnología: no se traducen. */
  stack: string[];
  /** Clientes finales atendidos desde esa empresa. Nombres propios. */
  clients?: string[];
  /** Sitio público del producto, nunca recursos internos. */
  url?: string;
  /**
   * Marca puestos bajo confidencialidad: la UI omite el nombre de la empresa
   * y sus clientes, y ninguno de los dos llega al HTML.
   */
  confidential?: boolean;
}

/** Prosa de experiencia, una versión por idioma. */
export interface ExperienceContent {
  role: string;
  summary: string;
  /** Responsabilidades o logros concretos, en frases cortas. */
  highlights: string[];
}

export type Experience = ExperienceBase & ExperienceContent;

export type SocialPlatform = "email" | "linkedin" | "github" | "instagram";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** Texto accesible: describe el destino, no solo la marca. */
  ariaLabel: string;
  href: string;
  /** Slug de simpleicons.org. */
  slug: string;
  /**
   * Id del simbolo en /public/icons.svg. Ausente cuando no hay icono
   * disponible (LinkedIn): la UI debe degradar a texto.
   */
  iconId?: string;
  /** Se muestra también en el footer. */
  inFooter: boolean;
}

/**
 * Rutas internas declaradas en `src/i18n/routing.ts`. Tipar `href` con esta
 * union hace que un enlace a una ruta inexistente sea un error de compilacion
 * y no un 404 en produccion.
 */
export type AppPathname = "/" | "/proyectos" | "/sobre-mi" | "/contacto";

export interface NavItem {
  /** Clave de traduccion de la etiqueta, en el namespace `nav`. */
  key: string;
  href: AppPathname;
}
