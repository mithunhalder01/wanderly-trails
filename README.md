# Wanderly Trails Website

A modern, responsive marketing website for **Wanderly Trails**—a travel and tour brand. The main application is a **React + Vite** single-page app with client-side routing, animated UI, and static content for destinations, packages, blog, booking flows, and contact.

This repository is a **pnpm monorepo**: the production-facing site lives under `artifacts/wanderly-trails`; other workspace packages support tooling, libraries, and optional sandboxes.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Scripts reference](#scripts-reference)
- [Environment variables](#environment-variables)
- [Monorepo layout](#monorepo-layout)
- [Application structure](#application-structure)
- [Building for production](#building-for-production)
- [Path aliases](#path-aliases)
- [Security & dependency policy](#security--dependency-policy)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **Hero & marketing sections** on the home page (image slider, trust metrics, featured destinations/packages, testimonials, newsletter).
- **Destinations** listing and **destination detail** pages.
- **Travel packages** listing, filters, and **package detail** pages.
- **Gallery**, **blog** (listing + post detail), **testimonials**, **FAQ**, **contact**, and **booking** flows.
- **Global layout**: navbar, footer, floating widgets (e.g. quick actions), toast notifications.
- **Forms** with validation (`react-hook-form` + `zod`).
- **Theming & UI** via Tailwind CSS v4, Radix primitives, and shared `components/ui` patterns (shadcn-style).
- **Animations** via Framer Motion where appropriate.
- **404** handling for unknown routes.

Data is largely **static** (see `src/data/staticData` and related modules)—suitable for a brochure site; wiring a real CMS or API would be a separate integration step.

---

## Tech stack

| Layer | Technology |
|--------|------------|
| Runtime | [Node.js](https://nodejs.org/) (LTS recommended) |
| Package manager | [pnpm](https://pnpm.io/) **only** (npm/yarn blocked by root `preinstall`) |
| App framework | [React 19](https://react.dev/) |
| Bundler / dev server | [Vite 7](https://vitejs.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) ~5.9 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) |
| Routing | [Wouter](https://github.com/molefrog/wouter) |
| Data / async | [@tanstack/react-query](https://tanstack.com/query) (defaults configured in `App.tsx`) |
| Icons | [Lucide React](https://lucide.dev/) |
| Motion | [Framer Motion](https://www.framer.com/motion/) |
| Charts (where used) | [Recharts](https://recharts.org/) |
| Carousels (UI kit) | [Embla Carousel](https://www.embla-carousel.com/) |

Optional **Replit-only** Vite plugins (Cartographer, dev banner) load when `REPL_ID` is set in development; they are skipped in a normal local/production environment.

---

## Prerequisites

- **Node.js** 20+ (project is tested with modern Node; Vite 7 and the toolchain expect a current runtime).
- **pnpm** 9+ (recommended). Install globally or use `corepack enable` + `corepack prepare pnpm@9 --activate`.

> **Note:** The root `package.json` `preinstall` script **refuses npm/yarn** and removes `package-lock.json` / `yarn.lock` if present. Always use `pnpm` from the repository root.

---

## Getting started

### 1. Clone and enter the repository

```bash
git clone https://github.com/veltrix-web/Wanderly-Trails.git
cd Wanderly-Trails
```

The upstream repository is hosted at **[github.com/veltrix-web/Wanderly-Trails](https://github.com/veltrix-web/Wanderly-Trails)**. If your local folder name differs (e.g. `Wanderly-Trails-Website`), `cd` into that directory before running `pnpm install`.

### 2. Install dependencies

From the **repository root**:

```bash
pnpm install
```

On first install, pnpm may prompt about **lifecycle scripts** (e.g. `esbuild`). If installs fail with “ignored build scripts”, see [Troubleshooting](#troubleshooting).

### 3. Run the Wanderly Trails site (development)

```bash
pnpm --filter @workspace/wanderly-trails dev
```

Or from the app directory:

```bash
cd artifacts/wanderly-trails
pnpm dev
```

By default the dev server listens on **http://localhost:5173** (see [Environment variables](#environment-variables) to change the port).

The Vite config binds to `0.0.0.0`, so the dev server is reachable on your LAN interface when needed.

### 4. Open in the browser

Visit `http://localhost:5173` (or your chosen `PORT`).

---

## Scripts reference

### Root (`package.json`)

| Script | Description |
|--------|-------------|
| `pnpm install` | Installs all workspace packages; enforces pnpm via `preinstall`. |
| `pnpm run typecheck` | Builds TypeScript project references, then runs `typecheck` in `artifacts/*` and `scripts` where defined. |
| `pnpm run typecheck:libs` | Runs `tsc --build` from the root TS solution. |
| `pnpm run build` | Runs full typecheck, then `build` in every workspace package that defines it. |

### `@workspace/wanderly-trails` (`artifacts/wanderly-trails`)

| Script | Description |
|--------|-------------|
| `pnpm dev` | Starts Vite in development with HMR. |
| `pnpm build` | Production build to `artifacts/wanderly-trails/dist/public`. |
| `pnpm serve` | Serves the production build locally (Vite preview). |
| `pnpm run typecheck` | `tsc --noEmit` for the app only. |

Other workspace packages (e.g. `@workspace/mockup-sandbox`, `scripts`) have their own `package.json` scripts if you need them.

---

## Environment variables

Consumed by **`artifacts/wanderly-trails/vite.config.ts`**:

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `5173` | Dev server and preview server port (`strictPort: true`). |
| `BASE_PATH` | `/` | Vite `base` option (subpath deployment, e.g. GitHub Pages). Must include leading slash. Trailing slash is normalized by the app router via `import.meta.env.BASE_URL`. |
| `NODE_ENV` | (set by tooling) | When `production`, Replit-only dev plugins stay disabled. |
| `REPL_ID` | (unset locally) | When set **and** `NODE_ENV !== "production"`, enables Replit Cartographer + dev banner plugins. |

**Example:**

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/wanderly-trails dev
```

There is no committed `.env.example`; add one locally if your team standardizes env files (not required for default local dev).

---

## Monorepo layout

```
Wanderly-Trails-Website/
├── package.json              # Workspace root (pnpm only)
├── pnpm-workspace.yaml       # Workspace globs, catalog, overrides, security policy
├── pnpm-lock.yaml
├── tsconfig.json             # Root TS solution
├── tsconfig.base.json
├── artifacts/
│   ├── wanderly-trails/      # Main marketing site (this README’s focus)
│   └── mockup-sandbox/       # Separate Vite sandbox package
├── lib/                      # Shared libraries / integrations (workspace members)
└── scripts/                  # Workspace scripts package
```

The **catalog** in `pnpm-workspace.yaml` pins shared dependency ranges across packages for consistency.

---

## Application structure

High-level layout of **`artifacts/wanderly-trails`**:

```
artifacts/wanderly-trails/
├── vite.config.ts
├── tsconfig.json
├── index.html
└── src/
    ├── main.tsx              # React root
    ├── App.tsx               # Router, layout, providers
    ├── index.css             # Global styles, Tailwind theme tokens
    ├── components/           # Navbar, Footer, cards, FloatingWidgets, ui/
    ├── pages/                # Route-level screens
    ├── data/                 # Static content & helpers
    └── hooks/                # e.g. toast hook
```

### Routes (from `App.tsx`)

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/destinations` | Destinations list |
| `/destinations/:id` | Destination detail |
| `/packages` | Packages list |
| `/packages/:id` | Package detail |
| `/gallery` | Gallery |
| `/blog` | Blog list |
| `/blog/:id` | Blog post |
| `/testimonials` | Testimonials |
| `/booking` | Booking |
| `/faq` | FAQ |
| `/contact` | Contact |
| `*` | Not found (within layout) |

---

## Building for production

From the repository root (includes monorepo typecheck + all package builds):

```bash
pnpm run build
```

To build **only** the Wanderly Trails app:

```bash
pnpm --filter @workspace/wanderly-trails build
```

Output directory: **`artifacts/wanderly-trails/dist/public`**.

Preview that output locally:

```bash
pnpm --filter @workspace/wanderly-trails serve
```

Deploy the **contents** of `dist/public` to any static host (Netlify, Vercel static, S3 + CloudFront, nginx, etc.). Set `BASE_PATH` at build time if the app is not served from the domain root.

---

## Path aliases

Defined in `vite.config.ts`:

| Alias | Resolves to |
|-------|-------------|
| `@/` | `artifacts/wanderly-trails/src/` |
| `@assets/` | Repository `attached_assets/` (if present; used for shared assets in some setups) |

Imports use `@/components/...`, `@/pages/...`, etc.

---

## Security & dependency policy

This workspace enables **pnpm `minimumReleaseAge`** (packages must be published for at least **1440 minutes** before install) to reduce supply-chain risk. Scoped exclusions exist for trusted publishers (see `pnpm-workspace.yaml`).

The file also defines **`onlyBuiltDependencies`** and **pnpm overrides** (for example, pinning `esbuild` and mapping `@esbuild-kit/esm-loader` to `tsx`) for reproducible, safer installs.

**Do not** commit `package-lock.json` or `yarn.lock`; the root preinstall removes them.

---

## Troubleshooting

### “Use pnpm instead”

Install dependencies with **pnpm** from the repo root, not `npm install` or `yarn`.

### `ERR_PNPM_IGNORED_BUILLS` / esbuild postinstall skipped

Allow trusted build scripts, then reinstall:

```bash
pnpm approve-builds --all
pnpm install
```

### Corepack / global `pnpm` errors on Node 20

If `pnpm` from Corepack fails with VM or dynamic import errors, run a known-good pnpm via npx:

```bash
npx pnpm@9.15.5 install
npx pnpm@9.15.5 --filter @workspace/wanderly-trails dev
```

### Port already in use (`strictPort: true`)

Change the port:

```bash
PORT=5174 pnpm --filter @workspace/wanderly-trails dev
```

### Strict Vite `fs.allow` / missing files

`vite.config.ts` sets `server.fs.strict: true`. Keep imports within the project (and allowed roots); avoid reading arbitrary paths outside the workspace from the dev server.

---

## Contributing (suggested)

1. Create a branch from `main` (or your default branch).
2. Run `pnpm run typecheck` before opening a PR.
3. Match existing formatting (Prettier is a root devDependency—configure your editor to format on save if desired).
4. Keep UI changes scoped and test responsive breakpoints (mobile navigation, hero, forms).

---

## License

Root `package.json` specifies **MIT**. Individual files may carry their own headers; default to MIT unless stated otherwise.

---

## Acknowledgments

- UI patterns and components are aligned with common **shadcn/ui** + **Radix** conventions.
- Hero and marketing imagery in static data may reference external CDNs (e.g. Unsplash); replace with licensed assets for production if required.
