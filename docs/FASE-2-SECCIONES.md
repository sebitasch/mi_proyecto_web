# Fase 2 — Secciones completas con contenido dummy

Objetivo: ver la estructura completa del sitio funcionando, con datos falsos pero realistas, para poder juzgar el diseño antes de escribir el contenido real.

---

## 1. Árbol de archivos objetivo

```
src/
├── app/
│   ├── page.tsx                    # MODIFICAR — home con previews de cada sección
│   ├── proyectos/
│   │   ├── page.tsx                # NUEVO — grid completo
│   │   └── [slug]/page.tsx         # NUEVO — detalle de proyecto
│   ├── sobre-mi/page.tsx           # NUEVO — bio + experiencia + stack
│   └── contacto/page.tsx           # NUEVO — enlaces directos
├── components/
│   ├── Hero.tsx                    # YA EXISTE
│   ├── TechIcon.tsx                # NUEVO — renderiza un logo desde su path
│   ├── TechStack.tsx               # NUEVO — la fila/grid de tecnologías
│   ├── ProjectCard.tsx             # NUEVO — tarjeta de proyecto
│   ├── ProjectGrid.tsx             # NUEVO — grid responsivo de tarjetas
│   ├── ExperienceTimeline.tsx      # NUEVO — timeline de experiencia
│   ├── SectionHeading.tsx          # NUEVO — encabezado reutilizable
│   └── ui/
│       ├── Button.tsx              # NUEVO — variantes solid / outline
│       └── Pill.tsx                # NUEVO — badge de tag
├── data/
│   ├── projects.ts                 # MODIFICAR — 6 proyectos dummy completos
│   ├── experience.ts               # YA EXISTE
│   └── stack.ts                    # NUEVO — tecnologías + paths de sus logos
└── types/index.ts                  # MODIFICAR — añadir Tech y campos de Project

public/
└── projects/                       # NUEVO — 6 portadas SVG placeholder
    ├── project-1.svg … project-6.svg
```

---

## 2. Estrategia de logos (lo importante)

### Por qué no usar `next/image` aquí

Quieres los logos **monocromos con hover**. Un SVG cargado como imagen externa no puede heredar el color del CSS: `next/image` lo trata como una caja opaca. Para recolorear tendrías que recurrir a filtros CSS, que es frágil y borroso.

La solución correcta es **SVG inline con `fill="currentColor"`**. El icono hereda el color del texto, el hover funciona con una clase Tailwind normal, y no genera peticiones de red adicionales.

### El truco que hace esto barato

Todos los iconos de [Simple Icons](https://simpleicons.org) son un único `path` en un viewBox de `0 0 24 24`. Eso significa que no necesitas 13 componentes ni 13 archivos: necesitas **un componente genérico** y **una tabla de datos** con el `d` de cada path.

`src/data/stack.ts`:

```ts
export const stack: Tech[] = [
  { name: "React", slug: "react", path: "M12 10.11c1.03..." },
  { name: "Next.js", slug: "nextdotjs", path: "M11.572 0c-.176..." },
  // …
];
```

`src/components/TechIcon.tsx`:

```tsx
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
  <path d={tech.path} />
</svg>
```

Añadir una tecnología nueva pasa a ser una línea en un array.

### De dónde salen los paths

```bash
curl -s https://cdn.simpleicons.org/react > /tmp/react.svg
```

El atributo `d` del `<path>` es lo único que necesitas copiar. Los slugs de tu lista:

| Tecnología | Slug | Nota |
| --- | --- | --- |
| React | `react` | |
| Next.js | `nextdotjs` | ojo: no es `nextjs` |
| TypeScript | `typescript` | |
| JavaScript | `javascript` | |
| HTML | `html5` | |
| CSS | `css` | antes era `css3` |
| Postman | `postman` | |
| Docker | `docker` | |
| AWS | `amazonwebservices` | ver nota de marcas abajo |
| GitHub | `github` | |
| Git | `git` | |
| Claude / Claude Code | `claude` | |
| LLMs | — | **no existe**: no es una marca |

Para "LLMs" usa un icono genérico propio (una chispa, un nodo, un cerebro esquemático) o preséntalo como pill de texto sin logo. Meter el logo de un proveedor concreto para representar "LLMs" sería inexacto.

Si algún slug ya no existe cuando lo busques, la lista de Simple Icons cambia: verifica en simpleicons.org antes de asumir.

### Accesibilidad

El logo va con `aria-hidden="true"` **y** el nombre visible en texto al lado o debajo. Un lector de pantalla no puede interpretar un path SVG, y un recruiter que no reconozca un logo tampoco. Nunca logos sueltos sin etiqueta.

### Nota de marcas

Los SVG de Simple Icons son CC0, pero **eso cubre el archivo, no el derecho de marca**: los logos siguen siendo propiedad de sus dueños. Mostrarlos en una lista de "tecnologías que manejo" es uso descriptivo estándar y es lo que hace todo el mundo. Lo que no debes hacer es usarlos de forma que sugiera patrocinio o certificación (AWS es especialmente estricto en sus guías). Si algún día pones una sección tipo "trusted by", ahí sí revisa las guías de cada marca.

---

## 3. Portadas de los proyectos

No uses servicios de placeholder externos (`placehold.co`, `picsum`): añaden una petición externa, pueden caerse, y en producción se ven como imágenes rotas.

Genera **SVG locales** en `public/projects/`. Pesan menos de 2 KB, escalan sin pixelarse y son deterministas. Formato `1200×630` para que sirvan también como imagen Open Graph cuando llegue la Fase 4.

---

## 4. Prompts, en orden

Uno por mensaje. No los juntes: cada uno debe terminar con `npm run typecheck` en verde antes del siguiente.

### Prompt 1 — Tipos y datos

```
Amplía src/types/index.ts con una interface Tech { name, slug, path, category }
donde category sea "frontend" | "lenguaje" | "herramienta" | "cloud" | "ia".

Añade a Project los campos: featured (boolean), role (string), problem (string),
solution (string), highlights (string[]).

Luego crea src/data/stack.ts con estas tecnologías: React, Next.js, TypeScript,
JavaScript, HTML, CSS, Postman, Docker, AWS, GitHub, Git, Claude Code, LLMs.
Descarga cada path SVG con curl desde https://cdn.simpleicons.org/<slug> y copia
el atributo d. Para LLMs no hay logo de marca: diseña un path genérico propio.
Verifica cada slug antes de usarlo.
```

### Prompt 2 — Proyectos dummy y portadas

```
Reescribe src/data/projects.ts con 6 proyectos dummy realistas para un perfil
frontend/fullstack: variados en stack y alcance, 2 marcados como featured.
Descripciones concretas y creíbles, sin lenguaje de relleno ni superlativos.
Marca claramente en un comentario del archivo que el contenido es placeholder.

Genera también 6 portadas SVG en public/projects/, 1200x630, usando solo la
paleta de CLAUDE.md: fondo claro, una composición geométrica distinta por
proyecto y el título en Inter. Sin librerías, SVG escrito a mano.
```

### Prompt 3 — Primitivas de UI

```
Usa component-builder para crear src/components/ui/Button.tsx (variantes solid
y outline, soporte para renderizar como Link o button, focus-visible correcto)
y src/components/ui/Pill.tsx. Refactoriza Hero.tsx para que los use en lugar de
sus clases inline.
```

### Prompt 4 — Stack visual

```
Usa component-builder para crear TechIcon.tsx y TechStack.tsx.

TechIcon: SVG inline, viewBox 0 0 24 24, fill currentColor, aria-hidden.
TechStack: agrupa por category, cada item muestra icono + nombre visible.
Monocromo en gris secundario, hover a indigo con transición. Grid responsivo.
Nada de animaciones de entrada.
```

### Prompt 5 — Sección de proyectos

```
Usa visual-designer para especificar la sección de proyectos: grid en /proyectos
y preview de los featured en la home.
```

Lee la spec, corrígela, y solo entonces:

```
Usa component-builder para implementar la spec: ProjectCard.tsx, ProjectGrid.tsx,
SectionHeading.tsx y src/app/proyectos/page.tsx. next/image con sizes correcto.
La tarjeta entera navegable con un solo enlace, sin enlaces anidados.
```

### Prompt 6 — Detalle de proyecto

```
Crea src/app/proyectos/[slug]/page.tsx con generateStaticParams desde
projects.ts, notFound() si el slug no existe, y estructura problema / solución /
highlights / stack. Añade generateMetadata por proyecto.
```

### Prompt 7 — Sobre mí y contacto

```
Usa component-builder para crear src/app/sobre-mi/page.tsx (bio, ExperienceTimeline
desde experience.ts respetando el flag confidential, y TechStack completo) y
src/app/contacto/page.tsx (enlaces directos a email, GitHub y LinkedIn desde
site.ts, sin formulario).

En ExperienceTimeline, cuando confidential sea true, omite el nombre de la
empresa y muestra solo rol, periodo, tipo de tareas y stack.
```

### Prompt 8 — Home y revisión

```
Reescribe src/app/page.tsx componiendo: Hero, TechStack, preview de proyectos
featured y un CTA final a contacto. Sin duplicar contenido de las rutas internas.
```

```
Usa code-reviewer sobre todo el trabajo de esta rama.
```

```
Usa devops para preparar commits agrupados por sección y hacer push.
```

---

## 5. Criterios de aceptación

Antes de dar la fase por cerrada:

- `npm run build` pasa sin warnings.
- Ningún `"use client"` en el árbol. Nada de esto necesita cliente todavía.
- Un solo `h1` por página; headings sin saltos de nivel.
- Navegación completa con teclado, con foco siempre visible.
- Todas las imágenes con `alt` descriptivo; los logos decorativos con `aria-hidden` y texto al lado.
- Legible a 320px de ancho sin scroll horizontal.
- Cero dependencias nuevas.
- Todo el contenido dummy marcado con un comentario `PLACEHOLDER` para que sea trivial encontrarlo después.

---

## 6. Sobre el orden

Datos antes que componentes, primitivas antes que secciones, secciones antes que home. La home es lo último precisamente porque compone todo lo demás: hacerla primero te obliga a rehacerla cada vez que cambia una sección.
