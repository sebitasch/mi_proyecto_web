"use client";

import { useEffect } from "react";

/**
 * Publica el progreso de scroll (0 a 1) como `--sp` en <html>.
 *
 * No renderiza nada: el fondo decorativo se dibuja en servidor y solo lee la
 * variable desde CSS. Asi los 28 iconos no viajan al bundle de cliente.
 *
 * Cero re-renders y un solo frame pendiente a la vez. NO se descarta el
 * puntero grueso: el efecto es de scroll y en movil se scrollea igual (o mas).
 */
export function BackdropScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let frame: number | null = null;

    function paint() {
      frame = null;
      // `scrollHeight - innerHeight` puede ser 0 en paginas cortas: sin la
      // guarda saldria una division por cero y `--sp` quedaria en NaN.
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--sp",
        max > 0 ? String(window.scrollY / max) : "0",
      );
    }

    function schedule() {
      frame ??= requestAnimationFrame(paint);
    }

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
      root.style.removeProperty("--sp");
    };
  }, []);

  return null;
}
