/**
 * Transicion de entrada entre rutas.
 *
 * `template.tsx` se remonta en cada navegacion, a diferencia de `layout.tsx`.
 * Eso basta para dar sensacion de transicion con cero JS y cero flags.
 *
 * Se descarto la View Transitions API: en Next 15 sigue tras
 * `experimental.viewTransition` con prefijo `unstable_`, y el CSS puro
 * `@view-transition` no aplica en App Router porque solo cubre navegaciones
 * cross-document.
 *
 * SiteHeader y MobileNav viven en `layout.tsx`, no aqui, asi que el menu movil
 * no pierde su estado al navegar.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-route-in">{children}</div>;
}
