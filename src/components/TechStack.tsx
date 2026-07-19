import { stack } from "@/data/stack";
import type { Tech, TechCategory } from "@/types";
import { TechIcon } from "@/components/ui/TechIcon";

const CATEGORY_ORDER: TechCategory[] = [
  "frontend",
  "lenguaje",
  "herramienta",
  "cloud",
  "ia",
];

const CATEGORY_LABELS: Record<TechCategory, string> = {
  frontend: "Frontend",
  lenguaje: "Lenguajes",
  herramienta: "Herramientas",
  cloud: "Cloud",
  ia: "IA",
};

function groupByCategory(items: Tech[]): Record<TechCategory, Tech[]> {
  return items.reduce(
    (groups, item) => {
      groups[item.category].push(item);
      return groups;
    },
    { frontend: [], lenguaje: [], herramienta: [], cloud: [], ia: [] } as Record<
      TechCategory,
      Tech[]
    >,
  );
}

const ITEM_CLASSES = "group flex items-center gap-2";
const ICON_CLASSES =
  "h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-accent";
const NAME_CLASSES = "text-sm text-muted transition-colors group-hover:text-accent";

interface TechStackProps {
  /**
   * `full` agrupa por categoria con encabezados; `compact` es una fila plana
   * sin agrupar, para resumir el stack sin repetir la vista de /sobre-mi.
   */
  variant?: "full" | "compact";
}

export function TechStack({ variant = "full" }: TechStackProps) {
  if (variant === "compact") {
    return (
      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {stack.map((tech) => (
          <li key={tech.slug} className={ITEM_CLASSES}>
            <TechIcon path={tech.path} className={ICON_CLASSES} />
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
          (category) => (
            <div key={category}>
              <h2 className="mb-3 text-sm font-medium text-foreground">
                {CATEGORY_LABELS[category]}
              </h2>
              <ul className="flex flex-col gap-2">
                {grouped[category].map((tech) => (
                  <li key={tech.slug} className={ITEM_CLASSES}>
                    <TechIcon path={tech.path} className={ICON_CLASSES} />
                    <span className={NAME_CLASSES}>{tech.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
