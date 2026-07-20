import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { getProjects } from "@/data";
import type { Locale } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";

interface FreelanceProjectsProps {
  /**
   * Clases de la `<section>`. Cada pagina trae su propia convencion de
   * separacion (la home usa `py-*` a sangre completa, /proyectos usa `mt-*`
   * dentro de un contenedor), asi que el bloque no la impone.
   */
  className?: string;
  /**
   * Contenedor interno. Solo lo necesita la home: alli la `<section>` va a
   * sangre completa para que el borde superior cruce toda la pantalla, y el
   * ancho maximo lo pone un div de dentro. En /proyectos ese ancho ya lo
   * aporta el envoltorio de la pagina, y anidar otro `px-6` doblaria el
   * margen lateral.
   */
  containerClassName?: string;
  /** La home es un adelanto: solo los marcados como destacados. */
  featuredOnly?: boolean;
}

export async function FreelanceProjects({
  className,
  containerClassName,
  featuredOnly = false,
}: FreelanceProjectsProps) {
  const t = await getTranslations("projects");
  const locale = (await getLocale()) as Locale;

  const projects = getProjects(locale)
    .filter(
      (project) =>
        project.kind === "freelance" && (!featuredOnly || project.featured),
    )
    .sort((a, b) => b.year - a.year);

  /* Sin freelance no se renderiza NADA, ni un estado vacio: este bloque abre
     la pagina y con tratamiento destacado, y encabezar con un "proximamente"
     deja peor impresion que no mostrarlo. Devolver null tambien evita que la
     pagina se quede con una `<section>` vacia y su borde superior colgando. */
  if (projects.length === 0) return null;

  // Una sola card en una rejilla de dos columnas deja un hueco que se lee
  // como un fallo de carga: si es la unica, ocupa el ancho entero.
  const isSingle = projects.length === 1;

  const content = (
    <>
      <h2 className="text-2xl font-semibold font-display text-foreground sm:text-3xl">
        {t("freelance")}
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal
            key={project.slug}
            index={index}
            className={isSingle ? "sm:col-span-2" : undefined}
          >
            <ProjectCard
              project={project}
              headingLevel="h3"
              emphasis
              showClient
            />
          </Reveal>
        ))}
      </div>
    </>
  );

  return (
    <section className={className}>
      {containerClassName ? (
        <div className={containerClassName}>{content}</div>
      ) : (
        content
      )}
    </section>
  );
}
