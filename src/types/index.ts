export type TechCategory =
  | "frontend"
  | "lenguaje"
  | "herramienta"
  | "cloud"
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
  /** Formato ISO corto: "YYYY-MM". */
  startDate: string;
  /** `null` cuando es el puesto actual. */
  endDate: string | null;
  summary: string;
  stack: string[];
  /** Sitio público del producto, nunca recursos internos. */
  url?: string;
  /**
   * Marca puestos bajo confidencialidad: la UI debe omitir el nombre de la
   * empresa y limitarse a describir tipos de tarea y skills.
   */
  confidential?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}
