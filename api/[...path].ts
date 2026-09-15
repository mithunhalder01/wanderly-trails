import type { IncomingMessage, ServerResponse } from "http";
import { createApp } from "../server/app";
import { connectDb } from "../server/db";
import { seedIfEmpty } from "../server/lib/seed";
import { ensureUploadDir } from "../server/lib/upload";

/**
 * Vercel serverless entrypoint — /api/** yahan aata hai (vercel.json rewrite).
 * Express app hi seedha handler hai; DB connect + seed sirf cold start pe ek
 * baar hota hai (warm invocations me turant reuse ho jata hai).
 */
const app = createApp();

let ready: Promise<void> | null = null;
function init() {
  if (!ready) {
    ready = (async () => {
      await connectDb();
      await ensureUploadDir();
      await seedIfEmpty();
    })().catch((err) => {
      ready = null; // fail hua to agli request phir try kare
      throw err;
    });
  }
  return ready;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  await init();
  app(req, res);
}
