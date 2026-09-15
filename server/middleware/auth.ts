import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { AdminUserModel } from "../models";
import { HttpError } from "./validate";

export const ADMIN_COOKIE = "wt_admin";

export interface AdminClaims {
  sub: string;
  email: string;
  role: "owner" | "editor";
}

declare module "express-serve-static-core" {
  interface Request {
    admin?: AdminClaims;
  }
}

/**
 * Admin routes ka gate. Abhi ADMIN_AUTH=off hai to seedha pass —
 * jab on hoga to httpOnly cookie me JWT chahiye hoga.
 * Baaki sab (rate limit, validation, sanitize) auth ke bina bhi chalu hai.
 */
export async function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (!config.adminAuth) {
    req.admin = { sub: "local", email: "admin@local", role: "owner" };
    return next();
  }

  const token = req.cookies?.[ADMIN_COOKIE];
  if (!token) return next(new HttpError(401, "Login required"));

  try {
    const claims = jwt.verify(token, config.jwtSecret, { algorithms: ["HS256"] }) as AdminClaims;
    const user = await AdminUserModel.findById(claims.sub).lean();
    if (!user || !user.active) return next(new HttpError(401, "Account disabled"));
    req.admin = { sub: String(user._id), email: user.email, role: user.role };
    next();
  } catch {
    next(new HttpError(401, "Session expired, please login again"));
  }
}

export function signAdminToken(claims: AdminClaims) {
  return jwt.sign(claims, config.jwtSecret, { algorithm: "HS256", expiresIn: "12h" });
}

/** Sirf owner kar sake — jaise users manage karna, data wipe karna. */
export function requireOwner(req: Request, _res: Response, next: NextFunction) {
  if (req.admin?.role !== "owner") return next(new HttpError(403, "Owner access required"));
  next();
}
