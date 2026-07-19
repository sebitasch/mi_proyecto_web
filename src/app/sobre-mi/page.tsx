import type { Metadata } from "next";

import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { TechStack } from "@/components/TechStack";
import { about, aboutFacts } from "@/data/about";

export const metadata: Metadata = {
  title: "Sobre mí",
};

export default function SobreMiPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-2xl font-semibold text-foreground sm:text-[30px]">
        Sobre mí
      </h1>

      {/* Pares etiqueta/valor: `dl` en vez de divs, para que un lector de
          pantalla anuncie la relacion entre cada dato y su rotulo. Sin
          encabezado propio: es metadato del h1, no una seccion aparte. */}
      <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-y border-border-subtle py-5">
        {aboutFacts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-xs font-medium uppercase tracking-wider text-accent">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm text-foreground">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-col gap-4">
        {about.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-foreground">Experiencia</h2>
        <div className="mt-6">
          <ExperienceTimeline />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-foreground">Stack</h2>
        <div className="mt-6">
          <TechStack variant="full" />
        </div>
      </section>
    </div>
  );
}
