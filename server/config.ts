import "dotenv/config";
import path from "path";

const rootDir = path.resolve(import.meta.dirname, "..");

function bool(v: string | undefined, fallback: boolean) {
  if (v === undefined || v === "") return fallback;
  return ["1", "true", "on", "yes"].includes(v.toLowerCase());
}

export const config = {
  rootDir,
  env: process.env.NODE_ENV ?? "development",
  isProd: process.env.NODE_ENV === "production",
  port: Number(process.env.API_PORT ?? 4000),
  mongoUri: process.env.MONGODB_URI ?? "",
  /** Sirf dev me: MONGODB_URI na ho to in-memory Mongo chala do. */
  allowMemoryDb: bool(process.env.ALLOW_MEMORY_DB, process.env.NODE_ENV !== "production"),
  /**
   * Admin auth abhi off hai (user ne bola pehle panel banao). Jab on karoge
   * to ADMIN_AUTH=on aur JWT_SECRET set karna hoga — middleware ready hai.
   */
  adminAuth: bool(process.env.ADMIN_AUTH, false),
  jwtSecret: process.env.JWT_SECRET ?? "",
  /** Comma-separated origins jo API call kar sakte hain. Khali = same-origin only. */
  corsOrigins: (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  uploadDir: path.resolve(rootDir, process.env.UPLOAD_DIR ?? "uploads"),
  maxUploadMb: Number(process.env.MAX_UPLOAD_MB ?? 25),
  /** Production me built site (dist/public) bhi isi server se serve hoti hai. */
  staticDir: path.resolve(rootDir, "dist/public"),
};

if (config.isProd) {
  if (!config.mongoUri) throw new Error("MONGODB_URI is required in production");
  if (config.adminAuth && config.jwtSecret.length < 32) {
    throw new Error("JWT_SECRET (min 32 chars) is required when ADMIN_AUTH=on");
  }
}
