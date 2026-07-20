import type { ReactNode } from "react";

/**
 * Forma ambiental detras del hero.
 *
 * Antes esto era <CursorField>: un Client Component que seguia el puntero y
 * pintaba `--mx`/`--my` para desplazar dos manchas. Se retiro la mancha de
 * `bg-accent-soft` porque tapaba el atomo del fondo, y resulto ser la unica
 * que leia esas variables — el seguimiento del puntero se quedo escribiendo
 * en el vacio. Al quitarlo tambien sobra el "use client": aqui ya no queda
 * JS que enviar.
 *
 * `isolate` se conserva a proposito: crea el contexto de apilamiento que
 * mantiene esta forma por encima del fondo global, que vive en <body> con
 * `fixed -z-10`.
 */
export function HeroAmbience({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden">
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
