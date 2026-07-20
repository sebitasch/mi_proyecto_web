import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/data";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export async function FeaturedProjects() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const featuredProjects = getProjects(locale).filter((p) => p.featured);

  return (
    <section id="proyectos" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-semibold text-foreground">{t("projects")}</h2>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              headingLevel="h3"
              showClient
            />
          ))}
        </div>

        <div className="mt-10">
          <Button href="/proyectos" variant="outline">
            {t("viewAllProjects")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
