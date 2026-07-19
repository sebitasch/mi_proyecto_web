export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: number;
  repoUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
