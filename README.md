# Karui

**Zero dependencies. 12.5 kB gzipped. Islands, SSR streaming, and file-based routing — out of the box.**

Karui is a full-stack TypeScript framework with its own JSX runtime. No React. No Preact. No mandatory runtime dependencies. Just fast, lightweight, production-ready apps.

```bash
npx @rigbyhost/karui create my-app
cd my-app
bun dev
```

---

## Why Karui?

Most frameworks ask you to assemble a puzzle:

| What you need | React ecosystem | Karui |
|---|---|---|
| UI runtime | `react` + `react-dom` (~130 kB) | built-in |
| Routing | `react-router` (~30 kB) | built-in |
| i18n | `react-i18next` (~20 kB) | built-in |
| SSR | Next.js (~100 kB+) | built-in |
| State | Redux / Zustand / Jotai | built-in |
| **Total** | **300 kB+** | **12.5 kB gzipped** |

Karui ships everything you need in a single package. No plugin hunting. No compatibility issues. No version hell.

---

## Features

- **Own JSX runtime** — full React-compatible API (`useState`, `useEffect`, `useReducer`, `useMemo`, `useCallback`, `useRef`, `createContext`, `useContext`) without React
- **File-based routing** — drop a file in `pages/`, get a route
- **Nested layouts** — `pages/layout.tsx`, `pages/docs/layout.tsx`, infinitely nestable
- **Route loaders** — `export function loader(ctx)` for server-side data fetching
- **SSR streaming** — `renderWithRouterStream`, `createHtmlChunkStream`, `streamToNodeResponse`
- **Islands architecture** — `defineIsland` + `hydrateIslands` for partial hydration
- **Three hydration modes** — `full`, `none` (pure HTML), `islands`
- **Error boundaries** — global `pages/error.tsx` and per-route `export const errorBoundary`
- **SPA navigation** — `<Link href="/route" />` with no full-page reloads
- **Legacy browser build** — IIFE bundle targeting ES2015 for `<script>` tag usage
- **Zero prod dependencies** — nothing sneaks into your `node_modules` at runtime

---

## Getting Started

```bash
npx @rigbyhost/karui create my-app
cd my-app
bun dev       # or npm run dev / pnpm dev
```

CLI options:

```bash
npx @rigbyhost/karui create my-app --pm bun
npx @rigbyhost/karui create my-app --no-install
npx @rigbyhost/karui create my-app --force
```

---

## Project Structure

```
my-app/
├── src/
│   ├── pages/
│   │   ├── layout.tsx          # root layout
│   │   ├── index.tsx           # → /
│   │   ├── about.tsx           # → /about
│   │   ├── 404.tsx             # not found page
│   │   └── docs/
│   │       ├── layout.tsx      # nested layout for /docs/*
│   │       └── [slug].tsx      # → /docs/:slug
│   └── entry.tsx
├── package.json
└── vite.config.ts
```

---

## Routing

### Basic page

```tsx
// src/pages/about.tsx
export default function About() {
  return <h1>About</h1>
}
```

### Dynamic route

```tsx
// src/pages/docs/[slug].tsx
export default function Doc({ params }: { params: { slug: string } }) {
  return <h1>Doc: {params.slug}</h1>
}
```

### Route loader

```tsx
export async function loader(ctx) {
  const data = await fetchSomething(ctx.params.slug)
  return data
}

export default function Page({ data }) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
```

### Not found

```tsx
import { notFound } from '@rigbyhost/karui/router'

export async function loader(ctx) {
  const post = await getPost(ctx.params.slug)
  if (!post) notFound()
  return post
}
```

---

## JSX Runtime

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@rigbyhost/karui"
  }
}
```

Import hooks directly:

```tsx
import { useState, useEffect, useRef } from '@rigbyhost/karui/jsx'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

---

## SSR Modes

Hydration mode is configured in `src/app.tsx` via `defineCounterSite`:

### Full hydration (default)

```ts
// src/app.tsx
export const site = defineCounterSite({
  pages,
  layout: Layout,
  hydrateMode: 'full',
})
```

### No hydration — pure HTML, zero client JS

```ts
// src/app.tsx
export const site = defineCounterSite({
  pages,
  layout: Layout,
  hydrateMode: 'none',
})
```

### Islands — hydrate only what needs interactivity

```tsx
// src/app.tsx
export const site = defineCounterSite({
  pages,
  layout: Layout,
  hydrateMode: 'islands',
})
```

```tsx
// src/components/Counter.tsx
import { defineIsland } from '@rigbyhost/karui/ssr'
import { useState } from '@rigbyhost/karui/jsx'

export const Counter = defineIsland(() => {
  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>{n}</button>
})
```

```tsx
// In your page — only Counter ships JS to the client
import { hydrateIslands } from '@rigbyhost/karui/ssr'
import { Counter } from '../components/Counter'

export default function Page() {
  return (
    <div>
      <p>This is pure HTML — no JS sent to client</p>
      <Counter />  {/* only this is hydrated */}
    </div>
  )
}
```

---

## SSR Streaming

```ts
import { renderWithRouterStream, streamToNodeResponse } from '@rigbyhost/karui/ssr'

// In your Node.js server handler:
const stream = await renderWithRouterStream(request, router)
streamToNodeResponse(stream, response)
```

---

## Bundle Size

| | Size |
|---|---|
| Minified | 34.8 kB |
| Minified + gzipped | **12.5 kB** |
| Download on slow 3G | 250 ms |
| Download on 4G | 14 ms |

---

## Contributing

```bash
git clone https://github.com/Rigby-Foundation/BetterHelperjs
cd BetterHelperjs
npm install
npm run check
npm run test
npm run build
npm run dev       # starts the test SSR site from ./site
```

Test site pages live in `site/src/pages/`.

---

## Security

Security vulnerabilities should be reported via [GitHub Security Advisories](https://github.com/Rigby-Foundation/BetterHelperjs/security/advisories/new). Please do not open public issues for security bugs.

---

## License

[LGPL-3.0](./LICENSE)

---

## Attribution

Original idea and architecture: [`newHelper-js`](https://github.com/MIOBOMB/newHelper-js/) by MIOBOMB.