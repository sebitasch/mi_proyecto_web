/**
 * Genera public/icons.svg a partir de scripts/icon-paths.json.
 *
 * Por que un sprite: los paths inline se emitian DOS veces por documento
 * (markup renderizado + payload RSC que Next incrusta en el HTML). Eran ~80 KB
 * de datos de icono en cada carga de / y /sobre-mi. Como sprite externo se
 * descargan una vez y el navegador los cachea para todas las rutas.
 *
 * Los paths viven aqui y no en src/ a proposito: si ningun modulo de src los
 * importa, no pueden colarse en el bundle ni en el payload RSC por accidente.
 *
 * Notas de origen:
 * - Los logos vienen de simpleicons.org.
 * - `aws` NO es de simpleicons: es un glifo de nube generico propio, porque
 *   Simple Icons retiro los logos de la familia Amazon. Sustituyelo por el
 *   asset oficial de AWS si alguna vez lo necesitas.
 * - `linkedin` no aparece: simpleicons retiro ese icono y la entrada quedo
 *   sin path. El footer degrada a texto, que es el comportamiento deseado.
 *
 * Ejecuta: node scripts/build-icons.mjs (se engancha como `prebuild`)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const icons = JSON.parse(
  readFileSync(join(here, "icon-paths.json"), "utf8"),
);

const slugs = Object.keys(icons).sort();

const symbols = slugs
  .map((slug) => {
    const path = icons[slug];
    if (!path) throw new Error(`El icono "${slug}" no tiene path.`);
    // Sin `fill` en el <symbol>: `fill` es heredable y atraviesa el shadow
    // tree del <use>, asi que el color lo pone el <svg> anfitrion con
    // fill="currentColor". Si el symbol declarara el suyo, ganaria el y los
    // iconos se quedarian negros al hacer hover.
    return `<symbol id="${slug}" viewBox="0 0 24 24"><path d="${path}"/></symbol>`;
  })
  .join("");

const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols}</svg>\n`;

writeFileSync(join(root, "public", "icons.svg"), sprite);

console.log(
  `icons.svg generado: ${slugs.length} simbolos, ${sprite.length} bytes`,
);
