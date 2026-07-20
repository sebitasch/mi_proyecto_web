import { getLocale, getTranslations } from "next-intl/server";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const tl = await getTranslations("language");
  const locale = (await getLocale()) as Locale;

  const languageLabels = {
    label: tl("label"),
    toEs: tl("toEs"),
    toEn: tl("toEn"),
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-6">
          <nav
            aria-label={t("primary")}
            className="hidden items-center gap-6 text-sm sm:flex"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted transition-colors duration-[var(--dur-1)] ease-out-soft hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Visible en todos los tamanos: es un desplegable compacto
              (planeta + codigo), asi que cabe junto al boton de menu. */}
          <LanguageSwitcher current={locale} labels={languageLabels} />

          {/*
            Las etiquetas van como props y NO con useTranslations dentro de
            MobileNav: un Client Component que traduce por su cuenta obliga al
            provider a cargar el formateador ICU, y eso suma ~11 kB de JS a
            TODAS las rutas. Para unos pocos strings no compensa.
          */}
          <MobileNav
            items={siteConfig.nav.map((item) => ({
              href: item.href,
              label: t(item.key),
            }))}
            primaryLabel={t("primary")}
            openLabel={t("openMenu")}
            closeLabel={t("closeMenu")}
          />
        </div>
      </div>
    </header>
  );
}
