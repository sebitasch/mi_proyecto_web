import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section id="proyectos" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-semibold text-foreground">Proyectos</h2>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} headingLevel="h3" />
          ))}
        </div>

        <div className="mt-10">
          <Button href="/proyectos" variant="outline">
            Ver todos los proyectos
          </Button>
        </div>
      </div>
    </section>
  );
}
