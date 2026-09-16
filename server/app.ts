import express from "express";
import path from "path";
import fs from "fs";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { sanitizeInput } from "./middleware/security";
import { errorHandler } from "./middleware/validate";
import { adminRouter } from "./routes/admin";
import { invalidateContentCache, publicRouter } from "./routes/public";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", 1); // Render/Railway/nginx ke peeche sahi client IP (rate-limit ke liye)

  app.use(
    helmet({
      // Site khud Unsplash/YouTube etc. se assets leti hai — CSP ko site ke liye relax rakha,
      // API responses pe baaki headers (nosniff, frameguard, HSTS) lagte hain.
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
      crossOriginEmbedderPolicy: false,
    }),
  );

  app.use(
    cors({
      origin(origin, cb) {
        // Browser same-origin fetch/POST ke saath bhi Origin header bhejta hai —
        // usse reject karna galat hai. Site + API ek hi Vercel deployment pe
        // hone se koi genuine cross-origin restriction chahiye hi nahi by default.
        if (!origin) return cb(null, true); // no Origin header (same-origin ya non-browser client)
        if (config.corsOrigins.length === 0) return cb(null, true); // explicit allowlist nahi di → sab allow
        if (config.corsOrigins.includes(origin)) return cb(null, true);
        if (!config.isProd && /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/.test(origin)) return cb(null, true);
        cb(new Error("Not allowed by CORS"));
      },
      credentials: true,
    }),
  );

  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: false, limit: "100kb" }));
  app.use(sanitizeInput);

  app.get("/api/health", (_req, res) => res.json({ ok: true, env: config.env, auth: config.adminAuth }));

  app.use("/api/public", publicRouter);

  // Admin ne kuch bhi likha → public cache purana ho gaya
  app.use("/api/admin", (req, res, next) => {
    if (req.method !== "GET") res.on("finish", () => res.statusCode < 400 && invalidateContentCache());
    next();
  });
  app.use("/api/admin", adminRouter);

  // Uploaded files — sirf uploads folder, dotfiles nahi, index listing nahi
  app.use(
    "/uploads",
    express.static(config.uploadDir, {
      dotfiles: "deny",
      index: false,
      maxAge: "30d",
      setHeaders(res, filePath) {
        if (filePath.endsWith(".pdf")) res.setHeader("Content-Type", "application/pdf");
        res.setHeader("X-Content-Type-Options", "nosniff");
      },
    }),
  );

  app.all("/api/{*rest}", (_req, res) => res.status(404).json({ error: "Not found" }));

  // Production: built React app isi server se
  if (fs.existsSync(path.join(config.staticDir, "index.html"))) {
    app.use(express.static(config.staticDir, { index: false, maxAge: "1h" }));
    app.get("{*rest}", (_req, res) => {
      res.sendFile(path.join(config.staticDir, "index.html"));
    });
  }

  app.use(errorHandler);
  return app;
}
