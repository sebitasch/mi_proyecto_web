# Plan de construcción del portafolio con Claude Code

Documento operativo. Léelo una vez, después usa solo la sección de fases.

---

## 0. Instalación de esta configuración

Los archivos de agentes están en `docs/claude-setup/` porque se generaron desde una sesión sin permiso de escritura sobre `.claude/`. Muévelos una sola vez:

```bash
cd ~/Documents/mi_proyecto_web
mkdir -p .claude/agents .claude/rules
mv docs/claude-setup/visual-designer.md    .claude/agents/
mv docs/claude-setup/component-builder.md  .claude/agents/
mv docs/claude-setup/code-reviewer.md      .claude/agents/
mv docs/claude-setup/devops.md             .claude/agents/
mv docs/claude-setup/rules-components.md   .claude/rules/components.md
rmdir docs/claude-setup
```

Verifica dentro de Claude Code con `/agents`. Deben aparecer los cuatro.

---

## 1. Arquitectura de contexto

Cinco mecanismos, y cada uno tiene un momento correcto. Usar el equivocado es la fuente número uno de desperdicio de tokens.

| Mecanismo | Cuándo se carga | Para qué sirve | Coste |
| --- | --- | --- | --- |
| `CLAUDE.md` | Toda sesión, completo | Reglas invariantes: stack, paleta, convenciones | Alto — todo lo que metas se paga siempre |
| `.claude/rules/*.md` con `paths` | Solo al tocar archivos que hacen match | Reglas de un área concreta del código | Bajo |
| Skills | Solo al invocarlas o cuando Claude las juzga relevantes | Procedimientos repetibles multi-paso | Muy bajo |
| Subagentes | Solo al delegarles una tarea | Roles con contexto aislado | Nulo en la conversación principal |
| Auto memory | Toda sesión, primeras 200 líneas | Lo que Claude aprende de tus correcciones | Medio |

La regla práctica: **si algo no aplica a toda sesión, no va en `CLAUDE.md`.**

Tu `CLAUDE.md` actual está bien dimensionado (~70 líneas). Mantenlo por debajo de 200. Cada vez que te den ganas de añadirle un procedimiento largo, conviértelo en skill o en regla path-scoped.

### El punto clave sobre subagentes y tokens

Un subagente corre en su propia ventana de contexto. Lee 8 archivos, razona, y devuelve a la conversación principal solo su reporte final. Esos 8 archivos nunca entran en tu contexto principal.

Esto invierte la intuición: **delegar consume menos contexto principal que hacerlo tú en la conversación**. El coste está en que el subagente arranca en frío y re-deriva contexto, así que no delegues tareas triviales — delega las que implican leer mucho y devolver poco.

---

## 2. Roles definidos

Cuatro agentes, con fronteras deliberadas:

- **`visual-designer`** — decide, no implementa. Solo `Read/Glob/Grep`, así que es incapaz de tocar código aunque quiera. Devuelve una spec de máximo 40 líneas.
- **`component-builder`** — implementa una spec ya cerrada. Tiene todas las herramientas. No decide diseño ni instala dependencias.
- **`code-reviewer`** — audita el diff, no el repo. Reporta por severidad, no arregla.
- **`devops`** — git, ramas, commits, CI, diagnóstico de builds de Vercel.

La separación diseñador/constructor importa: cuando un solo agente diseña e implementa a la vez, racionaliza sus propias decisiones de diseño mientras escribe el código y el resultado tiende a lo genérico.

---

## 3. Fases de construcción

Una fase = una rama = un push = un deploy. En ese orden.

### Fase 1 — Capa de datos

Antes que cualquier UI. Si los tipos están bien, los componentes salen solos.

```
Crea src/data/projects.ts y src/data/experience.ts con datos tipados desde
src/types/index.ts. Amplía los tipos si hace falta. Deja 3 proyectos de ejemplo
con campos vacíos que yo rellenaré: no inventes contenido.
```

### Fase 2 — Sección de proyectos

Dos prompts, en dos mensajes separados. No los juntes.

```
Usa el subagente visual-designer para especificar la sección de proyectos:
grid de tarjetas en /proyectos más un preview de los 3 destacados en la home.
```

Revisa la spec. Corrige lo que no te guste **antes** de implementar — corregir una spec cuesta 200 tokens, corregir código cuesta 5.000.

```
Usa component-builder para implementar la spec anterior. Crea
src/app/proyectos/page.tsx y src/components/ProjectCard.tsx.
```

### Fase 3 — Sobre mí y contacto

```
Usa visual-designer para especificar /sobre-mi y /contacto. Contacto sin
formulario: enlaces directos a email, GitHub y LinkedIn desde site.ts.
```

Un formulario de contacto exige backend, validación, antispam y manejo de errores. Para un portafolio, un `mailto:` convierte igual de bien y te ahorra una semana.

### Fase 4 — SEO y metadatos

```
Añade metadata por ruta con generateMetadata, Open Graph con imagen,
sitemap.ts y robots.ts. Verifica que metadataBase apunta a la URL de producción.
```

### Fase 5 — Auditoría

```
Usa code-reviewer sobre todo lo acumulado en esta rama.
```

```
Usa devops para preparar el commit y el push.
```

### Fase 6 — CI

```
Usa devops para crear .github/workflows/ci.yml con lint, typecheck y build
en push y pull request. Sin deploy: de eso se encarga Vercel.
```

---

## 4. Higiene de contexto por sesión

Lo que más presupuesto te ahorra, en orden de impacto:

1. **Una sesión por fase.** Al terminar una fase, `/clear`. Arrastrar el contexto de la fase 2 hasta la fase 6 multiplica el coste de cada mensaje posterior, porque la conversación entera se reenvía en cada turno.
2. **`@` en vez de "busca".** `@src/components/Hero.tsx` carga un archivo. "Busca dónde está el hero" lanza varias herramientas de búsqueda que leen fragmentos de medio repo.
3. **Plan mode para lo ambiguo.** Cambiar un plan de texto es barato; deshacer código escrito es caro. Actívalo desde el indicador de modo en la caja de prompt.
4. **Evita `/compact` como estrategia.** Compactar es un resumen con pérdida y cuesta tokens generarlo. Es red de seguridad, no plan.
5. **Un objetivo por mensaje.** Pedir cinco cosas a la vez produce respuestas largas donde el 60% no te sirve, y ese 60% se queda en el contexto de todos los turnos siguientes.
6. **Modelo según la tarea.** Sonnet para implementar; reserva el modelo más pesado para arquitectura y depuración difícil. En Pro se nota rápido.

---

## 5. Límites reales

### Vercel Hobby

100 deploys cada 24 horas. Para un portafolio de una persona es inalcanzable — no cambies tu forma de trabajar por esto. El único matiz: las preview de ramas también cuentan, así que si automatizas pushes con CI, tenlo presente.

Lo que sí importa del plan Hobby es que es solo para uso no comercial.

### Claude Pro

Dos límites simultáneos: una ventana móvil de 5 horas y un tope semanal. El presupuesto es **compartido entre Claude Code, claude.ai y Cowork** — lo que gastes en uno te lo quita a los otros.

Ejecuta `/usage` dentro de Claude Code. Además de las barras de consumo, desglosa qué te está costando el presupuesto: fallos de caché, contexto largo, sesiones con muchos subagentes. Es el único dato fiable sobre tu propio patrón de uso; todo lo demás es especulación.

---

## 6. Claude Code en VS Code

Ya tienes la extensión. Lo que falta para exprimirla:

**Instala el CLI aparte.** La extensión trae su propia copia interna, pero no pone `claude` en el PATH. Sin el CLI no tienes `claude mcp add`, ni `claude --resume`, ni los comandos que solo existen en terminal. Instálalo y ejecútalo desde la terminal integrada.

**Ajustes recomendados** (`Cmd+,` → Extensions → Claude Code):

| Ajuste | Valor | Motivo |
| --- | --- | --- |
| `initialPermissionMode` | `plan` | Cada conversación arranca planificando en vez de escribiendo |
| `preferredLocation` | `sidebar` | Claude visible mientras editas |
| `respectGitIgnore` | `true` (por defecto) | Evita que `node_modules` entre en las búsquedas |

**Atajos que sí vas a usar:**

- `Cmd+Esc` — saltar entre editor y Claude
- `Option+K` — insertar `@archivo.tsx#12-40` con tu selección exacta
- `Cmd+Shift+Esc` — nueva conversación en pestaña, para tareas laterales sin ensuciar la principal

**Checkpoints.** Pasa el cursor sobre cualquier mensaje anterior y puedes revertir el código a ese punto, bifurcar la conversación, o ambas. Es tu deshacer real cuando Claude toma un camino equivocado — mejor que pedirle que revierta, que cuesta tokens y a veces falla.

**MCP de GitHub**, si quieres que gestione issues y PRs desde el editor:

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \
  --header "Authorization: Bearer TU_PAT"
```

Verifica con `/mcp` que aparece como `connected`.

**Auto memory.** Está activo por defecto y guarda lo que aprende de tus correcciones en `~/.claude/projects/<proyecto>/memory/`. Revísalo con `/memory` cada par de semanas: si acumula cosas obsoletas, las arrastra a cada sesión. Es texto plano, lo puedes editar o borrar.

---

## 7. Qué NO hacer

- No pidas "construye todo el portafolio". Produce mucho código mediocre que después reescribes entero, pagando dos veces.
- No aceptes código sin leer el diff. Revisar es más barato que depurar.
- No metas procedimientos largos en `CLAUDE.md`. Van en skills o en reglas path-scoped.
- No instales una librería solo porque un agente la sugirió. Framer Motion cuando haya animaciones reales que justifiquen el peso, no antes.
