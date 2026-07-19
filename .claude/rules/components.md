---
paths:
  - "src/components/**/*.tsx"
  - "src/app/**/*.tsx"
---

# Reglas para componentes React

- Server Component por defecto. `"use client"` solo con estado, efectos o handlers, y en el componente más hoja posible.
- Export nombrado, un componente por archivo, PascalCase.
- Props con `interface`, nunca `any`.
- `next/image` siempre; `<img>` nunca.
- Un solo `h1` por página. Headings en orden, sin saltos.
- Todo elemento interactivo necesita estado `focus-visible` visible.
- El contenido de negocio vive en `src/data/`, no en el JSX.
