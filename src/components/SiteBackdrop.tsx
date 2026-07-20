/**
 * Fondo molecular, comun a todas las rutas.
 *
 * Geometria inline y NO simbolos del sprite: 28 `<use href="/icons.svg#...">`
 * obligaban al navegador a descargar y parsear los 44 kB del sprite antes de
 * pintar un solo icono, y dejaban 28 capas de GPU recomponiendose en cada
 * scroll. Aqui son cinco figuras dibujadas a mano, sin una sola peticion.
 *
 * El motivo es el atomo de React (nucleo + tres orbitas cruzadas) y moleculas
 * de nodos enlazados. La identidad se lee por la forma, no por el logotipo.
 *
 * Server Component: cero JS. El desplazamiento lo aporta <BackdropScroll>,
 * que publica `--sp` (0 a 1) en <html>. Sin JS o con reduced motion vale 0 y
 * el fondo se queda quieto pero visible.
 */

/** Nucleo y tres orbitas: el logotipo de React reducido a geometria. */
function Atom() {
  return (
    <>
      <circle cx="50" cy="50" r="7" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="2.5">
        <ellipse cx="50" cy="50" rx="45" ry="17" />
        <ellipse cx="50" cy="50" rx="45" ry="17" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="45" ry="17" transform="rotate(120 50 50)" />
      </g>
    </>
  );
}

/** Nodos enlazados. Da el aire molecular sin repetir el atomo. */
function Molecule() {
  return (
    <>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="20" y1="30" x2="55" y2="18" />
        <line x1="55" y1="18" x2="80" y2="48" />
        <line x1="55" y1="18" x2="48" y2="60" />
        <line x1="48" y1="60" x2="80" y2="48" />
        <line x1="48" y1="60" x2="22" y2="82" />
      </g>
      <g fill="currentColor">
        <circle cx="20" cy="30" r="5" />
        <circle cx="55" cy="18" r="6.5" />
        <circle cx="80" cy="48" r="5" />
        <circle cx="48" cy="60" r="6" />
        <circle cx="22" cy="82" r="4.5" />
      </g>
    </>
  );
}

interface Figure {
  id: string;
  shape: "atom" | "molecule";
  /** Posicion, tamano, tinte y visibilidad. */
  className: string;
  /** Px que deriva al recorrer la pagina entera. */
  dx: number;
  dy: number;
  /** Las orbitas giran; las moleculas no, para no marear. */
  spin?: "normal" | "reverse";
}

/* Cinco figuras y no mas: con el campo anterior de 28 iconos la pagina se
   leia saturada. Tres se ven siempre (tambien en movil) y dos entran solo
   cuando hay ancho de sobra. */
const FIGURES: Figure[] = [
  {
    id: "atom-lead",
    shape: "atom",
    className:
      "-right-10 top-[6%] h-48 w-48 text-accent/[0.07] sm:right-[4%] sm:h-72 sm:w-72 lg:h-96 lg:w-96",
    dx: -70,
    dy: 40,
    spin: "normal",
  },
  {
    id: "molecule-low",
    shape: "molecule",
    className:
      "-left-8 bottom-[10%] h-36 w-36 text-accent/[0.06] sm:left-[5%] sm:h-52 sm:w-52 lg:h-64 lg:w-64",
    dx: 85,
    dy: -55,
  },
  {
    id: "atom-trail",
    shape: "atom",
    className:
      "right-[8%] bottom-[4%] h-28 w-28 text-accent/[0.05] sm:h-40 sm:w-40 lg:h-52 lg:w-52",
    dx: -45,
    dy: -75,
    spin: "reverse",
  },
  {
    id: "molecule-high",
    shape: "molecule",
    className:
      "left-[12%] top-[8%] hidden h-32 w-32 text-accent/[0.05] sm:block lg:h-44 lg:w-44",
    dx: 60,
    dy: 70,
  },
  {
    id: "atom-mid",
    shape: "atom",
    className:
      "left-[45%] top-[48%] hidden h-32 w-32 text-accent/[0.045] lg:block",
    dx: -95,
    dy: 30,
    spin: "normal",
  },
];

export function SiteBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {FIGURES.map((figure) => (
        /* Dos elementos y no uno: el div lleva la deriva de scroll y el svg
           el giro. En la misma propiedad `transform` se pisarian. */
        <div
          key={figure.id}
          className={`absolute ${figure.className}`}
          style={{
            transform: `translate3d(calc(var(--sp, 0) * ${figure.dx}px), calc(var(--sp, 0) * ${figure.dy}px), 0)`,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className={
              figure.spin
                ? `animate-orbit h-full w-full${figure.spin === "reverse" ? " [animation-direction:reverse]" : ""}`
                : "h-full w-full"
            }
          >
            {figure.shape === "atom" ? <Atom /> : <Molecule />}
          </svg>
        </div>
      ))}
    </div>
  );
}
