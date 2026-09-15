import { z } from "zod";

/**
 * Har admin input yahin se validate hota hai — server pe zaroor,
 * client pe form errors dikhane ke liye bhi.
 * `.max()` sab jagah hai taaki koi 10MB string DB me na ghus jaye.
 */

const short = (max = 200) => z.string().trim().max(max);
const long = (max = 20000) => z.string().trim().max(max);
const url = z.string().trim().max(2000);
const slug = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug me sirf chhote akshar, number aur hyphen (-) chalega");
const strList = z.array(z.string().trim().max(2000)).max(200);

export const destinationSchema = z.object({
  name: short(120).min(1, "Naam zaroori hai"),
  slug: slug.optional().or(z.literal("")),
  country: short(80).default("India"),
  category: short(80).default("India"),
  description: long(5000).default(""),
  imageUrl: url.default(""),
  gallery: z.array(url).max(30).default([]),
  rating: z.coerce.number().min(0).max(5).default(4.5),
  startingPrice: z.coerce.number().min(0).max(10_000_000).default(0),
  bestSeason: short(120).default(""),
  weather: short(120).default(""),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
  itinerarySlug: short(120).optional().or(z.literal("")),
  pdfUrl: url.optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().default(0),
});

export const packageSchema = z.object({
  destinationId: z.coerce.number().int().min(0).default(0),
  destinationName: short(120).default(""),
  title: short(160).min(1, "Title zaroori hai"),
  slug: slug.optional().or(z.literal("")),
  description: long(5000).default(""),
  imageUrl: url.default(""),
  gallery: z.array(url).max(30).default([]),
  price: z.coerce.number().min(0).max(10_000_000).default(0),
  duration: z.coerce.number().int().min(0).max(365).default(1),
  nights: z.coerce.number().int().min(0).max(365).default(0),
  category: short(80).default(""),
  rating: z.coerce.number().min(0).max(5).default(4.5),
  hotelStars: z.coerce.number().int().min(0).max(7).default(3),
  mealsIncluded: z.coerce.boolean().default(false),
  transportIncluded: z.coerce.boolean().default(false),
  includedItems: long(5000).default(""),
  excludedItems: long(5000).default(""),
  itinerary: long(20000).default(""),
  itinerarySlug: short(120).optional().or(z.literal("")),
  pdfUrl: url.optional().or(z.literal("")),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export const blogPostSchema = z.object({
  title: short(200).min(1, "Title zaroori hai"),
  slug: slug.optional().or(z.literal("")),
  excerpt: long(1000).default(""),
  content: long(100000).default(""),
  imageUrl: url.default(""),
  category: short(80).default("Travel"),
  author: short(80).default("Wanderly Trails"),
  readTime: z.coerce.number().int().min(1).max(120).default(5),
  publishedAt: short(40).default(() => new Date().toISOString().slice(0, 10)),
  published: z.coerce.boolean().default(true),
});

export const testimonialSchema = z.object({
  name: short(120).min(1, "Naam zaroori hai"),
  location: short(120).default(""),
  rating: z.coerce.number().min(1).max(5).default(5),
  review: long(3000).min(1, "Review zaroori hai"),
  avatarUrl: url.default(""),
  destination: short(120).default(""),
  published: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export const itineraryDaySchema = z.object({
  day: short(40).default(""),
  heading: short(300).default(""),
  description: long(5000).default(""),
});

export const itineraryPricingSchema = z.object({
  type: short(120).default(""),
  price: short(60).default(""),
});

export const itinerarySchema = z.object({
  title: short(160).min(1, "Title zaroori hai"),
  slug: slug.optional().or(z.literal("")),
  subtitle: short(300).default(""),
  route: short(500).default(""),
  durationPrice: short(200).default(""),
  contact: short(200).default(""),
  about: long(10000).default(""),
  heroImage: url.default(""),
  destinationId: z.coerce.number().int().min(0).optional(),
  days: z.array(itineraryDaySchema).max(60).default([]),
  pricing: z.array(itineraryPricingSchema).max(20).default([]),
  inclusions: strList.default([]),
  exclusions: strList.default([]),
  notes: strList.default([]),
  precautionsSafety: strList.default([]),
  termsAndConditions: strList.default([]),
  paymentPolicy: strList.default([]),
  cancellationPolicy: strList.default([]),
  pdfUrl: url.optional().or(z.literal("")),
  published: z.coerce.boolean().default(true),
});

export const leadStatusSchema = z.enum(["new", "contacted", "converted", "closed"]);

/** Public form se aata hai — isliye extra strict, koi HTML nahi. */
export const publicLeadSchema = z.object({
  type: z.enum(["booking", "contact", "newsletter"]),
  name: short(120).default(""),
  email: z.string().trim().max(200).email().or(z.literal("")).default(""),
  phone: short(30).default(""),
  subject: short(200).default(""),
  message: long(3000).default(""),
  destination: short(160).default(""),
  travelDate: short(40).default(""),
  travelers: z.coerce.number().int().min(0).max(500).default(0),
  // Honeypot — bots isko bhar dete hain, insaan nahi
  website: z.string().max(0).optional(),
});

export const leadUpdateSchema = z.object({
  status: leadStatusSchema.optional(),
  notes: long(5000).optional(),
});

const contactInfoSchema = z.object({
  phoneDigits: short(20),
  phoneDisplay: short(120),
  email: short(120),
  whatsappNumber: short(20),
  officeAddress: short(300),
  mapsUrl: url,
  mapsEmbedUrl: url,
  instagram: url,
  facebook: url,
  x: url,
  youtube: url,
});

const seoSchema = z.object({
  siteName: short(120),
  defaultTitle: short(200),
  defaultDescription: short(400),
  ogImage: url,
});

const tripCardSchema = z.object({
  name: short(120),
  price: z.coerce.number().min(0),
  image: url,
  slug: short(120).optional().or(z.literal("")),
});

const tripCarouselSchema = z.object({
  title: short(120),
  subtitle: short(300),
  cta: short(60),
  bannerImage: url,
  destinations: z.array(tripCardSchema).max(30),
});

const statSchema = z.object({ value: z.coerce.number(), suffix: short(10), label: short(120) });

export const homeContentSchema = z.object({
  hero: z.object({
    brandLine: short(80),
    title: short(160),
    titleHighlight: short(80),
    description: long(1000),
    ctaPrimary: short(60),
    ctaSecondary: short(60),
    video: url,
    image: url,
  }),
  stats: z.object({
    tours: statSchema,
    rating: statSchema.extend({ display: short(20) }),
    customers: statSchema,
  }),
  about: z.object({
    badge: short(60),
    title: short(160),
    titleHighlight: short(80),
    paragraph1: long(1500),
    paragraph2: long(1500),
    cta: short(60),
    imageMain: url,
    imageSide: url,
    stats: z.array(z.object({ value: short(30), label: short(120) })).max(6),
  }),
  indiaTrips: tripCarouselSchema,
  weekendGetaways: tripCarouselSchema,
  services: z.array(z.object({ num: short(10), title: short(120), description: long(1000) })).max(12),
  whyChoose: z.array(z.object({ title: short(120), description: long(1000) })).max(12),
  vibe: z.object({
    badge: short(60),
    title: short(160),
    titleHighlight: short(80),
    subtitle: long(500),
    cta: short(60),
    cards: z.array(z.object({ title: short(120), subtitle: short(120), video: url, poster: url })).max(12),
  }),
  faqs: z.array(z.object({ q: short(300), a: long(2000) })).max(30),
  footerDestinations: z.array(short(80)).max(30),
});

export const siteSettingsSchema = z.object({
  heroTag: short(80),
  heroTitle: short(160),
  heroHighlight: short(80),
  heroSubtitle: long(500),
  heroPrimaryCta: short(60),
  heroSecondaryCta: short(60),
  featuredDestinationCount: z.coerce.number().int().min(0).max(100),
  featuredPackageCount: z.coerce.number().int().min(0).max(100),
  featuredBlogCount: z.coerce.number().int().min(0).max(100),
  showTrustBar: z.coerce.boolean(),
  contact: contactInfoSchema,
  seo: seoSchema,
  home: homeContentSchema,
});

/** Settings partial update — admin ek hi section bhej sakta hai. */
export const siteSettingsPatchSchema = siteSettingsSchema.deepPartial();

const password = z.string().min(10, "Password must be at least 10 characters").max(200);

export const adminUserCreateSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  name: short(120).default(""),
  role: z.enum(["owner", "editor"]).default("editor"),
  password,
});

export const adminUserUpdateSchema = z.object({
  name: short(120).optional(),
  role: z.enum(["owner", "editor"]).optional(),
  active: z.coerce.boolean().optional(),
  password: password.optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: password,
});

export type DestinationInput = z.infer<typeof destinationSchema>;
export type PackageInput = z.infer<typeof packageSchema>;
export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type ItineraryInput = z.infer<typeof itinerarySchema>;
export type PublicLeadInput = z.infer<typeof publicLeadSchema>;
