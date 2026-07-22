import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { getContact } from "@/data";
import { CONTACT_DETAIL_KEYS, contactSubjectOptions } from "@/data/contact";
import type { Locale } from "@/i18n/routing";
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
  const contact = getContact(locale as Locale);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-2xl font-semibold font-display leading-tight text-foreground sm:text-[30px]">
        {contact.headline}
      </h1>

      {/*
        La copy del formulario se resuelve aqui, en el servidor, y baja como prop.
        Se probo con NextIntlClientProvider acotado y useTranslations dentro del form:
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

      <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-5 rounded-xl border border-border-subtle shadow-sm p-6 sm:grid-cols-2">
        {CONTACT_DETAIL_KEYS.map((key) => {
          const detail = contact.details[key];
          return (
            <div key={key}>
              <dt className="text-xs font-medium uppercase tracking-wider text-accent">
                {detail.label}
              </dt>
              <dd className="mt-1 text-sm text-foreground">{detail.value}</dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-12 border-t border-border-subtle pt-12 flex flex-col gap-4">
        {contact.body.map((paragraph) => (
          <p
            key={paragraph}
            className="leading-relaxed text-muted text-justify hyphens-auto"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
