import { createNavigation } from "next-intl/navigation";

import { routing } from "@/i18n/routing";

/**
 * Envoltorios de navegación conscientes del idioma.
 *
 * Importa `Link` de aquí y NO de `next/link`: es lo que hace que un
 * `href="/proyectos"` se resuelva a `/es/proyectos` o `/en/projects` según
 * el idioma activo, sin tocar el componente que enlaza.
 *
 * `usePathname` devuelve la ruta INTERNA (`/proyectos/[slug]`), que es lo que
 * necesita el selector de idioma para conservar la página al cambiar.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
