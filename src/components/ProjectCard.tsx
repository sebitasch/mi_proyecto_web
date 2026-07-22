import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/types";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

const MAX_VISIBLE_TAGS = 4;

interface ProjectCardProps {
  project: Project;
  headingLevel: "h3" | "h4";
  /** La home no agrupa por cliente y necesita mostrarlo en la card. */
  showClient?: boolean;
  /**
   * Tratamiento destacado: mas aire y tipografia mayor. Es un prop y no un
   * componente aparte para que exista UNA sola card; duplicarla significaria
   * arreglar cada bug dos veces.
   *
   * No controla el badge: ese depende de `kind`, para que una card freelance
   * se lea como tal aparezca donde aparezca.
   */
  emphasis?: boolean;
}

export async function ProjectCard({
  project,
  headingLevel: Heading,
  showClient = false,
  emphasis = false,
}: ProjectCardProps) {
  const t = await getTranslations("projects");
  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS);
  const remainingTags = project.tags.length - visibleTags.length;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-xl border border-border-subtle transition-colors duration-[var(--dur-1)] ease-out-soft hover:border-accent",
        emphasis ? "shadow-md" : "shadow-sm",
      )}
    >
      <div className="relative aspect-[1200/630]">
        <Image
          src={project.image}
          alt=""
          fill
          unoptimized
          className="rounded-t-xl object-cover"
          sizes="(min-width: 640px) 50vw, 100vw"
        />

        {/* El badge cuelga del `kind`, no de `emphasis`: describe lo que es el
            proyecto, no como se esta mostrando. */}
        {project.kind === "freelance" && (
          <span className="absolute left-3 top-3 rounded-lg bg-accent px-2.5 py-1 text-xs font-medium text-white shadow-sm">
            {t("freelanceBadge")}
          </span>
        )}
      </div>

      <div className={cn("flex flex-col gap-2", emphasis ? "p-6 sm:p-7" : "p-5")}>
        <p className="text-xs text-muted">{project.year}</p>

        <Heading
          className={cn(
            "text-foreground",
            emphasis ? "text-lg font-semibold sm:text-xl" : "text-base font-medium",
          )}
        >
          {/* Stretched link: el ::after cubre la card entera, asi el texto
              sigue siendo seleccionable y solo hay un objetivo de foco. */}
          <Link
            href={{
              pathname: "/proyectos/[slug]",
              params: { slug: project.slug },
            }}
            className="after:absolute after:inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {project.title}
          </Link>
        </Heading>

        {showClient && <p className="text-sm text-muted">{project.client}</p>}

        <p
          className={cn(
            "leading-relaxed text-muted text-justify hyphens-auto",
            emphasis ? "text-base" : "text-sm",
          )}
        >
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-2" aria-label={t("technologies")}>
          {visibleTags.map((tag) => (
            <Pill key={tag} as="li">
              {tag}
            </Pill>
          ))}
          {remainingTags > 0 && (
            <li className="rounded-lg border border-border-subtle bg-background px-3 py-1 text-sm font-medium text-muted">
              {/* El texto visible y el accesible van separados a proposito:
                  " tecnologias mas" solo tiene sentido pegado al "+4", y en
                  ingles el orden de las palabras cambia. Frase completa. */}
              <span aria-hidden="true">+{remainingTags}</span>
              <span className="sr-only">
                {t("moreTechnologies", { count: remainingTags })}
              </span>
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
            {t("viewProject")}
            <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
            <span className="sr-only">
              {t("opensInNewTab", { title: project.title })}
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
