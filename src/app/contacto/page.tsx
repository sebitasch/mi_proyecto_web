import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { contactDetails, contactIntro } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contacto",
};

export default function ContactoPage() {
  const email = siteConfig.links.email.replace("mailto:", "");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-2xl font-semibold text-foreground">Contacto</h1>

      <p className="mt-4 max-w-xl leading-relaxed text-muted">{contactIntro}</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button href={siteConfig.links.email}>Escríbeme por email</Button>
        <Button
          href={siteConfig.links.github}
          variant="outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver GitHub
        </Button>
      </div>

      <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-5 rounded-xl border border-border-subtle p-6 sm:grid-cols-2">
        {contactDetails.map((detail) => (
          <div key={detail.label}>
            <dt className="text-xs font-medium uppercase tracking-wider text-accent">
              {detail.label}
            </dt>
            <dd className="mt-1 text-sm text-foreground">{detail.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 text-sm text-muted">
        También puedes escribirme directamente a{" "}
        <a
          href={siteConfig.links.email}
          className="text-accent underline underline-offset-4 transition-colors hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {email}
        </a>
        .
      </p>
    </div>
  );
}
