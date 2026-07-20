import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/Button";
import { TechIcon } from "@/components/ui/TechIcon";
import { siteConfig, socialLinks } from "@/config/site";
import { contactBody, contactDetails, contactHeadline } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contacto",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-2xl font-semibold leading-tight text-foreground sm:text-[30px]">
        {contactHeadline}
      </h1>

      <div className="mt-6 flex flex-col gap-4">
        {contactBody.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-10">
        <ContactForm />
      </div>

      <ul className="mt-8 flex flex-wrap gap-3">
        {socialLinks.map((link) => {
          const isEmail = link.platform === "email";
          return (
            <li key={link.platform}>
              <Button
                href={link.href}
                variant="outline"
                size="md"
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                aria-label={link.ariaLabel}
              >
                {/* LinkedIn no tiene icono en simpleicons: se omite el svg y la
                    etiqueta visible sostiene el boton por si sola. */}
                {link.iconId && <TechIcon id={link.iconId} className="h-4 w-4" />}
                {isEmail ? siteConfig.email : link.label}
              </Button>
            </li>
          );
        })}
      </ul>

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
    </div>
  );
}
