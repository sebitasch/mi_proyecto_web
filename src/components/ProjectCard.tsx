import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

interface ProjectCardProps {
  project: Project;
  headingLevel: "h2" | "h3";
}

export function ProjectCard({ project, headingLevel: Heading }: ProjectCardProps) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-border-subtle transition-colors hover:border-accent">
      {project.image && (
        <div className="relative aspect-[1200/630]">
          <Image
            src={project.image}
            alt=""
            fill
            unoptimized
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 p-5">
        <Heading className="text-lg font-semibold text-foreground">
          <Link
            href={`/proyectos/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {project.title}
          </Link>
        </Heading>

        <p className="text-sm leading-relaxed text-muted">{project.description}</p>

        <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
          {project.tags.map((tag) => (
            <Pill key={tag} as="li">
              {tag}
            </Pill>
          ))}
        </ul>

        <p className="text-xs text-muted">{project.year}</p>

        {/* z-10 eleva los botones sobre el overlay del stretched link del
            heading; sin esto se ven pero no reciben clics. */}
        {(project.repoUrl || project.liveUrl) && (
          <div className="relative z-10 flex flex-wrap gap-3">
            {project.repoUrl && (
              <Button href={project.repoUrl} variant="outline">
                Repositorio
              </Button>
            )}
            {project.liveUrl && (
              <Button href={project.liveUrl} variant="outline">
                Demo
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
