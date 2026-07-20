import {
  Activity,
  Container,
  Database,
  FileCode,
  FlaskConical,
  LayoutGrid,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { methodologies, stack } from "@/data/stack";
import type { Tech, TechCategory } from "@/types";
import { Pill } from "@/components/ui/Pill";
import { TechIcon } from "@/components/ui/TechIcon";
import { getTranslations } from "next-intl/server";

const CATEGORY_ORDER: TechCategory[] = [
  "frontend",
  "lenguaje",
  "backend",
  "testing",
  "devops",
  "observabilidad",
  "ia",
];

/**
 * Un icono por categoria, no solo en una: decorar un grupo entre siete se lee
 * como un olvido. Son componentes de lucide sin hooks, asi que funcionan en
 * Server Component y no suman al bundle de cliente.
 */
const CATEGORY_ICONS: Record<TechCategory, LucideIcon> = {
  frontend: LayoutGrid,
  lenguaje: FileCode,
  backend: Database,
  testing: FlaskConical,
  devops: Container,
  observabilidad: Activity,
  ia: Sparkles,
};

/* Las etiquetas de categoria ya no viven aqui: se resuelven con el traductor
   `techCategories` dentro del componente, porque `t` no existe a nivel de
   modulo. Las claves son las mismas de TechCategory. */

function groupByCategory(items: Tech[]): Record<TechCategory, Tech[]> {
  // Se parte de CATEGORY_ORDER en vez de un literal fijo: al anadir una
  // categoria al tipo, el acumulador se actualiza solo y no hay que
  // recordar tocar este objeto.
  const empty = Object.fromEntries(
    CATEGORY_ORDER.map((category) => [category, [] as Tech[]]),
  ) as Record<TechCategory, Tech[]>;

  return items.reduce((groups, item) => {
    groups[item.category].push(item);
    return groups;
  }, empty);
}

/* `min-w-0` + `truncate` en el nombre: en una columna estrecha "Anthropic
   Claude" desbordaria la celda y romperia la rejilla. */
const ITEM_CLASSES = "group flex min-w-0 items-center gap-2";
const ICON_CLASSES =
  "h-5 w-5 shrink-0 text-muted transition-colors duration-[var(--dur-1)] ease-out-soft group-hover:text-accent";
const NAME_CLASSES =
  "truncate text-sm text-muted transition-colors duration-[var(--dur-1)] ease-out-soft group-hover:text-accent";

interface TechStackProps {
  /**
   * `full` agrupa por categoria con encabezados; `compact` es una fila plana
   * sin agrupar, para resumir el stack sin repetir la vista de /sobre-mi.
   */
  variant?: "full" | "compact";
}

export async function TechStack({ variant = "full" }: TechStackProps) {
  const t = await getTranslations("about");
  const tc = await getTranslations("techCategories");
  if (variant === "compact") {
    /* Rejilla y no `flex-wrap`: con 28 items de ancho desigual, envolver deja
       una o dos entradas por fila en movil y se lee como una lista vertical
       larguisima. En columnas fijas cada fila aprovecha el ancho completo. */
    return (
      <ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
        {stack.map((tech) => (
          <li key={tech.slug} className={ITEM_CLASSES}>
            <TechIcon id={tech.slug} className={ICON_CLASSES} />
            <span className={NAME_CLASSES}>{tech.name}</span>
          </li>
        ))}
      </ul>
    );
  }

  const grouped = groupByCategory(stack);

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORY_ORDER.filter((category) => grouped[category].length > 0).map(
          (category) => {
            const CategoryIcon = CATEGORY_ICONS[category];

            return (
            <div key={category}>
              {/* h3: el h2 de la seccion ("Stack") lo aporta la pagina, asi
                  que las categorias cuelgan de el sin saltar de nivel. */}
              <h3 className="mb-3 flex items-center gap-1.5 text-sm font-medium text-foreground">
                <CategoryIcon className="h-4 w-4 text-accent" aria-hidden="true" />
                {tc(category)}
              </h3>
              {/* Dos columnas solo en movil: ahi las categorias se apilan una
                  tras otra y en una sola columna la pagina se alarga de mas.
                  Desde `sm` las propias categorias ya van en rejilla. */}
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-col">
                {grouped[category].map((tech) => (
                  <li key={tech.slug} className={ITEM_CLASSES}>
                    <TechIcon id={tech.slug} className={ICON_CLASSES} />
                    <span className={NAME_CLASSES}>{tech.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            );
          },
        )}
      </div>

      {/* Solo en `full`: la variante compacta de la home es una fila plana y
          un bloque titulado romperia esa lectura de un vistazo. */}
      {methodologies.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-3 text-sm font-medium text-foreground">
            {t("methodologies")}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {methodologies.map((methodology) => (
              <Pill key={methodology} as="li">
                {methodology}
              </Pill>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
