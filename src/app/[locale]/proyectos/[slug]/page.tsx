import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";

import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/motion/Reveal";
import { getProjects } from "@/data";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

interface ProyectoPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export function generateStaticParams() {
  // locale lo aporta el layout padre; aqui solo los slugs.
  return getProjects(routing.defaultLocale).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProyectoPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProjects(locale as Locale).find((item) => item.slug === slug);

  if (!project) return {};

  return { title: project.title, description: project.description };
}

export default async function ProyectoPage({ params }: ProyectoPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  const project = getProjects(locale as Locale).find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/proyectos"
        className="text-sm text-accent transition-colors duration-[var(--dur-1)] ease-out-soft hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {t("backToProjects")}
      </Link>

      <p className="mt-8 text-sm text-muted">
        {project.client} · {project.year}
      </p>

      <h1 className="mt-2 text-2xl font-semibold font-display leading-tight text-foreground sm:text-[30px]">
        {project.title}
      </h1>

      <p className="mt-4 leading-relaxed text-muted sm:text-justify sm:hyphens-auto">{project.description}</p>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label={t("technologies")}>
        {project.tags.map((tag) => (
          <Pill key={tag} as="li">
            {tag}
          </Pill>
        ))}
      </ul>

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

      <Reveal as="section" className="mt-12">
        <h2 className="text-lg font-semibold font-display text-foreground">{t("context")}</h2>
        <p className="mt-3 leading-relaxed text-muted sm:text-justify sm:hyphens-auto">{project.context}</p>
      </Reveal>

      <Reveal as="section" className="mt-10">
        <h2 className="text-lg font-semibold font-display text-foreground">{t("approach")}</h2>
        <p className="mt-3 leading-relaxed text-muted sm:text-justify sm:hyphens-auto">{project.approach}</p>
      </Reveal>

      {project.impact.length > 0 && (
        <Reveal as="section" className="mt-10">
          <h2 className="text-lg font-semibold font-display text-foreground">{t("impact")}</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {project.impact.map((item) => (
              <li
                key={item}
                className="relative pl-5 leading-relaxed text-muted before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {project.url && (
        <div className="mt-12">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-border-subtle px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-[var(--dur-1)] ease-out-soft hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t("viewProject")}
            <span className="sr-only">
              {t("opensInNewTab", { title: project.title })}
            </span>
          </a>
        </div>
      )}
    </article>
  );
}
