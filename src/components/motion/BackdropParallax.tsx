"use client";

import { useEffect } from "react";

/**
 * Publica dos senales de parallax como variables CSS en <html>:
 *
 *   --sp        progreso de scroll, 0 a 1.
 *   --mx / --my desplazamiento del puntero respecto al centro, -0.5 a 0.5.
 *
 * No renderiza nada: la red de nodos se dibuja en servidor (<SiteBackdrop>) y
 * solo lee estas variables desde CSS. Asi la geometria no viaja al bundle de
 * cliente y aqui solo queda el listener.
 *
 * Cero re-renders y un solo frame pendiente por senal. El puntero se ignora en
 * pantallas tactiles (`pointer: coarse`): no hay hover que seguir y el efecto
 * quedaria enganchado al ultimo toque. El scroll si aplica en movil.
 */
export function BackdropParallax() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const finePointer = matchMedia("(pointer: fine)").matches;

    let scrollFrame: number | null = null;
    let pointerFrame: number | null = null;
    let px = 0;
    let py = 0;

    function paintScroll() {
      scrollFrame = null;
      // `scrollHeight - innerHeight` puede ser 0 en paginas cortas: sin la
      // guarda saldria una division por cero y `--sp` quedaria en NaN.
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--sp",
        max > 0 ? String(window.scrollY / max) : "0",
      );
    }

    function paintPointer() {
      pointerFrame = null;
      root.style.setProperty("--mx", String(px));
      root.style.setProperty("--my", String(py));
    }

    function onScroll() {
      scrollFrame ??= requestAnimationFrame(paintScroll);
    }

    function onPointer(event: PointerEvent) {
      px = event.clientX / window.innerWidth - 0.5;
      py = event.clientY / window.innerHeight - 0.5;
      pointerFrame ??= requestAnimationFrame(paintPointer);
    }

    paintScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    if (finePointer) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
      if (scrollFrame !== null) cancelAnimationFrame(scrollFrame);
      if (pointerFrame !== null) cancelAnimationFrame(pointerFrame);
      root.style.removeProperty("--sp");
      root.style.removeProperty("--mx");
      root.style.removeProperty("--my");
    };
  }, []);

  return null;
}
