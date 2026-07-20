"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { contactFormCopy, contactSubjectOptions } from "@/data/contact";

type FieldName = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface Web3FormsResponse {
  success: boolean;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sin padding horizontal: lo aporta FIELD_PADDING. El `select` necesita hueco
 * a la derecha para su chevron, y `px-3.5` junto a `pr-9` competirian por
 * `padding-right` — `cn` concatena sin resolver conflictos, asi que ganaria
 * el orden de la hoja de estilos, no el del atributo.
 */
const FIELD_BASE =
  "h-11 w-full rounded-lg bg-background text-sm transition-colors duration-[var(--dur-1)] ease-out-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60";

const FIELD_PADDING = {
  default: "px-3.5",
  select: "pl-3.5 pr-9",
};

/** Orden de tabulacion: define a que campo se lleva el foco al fallar. */
const FIELD_ORDER: FieldName[] = ["name", "email", "subject", "message"];

/**
 * Los dos estados de borde son mutuamente excluyentes (ancho y color de
 * borde compiten en la misma propiedad CSS): nunca se combinan, se elige uno.
 */
const FIELD_BORDER = {
  valid: "border border-border-subtle hover:border-muted focus-visible:border-accent",
  invalid: "border-2 border-foreground",
};

function fieldClasses(hasError: boolean, isSelect = false): string {
  return cn(
    FIELD_BASE,
    isSelect ? FIELD_PADDING.select : FIELD_PADDING.default,
    hasError ? FIELD_BORDER.invalid : FIELD_BORDER.valid,
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function validate(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name) errors.name = contactFormCopy.fieldRequired;

  if (!email) errors.email = contactFormCopy.fieldRequired;
  else if (!EMAIL_PATTERN.test(email)) errors.email = contactFormCopy.emailInvalid;

  if (!subject) errors.subject = contactFormCopy.fieldRequired;

  if (!message) errors.message = contactFormCopy.fieldRequired;

  return errors;
}

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  // Sin access key no hay a donde enviar el formulario: mostrarlo deshabilitado
  // exigiria inventar un mensaje que no esta en la copy aprobada, asi que
  // simplemente se omite hasta que la variable de entorno exista.
  if (!accessKey) return null;

  const isSubmitting = status === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Guarda explicita: no dependemos solo de que React repinte el boton
    // deshabilitado, que llega un ciclo tarde ante un doble Enter rapido.
    if (status === "submitting") return;

    const formData = new FormData(event.currentTarget);

    if (String(formData.get("botcheck") ?? "")) return;

    const errors = validate(formData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      // Sin esto el foco se queda en el boton de envio y quien navega por
      // teclado no recibe ninguna senal de que fallo ni de que campo corregir.
      const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      const result = (await response.json()) as Web3FormsResponse;
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  // No hace falta reset() del form: en estado `success` esta desmontado, asi
  // que vuelve a montarse vacio al pasar a `idle`.
  function handleReset() {
    setFieldErrors({});
    setStatus("idle");
  }

  return (
    <div className="rounded-xl border border-border-subtle p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-foreground">
        {contactFormCopy.heading}
      </h2>

      {/*
        Region live persistente: siempre montada y vacia en reposo. Un nodo con
        role/aria-live insertado ya con contenido no se anuncia de forma fiable
        (VoiceOver/Safari sobre todo); actualizar el texto de una region que ya
        existia si lo hace. Los paneles visibles de abajo no llevan role para
        no duplicar el anuncio.
      */}
      <p aria-live="polite" className="sr-only">
        {status === "success" && contactFormCopy.success}
        {status === "error" && contactFormCopy.error}
      </p>

      {status === "success" ? (
        <div className="mt-6 rounded-lg border border-border-subtle bg-accent-soft p-6">
          <div className="flex items-start gap-3">
            <CheckIcon className="h-5 w-5 shrink-0 text-accent" />
            <p className="text-sm font-medium text-foreground">
              {contactFormCopy.success}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleReset}
            className="mt-4"
          >
            {contactFormCopy.successReset}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
          <p className="text-sm text-muted">{contactFormCopy.requiredNote}</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                {contactFormCopy.labels.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={isSubmitting}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                className={cn("mt-1.5", fieldClasses(Boolean(fieldErrors.name)))}
              />
              {fieldErrors.name && (
                <p
                  id="name-error"
                  className="mt-1.5 flex items-center gap-1.5 text-sm text-foreground"
                >
                  <AlertIcon className="h-4 w-4 shrink-0" />
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                {contactFormCopy.labels.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isSubmitting}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                className={cn("mt-1.5", fieldClasses(Boolean(fieldErrors.email)))}
              />
              {fieldErrors.email && (
                <p
                  id="email-error"
                  className="mt-1.5 flex items-center gap-1.5 text-sm text-foreground"
                >
                  <AlertIcon className="h-4 w-4 shrink-0" />
                  {fieldErrors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="text-sm font-medium text-foreground"
            >
              {contactFormCopy.labels.subject}
            </label>
            <div className="relative mt-1.5">
              <select
                id="subject"
                name="subject"
                required
                disabled={isSubmitting}
                aria-invalid={Boolean(fieldErrors.subject)}
                aria-describedby={
                  fieldErrors.subject ? "subject-error" : undefined
                }
                className={cn(
                  "appearance-none",
                  fieldClasses(Boolean(fieldErrors.subject), true),
                )}
              >
                {contactSubjectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            </div>
            {fieldErrors.subject && (
              <p
                id="subject-error"
                className="mt-1.5 flex items-center gap-1.5 text-sm text-foreground"
              >
                <AlertIcon className="h-4 w-4 shrink-0" />
                {fieldErrors.subject}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-sm font-medium text-foreground"
            >
              {contactFormCopy.labels.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={
                fieldErrors.message ? "message-error" : undefined
              }
              className={cn(
                "mt-1.5 min-h-32 py-2.5",
                fieldClasses(Boolean(fieldErrors.message)),
              )}
            />
            {fieldErrors.message && (
              <p
                id="message-error"
                className="mt-1.5 flex items-center gap-1.5 text-sm text-foreground"
              >
                <AlertIcon className="h-4 w-4 shrink-0" />
                {fieldErrors.message}
              </p>
            )}
          </div>

          {/* Honeypot: nunca `hidden` ni `display:none`, algunos bots los detectan. */}
          <input
            type="text"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
          />

          {status === "error" && (
            <div role="alert" className="rounded-lg border-2 border-foreground p-4">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <AlertIcon className="h-4 w-4 shrink-0" />
                <span>{contactFormCopy.error}</span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="solid"
            size="lg"
            disabled={isSubmitting}
            className={cn(
              "w-full sm:w-auto",
              isSubmitting && "cursor-not-allowed opacity-60",
            )}
          >
            {isSubmitting ? contactFormCopy.submitPending : contactFormCopy.submitIdle}
          </Button>
        </form>
      )}
    </div>
  );
}
