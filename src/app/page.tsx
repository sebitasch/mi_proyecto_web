import { ContactCta } from "@/components/ContactCta";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Hero } from "@/components/Hero";
import { CursorField } from "@/components/motion/CursorField";
import { TechStack } from "@/components/TechStack";

export default function HomePage() {
  return (
    <>
      {/* CursorField es cliente, pero <Hero /> se le pasa como children ya
          renderizado en servidor: no se convierte en Client Component. */}
      <CursorField>
        <Hero />
      </CursorField>
      <FeaturedProjects />

      {/* Sin padding superior: el Hero ya aporta separacion por abajo. */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold text-foreground">Stack</h2>
          <div className="mt-6">
            <TechStack variant="compact" />
          </div>
        </div>
      </section>


      <ContactCta />
    </>
  );
}
