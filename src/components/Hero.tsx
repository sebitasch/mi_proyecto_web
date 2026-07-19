import Link from "next/link";

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
        <Link
          href="#proyectos"
          className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Ver proyectos
        </Link>
        <Link
          href=""
          aria-label="Descargar CV"
          className="inline-flex items-center justify-center rounded-lg border border-border-subtle px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Descargar CV
        </Link>
      </div>

      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Stack principal">
        {STACK.map((tech) => (
          <li
            key={tech}
            className="rounded-lg bg-accent-soft px-3 py-1 text-sm font-medium text-accent"
          >
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}
