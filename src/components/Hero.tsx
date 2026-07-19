import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

const STACK = ["React", "Next.js", "TypeScript"] as const;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto max-w-5xl px-6 py-20 sm:py-28"
    >
      <p className="text-xs font-semibold tracking-[0.18em] text-accent">
        FRONTEND / FULLSTACK DEVELOPER
      </p>

      <h1
        id="hero-title"
        className="mt-4 text-[30px] font-semibold leading-tight tracking-tight text-foreground"
      >
        Sebas
      </h1>

      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
        Construyo interfaces React/Next.js escalables — de microfrontends a APIs
        bien documentadas.
      </p>

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
