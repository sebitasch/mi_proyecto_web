import type { ProjectContent } from "@/types";
import type { ProjectSlug } from "@/data/projects";

/**
 * Prosa de los proyectos en español.
 *
 * `impact` es cualitativo a propósito: son trabajos reales para clientes
 * reales. Si algún día hay cifras medidas, sustitúyelas aquí.
 *
 * El tipo `Record<ProjectSlug, ...>` hace que falte-un-proyecto sea un error
 * de compilación, no un hueco silencioso en la página.
 */
export const projectsEs: Record<ProjectSlug, ProjectContent> = {
  "refactorizacion-monolito": {
    title: "Refactorización de arquitectura monolito",
    description:
      "Eliminación de código duplicado mediante patrones arquitectónicos, para devolver legibilidad y margen de crecimiento al monolito.",
    context:
      "El código duplicado se había acumulado por toda la aplicación monolítica. Cada cambio obligaba a repetirlo en varios sitios y el riesgo de dejar alguno sin actualizar crecía con cada iteración.",
    approach:
      "Identificación de la duplicación recurrente y extracción a abstracciones comunes, aplicando patrones arquitectónicos y convenciones compartidas por el equipo.",
    impact: [
      "Un cambio se toca en un solo lugar en vez de replicarse por el código",
      "Base más legible para quien entra nuevo al proyecto",
      "Margen para escalar sin arrastrar la deuda anterior",
    ],
  },
  "optimizacion-seo": {
    title: "Optimización de SEO internacional",
    description:
      "Estrategia de posicionamiento adaptada a cada mercado internacional, respetando las reglas de negocio del cliente.",
    context:
      "La marca competía en varios mercados con necesidades de posicionamiento distintas, y cada región traía sus propias reglas de negocio que la implementación debía respetar.",
    approach:
      "Estrategia de SEO diferenciada por mercado, ajustando la implementación técnica a las restricciones de negocio de cada región en lugar de aplicar una configuración única.",
    impact: [
      "Posicionamiento adaptado a cada mercado, no una configuración genérica",
      "Reglas de negocio respetadas sin sacrificar visibilidad",
    ],
  },
  "modulos-producto": {
    title: "Módulos de producto en React y Next.js",
    description:
      "Diseño e implementación de módulos de producto: flujo de checkout, selección de asientos y gestión de órdenes de vuelo.",
    context:
      "La aplicación de la aerolínea necesitaba ampliar su producto con flujos nuevos, sobre una base ya en producción y con tráfico real de pasajeros.",
    approach:
      "Diseño e implementación de extremo a extremo de tres módulos —checkout, selección de asientos y gestión de órdenes— integrados en la arquitectura existente.",
    impact: [
      "Tres flujos críticos de negocio entregados sobre producción",
      "Observabilidad con Datadog para diagnosticar sobre datos reales",
      "Despliegue continuo con GitHub CI/CD y ARGO",
    ],
  },
  "git-submodulos": {
    title: "Estandarización con Git submódulos",
    description:
      "Artefacto compartido como submódulo para unificar funciones y componentes entre equipos que antes los definían por separado.",
    context:
      "Cada equipo definía funciones, componentes y páginas a su manera. Lo que era común terminaba implementado varias veces y con criterios distintos.",
    approach:
      "Creación de un artefacto compartido, distribuido como submódulo de Git, que centraliza las funciones de uso general y fija una convención única para todos los equipos.",
    impact: [
      "Una sola definición para lo que antes cada equipo resolvía por su cuenta",
      "Los cambios en lo común se propagan sin coordinar equipo por equipo",
      "Convención explícita en lugar de criterio individual",
    ],
  },
  "web-apis-globales": {
    title: "Web APIs para contenido global",
    description:
      "Centralización de header y footer para todos los flujos de una aplicación en microservicios, servidos desde una API propia.",
    context:
      "Con la aplicación repartida en microservicios, cada flujo resolvía por su cuenta elementos comunes como el header y el footer, con el riesgo de que divergieran entre sí.",
    approach:
      "APIs propias en Next.js que sirven ese contenido global a todos los flujos desde una única fuente, con independencia del microservicio que los consuma.",
    impact: [
      "Header y footer consistentes en toda la aplicación",
      "Un cambio global deja de requerir tocar cada microservicio",
    ],
  },
  internacionalizacion: {
    title: "Internacionalización y multilenguaje",
    description:
      "Traducción optimizada para los mercados e idiomas del cliente, con caché en CDN y render combinado SSR/CSR.",
    context:
      "El cliente opera en varios mercados con idiomas distintos. Las traducciones tenían que servirse rápido y sin penalizar el rendimiento de la aplicación.",
    approach:
      "Traducción por idioma y mercado apoyada en caché de CDN, combinando renderizado en servidor y en cliente según lo que conviniera a cada flujo.",
    impact: [
      "Contenido en el idioma correcto según el mercado del visitante",
      "Coste de la traducción amortiguado por la caché en CDN",
    ],
  },
};
