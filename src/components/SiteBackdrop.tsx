import { stack } from "@/data/stack";

/**
 * Campo de iconos del fondo, comun a todas las rutas.
 *
 * Server Component: los 28 SVG salen ya renderizados y no cuesta un solo byte
 * de JS. El movimiento lo aporta <BackdropScroll>, que publica `--sp` (0 a 1)
 * en <html>; aqui solo se lee desde CSS. Sin JS, sin soporte o con reduced
 * motion, `--sp` vale 0 y el campo se queda quieto pero visible.
 *
 * `fixed`: el campo no crece con la pagina. Al scrollear, cada icono deriva
 * su propia distancia y los de delante se separan de los de detras.
 */

/** Columnas de la rejilla base. El resto de la posicion es dispersion. */
const COLUMNS = 4;

/* Tamanos y opacidades ciclicos. Que no sean todos iguales es lo que hace que
   se lea como profundidad y no como un patron de papel tapiz. */
const SIZES = [
  "h-8 w-8 sm:h-12 sm:w-12",
  "h-10 w-10 sm:h-16 sm:w-16",
  "h-7 w-7 sm:h-10 sm:w-10",
  "h-9 w-9 sm:h-14 sm:w-14",
];

/* Topes deliberadamente bajos: por encima del 6% el fondo empieza a competir
   con el texto, sobre todo en movil, donde el contenido ocupa todo el ancho. */
const TINTS = [
  "text-accent/[0.035]",
  "text-accent/[0.055]",
  "text-accent/[0.04]",
  "text-accent/[0.05]",
];

/**
 * Posicion y deriva a partir del indice.
 *
 * Se calcula en vez de escribirse a mano para que anadir una tecnologia a
 * `stack` la coloque sola. Los multiplicadores primos rompen la rejilla lo
 * justo para que no se vean filas y columnas, pero siguen siendo
 * deterministas: mismo HTML en servidor y en cliente, sin hidratacion rota.
 */
function place(index: number) {
  const column = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);

  return {
    left: 8 + column * 27 + (((index * 37) % 11) - 5),
    top: 4 + row * 13 + (((index * 53) % 9) - 4),
    // Deriva al scrollear: unos van a la izquierda y otros a la derecha.
    dx: ((index * 73) % 200) - 100,
    dy: ((index * 41) % 120) - 60,
  };
}

export function SiteBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {stack.map((tech, index) => {
        const { left, top, dx, dy } = place(index);

        return (
          <svg
            key={tech.slug}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`absolute ${SIZES[index % SIZES.length]} ${TINTS[index % TINTS.length]}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: `translate3d(calc(var(--sp, 0) * ${dx}px), calc(var(--sp, 0) * ${dy}px), 0)`,
            }}
          >
            <use href={`/icons.svg#${tech.slug}`} />
          </svg>
        );
      })}
    </div>
  );
}
