import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny, z } from "zod";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

/** Body ko schema se parse karo; fail ho to 400 + field-wise errors. */
export function validateBody<T extends ZodTypeAny>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const fields: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.join(".") || "_";
        if (!fields[key]) fields[key] = issue.message;
      }
      return next(new HttpError(400, "Validation failed", fields));
    }
    req.body = result.data as z.infer<T>;
    next();
  };
}

/** `:id` param — sirf positive integer chalega. */
export function parseNumericId(req: Request, _res: Response, next: NextFunction) {
  const raw = req.params.id;
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    return next(new HttpError(400, "Invalid id"));
  }
  res_locals(req).id = id;
  next();
}

function res_locals(req: Request): { id?: number } {
  return ((req as unknown as { locals?: { id?: number } }).locals ??= {});
}

export function getId(req: Request): number {
  return res_locals(req).id as number;
}

/** Express 5 async errors khud catch karta hai, but explicit wrapper padhne me saaf hai. */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message, details: err.details });
  }
  // multer file size / type errors
  const e = err as { code?: string; message?: string; status?: number; type?: string };
  if (e?.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "Origin not allowed" });
  }
  if (e?.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "File too large" });
  }
  if (e?.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body too large" });
  }
  if (e?.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  // Mongo duplicate key (slug clash etc.)
  if ((err as { code?: number }).code === 11000) {
    const keys = Object.keys((err as { keyValue?: Record<string, unknown> }).keyValue ?? {});
    return res.status(409).json({
      error: `Duplicate value for ${keys.join(", ") || "unique field"}`,
      details: Object.fromEntries(keys.map((k) => [k, "Already exists"])),
    });
  }
  console.error("[api] unhandled error:", err);
  // Stack trace client ko kabhi nahi
  res.status(500).json({ error: "Internal server error" });
}
