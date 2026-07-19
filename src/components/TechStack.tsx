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

export function TechStack() {
  const grouped = groupByCategory(stack);

  return (
    <section>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORY_ORDER.filter((category) => grouped[category].length > 0).map(
          (category) => (
            <div key={category}>
              <h2 className="mb-3 text-sm font-medium text-foreground">
                {CATEGORY_LABELS[category]}
              </h2>
              <ul className="flex flex-col gap-2">
                {grouped[category].map((tech) => (
                  <li key={tech.slug} className="group flex items-center gap-2">
                    <TechIcon
                      path={tech.path}
                      className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-accent"
                    />
                    <span className="text-sm text-muted transition-colors group-hover:text-accent">
                      {tech.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
