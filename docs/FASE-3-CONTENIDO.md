# Fase 3 — Contenido real

## Estado actual

Ya actualicé los datos. **El proyecto no compila ahora mismo**, y es intencional: cambié la forma de `Experience` y de `TechCategory`, así que los componentes que los consumen están desalineados. Los prompts 1 y 2 los realinean.

Archivos que ya tienen contenido real:

| Archivo | Qué cambió |
| --- | --- |
| `src/types/index.ts` | `Experience` sin fechas, con `highlights` y `clients`. Nuevas categorías de `Tech`. Nuevo tipo `SocialLink` |
| `src/config/site.ts` | Nombre real, rol, ubicación, las 4 redes y `socialLinks` |
| `src/data/about.ts` | Bio en 4 párrafos, `heroTagline` y `aboutFacts` |
| `src/data/experience.ts` | Globant y Great Place To Work®, sin fechas |
| `src/data/contact.ts` | Titular, cuerpo, CTA y detalles con Bogotá |

Pendiente: `src/data/stack.ts`, los componentes y el footer.

---

## Decisión de diseño sobre el stack

Tu lista mezcla dos cosas distintas:

**Herramientas con logo** (React, Next.js, Docker, Datadog…) → icono + nombre.

**Metodologías y patrones** (SCRUM, microfrontends, Module Federation, microservicios, SDD, CI/CD, REST APIs, Prompt Engineering) → **no tienen logo**, porque no son marcas. Si intentas darles icono acabas inventando glifos genéricos que se ven improvisados.

Van en un bloque aparte, como pills de texto. Además comunican mejor: un recruiter técnico lee "Module Federation" y entiende tu nivel; un logo no le dice nada.

Dos notas de la lista:

- **"CI/CI Workflows"** → asumí que es CI/CD.
- **"cubernetes"** → Kubernetes, slug `kubernetes`.
- **SDD** lo interpreté como *Spec-Driven Development*. Si te referías a otra cosa, corrígelo en el prompt 2.

---

## Prompts

### Prompt 1 — Realinear componentes con los tipos nuevos

```
Cambié src/types/index.ts: Experience ya no tiene startDate ni endDate, y ahora
tiene highlights: string[] y clients?: string[]. TechCategory ahora es
frontend | lenguaje | backend | testing | devops | observabilidad | ia.

Actualiza src/components/ExperienceTimeline.tsx: elimina el formateo de fechas
por completo, renderiza highlights como lista con viñetas y, cuando exista
clients, muéstralo como una línea "Clientes: Disney · British Airways".
Mantén el manejo del flag confidential.

Actualiza src/components/TechStack.tsx con las categorías nuevas en
CATEGORY_ORDER, CATEGORY_LABELS y el acumulador de groupByCategory.
Etiquetas: Frontend, Lenguajes, Backend & Data, Testing & QA, DevOps,
Observabilidad, IA.

Corre npm run typecheck y arregla lo que quede roto.
```

### Prompt 2 — Stack completo con logos reales

```
Reescribe src/data/stack.ts con estas tecnologías, agrupadas por categoría:

frontend: React, Next.js, Tailwind CSS, Webpack
lenguaje: TypeScript, JavaScript, HTML5, CSS3
backend: Node.js, MySQL
testing: Vitest, Jest, Cypress, Postman, Bruno, Lighthouse
devops: Git, GitHub, GitLab, Jenkins, Docker, Kubernetes, AWS
observabilidad: Splunk, Datadog, Jira
ia: Anthropic Claude, GitHub Copilot

Para cada una descarga el path real con:
  curl -s https://cdn.simpleicons.org/<slug>
y copia el atributo d del <path>. Verifica cada slug antes: si alguno devuelve
404, dímelo en vez de inventar el path. Ojo con nextdotjs, nodedotjs,
tailwindcss, css, amazonwebservices y githubcopilot.

Añade además un export separado:
  export const methodologies: string[]
con: Microfrontends, Module Federation, Microservicios, Arquitectura BFF,
REST APIs, CI/CD, SCRUM, Spec-Driven Development, MCP, Prompt Engineering,
Responsive Design.

Estas NO llevan icono: no son marcas.

Luego actualiza TechStack.tsx para renderizar methodologies en un bloque final
titulado "Metodologías y arquitectura", usando el componente Pill.
```

### Prompt 3 — Iconos de redes y footer

```
Rellena el campo path de socialLinks en src/config/site.ts descargando los
paths reales de simpleicons.org: gmail, linkedin, github, instagram.

Reescribe src/components/layout/site-footer.tsx: mantén la línea de copyright
con siteConfig.name y añade a la derecha los iconos de socialLinks filtrados
por inFooter.

Requisitos: enlaces externos con target="_blank" y rel="noopener noreferrer";
aria-label desde el campo ariaLabel; área táctil mínima de 44x44px;
focus-visible con anillo indigo; color gris secundario con hover a indigo.
En móvil el footer pasa a columna, centrado.
```

### Prompt 4 — Página de contacto

```
Reescribe src/app/contacto/page.tsx con el contenido nuevo de
src/data/contact.ts: contactHeadline como h1, contactBody en párrafos,
contactDetails en una lista de definición (dl/dt/dd), y los socialLinks
completos como botones con icono y etiqueta visible.

El email debe ser el CTA principal y visualmente dominante; el resto,
secundarios. Sin formulario.
```

### Prompt 5 — Sobre mí

```
Actualiza src/app/sobre-mi/page.tsx: renderiza aboutFacts como una fila de
datos bajo el título, los 4 párrafos de about, el ExperienceTimeline y el
TechStack en variante full.

Verifica la jerarquía de headings: un solo h1, y h2 para cada sección.
```

### Prompt 6 — Hero y metadatos

```
Actualiza Hero.tsx para usar siteConfig.role como etiqueta superior,
siteConfig.name en el h1 y heroTagline de about.ts como propuesta de valor.
Añade la ubicación (siteConfig.location.display) como dato discreto.

Actualiza la metadata de layout.tsx con el título y descripción nuevos de
siteConfig, e incluye keywords relevantes y openGraph con locale es_CO.
```

### Prompt 7 — Revisión y publicación

```
Usa code-reviewer sobre todos los cambios de contenido de esta rama.
```

Y después:

```
Usa devops para agrupar los cambios en commits temáticos (contenido, componentes,
footer) y hacer push a main.
```

---

## Commit y push manual

Yo no puedo hacerlo desde aquí: no tengo tus credenciales de GitHub ni permiso de escritura sobre `.git` en esta sesión. Si prefieres no usar el agente:

```bash
cd ~/Documents/mi_proyecto_web
npm run lint && npm run typecheck && npm run build

git add -A
git commit -m "feat: reemplazar contenido placeholder por informacion real"
git push origin main
```

No hagas push sin que el build pase: cada push a `main` dispara un deploy de producción en Vercel.

---

## Antes de publicar, revisa dos cosas

**Nombres de cliente.** `experience.ts` expone Disney y British Airways. Nombrar al cliente final desde una consultora es habitual en LinkedIn, pero algunos NDAs lo restringen explícitamente. Es tu llamada; el archivo lleva un comentario recordándolo.

**Tu regla de confidencialidad.** El `CLAUDE.md` dice que tu trabajo actual es confidencial, pero ahora Globant aparece con nombre. Si sigue siendo confidencial, pon `confidential: true` en esa entrada y actualiza la regla del `CLAUDE.md` para que no se contradigan.
