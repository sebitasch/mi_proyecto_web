import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { getProjects } from "@/data";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export async function FeaturedProjects() {
  const t = await getTranslations("home");
  const tp = await getTranslations("projects");
  const locale = (await getLocale()) as Locale;

  /* Solo corporativos: los freelance los muestra <FreelanceProjects> justo
     encima, y sin este filtro un freelance destacado saldria dos veces. */
  const featuredProjects = getProjects(locale).filter(
    (project) => project.featured && project.kind === "corporativo",
  );

  return (
    <section id="proyectos" className="border-t border-border-subtle py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Mismo encabezado y mismo peso contenido que en /proyectos: los dos
            bloques deben leerse igual en las dos paginas. */}
        <h2 className="text-xl font-medium font-display text-foreground">
          {tp("corporateExperience")}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} index={index}>
              <ProjectCard
                project={project}
                headingLevel="h3"
                showClient
              />
            </Reveal>
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
