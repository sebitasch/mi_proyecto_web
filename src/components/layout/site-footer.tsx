import { siteConfig, socialLinks } from "@/config/site";
import { TechIcon } from "@/components/ui/TechIcon";
import { getTranslations } from "next-intl/server";

const footerLinks = socialLinks.filter((link) => link.inFooter);

export async function SiteFooter() {
  const t = await getTranslations("footer");
  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-muted sm:text-left">
          {t("copyright", { year: new Date().getFullYear(), name: siteConfig.name })}
        </p>

        <ul className="flex items-center gap-1">
          {footerLinks.map((link) => {
            // Solo http(s) abre en pestana nueva: un mailto: con target="_blank"
            // lanza el cliente de correo y deja una pestana en blanco detras.
            const isExternal = link.href.startsWith("http");

            return (
              <li key={link.platform}>
                <a
                  href={link.href}
                  aria-label={link.ariaLabel}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 text-muted transition-colors duration-[var(--dur-1)] ease-out-soft hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.iconId ? (
                    <TechIcon id={link.iconId} className="h-5 w-5" />
                  ) : (
                    // Sin icono disponible: se degrada a texto en vez de
                    // dejar un area clicable invisible.
                    <span className="text-xs font-medium">{link.label}</span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
