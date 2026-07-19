import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Proyectos",
};

export default function ProyectosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <h1 className="text-2xl font-semibold text-foreground">Proyectos</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} headingLevel="h2" />
        ))}
      </div>
    </div>
  );
}
