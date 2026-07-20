import en from "../../messages/en.json";
import es from "../../messages/es.json";

/**
 * Red de seguridad en tiempo de compilación: si `en.json` pierde una clave que
 * `es.json` tiene, `tsc --noEmit` falla aquí en vez de renderizar la clave
 * cruda en producción.
 *
 * No exporta nada: existe solo por el chequeo de tipos. Deliberadamente en
 * ambos sentidos, para detectar también claves huérfanas en inglés.
 */
type EsMessages = typeof es;
type EnMessages = typeof en;

const _enCoversEs: EsMessages = en;
const _esCoversEn: EnMessages = es;

void _enCoversEs;
void _esCoversEn;
