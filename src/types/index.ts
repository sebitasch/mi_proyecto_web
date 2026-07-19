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

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: number;
  featured: boolean;
  role: string;
  problem: string;
  solution: string;
  highlights: string[];
  repoUrl?: string;
  liveUrl?: string;
  image?: string;
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
