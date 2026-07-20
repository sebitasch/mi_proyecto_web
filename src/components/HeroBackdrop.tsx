/**
 * Iconos decorativos del fondo del hero.
 *
 * Server Component puro: solo JSX. El parallax no necesita JS aqui — lee las
 * custom properties `--mx`/`--my` que ya pinta <CursorField> en su raiz, y
 * cada icono usa una profundidad distinta para que el conjunto se lea con
 * capas en vez de como un bloque plano.
 *
 * En movil solo sobreviven los dos del borde derecho, al 4% y pequenos: el
 * texto ocupa casi todo el ancho y cualquier cosa mas cerca del centro
 * compite con el mensaje.
 */
interface BackdropIcon {
  id: string;
  /** Posicion, tamano, visibilidad y color. Todo lo visual vive aqui. */
  className: string;
  /** Px que se desplaza con el puntero. Mas alto = se siente mas cerca. */
  depth: number;
}

const BACKDROP_ICONS: BackdropIcon[] = [
  {
    id: "typescript",
    className:
      "right-0 top-6 h-28 w-28 text-accent/[0.045] sm:right-2 sm:h-44 sm:w-44 lg:h-56 lg:w-56",
    depth: -22,
  },
  {
    id: "nodedotjs",
    className:
      "-right-4 bottom-4 h-20 w-20 text-accent/[0.04] sm:right-20 sm:h-32 sm:w-32 lg:h-40 lg:w-40",
    depth: -12,
  },
  {
    id: "docker",
    className:
      "right-44 top-1/2 hidden h-24 w-24 text-accent/[0.05] sm:block lg:h-32 lg:w-32",
    depth: -30,
  },
  {
    id: "javascript",
    className:
      "right-1/3 top-0 hidden h-16 w-16 text-accent/[0.04] sm:block lg:h-20 lg:w-20",
    depth: -18,
  },
  {
    id: "kubernetes",
    className:
      "left-1/2 -bottom-2 hidden h-24 w-24 text-accent/[0.035] lg:block",
    depth: -26,
  },
  {
    id: "git",
    className: "-left-8 bottom-10 hidden h-20 w-20 text-accent/[0.04] lg:block",
    depth: -16,
  },
];

export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {BACKDROP_ICONS.map((icon) => (
        <svg
          key={icon.id}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`absolute ${icon.className}`}
          style={{
            transform: `translate3d(calc((var(--mx, .5) - .5) * ${icon.depth}px), calc((var(--my, .5) - .5) * ${icon.depth}px), 0)`,
          }}
        >
          <use href={`/icons.svg#${icon.id}`} />
        </svg>
      ))}
    </div>
  );
}
