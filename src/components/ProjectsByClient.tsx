import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/data/projects";

interface ClientGroup {
  client: string;
  latestYear: number;
  projects: typeof projects;
}

function groupByClient(): ClientGroup[] {
  const corporateProjects = projects.filter(
    (project) => project.kind === "corporativo",
  );

  const groups = new Map<string, ClientGroup>();

  for (const project of corporateProjects) {
    const existing = groups.get(project.client);

    if (existing) {
      existing.projects.push(project);
      existing.latestYear = Math.max(existing.latestYear, project.year);
    } else {
      groups.set(project.client, {
        client: project.client,
        latestYear: project.year,
        projects: [project],
      });
    }
  }

  for (const group of groups.values()) {
    // Sin esto el orden dentro del cliente lo dicta el archivo de datos.
    group.projects.sort((a, b) => b.year - a.year);
  }

  // Desempate alfabetico cuando dos clientes comparten el ano mas reciente:
  // sin criterio explicito dependeria del orden de insercion del Map.
  return Array.from(groups.values()).sort(
    (a, b) => b.latestYear - a.latestYear || a.client.localeCompare(b.client),
  );
}

export function ProjectsByClient() {
  const groups = groupByClient();

  if (groups.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-subtle p-10 text-center">
        <p className="text-sm text-muted">Próximamente</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <div key={group.client}>
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-medium text-foreground">
              {group.client}
            </h3>
            <span className="text-sm text-muted">
              {group.projects.length === 1
                ? "1 proyecto"
                : `${group.projects.length} proyectos`}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {group.projects.map((project, index) => (
              <Reveal key={project.slug} index={index}>
                <ProjectCard project={project} headingLevel="h4" />
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
