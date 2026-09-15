import {
  BlogPostModel,
  DestinationModel,
  ItineraryModel,
  PackageModel,
  SettingsModel,
  TestimonialModel,
  bumpCounter,
} from "../models";
import { defaultItineraries, defaultSettings, staticData } from "./defaults";
import { slugify } from "./slug";

const SETTINGS_KEY = "site";

/**
 * Pehli baar DB khali ho to purana static content daal do.
 * Dubara chalane pe kuch overwrite nahi hota (sirf khali collections bharti hain).
 */
export async function seedIfEmpty() {
  const report: Record<string, number> = {};

  if ((await DestinationModel.countDocuments()) === 0) {
    const usedSlugs = new Set<string>();
    const docs = staticData.destinations.map((d, i) => {
      let slug = slugify(d.name);
      while (usedSlugs.has(slug)) slug = `${slug}-${d.id}`;
      usedSlugs.add(slug);
      return { ...d, slug, gallery: [], published: true, itinerarySlug: "", pdfUrl: "", sortOrder: i };
    });
    await DestinationModel.insertMany(docs);
    await bumpCounter("destination", Math.max(...docs.map((d) => d.id)));
    report.destinations = docs.length;
  }

  if ((await PackageModel.countDocuments()) === 0) {
    const usedSlugs = new Set<string>();
    const docs = staticData.packages.map((p, i) => {
      let slug = slugify(p.title);
      while (usedSlugs.has(slug)) slug = `${slug}-${p.id}`;
      usedSlugs.add(slug);
      return { ...p, slug, gallery: [], published: true, itinerarySlug: "", pdfUrl: "", sortOrder: i };
    });
    await PackageModel.insertMany(docs);
    await bumpCounter("package", Math.max(...docs.map((d) => d.id)));
    report.packages = docs.length;
  }

  if ((await BlogPostModel.countDocuments()) === 0) {
    const docs = staticData.blogPosts.map((b) => ({ ...b, slug: slugify(b.title), published: true }));
    await BlogPostModel.insertMany(docs);
    await bumpCounter("blogPost", Math.max(...docs.map((d) => d.id)));
    report.blogPosts = docs.length;
  }

  if ((await TestimonialModel.countDocuments()) === 0) {
    const docs = staticData.testimonials.map((t, i) => ({ ...t, published: true, sortOrder: i }));
    await TestimonialModel.insertMany(docs);
    await bumpCounter("testimonial", Math.max(...docs.map((d) => d.id)));
    report.testimonials = docs.length;
  }

  if ((await ItineraryModel.countDocuments()) === 0) {
    const docs = defaultItineraries().map((it, i) => ({ ...it, id: i + 1 }));
    await ItineraryModel.insertMany(docs);
    await bumpCounter("itinerary", docs.length);
    report.itineraries = docs.length;

    // Destination ↔ itinerary link (pehle name-check hardcoded tha)
    for (const it of docs) {
      if (it.destinationId) {
        await DestinationModel.updateOne(
          { id: it.destinationId, itinerarySlug: "" },
          { $set: { itinerarySlug: it.slug } },
        );
      }
    }
  }

  if (!(await SettingsModel.exists({ key: SETTINGS_KEY }))) {
    await SettingsModel.create({ key: SETTINGS_KEY, data: defaultSettings() });
    report.settings = 1;
  }

  if (Object.keys(report).length) console.log("[seed]", report);
  return report;
}

export async function getSettings() {
  const doc = await SettingsModel.findOne({ key: SETTINGS_KEY }).lean();
  return (doc?.data ?? defaultSettings()) as ReturnType<typeof defaultSettings>;
}

export async function saveSettings(data: ReturnType<typeof defaultSettings>) {
  await SettingsModel.updateOne({ key: SETTINGS_KEY }, { $set: { data } }, { upsert: true });
  return data;
}
