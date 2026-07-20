import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/Button";
import { TechIcon } from "@/components/ui/TechIcon";
import { siteConfig, socialLinks } from "@/config/site";
import { contactBody, contactDetails, contactHeadline, contactSubjectOptions } from "@/data/contact";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Contacto",
};

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tf = await getTranslations("contactForm");

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

      {/*
        La copy se resuelve aqui, en el servidor, y baja como prop. Se probo
        con NextIntlClientProvider acotado y useTranslations dentro del form:
        costaba ~11 kB de JS en TODAS las rutas, porque el provider del layout
        pasa a incluir el formateador ICU. Para 15 strings no compensa.
      */}
      <div className="mt-10">
        <ContactForm
          locale={locale}
          copy={{
            heading: tf("heading"),
            requiredNote: tf("requiredNote"),
            submitIdle: tf("submitIdle"),
            submitPending: tf("submitPending"),
            success: tf("success"),
            successReset: tf("successReset"),
            error: tf("error"),
            fieldRequired: tf("fieldRequired"),
            emailInvalid: tf("emailInvalid"),
            labels: {
              name: tf("labels.name"),
              email: tf("labels.email"),
              subject: tf("labels.subject"),
              message: tf("labels.message"),
            },
            subjects: Object.fromEntries(
              contactSubjectOptions.map((option) => [
                option.id,
                tf(`subjects.${option.id}`),
              ]),
            ),
          }}
        />
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
