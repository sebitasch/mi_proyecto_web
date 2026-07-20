"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

import { observe } from "@/components/motion/observer";

/** Mas de 6 pasos y el ultimo item tarda casi un segundo en aparecer. */
const MAX_STAGGER_STEPS = 6;

interface RevealProps {
  /** Ya renderizado en el servidor: pasarlo como children evita que el
   *  arbol hijo se convierta en cliente. */
  children: ReactNode;
  as?: ElementType;
  /** Posicion en una lista, para escalonar la entrada. */
  index?: number;
  className?: string;
}

export function Reveal({
  children,
  as: Component = "div",
  index = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isShown) return;

    // Si el script de <head> no marco la pagina, no hay que animar nada:
    // o falta IntersectionObserver o el usuario pidio reduced motion. En
    // ambos casos el contenido ya se ve y no montamos observer.
    if (!document.documentElement.classList.contains("js-motion")) return;

    return observe(element, () => setIsShown(true));
  }, [isShown]);

  const steps = Math.min(index, MAX_STAGGER_STEPS);

  return (
    <Component
      ref={ref}
      data-reveal={isShown ? "shown" : "hidden"}
      className={className}
      style={
        steps > 0
          ? { animationDelay: `calc(${steps} * var(--stagger-step))` }
          : undefined
      }
    >
      {children}
    </Component>
  );
}
