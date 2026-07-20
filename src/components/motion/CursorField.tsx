"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Formas decorativas que reaccionan al puntero.
 *
 * Cero re-renders: no hay useState. El handler solo guarda las coordenadas en
 * un ref y un unico requestAnimationFrame las escribe como custom properties
 * en el DOM. React nunca se entera de que el raton se movio.
 *
 * Recibe `children` ya renderizado en el servidor, asi que envolver el Hero
 * con esto NO lo convierte en Client Component.
 */
export function CursorField({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Sin puntero fino (movil, tablet) no hay cursor que seguir y si hay
    // bateria que cuidar: no se adjunta nada.
    if (!matchMedia("(pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function paint() {
      frameRef.current = null;
      const el = rootRef.current;
      if (!el) return;
      el.style.setProperty("--mx", String(pointerRef.current.x));
      el.style.setProperty("--my", String(pointerRef.current.y));
    }

    function onPointerMove(event: PointerEvent) {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      pointerRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
      // Un solo frame pendiente a la vez.
      frameRef.current ??= requestAnimationFrame(paint);
    }

    root.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      root.removeEventListener("pointermove", onPointerMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative isolate overflow-hidden">
      {/* Sin JS estas formas se quedan en su posicion por defecto (--mx/--my
          valen .5) y conservan su `float`: hay vida igual. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 h-72 w-72 rounded-full bg-accent-soft blur-3xl"
        style={{
          top: "10%",
          right: "8%",
          transform:
            "translate3d(calc((var(--mx, .5) - .5) * -28px), calc((var(--my, .5) - .5) * -28px), 0)",
        }}
      />
      <div
        aria-hidden="true"
        className="animate-float pointer-events-none absolute -z-10 h-56 w-56 rounded-full bg-accent/5 blur-3xl"
        style={{
          top: "45%",
          right: "26%",
        }}
      />
      {children}
    </div>
  );
}
