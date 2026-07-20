import { ContactCta } from "@/components/ContactCta";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { FreelanceProjects } from "@/components/FreelanceProjects";
import { Hero } from "@/components/Hero";
import { CursorField } from "@/components/motion/CursorField";
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
      {/* CursorField es cliente, pero <Hero /> se le pasa como children ya
          renderizado en servidor: no se convierte en Client Component. */}
      <CursorField>
        <Hero />
      </CursorField>

      {/* Freelance primero y destacado, en adelanto: solo los marcados como
          featured. Si no hay ninguno no renderiza nada. */}
      <FreelanceProjects
        className="border-t border-border-subtle py-16 sm:py-20"
        containerClassName="mx-auto max-w-5xl px-6"
        featuredOnly
      />

      <FeaturedProjects />

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
