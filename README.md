# Portafolio

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · ESLint 9

## Empezar

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Scripts

| Script | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servir el build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Comprobación de tipos |

## Estructura

```
src/
├── app/                  # Rutas (App Router)
│   ├── layout.tsx        # Layout raíz: header + footer
│   ├── page.tsx          # Home
│   └── globals.css       # Estilos globales + Tailwind
├── components/
│   ├── layout/           # Header, footer, navegación
│   └── ui/               # Componentes reutilizables
├── config/site.ts        # Configuración única del sitio (nav, links, SEO)
├── lib/                  # Utilidades (cn, formatDate…)
└── types/                # Tipos compartidos
```

Alias de importación: `@/*` → `src/*`

## Siguientes pasos

Rutas sugeridas a crear en `src/app/`: `proyectos/`, `sobre-mi/`, `contacto/`.
