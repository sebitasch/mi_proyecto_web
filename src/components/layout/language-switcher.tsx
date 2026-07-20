"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState, type ComponentProps } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LinkHref = ComponentProps<typeof Link>["href"];

const LOCALE_NAMES: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

const LOCALE_FULL_NAMES: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

interface LanguageSwitcherProps {
  /** Idioma activo, resuelto en el servidor. */
  current: Locale;
  /** Traducidos por SiteHeader: este componente no traduce. */
  labels: {
    label: string;
    toEs: string;
    toEn: string;
  };
  className?: string;
}

/**
 * Desplegable de idioma que conserva la página actual.
 *
 * NO es un `<select>` nativo a propósito: un select para navegar es un
 * antipatrón de accesibilidad — en varios navegadores moverse con las flechas
 * dispara el cambio antes de confirmar, y un lector de pantalla no puede
 * previsualizar los destinos. Aquí es un botón de divulgación que abre una
 * lista de enlaces reales, así que además funcionan el clic central y
 * "abrir en pestaña nueva".
 *
 * Es Client Component por una razón concreta: para ir de /es/proyectos a
 * /en/projects —y no a la home— hay que conocer la ruta actual. `usePathname`
 * de `@/i18n/navigation` devuelve la ruta INTERNA (`/proyectos/[slug]`) y
 * `useParams` aporta el slug.
 *
 * No usa `useTranslations`: cualquier Client Component que traduzca obliga al
 * provider del layout a cargar el formateador ICU, y eso suma ~11 kB de JS a
 * todas las rutas.
 */
export function LanguageSwitcher({
  current,
  labels,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    // Cerrar al pulsar fuera. `pointerdown` y no `click`: se dispara antes de
    // que el navegador siga un enlace, asi que el panel no queda abierto
    // durante la navegacion.
    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="language-menu"
        aria-label={labels.label}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-muted transition-colors duration-[var(--dur-1)] ease-out-soft hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
        {LOCALE_NAMES[current]}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform duration-[var(--dur-1)] ease-out-soft",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          id="language-menu"
          className="absolute right-0 top-full z-50 mt-1 min-w-40 overflow-hidden rounded-lg border border-border-subtle bg-background py-1 shadow-lg"
        >
          {routing.locales.map((locale) => {
            const isActive = locale === current;

            return (
              <li key={locale}>
                <Link
                  /*
                    El pathname interno + los params reconstruyen la MISMA
                    pagina en el otro idioma, con su segmento traducido.

                    El cast es acotado: `useParams` devuelve un record
                    generico y next-intl exige que encaje con el pathname
                    concreto. En runtime siempre encajan, porque ambos salen
                    de la ruta que se esta renderizando.
                  */
                  href={{ pathname, params } as LinkHref}
                  locale={locale}
                  aria-label={locale === "es" ? labels.toEs : labels.toEn}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex min-h-11 items-center justify-between gap-3 px-3 text-sm transition-colors duration-[var(--dur-1)] ease-out-soft hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
                    isActive ? "font-medium text-foreground" : "text-muted",
                  )}
                >
                  {LOCALE_FULL_NAMES[locale]}
                  {isActive && (
                    <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
