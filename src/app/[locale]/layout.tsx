import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Sebastian Cardona",
    "Senior Web UI Developer",
    "desarrollador frontend",
    "frontend developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "microfrontends",
    "Module Federation",
    "arquitectura BFF",
    "desarrollador web Bogotá",
    "portafolio",
  ],
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.fullName,
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Sin esto next-intl marca la request como dinamica y TODAS las rutas caen
  // a SSR en silencio. Se detecta como una `f` en la tabla de rutas del build.
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        {/*
          Marca el documento como apto para animar, ANTES del primer paint.
          El estado oculto del reveal esta scopeado a `.js-motion`, asi que:
          sin JS, sin IntersectionObserver o con reduced motion, la clase
          nunca llega y el contenido se ve siempre. Es sincrono a proposito
          para que no haya parpadeo de visible -> oculto -> animado.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(window.IntersectionObserver&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("js-motion")}}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} flex min-h-screen flex-col`}>
        {/*
          Obligatorio: el `Link` de next-intl es un Client Component y necesita
          el contexto de idioma para resolver /es/... vs /en/... Sin provider
          el prerender falla con "No intl context found".

          `messages={{}}` es DELIBERADO y no un olvido: sin esa prop next-intl
          hereda el diccionario entero del servidor y lo serializa en el
          payload RSC de TODAS las paginas (medido: +1,6 kB gzip, con la copy
          del formulario de contacto viajando hasta la home).

          Los Client Components que necesiten traducir montan su propio
          provider acotado a su namespace, como hace /contacto con ContactForm.
        */}
        <NextIntlClientProvider locale={locale} messages={{}}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
