import { Router } from "express";
import bcrypt from "bcryptjs";
import { adminUserCreateSchema, adminUserUpdateSchema, changePasswordSchema } from "../../shared/schemas";
import { ActivityModel, AdminUserModel } from "../models";
import { HttpError, asyncHandler, validateBody } from "../middleware/validate";

/** Mounted in admin.ts behind requireOwner — only the owner manages team accounts. */
export const usersRouter = Router();

const strip = (doc: Record<string, unknown>) => {
  delete doc._id;
  delete doc.passwordHash;
  return doc;
};

/** Team members list — owner ke alawa koi nahi dekh sakta (requireOwner admin.ts me lagta hai). */
usersRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const items = await AdminUserModel.find().sort({ createdAt: 1 }).lean({ transform: strip });
    res.json({ items });
  }),
);

usersRouter.post(
  "/",
  validateBody(adminUserCreateSchema),
  asyncHandler(async (req, res) => {
    const { email, name, role, password } = req.body as { email: string; name: string; role: "owner" | "editor"; password: string };
    const exists = await AdminUserModel.exists({ email });
    if (exists) throw new HttpError(409, "A user with this email already exists", { email: "Already in use" });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await AdminUserModel.create({ email, name, role, passwordHash, active: true });
    await ActivityModel.create({ action: "create", entity: "admin-user", targetId: String(user._id), summary: email, actor: req.admin?.email });
    res.status(201).json(strip(user.toObject()));
  }),
);

usersRouter.patch(
  "/:id",
  validateBody(adminUserUpdateSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const body = req.body as { name?: string; role?: "owner" | "editor"; active?: boolean; password?: string };

    // Apne aap ko owner se editor banana ya disable karna — bhool se lockout ho sakta hai
    if (String(req.admin?.sub) === id) {
      if (body.role === "editor") throw new HttpError(400, "You can't remove your own owner access");
      if (body.active === false) throw new HttpError(400, "You can't disable your own account");
    }

    const update: Record<string, unknown> = {};
    if (body.name !== undefined) update.name = body.name;
    if (body.role !== undefined) update.role = body.role;
    if (body.active !== undefined) update.active = body.active;
    if (body.password) update.passwordHash = await bcrypt.hash(body.password, 12);

    const user = await AdminUserModel.findByIdAndUpdate(id, { $set: update }, { new: true });
    if (!user) throw new HttpError(404, "User not found");
    await ActivityModel.create({
      action: "update",
      entity: "admin-user",
      targetId: id,
      summary: Object.keys(update).filter((k) => k !== "passwordHash").join(", ") || "password",
      actor: req.admin?.email,
    });
    res.json(strip(user.toObject()));
  }),
);

usersRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (String(req.admin?.sub) === id) throw new HttpError(400, "You can't delete your own account");
    const ownerCount = await AdminUserModel.countDocuments({ role: "owner", active: true });
    const target = await AdminUserModel.findById(id);
    if (!target) throw new HttpError(404, "User not found");
    if (target.role === "owner" && ownerCount <= 1) throw new HttpError(400, "At least one active owner must remain");
    await target.deleteOne();
    await ActivityModel.create({ action: "delete", entity: "admin-user", targetId: id, summary: target.email, actor: req.admin?.email });
    res.json({ ok: true });
  }),
);

/* ---------- Self-service: any logged-in admin can change their own password ---------- */

export const selfRouter = Router();

selfRouter.post(
  "/change-password",
  validateBody(changePasswordSchema),
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body as { currentPassword: string; newPassword: string };
    const user = await AdminUserModel.findById(req.admin?.sub).select("+passwordHash");
    if (!user || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
      throw new HttpError(401, "Current password is incorrect");
    }
    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();
    res.json({ ok: true });
  }),
);
