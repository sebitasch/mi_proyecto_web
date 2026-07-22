/**
 * Fondo de red de nodos, comun a todas las rutas.
 *
 * Antes eran figuras sueltas (atomo de React + moleculas). Ahora es una sola
 * red de nodos enlazados: puntos conectados por lineas finas, con algunos
 * nodos "diana" (anillo + nucleo). La identidad se lee por la forma de red,
 * el aire tecnico que buscabamos, sin logotipo ni sprite externo.
 *
 * Server Component: cero JS y geometria inline. El movimiento lo aportan dos
 * senales que publica <BackdropParallax> en <html>:
 *   --sp        progreso de scroll (0 a 1)  -> deriva vertical/horizontal.
 *   --mx / --my puntero respecto al centro   -> parallax al mover el mouse.
 * Sin JS o con reduced motion ambas valen 0: la red se queda quieta y visible.
 *
 * Se dibuja en capas de distinta profundidad. Cada capa reacciona distinto a
 * las dos senales, y de esa diferencia sale la sensacion de profundidad:
 * las lejanas se mueven poco, las cercanas mas.
 */

interface Node {
  x: number;
  y: number;
  r: number;
  /** Nodo "diana": dibuja un anillo extra alrededor del nucleo. */
  ring?: boolean;
}

interface Layer {
  id: string;
  /** Posicion, tinte y visibilidad de la capa. */
  className: string;
  nodes: Node[];
  /** Pares de indices de `nodes` que van unidos por una linea. */
  edges: [number, number][];
  /** Px que deriva al recorrer la pagina entera (scroll). */
  scroll: { dx: number; dy: number };
  /** Px de recorrido a fondo de puntero. `--mx/--my` van de -0.5 a 0.5. */
  pointer: number;
}

/* Espacio de coordenadas 1440x900. `slice` lo hace cubrir el viewport sin
   deformarse; las capas comparten sistema para que la red case entre ellas. */
const VIEWBOX = "0 0 1440 900";

/* Dos capas y no mas: con mas, la red satura la lectura del contenido. La de
   atras es tenue y lenta; la de delante, algo mas marcada y con mas recorrido
   de parallax, para que se despeguen al mover el mouse o hacer scroll. */
const LAYERS: Layer[] = [
  {
    id: "mesh-back",
    className: "text-accent/[0.06]",
    scroll: { dx: -26, dy: 34 },
    pointer: 34,
    nodes: [
      { x: 90, y: 120, r: 5 },
      { x: 360, y: 60, r: 4 },
      { x: 250, y: 280, r: 6, ring: true },
      { x: 540, y: 180, r: 4 },
      { x: 470, y: 400, r: 5 },
      { x: 200, y: 470, r: 4 },
      { x: 730, y: 100, r: 5 },
      { x: 690, y: 330, r: 6 },
      { x: 900, y: 230, r: 4, ring: true },
      { x: 1080, y: 120, r: 5 },
      { x: 1010, y: 400, r: 4 },
      { x: 1260, y: 300, r: 6 },
      { x: 1180, y: 560, r: 4 },
      { x: 850, y: 520, r: 5, ring: true },
      { x: 600, y: 600, r: 4 },
      { x: 340, y: 660, r: 5 },
      { x: 1320, y: 560, r: 4 },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [1, 2],
      [1, 3],
      [2, 3],
      [2, 4],
      [2, 5],
      [3, 4],
      [4, 5],
      [3, 6],
      [6, 7],
      [3, 7],
      [7, 8],
      [6, 8],
      [8, 9],
      [9, 10],
      [8, 10],
      [10, 11],
      [11, 12],
      [10, 13],
      [7, 13],
      [13, 14],
      [4, 14],
      [14, 15],
      [5, 15],
      [12, 16],
      [11, 16],
      [13, 12],
    ],
  },
  {
    id: "mesh-front",
    className: "hidden text-accent/[0.09] sm:block",
    scroll: { dx: 40, dy: -52 },
    pointer: 74,
    nodes: [
      { x: 180, y: 220, r: 7, ring: true },
      { x: 430, y: 330, r: 5 },
      { x: 320, y: 560, r: 6 },
      { x: 630, y: 180, r: 5 },
      { x: 780, y: 470, r: 7, ring: true },
      { x: 980, y: 300, r: 5 },
      { x: 1180, y: 430, r: 7, ring: true },
      { x: 1100, y: 660, r: 5 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [4, 2],
      [1, 4],
      [6, 7],
      [4, 7],
    ],
  },
];

/** Dibuja las lineas y los nodos de una capa dentro de su propio SVG. */
function Mesh({ nodes, edges }: Pick<Layer, "nodes" | "edges">) {
  return (
    <svg
      viewBox={VIEWBOX}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <g stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.55">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>
      <g fill="currentColor">
        {nodes.map((node, i) => (
          <g key={i}>
            {node.ring && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r * 2.4}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            )}
            <circle cx={node.x} cy={node.y} r={node.r} />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function SiteBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {LAYERS.map((layer) => (
        /* Dos divs anidados a proposito: el de fuera lleva la deriva de scroll
           (sin transicion, sigue al frame) y el de dentro el parallax de
           puntero (con transicion, para que el seguimiento sea suave y no
           salte). En un solo `transform` se pisarian. */
        <div
          key={layer.id}
          className={`absolute inset-0 ${layer.className}`}
          style={{
            transform: `translate3d(calc(var(--sp, 0) * ${layer.scroll.dx}px), calc(var(--sp, 0) * ${layer.scroll.dy}px), 0)`,
          }}
        >
          <div
            className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              transform: `translate3d(calc(var(--mx, 0) * ${layer.pointer}px), calc(var(--my, 0) * ${layer.pointer}px), 0)`,
            }}
          >
            <Mesh nodes={layer.nodes} edges={layer.edges} />
          </div>
        </div>
      ))}
    </div>
  );
}
