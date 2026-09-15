import { Router } from "express";
import type { Model } from "mongoose";
import type { ZodTypeAny } from "zod";
import { ActivityModel, nextId } from "../models";
import { uniqueSlug } from "../lib/slug";
import { HttpError, asyncHandler, getId, parseNumericId, validateBody } from "../middleware/validate";

interface CrudOptions<T> {
  model: Model<T>;
  counterName: string;
  schema: ZodTypeAny;
  /** Slug kis field se banega (title/name). Undefined = koi slug nahi. */
  slugFrom?: keyof T & string;
  /** List me default sorting. */
  sort?: Record<string, 1 | -1>;
  /** Text search kin fields me. */
  searchFields?: (keyof T & string)[];
  /** Create/update se pehle data ko touch karne ka mauka (e.g. destinationName bharna). */
  beforeSave?: (data: Record<string, unknown>) => Promise<void> | void;
  label: string;
}

/**
 * Ek jaisa CRUD har collection ke liye:
 *   GET    /           list (?q= search, ?published=true/false, ?page, ?limit)
 *   GET    /:id        single
 *   POST   /           create
 *   PUT    /:id        replace (full validated body)
 *   PATCH  /:id/toggle { field: "published" | "featured" }
 *   DELETE /:id
 *   POST   /reorder    { ids: number[] }  → sortOrder set
 */
export function crudRouter<T extends { id: number; slug?: string }>(opts: CrudOptions<T>) {
  const r = Router();
  const { model, schema, counterName, slugFrom, label } = opts;

  const log = (action: string, id: number | string, summary: string, actor = "admin") =>
    ActivityModel.create({ action, entity: label, targetId: String(id), summary, actor }).catch(() => undefined);

  r.get(
    "/",
    asyncHandler(async (req, res) => {
      const q = String(req.query.q ?? "").trim().slice(0, 100);
      const published = req.query.published;
      const page = Math.max(1, Number(req.query.page ?? 1) || 1);
      const limit = Math.min(200, Math.max(1, Number(req.query.limit ?? 100) || 100));

      const filter: Record<string, unknown> = {};
      if (published === "true") filter.published = true;
      if (published === "false") filter.published = false;
      if (q && opts.searchFields?.length) {
        // Regex se special chars escape — user input seedha regex me nahi
        const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        filter.$or = opts.searchFields.map((f) => ({ [f]: { $regex: safe, $options: "i" } }));
      }

      const [items, total] = await Promise.all([
        model
          .find(filter)
          .sort(opts.sort ?? { sortOrder: 1, id: 1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .lean({ transform: (doc: Record<string, unknown>) => { delete doc._id; return doc; } }),
        model.countDocuments(filter),
      ]);
      res.json({ items, total, page, limit });
    }),
  );

  r.get(
    "/:id",
    parseNumericId,
    asyncHandler(async (req, res) => {
      const doc = await model.findOne({ id: getId(req) }).lean();
      if (!doc) throw new HttpError(404, `${label} not found`);
      const { _id, ...rest } = doc as Record<string, unknown>;
      res.json(rest);
    }),
  );

  r.post(
    "/",
    validateBody(schema),
    asyncHandler(async (req, res) => {
      const data = req.body as Record<string, unknown>;
      if (slugFrom) {
        const base = (data.slug as string) || (data[slugFrom] as string);
        data.slug = await uniqueSlug(model as Model<{ slug: string; id: number }>, base);
      }
      await opts.beforeSave?.(data);
      data.id = await nextId(counterName);
      const doc = await model.create(data);
      await log("create", doc.id, String(data[slugFrom ?? "id"] ?? doc.id), req.admin?.email);
      res.status(201).json(doc.toJSON());
    }),
  );

  r.put(
    "/:id",
    parseNumericId,
    validateBody(schema),
    asyncHandler(async (req, res) => {
      const id = getId(req);
      const data = req.body as Record<string, unknown>;
      if (slugFrom) {
        const base = (data.slug as string) || (data[slugFrom] as string);
        data.slug = await uniqueSlug(model as Model<{ slug: string; id: number }>, base, id);
      }
      await opts.beforeSave?.(data);
      delete data.id;
      const doc = await model.findOneAndUpdate({ id }, { $set: data }, { new: true, runValidators: true });
      if (!doc) throw new HttpError(404, `${label} not found`);
      await log("update", id, String(data[slugFrom ?? "id"] ?? id), req.admin?.email);
      res.json(doc.toJSON());
    }),
  );

  r.patch(
    "/:id/toggle",
    parseNumericId,
    asyncHandler(async (req, res) => {
      const id = getId(req);
      const field = String(req.body?.field ?? "");
      if (!["published", "featured"].includes(field)) throw new HttpError(400, "Invalid field");
      const doc = await model.findOne({ id });
      if (!doc) throw new HttpError(404, `${label} not found`);
      const current = (doc as unknown as Record<string, unknown>)[field];
      (doc as unknown as Record<string, unknown>)[field] = !current;
      await doc.save();
      await log("toggle", id, `${field} → ${!current}`, req.admin?.email);
      res.json(doc.toJSON());
    }),
  );

  r.delete(
    "/:id",
    parseNumericId,
    asyncHandler(async (req, res) => {
      const id = getId(req);
      const doc = await model.findOneAndDelete({ id });
      if (!doc) throw new HttpError(404, `${label} not found`);
      await log("delete", id, String((doc as unknown as Record<string, unknown>)[slugFrom ?? "id"] ?? id), req.admin?.email);
      res.json({ ok: true });
    }),
  );

  r.post(
    "/reorder",
    asyncHandler(async (req, res) => {
      const ids = Array.isArray(req.body?.ids) ? (req.body.ids as unknown[]) : [];
      if (!ids.length || ids.length > 500 || !ids.every((v) => Number.isInteger(v))) {
        throw new HttpError(400, "ids must be a list of integers");
      }
      await model.bulkWrite(
        (ids as number[]).map((id, sortOrder) => ({
          updateOne: { filter: { id }, update: { $set: { sortOrder } } },
        })),
      );
      res.json({ ok: true });
    }),
  );

  return r;
}
