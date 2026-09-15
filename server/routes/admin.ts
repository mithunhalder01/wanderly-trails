import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import {
  blogPostSchema,
  destinationSchema,
  itinerarySchema,
  leadUpdateSchema,
  packageSchema,
  siteSettingsPatchSchema,
  testimonialSchema,
} from "../../shared/schemas";
import type { SiteSettings } from "../../shared/types";
import { config } from "../config";
import { deleteStoredFile, storeFile, upload } from "../lib/upload";
import { getSettings, saveSettings, seedIfEmpty } from "../lib/seed";
import { ADMIN_COOKIE, requireAdmin, requireOwner, signAdminToken } from "../middleware/auth";
import { adminLimiter, loginLimiter, uploadLimiter } from "../middleware/security";
import { HttpError, asyncHandler, getId, parseNumericId, validateBody } from "../middleware/validate";
import {
  ActivityModel,
  AdminUserModel,
  BlogPostModel,
  DestinationModel,
  ItineraryModel,
  LeadModel,
  MediaModel,
  PackageModel,
  TestimonialModel,
  nextId,
} from "../models";
import { crudRouter } from "./crud";
import { selfRouter, usersRouter } from "./users";

export const adminRouter = Router();

/* ---------- Auth (ready, ADMIN_AUTH=on hone par active) ---------- */

const loginSchema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(8).max(200),
});

adminRouter.post(
  "/auth/login",
  loginLimiter,
  validateBody(loginSchema),
  asyncHandler(async (req, res) => {
    if (!config.adminAuth) return res.json({ ok: true, authDisabled: true });
    const { email, password } = req.body as z.infer<typeof loginSchema>;
    const user = await AdminUserModel.findOne({ email }).select("+passwordHash");
    // Same error dono case me — email enumerate na ho
    if (!user || !user.active || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new HttpError(401, "Invalid email or password");
    }
    user.lastLoginAt = new Date();
    await user.save();
    const token = signAdminToken({ sub: String(user._id), email: user.email, role: user.role });
    res.cookie(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: "strict",
      secure: config.isProd,
      maxAge: 12 * 60 * 60 * 1000,
      path: "/api/admin",
    });
    res.json({ ok: true, user: { email: user.email, name: user.name, role: user.role } });
  }),
);

adminRouter.post("/auth/logout", (_req, res) => {
  res.clearCookie(ADMIN_COOKIE, { path: "/api/admin" });
  res.json({ ok: true });
});

adminRouter.get(
  "/auth/me",
  asyncHandler(async (req, res) => {
    if (!config.adminAuth) return res.json({ authDisabled: true, user: { email: "admin@local", name: "Admin", role: "owner" } });
    await new Promise<void>((resolve, reject) => requireAdmin(req, res, (e?: unknown) => (e ? reject(e) : resolve())));
    const user = await AdminUserModel.findById(req.admin?.sub).lean();
    res.json({ authDisabled: false, user: { email: req.admin?.email, role: req.admin?.role, name: user?.name ?? "" } });
  }),
);

/* ---------- Sab kuch iske neeche admin-gated + rate limited ---------- */

adminRouter.use(adminLimiter, requireAdmin);

/* ---------- Team accounts — owner only ---------- */
adminRouter.use("/users", requireOwner, usersRouter);
/* ---------- Any logged-in admin can change their own password ---------- */
adminRouter.use("/self", selfRouter);

/* ---------- Dashboard ---------- */

adminRouter.get(
  "/dashboard",
  asyncHandler(async (_req, res) => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [destinations, packages, itineraries, blogPosts, testimonials, leadsTotal, leadsNew, leadsWeek, media, recentLeads, activity] =
      await Promise.all([
        DestinationModel.countDocuments(),
        PackageModel.countDocuments(),
        ItineraryModel.countDocuments(),
        BlogPostModel.countDocuments(),
        TestimonialModel.countDocuments(),
        LeadModel.countDocuments(),
        LeadModel.countDocuments({ status: "new" }),
        LeadModel.countDocuments({ createdAt: { $gte: weekAgo } }),
        MediaModel.countDocuments(),
        LeadModel.find().sort({ createdAt: -1 }).limit(6).lean({ transform: strip }),
        ActivityModel.find().sort({ createdAt: -1 }).limit(10).lean({ transform: strip }),
      ]);
    res.json({
      destinations,
      packages,
      itineraries,
      blogPosts,
      testimonials,
      leads: { total: leadsTotal, new: leadsNew, thisWeek: leadsWeek },
      media,
      recentLeads,
      activity,
    });
  }),
);

function strip(doc: Record<string, unknown>) {
  delete doc._id;
  return doc;
}

/* ---------- Collections ---------- */

adminRouter.use(
  "/destinations",
  crudRouter({
    model: DestinationModel,
    counterName: "destination",
    schema: destinationSchema,
    slugFrom: "name",
    searchFields: ["name", "category", "country"],
    label: "destination",
  }),
);

adminRouter.use(
  "/packages",
  crudRouter({
    model: PackageModel,
    counterName: "package",
    schema: packageSchema,
    slugFrom: "title",
    searchFields: ["title", "destinationName", "category"],
    label: "package",
    // destinationName ko destinationId se sync rakho — admin ko do jagah nahi likhna padega
    async beforeSave(data) {
      const destId = Number(data.destinationId);
      if (destId > 0) {
        const dest = await DestinationModel.findOne({ id: destId }).lean();
        if (dest) data.destinationName = dest.name;
      }
    },
  }),
);

adminRouter.use(
  "/itineraries",
  crudRouter({
    model: ItineraryModel,
    counterName: "itinerary",
    schema: itinerarySchema,
    slugFrom: "title",
    sort: { id: 1 },
    searchFields: ["title", "route"],
    label: "itinerary",
  }),
);

adminRouter.use(
  "/blog",
  crudRouter({
    model: BlogPostModel,
    counterName: "blogPost",
    schema: blogPostSchema,
    slugFrom: "title",
    sort: { publishedAt: -1, id: -1 },
    searchFields: ["title", "category", "author"],
    label: "blogPost",
  }),
);

adminRouter.use(
  "/testimonials",
  crudRouter({
    model: TestimonialModel,
    counterName: "testimonial",
    schema: testimonialSchema,
    searchFields: ["name", "destination", "location"],
    label: "testimonial",
  }),
);

/* ---------- Settings (site + home page + contact + seo) ---------- */

adminRouter.get(
  "/settings",
  asyncHandler(async (_req, res) => {
    res.json(await getSettings());
  }),
);

adminRouter.put(
  "/settings",
  validateBody(siteSettingsPatchSchema),
  asyncHandler(async (req, res) => {
    const current = await getSettings();
    const merged = deepMerge(current as unknown as Record<string, unknown>, req.body as Record<string, unknown>) as unknown as SiteSettings;
    await saveSettings(merged);
    await ActivityModel.create({
      action: "update",
      entity: "settings",
      targetId: "site",
      summary: Object.keys(req.body as object).join(", "),
      actor: req.admin?.email,
    });
    res.json(merged);
  }),
);

/** Objects merge, arrays replace (admin poori list bhejta hai). */
function deepMerge(base: Record<string, unknown>, patch: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined) continue;
    const b = out[k];
    if (v && typeof v === "object" && !Array.isArray(v) && b && typeof b === "object" && !Array.isArray(b)) {
      out[k] = deepMerge(b as Record<string, unknown>, v as Record<string, unknown>);
    } else {
      out[k] = v;
    }
  }
  return out;
}

/* ---------- Leads (enquiries inbox) ---------- */

adminRouter.get(
  "/leads",
  asyncHandler(async (req, res) => {
    const status = String(req.query.status ?? "");
    const type = String(req.query.type ?? "");
    const page = Math.max(1, Number(req.query.page ?? 1) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit ?? 50) || 50));
    const filter: Record<string, unknown> = {};
    if (["new", "contacted", "converted", "closed"].includes(status)) filter.status = status;
    if (["booking", "contact", "newsletter"].includes(type)) filter.type = type;
    const [items, total] = await Promise.all([
      LeadModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean({ transform: strip }),
      LeadModel.countDocuments(filter),
    ]);
    res.json({ items, total, page, limit });
  }),
);

adminRouter.patch(
  "/leads/:id",
  parseNumericId,
  validateBody(leadUpdateSchema),
  asyncHandler(async (req, res) => {
    const doc = await LeadModel.findOneAndUpdate({ id: getId(req) }, { $set: req.body }, { new: true });
    if (!doc) throw new HttpError(404, "Lead not found");
    res.json(doc.toJSON());
  }),
);

adminRouter.delete(
  "/leads/:id",
  parseNumericId,
  asyncHandler(async (req, res) => {
    const doc = await LeadModel.findOneAndDelete({ id: getId(req) });
    if (!doc) throw new HttpError(404, "Lead not found");
    res.json({ ok: true });
  }),
);

/* ---------- Media ---------- */

adminRouter.get(
  "/media",
  asyncHandler(async (req, res) => {
    const kind = String(req.query.kind ?? "");
    const page = Math.max(1, Number(req.query.page ?? 1) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit ?? 60) || 60));
    const filter: Record<string, unknown> = {};
    if (["image", "pdf", "video"].includes(kind)) filter.kind = kind;
    const [items, total] = await Promise.all([
      MediaModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean({ transform: strip }),
      MediaModel.countDocuments(filter),
    ]);
    res.json({ items, total, page, limit });
  }),
);

adminRouter.post(
  "/media",
  uploadLimiter,
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!req.file) throw new HttpError(400, "No file uploaded (field name: file)");
    const stored = await storeFile(req.file);
    const doc = await MediaModel.create({
      id: await nextId("media"),
      ...stored,
      originalName: req.file.originalname.slice(0, 200),
    });
    await ActivityModel.create({
      action: "upload",
      entity: "media",
      targetId: String(doc.id),
      summary: doc.originalName,
      actor: req.admin?.email,
    });
    res.status(201).json(doc.toJSON());
  }),
);

adminRouter.delete(
  "/media/:id",
  parseNumericId,
  asyncHandler(async (req, res) => {
    const doc = await MediaModel.findOneAndDelete({ id: getId(req) });
    if (!doc) throw new HttpError(404, "Media not found");
    await deleteStoredFile(doc.url);
    res.json({ ok: true });
  }),
);

/* ---------- Activity log ---------- */

adminRouter.get(
  "/activity",
  asyncHandler(async (_req, res) => {
    const items = await ActivityModel.find().sort({ createdAt: -1 }).limit(100).lean({ transform: strip });
    res.json({ items });
  }),
);

/* ---------- Backup / maintenance (owner only) ---------- */

adminRouter.get(
  "/export",
  requireOwner,
  asyncHandler(async (_req, res) => {
    const [destinations, packages, itineraries, blogPosts, testimonials, settings] = await Promise.all([
      DestinationModel.find().lean({ transform: strip }),
      PackageModel.find().lean({ transform: strip }),
      ItineraryModel.find().lean({ transform: strip }),
      BlogPostModel.find().lean({ transform: strip }),
      TestimonialModel.find().lean({ transform: strip }),
      getSettings(),
    ]);
    res.setHeader("Content-Disposition", `attachment; filename="wanderly-backup-${new Date().toISOString().slice(0, 10)}.json"`);
    res.json({ version: 2, exportedAt: new Date().toISOString(), destinations, packages, itineraries, blogPosts, testimonials, settings });
  }),
);

adminRouter.post(
  "/seed",
  requireOwner,
  asyncHandler(async (_req, res) => {
    res.json(await seedIfEmpty());
  }),
);
