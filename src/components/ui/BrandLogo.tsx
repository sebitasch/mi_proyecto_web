import Image from "next/image";

import { brandLogos } from "@/data/logos";

interface BrandLogoProps {
  /** Nombre tal cual aparece en los datos: es la clave del registro. */
  name: string;
  className?: string;
}

/**
 * Logotipo de una marca, si esta registrado en `brandLogos`.
 *
 * Devuelve null cuando no lo esta: la marca ya viaja como texto al lado, asi
 * que sin logo no se pierde informacion y se pueden anadir archivos de uno en
 * uno sin dejar imagenes rotas por el camino.
 *
 * `alt=""`: el nombre siempre esta a la vista junto al logo, y repetirlo haria
 * que un lector de pantalla lo anunciara dos veces.
 *
 * SIN `unoptimized`, a diferencia de las portadas de proyecto: aquellas son
 * SVG (que el optimizador rechaza salvo `dangerouslyAllowSVG`), pero estos son
 * JPG y PNG. El de British Airways mide 5000x2500 y pesa 114 kB para
 * mostrarse a 20 px de alto: dejar que Next lo redimensione no es un detalle.
 *
 * La altura la fija el consumidor y el ancho va `auto`, porque las tres
 * marcas tienen proporciones distintas y normalizar por altura es lo unico
 * que las deja opticamente parejas.
 */
export function BrandLogo({ name, className }: BrandLogoProps) {
  const logo = brandLogos[name];
  if (!logo) return null;

  return (
    <Image
      src={logo.src}
      alt=""
      width={logo.width}
      height={logo.height}
      className={className ?? "h-5 w-auto object-contain"}
    />
  );
}
