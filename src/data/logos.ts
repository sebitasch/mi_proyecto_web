/**
 * Logos de marca, indexados por el MISMO nombre que aparece en los datos
 * (`experienceBase.company`, `experienceBase.clients`, `projectsBase.client`).
 *
 * Ausencia = la UI degrada a solo texto, igual que hace `SocialLink.iconId`
 * con LinkedIn. Anadir o quitar una marca no toca ningun componente.
 *
 * ⚠️ Son marcas registradas de terceros. Nombrarlas como referencia de CV es
 * practica estandar; reproducir su logotipo es un terreno distinto. Se usan
 * los archivos oficiales sin recolorear ni deformar.
 */

export interface BrandLogoAsset {
  src: string;
  /**
   * Dimensiones reales del archivo. Sin ellas next/image no puede reservar el
   * hueco y la fila da un salto al terminar de cargar. Los tres tienen
   * proporciones muy distintas (Globant es cuadrado, BA es 2:1), asi que no
   * sirve un valor comun.
   */
  width: number;
  height: number;
}

export const brandLogos: Record<string, BrandLogoAsset> = {
  Globant: { src: "/logos/globant.jpg", width: 554, height: 554 },
  "British Airways": {
    src: "/logos/british-airways.jpg",
    width: 5000,
    height: 2500,
  },
  "Disney Parks": { src: "/logos/disney-parks.png", width: 840, height: 691 },
  /* Alias: la experiencia lo nombra "Disney" y los proyectos "Disney Parks".
     Se registran las dos claves en vez de unificar el dato, porque cambiar
     como aparece un cliente en el CV es decision de Sebas, no del registro
     de logos. Si algun dia se unifican, esta linea sobra. */
  Disney: { src: "/logos/disney-parks.png", width: 840, height: 691 },
};
