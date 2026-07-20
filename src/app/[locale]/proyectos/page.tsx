import type { Metadata } from "next";
import { FreelanceProjects } from "@/components/FreelanceProjects";
import { ProjectsByClient } from "@/components/ProjectsByClient";
import { getTranslations, setRequestLocale } from "next-intl/server";

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

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-2xl font-semibold font-display text-foreground">{t("pageTitle")}</h1>

      {/* Freelance primero y destacado. Si no hay ninguno no renderiza nada,
          y la experiencia corporativa queda como primer bloque. */}
      <FreelanceProjects className="mt-12 border-t border-border-subtle pt-12" />

      {/* Mas sobrio a proposito: encabezado menor y peso mas ligero que el
          de freelance, para que la jerarquia entre bloques se lea sola. */}
      <section className="mt-12 border-t border-border-subtle pt-12">
        <h2 className="text-xl font-medium font-display text-foreground">
          {t("corporateExperience")}
        </h2>

        <div className="mt-8">
          <ProjectsByClient />
        </div>
      </section>
    </div>
  );
}
