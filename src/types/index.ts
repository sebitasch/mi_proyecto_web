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
  slug: string;
  /** Atributo `d` del SVG, sobre un viewBox de 24x24. */
  path: string;
  category: TechCategory;
}

export type ProjectKind = "corporativo" | "freelance";

export interface Project {
  slug: string;
  kind: ProjectKind;
  /** Cliente final. En corporativo, el cliente de Globant. */
  client: string;
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
  tags: string[];
  year: number;
  /** Ruta a la portada en /public/projects. */
  image: string;
  /** Solo freelance: enlace al sitio publicado. */
  url?: string;
  featured: boolean;
}

export interface Experience {
  company: string;
  role: string;
  summary: string;
  /** Responsabilidades o logros concretos, en frases cortas. */
  highlights: string[];
  stack: string[];
  /** Clientes finales atendidos desde esa empresa. */
  clients?: string[];
  /** Sitio público del producto, nunca recursos internos. */
  url?: string;
  /**
   * Marca puestos bajo confidencialidad: la UI omite el nombre de la empresa
   * y se limita a describir tipos de tarea y skills.
   */
  confidential?: boolean;
}

export type SocialPlatform = "email" | "linkedin" | "github" | "instagram";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** Texto accesible: describe el destino, no solo la marca. */
  ariaLabel: string;
  href: string;
  /** Slug de simpleicons.org. */
  slug: string;
  /** Atributo `d` del SVG, sobre un viewBox de 24x24. */
  path: string;
  /** Se muestra también en el footer. */
  inFooter: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}
