import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rootDir = path.resolve(import.meta.dirname);

export default defineConfig(async ({ command, mode }) => {
  // `command` hi bharosemand signal hai — NODE_ENV build ke waqt set ho bhi
  // sakta hai aur nahi bhi.
  const isDev = command === "serve";
  const env = loadEnv(mode, rootDir, "");

  const rawPort = env.PORT ?? "5173";
  const port = Number(rawPort);
  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }

  const basePath = env.BASE_PATH ?? "/";

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      // Replit ke dev-only plugins. Production bundle me inka koi kaam nahi —
      // sirf size aur dev-time code jaata hai.
      ...(isDev ? [runtimeErrorOverlay()] : []),
      ...(isDev && process.env.REPL_ID !== undefined
        ? [
            await import("@replit/vite-plugin-cartographer").then((m) =>
              m.cartographer({
                root: path.resolve(rootDir, ".."),
              }),
            ),
            await import("@replit/vite-plugin-dev-banner").then((m) =>
              m.devBanner(),
            ),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "src"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: rootDir,
    build: {
      outDir: path.resolve(rootDir, "dist/public"),
      emptyOutDir: true,
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom", "wouter"],
            "vendor-gsap": ["gsap", "@gsap/react"],
            "vendor-framer": ["framer-motion"],
            "vendor-swiper": ["swiper"],
            "vendor-lenis": ["lenis"],
            "vendor-radix": [
              "@radix-ui/react-dialog",
              "@radix-ui/react-tooltip",
              "@radix-ui/react-toast",
            ],
          },
        },
      },
    },
    server: {
      port,
      strictPort: true,
      host: "0.0.0.0",
      allowedHosts: true,
      fs: {
        strict: true,
      },
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
