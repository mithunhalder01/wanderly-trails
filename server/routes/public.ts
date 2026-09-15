import { Router } from "express";
import { publicLeadSchema } from "../../shared/schemas";
import type { SiteContentSnapshot } from "../../shared/types";
import { getSettings } from "../lib/seed";
import { formLimiter, publicLimiter } from "../middleware/security";
import { HttpError, asyncHandler, validateBody } from "../middleware/validate";
import {
  BlogPostModel,
  DestinationModel,
  ItineraryModel,
  LeadModel,
  PackageModel,
  TestimonialModel,
  nextId,
} from "../models";

export const publicRouter = Router();
publicRouter.use(publicLimiter);

const strip = (doc: Record<string, unknown>) => {
  delete doc._id;
  delete doc.createdAt;
  delete doc.updatedAt;
  return doc;
};

/** Chhota sa in-memory cache — site ka har visitor DB hit na kare. */
let cache: { at: number; data: SiteContentSnapshot } | null = null;
const CACHE_MS = 30 * 1000;

export function invalidateContentCache() {
  cache = null;
}

publicRouter.get(
  "/content",
  asyncHandler(async (_req, res) => {
    if (cache && Date.now() - cache.at < CACHE_MS) {
      res.setHeader("Cache-Control", "public, max-age=30");
      return res.json(cache.data);
    }
    const pub = { published: true };
    const [destinations, packages, blogPosts, testimonials, itineraries, settings] = await Promise.all([
      DestinationModel.find(pub).sort({ sortOrder: 1, id: 1 }).lean({ transform: strip }),
      PackageModel.find(pub).sort({ sortOrder: 1, id: 1 }).lean({ transform: strip }),
      BlogPostModel.find(pub).sort({ publishedAt: -1, id: -1 }).lean({ transform: strip }),
      TestimonialModel.find(pub).sort({ sortOrder: 1, id: 1 }).lean({ transform: strip }),
      ItineraryModel.find(pub).sort({ id: 1 }).lean({ transform: strip }),
      getSettings(),
    ]);
    const data = { destinations, packages, blogPosts, testimonials, itineraries, settings } as unknown as SiteContentSnapshot;
    cache = { at: Date.now(), data };
    res.setHeader("Cache-Control", "public, max-age=30");
    res.json(data);
  }),
);

publicRouter.get(
  "/itineraries/:slug",
  asyncHandler(async (req, res) => {
    const slug = String(req.params.slug).slice(0, 120);
    const doc = await ItineraryModel.findOne({ slug, published: true }).lean({ transform: strip });
    if (!doc) throw new HttpError(404, "Itinerary not found");
    res.json(doc);
  }),
);

/** Booking / contact / newsletter forms yahan aati hain → admin ke Enquiries inbox me dikhti hain. */
publicRouter.post(
  "/leads",
  formLimiter,
  validateBody(publicLeadSchema),
  asyncHandler(async (req, res) => {
    const body = req.body as Record<string, unknown>;
    delete body.website; // honeypot field DB me nahi
    if (body.type === "newsletter" && !body.email) throw new HttpError(400, "Email required");
    if (body.type !== "newsletter" && !body.name) throw new HttpError(400, "Name required");
    const doc = await LeadModel.create({ id: await nextId("lead"), ...body, status: "new" });
    res.status(201).json({ ok: true, id: doc.id });
  }),
);
