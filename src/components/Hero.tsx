import { ArrowRight, SquareCode, BadgeCheck } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { Pill } from "@/components/ui/Pill";
import { siteConfig } from "@/config/site";
import { heroCodeLine } from "@/data/about";
import { getAbout } from "@/data";
import { notableClients } from "@/data/experience";
import type { Locale } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";

export async function Hero() {
  const t = await getTranslations("hero");
  const ta = await getTranslations("about");
  const locale = (await getLocale()) as Locale;
  const about = getAbout(locale);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28"
    >
      <HeroBackdrop />

      {/* role label */}
      <p
        className="animate-fade-up text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm"
        style={{ animationDelay: "calc(0 * var(--stagger-step))" }}
      >
        {siteConfig.role}
      </p>

      {/* name/title (H1) */}
      <h1
        id="hero-title"
        className="mt-4 animate-fade-up text-4xl font-semibold font-display leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        style={{ animationDelay: "calc(1 * var(--stagger-step))" }}
      >
        {siteConfig.name}
      </h1>

      {/* value proposition / tagline + location */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "calc(2 * var(--stagger-step))" }}
      >
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl lg:text-2xl">
          {about.tagline}
        </p>
        <p className="mt-3 text-sm text-muted">{siteConfig.location.display}</p>
      </div>

      {/* decorative "code line" chip, wipe-in animated */}
      <p
        aria-hidden="true"
        className="mt-6 inline-flex animate-wipe-in items-center gap-2 rounded-lg border border-border-subtle bg-accent-soft/40 px-3 py-2 text-sm text-muted"
      >
        <SquareCode className="h-4 w-4 shrink-0 text-accent" />
        <span className="whitespace-nowrap">{heroCodeLine}</span>
      </p>

      {/* CTAs */}
      <div
        className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
        style={{ animationDelay: "calc(3 * var(--stagger-step))" }}
      >
        <Button href="#proyectos" variant="solid">
          {t("viewProjects")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button href="" variant="outline" aria-label={t("downloadCv")}>
          {t("downloadCv")}
        </Button>
      </div>

      {/* credibility strip: experience, clients, availability */}
      <ul
        className="mt-8 flex animate-fade-up flex-wrap gap-3"
        aria-label={t("credibility")}
        style={{ animationDelay: "calc(4 * var(--stagger-step))" }}
      >
        <li>
          <Pill className="inline-flex items-center gap-1.5">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {about.facts.experience.value}
          </Pill>
        </li>
        <li>
          <Pill>
            <span className="font-medium">{ta("clients")}</span>{" "}
            {notableClients.join(" · ")}
          </Pill>
        </li>
        <li>
          <Pill className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            {t("availability")}
          </Pill>
        </li>
      </ul>
    </section>
  );
}
