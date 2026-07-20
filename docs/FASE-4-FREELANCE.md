# Fase 4 — Proyectos freelance

## Qué decidimos

- **Rol en Line Visualization:** diseño + build en Framer. Los tags reflejan eso, sin React/Next: sería falso y un recruiter técnico lo detecta al abrir el sitio (el `meta-generator` dice Framer).
- **Jerarquía:** los freelance van en su propia sección arriba, con acento indigo y card más grande. Debajo, "Experiencia corporativa" en tono más sobrio.

## Qué ya dejé hecho

- `public/projects/line-visualization.svg` — portada con la identidad del estudio (fondo carbón, marca "+", wordmark, "estudio creativo"). Para que la card no se vea plana.
- El andamiaje de enlace externo **ya existía**: `ProjectCard` pinta el botón "Ver proyecto" cuando el proyecto trae `url`, con `target="_blank"` y `rel="noopener noreferrer"`. No hay que tocar nada para el acceso externo.

---

## 1. Datos a añadir

### `src/data/projects.ts` — nueva entrada en `projectsBase`

Ponla **primera** del array (el orden de origen manda para la sección freelance):

```ts
{
  slug: "line-visualization",
  kind: "freelance",
  client: "Line Visualization",
  tags: ["Framer", "Diseño UI", "Responsive", "SEO"],
  year: 2025,
  image: "/projects/line-visualization.svg",
  url: "https://www.linevisualization.com/",
  featured: true,
},
```

### `src/data/projects.es.ts` — entrada en `projectsEs`

```ts
"line-visualization": {
  title: "Line Visualization — estudio creativo",
  description:
    "Sitio web para un estudio de visualización 3D arquitectónica: diseño y construcción en Framer con una estética sobria y narrativa.",
  context:
    "El estudio trabaja la imagen arquitectónica con un enfoque artístico y narrativo, y necesitaba una web que comunicara ese lenguaje —sobrio, honesto, cuidado— en lugar de una plantilla corporativa plana.",
  approach:
    "Diseño de la identidad visual del sitio y construcción completa en Framer: jerarquía tipográfica marcada, galería de trabajos destacados, sección de servicios y un flujo de trabajo por pasos, todo responsive y con los metadatos sociales y de SEO cuidados.",
  impact: [
    "Presencia web propia que refleja el tono del estudio sin recurrir a plantillas genéricas",
    "Recorrido claro: trabajos destacados, servicios y proceso en una sola narrativa",
    "Base mantenible en Framer que el estudio puede seguir actualizando sin depender de código",
  ],
},
```

### `src/data/projects.en.ts` — misma clave, en inglés

```ts
"line-visualization": {
  title: "Line Visualization — creative studio",
  description:
    "Website for an architectural 3D visualization studio: designed and built in Framer with a restrained, narrative aesthetic.",
  context:
    "The studio approaches architectural imagery with an artistic, narrative focus and needed a site that conveyed that language —restrained, honest, considered— rather than a flat corporate template.",
  approach:
    "Designed the site's visual identity and built it end to end in Framer: strong typographic hierarchy, a featured-work gallery, a services section and a step-by-step workflow, fully responsive with social and SEO metadata in place.",
  impact: [
    "A distinct web presence that reflects the studio's tone without generic templates",
    "A clear journey: featured work, services and process in a single narrative",
    "A maintainable Framer base the studio can keep updating without code",
  ],
},
```

> Nota honesta sobre `impact`: es cualitativo a propósito, igual que el resto. No inventes tráfico ni conversiones que no midieron.

---

## 2. Plantilla para futuros proyectos freelance

Cada proyecto nuevo son **tres bloques con la misma `slug`**. Copia esto y rellena:

**`projects.ts` (invariante):**

```ts
{
  slug: "",           // ascii sin tildes; será la URL y el nombre del SVG
  kind: "freelance",
  client: "",         // nombre del cliente o del producto
  tags: [],           // solo lo que de verdad usaste
  year: 2025,
  image: "/projects/<slug>.svg",
  url: "",            // enlace público al sitio
  featured: true,     // los freelance suelen ir destacados
},
```

**`projects.es.ts` y `projects.en.ts` (prosa, misma slug):** `title`, `description`, `context`, `approach`, `impact[]`.

**Portada:** un SVG `1200×630` en `public/projects/<slug>.svg`. Reutiliza `line-visualization.svg` como base y cambia colores/texto.

El tipado `Record<ProjectSlug, ProjectContent>` es tu red: si añades la slug en `projects.ts` pero olvidas la prosa en un idioma, **TypeScript no compila**. No hay huecos silenciosos.

### Checklist al añadir uno

- [ ] Entrada en `projects.ts` con `kind: "freelance"`.
- [ ] Prosa en `projects.es.ts` **y** `projects.en.ts`.
- [ ] Portada SVG en `public/projects/`.
- [ ] `npm run typecheck` en verde.
- [ ] Botón "Ver proyecto" aparece (lo dispara el campo `url`).

---

## 3. Separar freelance de corporativo en la UI

Ahora mismo `FeaturedProjects` y `ProjectsByClient` no distinguen `kind`. Prompt para el cambio:

```
En la página /proyectos y en la home, separa los proyectos por kind.

Crea un componente FreelanceProjects que renderice primero los proyectos con
kind "freelance", bajo un encabezado "Proyectos freelance", con tratamiento
destacado: acento indigo en el borde de la card al hover ya existe, añade una
card a mayor tamaño (una columna en móvil, dos en desktop pero con la primera
freelance ocupando el ancho si es la única) y un badge "Freelance" en indigo.

Debajo, un bloque "Experiencia corporativa" más sobrio, que reutilice
ProjectsByClient para los proyectos con kind "corporativo", sin badge y con
tipografía más contenida.

Respeta la jerarquía de headings: h2 para cada bloque. No dupliques ProjectCard:
pásale un prop `emphasis` para el tratamiento destacado en lugar de clonar el
componente.
```

Y para la home:

```
Actualiza FeaturedProjects para que, entre los featured, los freelance aparezcan
primero y con el badge. El grid sigue igual; solo cambia el orden y el badge.
```

---

## 4. Revisión y publicación

```
Usa code-reviewer sobre los cambios de proyectos freelance de esta rama.
```

```
Usa devops para commitear (feat: añadir proyectos freelance y sección destacada)
y hacer push a main.
```

---

## Una nota sobre marcas

Estás mostrando el nombre y la identidad de Line Visualization en tu portafolio. Es tu trabajo y tienes derecho a exhibirlo, pero es buena práctica avisar al cliente de que lo usarás como referencia — sobre todo si enlazas a su sitio en producción. Un mensaje basta; casi siempre les gusta.
