/**
 * Un unico IntersectionObserver para todos los <Reveal> de la pagina.
 *
 * Con ~20 reveals en /proyectos, esto es una instancia en lugar de veinte.
 * El observer se crea perezosamente en el primer registro: si nadie observa,
 * no existe.
 */

type RevealCallback = () => void;

const callbacks = new Map<Element, RevealCallback>();

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;

  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
      }
    },
    {
      threshold: 0.15,
      // El -10% inferior evita que algo se revele mientras aun esta pegado
      // al borde de la pantalla, que se ve como un parpadeo.
      rootMargin: "0px 0px -10% 0px",
    },
  );

  return observer;
}

export function observe(element: Element, onReveal: RevealCallback): () => void {
  const instance = getObserver();
  if (!instance) return () => {};

  callbacks.set(element, onReveal);
  instance.observe(element);

  return () => {
    callbacks.delete(element);
    instance.unobserve(element);
  };
}
