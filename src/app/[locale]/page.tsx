import { ContactCta } from "@/components/ContactCta";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { FreelanceProjects } from "@/components/FreelanceProjects";
import { Hero } from "@/components/Hero";
import { HeroAmbience } from "@/components/motion/HeroAmbience";
import { TechStack } from "@/components/TechStack";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <HeroAmbience>
        <Hero />
      </HeroAmbience>

      {/*
        El ancla del CTA del hero va en este envoltorio y no en una de las dos
        secciones: asi cae siempre en el primer bloque de proyectos que exista.
        Puesta en <FreelanceProjects> se quedaria apuntando a nada el dia que
        no haya freelance, porque ese bloque devuelve null.
      */}
      <div id="proyectos">
        {/* Freelance primero y destacado, en adelanto: solo los marcados como
            featured. Si no hay ninguno no renderiza nada. */}
        <FreelanceProjects
          className="border-t border-border-subtle py-16 sm:py-20"
          containerClassName="mx-auto max-w-5xl px-6"
          featuredOnly
        />

        <FeaturedProjects />
      </div>

      <section className="border-t border-border-subtle py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold font-display text-foreground">{t("stack")}</h2>
          <div className="mt-6">
            <TechStack variant="compact" />
          </div>
        </div>
      </section>


      <ContactCta />
    </>
  );
}
