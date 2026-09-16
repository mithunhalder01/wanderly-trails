import type { IncomingMessage, ServerResponse } from "http";
import { createApp } from "./app";
import { connectDb } from "./db";

/**
 * Vercel serverless entrypoint ka SOURCE — deploy hone wali file `api/index.js`
 * hai, jo `pnpm build` ke waqt isko poore server/ + shared/ code ke saath ek
 * single self-contained bundle me compile karti hai (scripts/build-api.mjs).
 * Yeh isliye taaki Vercel ke runtime module-resolution pe depend na karna pade
 * (relative imports cross-directory me fail ho rahe the — ERR_MODULE_NOT_FOUND).
 *
 * Express app hi seedha handler hai. Sirf DB connect yahan hota hai (cached,
 * warm invocations me turant reuse); seeding jaanbujh kar yahan nahi hai — wo
 * `pnpm seed:prod` se ek baar manually chalti hai, taaki har cold start par
 * extra queries/risk na ho.
 */
const app = createApp();

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    await connectDb();
  } catch (err) {
    console.error("[api] DB connection failed:", (err as Error).message);
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Service temporarily unavailable" }));
    return;
  }
  app(req, res);
}
