import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";
import { Pill } from "@/components/ui/Pill";

const MAX_VISIBLE_TAGS = 4;

interface ProjectCardProps {
  project: Project;
  headingLevel: "h3" | "h4";
  /** La home no agrupa por cliente y necesita mostrarlo en la card. */
  showClient?: boolean;
}

export function ProjectCard({
  project,
  headingLevel: Heading,
  showClient = false,
}: ProjectCardProps) {
  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS);
  const remainingTags = project.tags.length - visibleTags.length;

  return (
    <article className="relative overflow-hidden rounded-xl border border-border-subtle transition-colors duration-[var(--dur-1)] ease-out-soft hover:border-accent">
      <div className="relative aspect-[1200/630]">
        <Image
          src={project.image}
          alt=""
          fill
          unoptimized
          className="rounded-t-xl object-cover"
          sizes="(min-width: 640px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-col gap-2 p-5">
        <p className="text-xs text-muted">{project.year}</p>

        <Heading className="text-base font-medium text-foreground">
          {/* Stretched link: el ::after cubre la card entera, asi el texto
              sigue siendo seleccionable y solo hay un objetivo de foco. */}
          <Link
            href={`/proyectos/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {project.title}
          </Link>
        </Heading>

        {showClient && <p className="text-sm text-muted">{project.client}</p>}

        <p className="text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
          {visibleTags.map((tag) => (
            <Pill key={tag} as="li">
              {tag}
            </Pill>
          ))}
          {remainingTags > 0 && (
            <li className="rounded-lg border border-border-subtle bg-background px-3 py-1 text-sm font-medium text-muted">
              {/* Sin el sr-only un lector de pantalla anuncia solo "+4". */}
              +{remainingTags}
              <span className="sr-only"> tecnologías más</span>
            </li>
          )}
        </ul>

        {/* Solo los proyectos freelance traen enlace publico. */}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            /* relative z-10: sin esto queda bajo el overlay del stretched
               link del heading y se ve pero no recibe clics. */
            className="relative z-10 mt-1 inline-flex w-fit items-center text-sm font-medium text-accent transition-colors duration-[var(--dur-1)] ease-out-soft hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Ver proyecto
            <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> {project.title} (se abre en una pestaña nueva)</span>
          </a>
        )}
      </div>
    </article>
  );
}
