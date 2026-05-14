# Wanderly Trails

Marketing and booking experience for Wanderly Trails: destinations, travel packages, blog, gallery, and contact flows. Built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Wouter** for routing.

## Prerequisites

- **Node.js** 20 or 22 (LTS recommended)
- **npm** 10+

If you use the [Dev Container](#dev-container-recommended), Node and dependencies are handled inside the container.

## Quick start

```bash
npm install
npm run dev
```

Then open the URL Vite prints (by default `http://localhost:5173`).

### Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start Vite dev server          |
| `npm run build`   | Production build               |
| `npm run serve`   | Preview production build       |
| `npm run typecheck` | TypeScript check, no emit    |

## Configuration

Copy the example environment file and adjust values as needed:

```bash
cp .env.example .env
```

| Variable    | Default | Purpose                                      |
| ----------- | ------- | -------------------------------------------- |
| `PORT`      | `5173`  | Dev / preview server port                      |
| `BASE_PATH` | `/`     | Vite `base` (use a subpath when hosted there) |

Do **not** commit `.env` if it contains secrets. `.gitignore` excludes `.env` by default.

## Dev Container (recommended)

This repo includes a **VS Code / Cursor Dev Container** so everyone gets the same Node version, extensions, and port forwarding without polluting the host machine.

1. Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension (Cursor includes compatible remote support).
2. **Command Palette** → **Dev Containers: Reopen in Container**.
3. After `postCreateCommand` finishes, run `npm run dev`.

The container runs as a non-root `node` user and only forwards the app port you configure (default **5173**).

## GitHub remote

If this folder is not yet linked to your GitHub repository, add `origin` and push (replace the URL if you use a different repo name):

```bash
git remote add origin https://github.com/mithunhalder01/wenderly-tails.git
# or, if origin already exists:
# git remote set-url origin https://github.com/mithunhalder01/wenderly-tails.git

git branch -M main
git push -u origin main
```

**Collaborators:** In GitHub, open the repository → **Settings** → **Collaborators** → add people by username or email (GitHub sends an invite).

## Project layout

- `src/` — App entry, pages, components, hooks, static data
- `public/` — Static assets served as-is
- `vite.config.ts` — Vite, React, Tailwind; reads `PORT` and `BASE_PATH`

## License

Private package (`"private": true` in `package.json`). Add a `LICENSE` file at the repo root when you choose a license for distribution.
