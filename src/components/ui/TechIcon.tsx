interface TechIconProps {
  /** Id del simbolo en /public/icons.svg. */
  id: string;
  className?: string;
}

/**
 * Pinta un icono del sprite externo.
 *
 * `fill="currentColor"` va aqui, en el anfitrion, y NUNCA en el <symbol>: con
 * un <use> a sprite externo el contenido vive en un shadow tree que el CSS del
 * documento no penetra, pero `fill` es un atributo heredable y si lo atraviesa.
 * Si el symbol declarara su propio fill, ganaria el y los `group-hover:text-*`
 * dejarian de tener efecto.
 */
export function TechIcon({ id, className }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className ?? "h-6 w-6"}
    >
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
}
