import { Braces, GitBranch } from "lucide-react";
import type { Metadata } from "next";

import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { TechStack } from "@/components/TechStack";
import { getAbout } from "@/data";
import { ABOUT_FACT_KEYS } from "@/data/about";
import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Sobre mí",
};

export default async function SobreMiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const about = getAbout(locale as Locale);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-2xl font-semibold text-foreground sm:text-[30px]">
        {t("pageTitle")}
      </h1>

      {/* Pares etiqueta/valor: `dl` en vez de divs, para que un lector de
          pantalla anuncie la relacion entre cada dato y su rotulo. Sin
          encabezado propio: es metadato del h1, no una seccion aparte. */}
      <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-y border-border-subtle py-5">
        {ABOUT_FACT_KEYS.map((key) => about.facts[key]).map((fact) => (
          <div key={fact.label}>
            <dt className="text-xs font-medium uppercase tracking-wider text-accent">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm text-foreground">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-col gap-4">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <GitBranch className="h-5 w-5 text-accent" aria-hidden="true" />
          {t("experience")}
        </h2>
        <div className="mt-6">
          <ExperienceTimeline />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Braces className="h-5 w-5 text-accent" aria-hidden="true" />
          {t("stack")}
        </h2>
        <div className="mt-6">
          <TechStack variant="full" />
        </div>
      </section>
    </div>
  );
}
