import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { projects } from "@/data/projects";

interface ProyectoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProyectoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProyectoPage({ params }: ProyectoPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/proyectos"
        className="text-sm text-accent transition-colors hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Volver a proyectos
      </Link>

      <h1 className="mt-8 text-[30px] font-semibold leading-tight tracking-tight text-foreground">
        {project.title}
      </h1>

      <p className="mt-3 text-sm text-muted">
        {project.role} · {project.year}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías">
        {project.tags.map((tag) => (
          <Pill key={tag} as="li">
            {tag}
          </Pill>
        ))}
      </ul>

      {project.image && (
        <div className="relative mt-10 aspect-[1200/630] overflow-hidden rounded-xl border border-border-subtle">
          <Image
            src={project.image}
            alt=""
            fill
            unoptimized
            className="object-cover"
            sizes="(min-width: 768px) 768px, 100vw"
          />
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-foreground">Contexto</h2>
        <p className="mt-3 leading-relaxed text-muted">{project.problem}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Enfoque</h2>
        <p className="mt-3 leading-relaxed text-muted">{project.solution}</p>
      </section>

      {project.highlights.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">Impacto</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="relative pl-5 leading-relaxed text-muted before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(project.repoUrl || project.liveUrl) && (
        <div className="mt-12 flex flex-wrap gap-3">
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
    </article>
  );
}
