import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { siteConfig } from "@/config/site";
import { heroTagline } from "@/data/about";

const STACK = ["React", "Next.js", "TypeScript"] as const;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto max-w-5xl px-6 py-20 sm:py-28"
    >
      {/* `uppercase` por CSS y no en el dato: siteConfig.role se reutiliza en
          metadata y ahi debe conservar su capitalizacion original. */}
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {siteConfig.role}
      </p>

      <h1
        id="hero-title"
        className="mt-4 text-[30px] font-semibold leading-tight tracking-tight text-foreground"
      >
        {siteConfig.name}
      </h1>

      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
        {heroTagline}
      </p>

      <p className="mt-3 text-sm text-muted">{siteConfig.location.display}</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button href="#proyectos" variant="solid">
          Ver proyectos
        </Button>
        <Button href="" variant="outline" aria-label="Descargar CV">
          Descargar CV
        </Button>
      </div>

      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Stack principal">
        {STACK.map((tech) => (
          <Pill key={tech} as="li">
            {tech}
          </Pill>
        ))}
      </ul>
    </section>
  );
}
