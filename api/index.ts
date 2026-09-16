import type { IncomingMessage, ServerResponse } from "http";
import { createApp } from "../server/app";
import { connectDb } from "../server/db";

/**
 * Vercel serverless entrypoint. vercel.json rewrites /api/(.*) yahan bhejta hai —
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
