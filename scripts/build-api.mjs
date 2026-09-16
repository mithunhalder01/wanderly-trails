// Vercel ke `api/*` functions repo me jaisi files hain unhi ko deploy karte hain —
// koi bundling/tracing khud nahi karte jaisa expect kiya tha. Isliye humara poora
// server/ + shared/ (+ src/data ka content jo defaults.ts use karta hai) code
// esbuild se ek single self-contained `api/index.js` me bundle karte hain.
// node_modules (express, mongoose, sharp, ...) bundle nahi hote — wo normal
// dependencies rehte hain, Vercel khud `pnpm install` karke unhe le aata hai.
import { build } from "esbuild";
import { mkdir } from "fs/promises";

await mkdir("api", { recursive: true });

await build({
  entryPoints: ["server/serverless.ts"],
  outfile: "api/index.js",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  packages: "external", // node_modules external — sirf apna first-party code inline
  banner: {
    // esbuild ESM output me __dirname/require nahi deta, kuch packages (jaise
    // bcryptjs) CJS interop ke liye inhe expect karte hain
    js: "import { createRequire as __wtCreateRequire } from 'module';\nconst require = __wtCreateRequire(import.meta.url);",
  },
  logLevel: "info",
});

console.log("[build:api] api/index.js ready");
