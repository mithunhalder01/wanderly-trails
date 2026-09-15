import type { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";

/**
 * Mongo operator injection rokta hai: body/params/query me se
 * `$`-prefixed keys aur dotted keys hata deta hai.
 * (express-mongo-sanitize Express 5 ke saath kaam nahi karta, isliye apna.)
 */
function stripUnsafeKeys(value: unknown, depth = 0): unknown {
  if (depth > 20) return undefined; // deeply nested payload = suspicious
  if (Array.isArray(value)) return value.map((v) => stripUnsafeKeys(v, depth + 1));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k.startsWith("$") || k.includes(".") || k === "__proto__" || k === "constructor") continue;
      out[k] = stripUnsafeKeys(v, depth + 1);
    }
    return out;
  }
  return value;
}

export function sanitizeInput(req: Request, _res: Response, next: NextFunction) {
  if (req.body && typeof req.body === "object") {
    req.body = stripUnsafeKeys(req.body);
  }
  for (const k of Object.keys(req.params)) {
    if (k.startsWith("$")) delete (req.params as Record<string, string>)[k];
  }
  next();
}

/** Public API — thoda relaxed, but abuse na ho. */
export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

/** Forms (leads) — spam control. Per IP 10 submissions / 15 min. */
export const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many submissions. Please try again later." },
});

/** Admin API — writes bahut zyada nahi hone chahiye. */
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

/** Login brute-force guard (auth on hone par). */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many login attempts. Try again in 15 minutes." },
});

/** Uploads bhaari hote hain — alag limit. */
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 200,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
