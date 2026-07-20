import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    /**
     * lucide-react ya viene en la lista por defecto de Next, pero se declara
     * explicito para no depender de una lista interna que puede cambiar.
     * Sin esto, un `import { Braces }` arrastraria el barril entero en dev.
     */
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/icons.svg",
        headers: [
          {
            key: "Cache-Control",
            // Sin `immutable` a proposito: el archivo no lleva hash en el
            // nombre, y marcarlo inmutable dejaria iconos obsoletos clavados
            // en el navegador tras un cambio.
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    /**
     * Las rutas sin idioma existieron y estan publicadas: hay enlaces de
     * recruiters apuntando a ellas. Un 308 permanente las conserva vivas
     * apuntando a la version espanola.
     */
    return [
      { source: "/proyectos", destination: "/es/proyectos", permanent: true },
      {
        source: "/proyectos/:slug",
        destination: "/es/proyectos/:slug",
        permanent: true,
      },
      { source: "/sobre-mi", destination: "/es/sobre-mi", permanent: true },
      { source: "/contacto", destination: "/es/contacto", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
