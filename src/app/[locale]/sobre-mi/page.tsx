import { Braces, GitBranch } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { portraitPhoto, portraitSize } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
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
      {/* La foto va junto al h1 y los datos de cabecera, no sobre ellos: en
          movil se apila y en pantalla ancha comparte fila. */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        {portraitPhoto && (
          <Image
            src={portraitPhoto}
            alt={t("photoAlt")}
            width={portraitSize.width}
            height={portraitSize.height}
            priority
            /* Translucida a proposito, para que no compita con el texto. El
               anillo sustituye a la sombra: una sombra bajo una imagen
               semitransparente se lee como un error de render, no como
               relieve. Ambos se atenuan juntos porque `opacity` afecta al
               elemento entero, anillo incluido.

               Vuelve a opacidad plena al pasar por encima: asi cede
               protagonismo en la lectura pero se ve completa cuando alguien
               se fija. En tactil no hay hover y se queda atenuada. */
            className="h-40 w-40 shrink-0 rounded-full object-cover opacity-80 ring-1 ring-border-subtle transition-opacity duration-[var(--dur-2)] ease-out-soft hover:opacity-100 sm:h-48 sm:w-48"
          />
        )}

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold font-display text-foreground sm:text-[30px]">
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
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-muted text-justify hyphens-auto">
            {paragraph}
          </p>
        ))}
      </div>

      <Reveal as="section" className="mt-12 border-t border-border-subtle pt-12">
        <h2 className="flex items-center gap-2 text-lg font-semibold font-display text-foreground">
          <GitBranch className="h-5 w-5 text-accent" aria-hidden="true" />
          {t("experience")}
        </h2>
        <div className="mt-6">
          <ExperienceTimeline />
        </div>
      </Reveal>

      <Reveal as="section" className="mt-12 border-t border-border-subtle pt-12">
        <h2 className="flex items-center gap-2 text-lg font-semibold font-display text-foreground">
          <Braces className="h-5 w-5 text-accent" aria-hidden="true" />
          {t("stack")}
        </h2>
        <div className="mt-6">
          <TechStack variant="full" />
        </div>
      </Reveal>
    </div>
  );
}
