import { getExperience } from "@/data";
import { Reveal } from "@/components/motion/Reveal";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Pill } from "@/components/ui/Pill";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export async function ExperienceTimeline() {
  const t = await getTranslations("about");
  const locale = (await getLocale()) as Locale;
  return (
    <ol className="flex flex-col gap-10">
      {/* La key NO debe contener `company`: React serializa las keys en el
          payload RSC incrustado en el HTML, asi que un puesto confidencial
          filtraria el nombre por codigo fuente aunque nunca se renderice. */}
      {getExperience(locale).map((entry, index) => (
        <Reveal as="li" key={entry.id} index={index}>
          <h3 className="text-base font-semibold text-foreground">
            {entry.role}
          </h3>

          {/* El logo solo acompana a la empresa cuando NO es confidencial:
              un logotipo identifica igual de bien que el nombre, asi que
              pintarlo ahi filtraria lo mismo que se esta ocultando. */}
          {entry.confidential ? (
            <p className="mt-0.5 text-sm text-muted">
              {t("confidentialCompany")}
            </p>
          ) : (
            <p className="mt-1 flex items-center gap-2 text-sm text-muted">
              <BrandLogo name={entry.company} className="h-5 w-auto object-contain" />
              {entry.company}
            </p>
          )}

          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-justify sm:hyphens-auto">
            {entry.summary}
          </p>

          {entry.highlights.length > 0 && (
            <ul className="mt-3 flex flex-col gap-2">
              {entry.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          {/* Los clientes se omiten en puestos confidenciales: nombrarlos
              filtraria datos de cliente y puede delatar a la propia empresa. */}
          {!entry.confidential && entry.clients && entry.clients.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
              <span className="font-medium text-foreground">{t("clients")}</span>
              {/* Ya no es un `join`: cada cliente necesita su propio nodo para
                  poder llevar el logo delante. */}
              {entry.clients.map((client) => (
                <span key={client} className="flex items-center gap-2">
                  <BrandLogo name={client} className="h-5 w-auto object-contain" />
                  {client}
                </span>
              ))}
            </div>
          )}

          <ul className="mt-4 flex flex-wrap gap-2">
            {entry.stack.map((tech) => (
              <Pill key={tech} as="li">
                {tech}
              </Pill>
            ))}
          </ul>
        </Reveal>
      ))}
    </ol>
  );
}
