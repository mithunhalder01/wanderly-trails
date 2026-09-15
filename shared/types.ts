/**
 * Shared types — server aur client dono yahi use karte hain.
 * Numeric `id` public site ke routes ke liye hai (/destinations/:id),
 * Mongo `_id` sirf admin ke internal use ke liye.
 */

export interface Destination {
  id: number;
  name: string;
  slug: string;
  country: string;
  category: string;
  description: string;
  imageUrl: string;
  gallery: string[];
  rating: number;
  startingPrice: number;
  bestSeason: string;
  weather: string;
  featured: boolean;
  published: boolean;
  itinerarySlug?: string;
  pdfUrl?: string;
  sortOrder: number;
}

export interface Package {
  id: number;
  destinationId: number;
  destinationName: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  gallery: string[];
  price: number;
  duration: number;
  nights: number;
  category: string;
  rating: number;
  hotelStars: number;
  mealsIncluded: boolean;
  transportIncluded: boolean;
  includedItems: string;
  excludedItems: string;
  itinerary: string;
  itinerarySlug?: string;
  pdfUrl?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  readTime: number;
  publishedAt: string;
  published: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatarUrl: string;
  destination: string;
  published: boolean;
  sortOrder: number;
}

export interface ItineraryDay {
  day: string;
  heading: string;
  description: string;
}

export interface ItineraryPricing {
  type: string;
  price: string;
}

export interface Itinerary {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  route: string;
  durationPrice: string;
  contact: string;
  about: string;
  heroImage: string;
  destinationId?: number;
  days: ItineraryDay[];
  pricing: ItineraryPricing[];
  inclusions: string[];
  exclusions: string[];
  notes: string[];
  precautionsSafety: string[];
  termsAndConditions: string[];
  paymentPolicy: string[];
  cancellationPolicy: string[];
  pdfUrl?: string;
  published: boolean;
}

export type LeadType = "booking" | "contact" | "newsletter";
export type LeadStatus = "new" | "contacted" | "converted" | "closed";

export interface Lead {
  id: number;
  type: LeadType;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  destination: string;
  travelDate: string;
  travelers: number;
  status: LeadStatus;
  notes: string;
  createdAt: string;
}

export interface MediaItem {
  id: number;
  url: string;
  kind: "image" | "pdf" | "video";
  filename: string;
  originalName: string;
  size: number;
  width?: number;
  height?: number;
  createdAt: string;
}

/* ---------- Home page sections (pehle homeContent.ts me hardcoded the) ---------- */

export interface HomeHero {
  brandLine: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  video: string;
  image: string;
}

export interface HomeStat {
  value: number;
  suffix: string;
  label: string;
}

export interface HomeStats {
  tours: HomeStat;
  rating: HomeStat & { display: string };
  customers: HomeStat;
}

export interface TripCard {
  name: string;
  price: number;
  image: string;
  slug?: string;
}

export interface TripCarousel {
  title: string;
  subtitle: string;
  cta: string;
  bannerImage: string;
  destinations: TripCard[];
}

export interface ServiceItem {
  num: string;
  title: string;
  description: string;
}

export interface WhyChooseItem {
  title: string;
  description: string;
}

export interface VibeCard {
  title: string;
  subtitle: string;
  video: string;
  poster: string;
}

export interface VibeSection {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  cta: string;
  cards: VibeCard[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface AboutHome {
  badge: string;
  title: string;
  titleHighlight: string;
  paragraph1: string;
  paragraph2: string;
  cta: string;
  imageMain: string;
  imageSide: string;
  stats: { value: string; label: string }[];
}

export interface HomeContent {
  hero: HomeHero;
  stats: HomeStats;
  about: AboutHome;
  indiaTrips: TripCarousel;
  weekendGetaways: TripCarousel;
  services: ServiceItem[];
  whyChoose: WhyChooseItem[];
  vibe: VibeSection;
  faqs: FaqItem[];
  footerDestinations: string[];
}

export interface ContactInfo {
  phoneDigits: string;
  phoneDisplay: string;
  email: string;
  whatsappNumber: string;
  officeAddress: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  instagram: string;
  facebook: string;
  x: string;
  youtube: string;
}

export interface SeoSettings {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  ogImage: string;
}

export interface SiteSettings {
  heroTag: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  featuredDestinationCount: number;
  featuredPackageCount: number;
  featuredBlogCount: number;
  showTrustBar: boolean;
  contact: ContactInfo;
  seo: SeoSettings;
  home: HomeContent;
}

/** Public site ko ek hi call me sab kuch — ContentProvider isko consume karta hai. */
export interface SiteContentSnapshot {
  destinations: Destination[];
  packages: Package[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  itineraries: Itinerary[];
  settings: SiteSettings;
}

export interface DashboardStats {
  destinations: number;
  packages: number;
  itineraries: number;
  blogPosts: number;
  testimonials: number;
  leads: { total: number; new: number; thisWeek: number };
  media: number;
  recentLeads: Lead[];
}
