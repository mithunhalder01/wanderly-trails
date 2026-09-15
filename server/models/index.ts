import mongoose, { Schema, type Model } from "mongoose";
import type {
  BlogPost,
  Destination,
  Itinerary,
  Lead,
  MediaItem,
  Package,
  SiteSettings,
  Testimonial,
} from "../../shared/types";

/* ---------- Auto-increment counter (numeric ids public routes ke liye) ---------- */

const counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model("Counter", counterSchema);

export async function nextId(name: string): Promise<number> {
  const doc = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );
  return doc.seq;
}

/** Seed ke baad counter ko max existing id pe le aao taaki collision na ho. */
export async function bumpCounter(name: string, atLeast: number) {
  await Counter.findByIdAndUpdate(name, { $max: { seq: atLeast } }, { upsert: true });
}

/* ---------- Common options ---------- */

const baseOptions = {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform(_doc: unknown, ret: Record<string, unknown>) {
      delete ret._id;
      return ret;
    },
  },
};

/* ---------- Destination ---------- */

const destinationSchema = new Schema<Destination>(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    country: { type: String, default: "India" },
    category: { type: String, default: "India" },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    gallery: { type: [String], default: [] },
    rating: { type: Number, default: 4.5 },
    startingPrice: { type: Number, default: 0 },
    bestSeason: { type: String, default: "" },
    weather: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true, index: true },
    itinerarySlug: { type: String, default: "" },
    pdfUrl: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
  },
  baseOptions,
);

/* ---------- Package ---------- */

const packageSchema = new Schema<Package>(
  {
    id: { type: Number, required: true, unique: true, index: true },
    destinationId: { type: Number, default: 0, index: true },
    destinationName: { type: String, default: "" },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    gallery: { type: [String], default: [] },
    price: { type: Number, default: 0 },
    duration: { type: Number, default: 1 },
    nights: { type: Number, default: 0 },
    category: { type: String, default: "" },
    rating: { type: Number, default: 4.5 },
    hotelStars: { type: Number, default: 3 },
    mealsIncluded: { type: Boolean, default: false },
    transportIncluded: { type: Boolean, default: false },
    includedItems: { type: String, default: "" },
    excludedItems: { type: String, default: "" },
    itinerary: { type: String, default: "" },
    itinerarySlug: { type: String, default: "" },
    pdfUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  baseOptions,
);

/* ---------- Blog ---------- */

const blogPostSchema = new Schema<BlogPost>(
  {
    id: { type: Number, required: true, unique: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    category: { type: String, default: "Travel" },
    author: { type: String, default: "Wanderly Trails" },
    readTime: { type: Number, default: 5 },
    publishedAt: { type: String, default: "" },
    published: { type: Boolean, default: true, index: true },
  },
  baseOptions,
);

/* ---------- Testimonial ---------- */

const testimonialSchema = new Schema<Testimonial>(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true },
    location: { type: String, default: "" },
    rating: { type: Number, default: 5 },
    review: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    destination: { type: String, default: "" },
    published: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  baseOptions,
);

/* ---------- Itinerary ---------- */

const itinerarySchema = new Schema<Itinerary>(
  {
    id: { type: Number, required: true, unique: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    subtitle: { type: String, default: "" },
    route: { type: String, default: "" },
    durationPrice: { type: String, default: "" },
    contact: { type: String, default: "" },
    about: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    destinationId: { type: Number, index: true },
    days: {
      type: [
        new Schema(
          { day: String, heading: String, description: String },
          { _id: false },
        ),
      ],
      default: [],
    },
    pricing: {
      type: [new Schema({ type: String, price: String }, { _id: false })],
      default: [],
    },
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
    notes: { type: [String], default: [] },
    precautionsSafety: { type: [String], default: [] },
    termsAndConditions: { type: [String], default: [] },
    paymentPolicy: { type: [String], default: [] },
    cancellationPolicy: { type: [String], default: [] },
    pdfUrl: { type: String, default: "" },
    published: { type: Boolean, default: true, index: true },
  },
  baseOptions,
);

/* ---------- Lead (booking / contact / newsletter) ---------- */

const leadSchema = new Schema<Lead>(
  {
    id: { type: Number, required: true, unique: true, index: true },
    type: { type: String, enum: ["booking", "contact", "newsletter"], required: true, index: true },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    subject: { type: String, default: "" },
    message: { type: String, default: "" },
    destination: { type: String, default: "" },
    travelDate: { type: String, default: "" },
    travelers: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["new", "contacted", "converted", "closed"],
      default: "new",
      index: true,
    },
    notes: { type: String, default: "" },
  },
  baseOptions,
);

/* ---------- Media ---------- */

const mediaSchema = new Schema<MediaItem>(
  {
    id: { type: Number, required: true, unique: true, index: true },
    url: { type: String, required: true },
    kind: { type: String, enum: ["image", "pdf", "video"], required: true },
    filename: { type: String, required: true },
    originalName: { type: String, default: "" },
    size: { type: Number, default: 0 },
    width: Number,
    height: Number,
  },
  baseOptions,
);

/* ---------- Settings (singleton, key = "site") ---------- */

interface SettingsDoc {
  key: string;
  data: SiteSettings;
}

const settingsSchema = new Schema<SettingsDoc>(
  {
    key: { type: String, required: true, unique: true },
    // Mixed rakha hai — shape zod se enforce hota hai, Mongoose se nahi
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true, versionKey: false, minimize: false },
);

/* ---------- Admin user (auth ke liye ready; abhi use nahi ho raha) ---------- */

export interface AdminUserDoc {
  email: string;
  passwordHash: string;
  name: string;
  role: "owner" | "editor";
  active: boolean;
  lastLoginAt?: Date;
}

const adminUserSchema = new Schema<AdminUserDoc>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, default: "" },
    role: { type: String, enum: ["owner", "editor"], default: "editor" },
    active: { type: Boolean, default: true },
    lastLoginAt: Date,
  },
  { timestamps: true, versionKey: false },
);

/* ---------- Activity log (kisne kya badla) ---------- */

export interface ActivityDoc {
  action: string;
  entity: string;
  targetId: string;
  summary: string;
  actor: string;
  createdAt: Date;
}

const activitySchema = new Schema<ActivityDoc>(
  {
    action: { type: String, required: true },
    entity: { type: String, required: true },
    targetId: { type: String, default: "" },
    summary: { type: String, default: "" },
    actor: { type: String, default: "admin" },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false },
);
activitySchema.index({ createdAt: -1 });

export const DestinationModel: Model<Destination> = mongoose.model("Destination", destinationSchema);
export const PackageModel: Model<Package> = mongoose.model("Package", packageSchema);
export const BlogPostModel: Model<BlogPost> = mongoose.model("BlogPost", blogPostSchema);
export const TestimonialModel: Model<Testimonial> = mongoose.model("Testimonial", testimonialSchema);
export const ItineraryModel: Model<Itinerary> = mongoose.model("Itinerary", itinerarySchema);
export const LeadModel: Model<Lead> = mongoose.model("Lead", leadSchema);
export const MediaModel: Model<MediaItem> = mongoose.model("Media", mediaSchema);
export const SettingsModel: Model<SettingsDoc> = mongoose.model("Settings", settingsSchema);
export const AdminUserModel: Model<AdminUserDoc> = mongoose.model("AdminUser", adminUserSchema);
export const ActivityModel: Model<ActivityDoc> = mongoose.model("Activity", activitySchema);
