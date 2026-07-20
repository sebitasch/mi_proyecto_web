import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsByClient } from "@/components/ProjectsByClient";
import { getProjects } from "@/data";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Proyectos",
};

export default async function ProyectosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  const freelanceProjects = getProjects(locale as Locale).filter(
    (project) => project.kind === "freelance",
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-2xl font-semibold text-foreground">{t("pageTitle")}</h1>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          {t("corporate")}
        </h2>

        <div className="mt-8">
          <ProjectsByClient />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-xl font-semibold text-foreground">
          {t("freelance")}
        </h2>

        <div className="mt-8">
          {freelanceProjects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border-subtle p-10 text-center">
              <p className="text-sm text-muted">{t("comingSoon")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {freelanceProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  headingLevel="h3"
                  /* Freelance no se agrupa por cliente, asi que la card
                     es el unico sitio donde puede mostrarlo. */
                  showClient
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
