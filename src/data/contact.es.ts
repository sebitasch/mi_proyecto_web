import type { ContactContent } from "@/data/contact";

export const contactEs: ContactContent = {
  headline: "Si llegaste hasta aquí, hablemos",
  body: [
    "Busco equipos donde el frontend se tome en serio: donde el rendimiento se mida, la arquitectura se discuta y la experiencia de quien desarrolla importe tanto como la de quien usa el producto.",
    "Si estás construyendo algo así, quiero conocerlo. Y si solo quieres contrastar una idea o preguntarme cómo abordaría un problema concreto de tu producto, escríbeme igual: no hace falta que sea una vacante.",
  ],
  details: {
    location: { label: "Ubicación", value: "Bogotá, Colombia · GMT-5" },
    mode: { label: "Modalidad", value: "Remoto o híbrido" },
    availability: { label: "Disponibilidad", value: "Abierto a propuestas" },
    languages: { label: "Idiomas", value: "Español nativo · Inglés B2-C1" },
    responseTime: {
      label: "Respuesta",
      value: "Normalmente en menos de 48 horas",
    },
  },
};
