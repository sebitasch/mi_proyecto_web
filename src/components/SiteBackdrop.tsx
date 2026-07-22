/**
 * Fondo de red de nodos, comun a todas las rutas.
 *
 * Antes eran figuras sueltas (atomo de React + moleculas). Ahora es una sola
 * red de nodos enlazados: puntos conectados por lineas finas y algunos nodos
 * "diana" (anillo + nucleo). La identidad se lee por la forma de red, el aire
 * tecnico que buscabamos, sin logotipo ni sprite externo.
 *
 * Server Component: cero JS y geometria inline. El movimiento lo aportan dos
 * senales que publica <BackdropParallax> en <html>:
 *   --sp        progreso de scroll (0 a 1)  -> deriva vertical/horizontal.
 *   --mx / --my puntero respecto al centro   -> parallax al mover el mouse.
 * Sin JS o con reduced motion ambas valen 0: la red se queda quieta y visible.
 *
 * Se dibuja en capas de distinta profundidad. Cada capa reacciona distinto a
 * las dos senales, y de esa diferencia sale la sensacion de profundidad: las
 * lejanas se mueven poco, las cercanas mas.
 *
 * Las aristas NO se cablean a mano: `connect()` une cada par de nodos cuya
 * distancia cae bajo un umbral. Asi densificar la red es solo agregar nodos;
 * el mallado sale organico y triangulado solo. Corre una vez al importar
 * (server), con posiciones fijas: sin aleatoriedad ni desajuste de hidratacion.
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
  /** Distancia maxima (en unidades del viewBox) para unir dos nodos. */
  linkDist: number;
  /** Px que deriva al recorrer la pagina entera (scroll). */
  scroll: { dx: number; dy: number };
  /** Px de recorrido a fondo de puntero. `--mx/--my` van de -0.5 a 0.5. */
  pointer: number;
}

/* Espacio de coordenadas 1440x900. `slice` lo hace cubrir el viewport sin
   deformarse; las capas comparten sistema para que la red case entre ellas. */
const VIEWBOX = "0 0 1440 900";

/** Une cada par de nodos cuya distancia no supere `maxDist`. */
function connect(nodes: Node[], maxDist: number): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.hypot(dx, dy) <= maxDist) edges.push([i, j]);
    }
  }
  return edges;
}

/* Dos capas y no mas: con mas, la red satura la lectura del contenido. La de
   atras es tenue, densa y lenta; la de delante, mas marcada, mas suelta y con
   mas recorrido de parallax, para que se despeguen al mover el mouse o scroll. */
const LAYERS: Layer[] = [
  {
    id: "mesh-back",
    className: "text-accent/[0.06]",
    linkDist: 240,
    scroll: { dx: -26, dy: 34 },
    pointer: 34,
    nodes: [
      { x: 80, y: 110, r: 5 },
      { x: 250, y: 70, r: 4 },
      { x: 420, y: 130, r: 5, ring: true },
      { x: 600, y: 80, r: 4 },
      { x: 770, y: 120, r: 5 },
      { x: 950, y: 70, r: 4 },
      { x: 1120, y: 120, r: 5, ring: true },
      { x: 1300, y: 90, r: 4 },
      { x: 150, y: 250, r: 4 },
      { x: 330, y: 290, r: 5 },
      { x: 500, y: 250, r: 4, ring: true },
      { x: 680, y: 300, r: 5 },
      { x: 860, y: 255, r: 4 },
      { x: 1040, y: 300, r: 5 },
      { x: 1210, y: 250, r: 4 },
      { x: 1360, y: 300, r: 5 },
      { x: 90, y: 440, r: 5 },
      { x: 270, y: 470, r: 4, ring: true },
      { x: 450, y: 430, r: 5 },
      { x: 620, y: 480, r: 4 },
      { x: 800, y: 440, r: 5 },
      { x: 980, y: 480, r: 4, ring: true },
      { x: 1150, y: 440, r: 5 },
      { x: 1330, y: 470, r: 4 },
      { x: 170, y: 640, r: 4 },
      { x: 360, y: 660, r: 5 },
      { x: 540, y: 630, r: 4 },
      { x: 720, y: 670, r: 5, ring: true },
      { x: 900, y: 635, r: 4 },
      { x: 1080, y: 670, r: 5 },
      { x: 1260, y: 640, r: 4 },
    ],
  },
  {
    id: "mesh-front",
    className: "hidden text-accent/[0.09] sm:block",
    linkDist: 330,
    scroll: { dx: 40, dy: -52 },
    pointer: 74,
    nodes: [
      { x: 180, y: 200, r: 7, ring: true },
      { x: 400, y: 300, r: 5 },
      { x: 300, y: 520, r: 6 },
      { x: 560, y: 180, r: 5 },
      { x: 720, y: 420, r: 7, ring: true },
      { x: 900, y: 260, r: 5 },
      { x: 760, y: 300, r: 4 },
      { x: 1080, y: 400, r: 7, ring: true },
      { x: 1240, y: 240, r: 5 },
      { x: 1180, y: 620, r: 6 },
      { x: 980, y: 600, r: 5 },
      { x: 640, y: 600, r: 5, ring: true },
      { x: 440, y: 640, r: 4 },
      { x: 1320, y: 480, r: 5 },
    ],
  },
];

/** Cada capa con sus aristas ya resueltas por distancia. */
const RENDERED = LAYERS.map((layer) => ({
  ...layer,
  edges: connect(layer.nodes, layer.linkDist),
}));

/** Dibuja las lineas y los nodos de una capa dentro de su propio SVG. */
function Mesh({ nodes, edges }: { nodes: Node[]; edges: [number, number][] }) {
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
      {RENDERED.map((layer) => (
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
