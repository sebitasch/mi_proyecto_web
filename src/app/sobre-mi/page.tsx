import type { Metadata } from "next";
import { about } from "@/data/about";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { TechStack } from "@/components/TechStack";

export const metadata: Metadata = {
  title: "Sobre mí",
};

export default function SobreMiPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-2xl font-semibold text-foreground">Sobre mí</h1>

      <div className="mt-6 flex flex-col gap-4">
        {about.map((paragraph, index) => (
          <p key={index} className="leading-relaxed text-muted">
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
          <TechStack />
        </div>
      </section>
    </div>
  );
}
