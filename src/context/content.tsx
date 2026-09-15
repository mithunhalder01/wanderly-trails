import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type {
  BlogPost,
  Destination,
  Itinerary,
  Package,
  SiteContentSnapshot,
  SiteSettings,
  Testimonial,
} from "@shared/types";
import {
  blogPosts as staticBlogPosts,
  destinations as staticDestinations,
  packages as staticPackages,
  siteSettings as staticSiteSettings,
  testimonials as staticTestimonials,
} from "@/data/staticData";

export type { SiteSettings };

interface SiteContentContextValue extends SiteContentSnapshot {
  loading: boolean;
  featuredDestinations: Destination[];
  featuredPackages: Package[];
  getDestinationById: (id: number) => Destination | undefined;
  getPackageById: (id: number) => Package | undefined;
  getBlogPostById: (id: number) => BlogPost | undefined;
  getPackagesByDestination: (destinationId: number) => Package[];
  getRelatedPackages: (packageId: number) => Package[];
  getItineraryBySlug: (slug: string) => Itinerary | undefined;
}

/**
 * Build-time static data ko pehle paint ke liye fallback ki tarah use karte hain
 * (koi blank screen nahi), phir /api/public/content se admin-managed data aata
 * hai aur usi se replace ho jata hai. Static files ab sirf "seed + offline fallback" hain.
 */
function buildSnapshot(data: {
  destinations: Destination[];
  packages: Package[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  itineraries: Itinerary[];
  settings: SiteSettings;
}): SiteContentContextValue {
  const { destinations, packages, blogPosts, testimonials, itineraries, settings } = data;
  return {
    destinations,
    packages,
    blogPosts,
    testimonials,
    itineraries,
    settings,
    loading: false,
    featuredDestinations: destinations.filter((d) => d.featured),
    featuredPackages: packages.filter((p) => p.featured),
    getDestinationById: (id) => destinations.find((d) => d.id === id),
    getPackageById: (id) => packages.find((p) => p.id === id),
    getBlogPostById: (id) => blogPosts.find((b) => b.id === id),
    getPackagesByDestination: (destinationId) => packages.filter((p) => p.destinationId === destinationId),
    getItineraryBySlug: (slug) => itineraries.find((i) => i.slug === slug),
    getRelatedPackages: (packageId) => {
      const current = packages.find((p) => p.id === packageId);
      if (!current) return [];
      return packages
        .filter((p) => p.id !== packageId && (p.destinationId === current.destinationId || p.category === current.category))
        .slice(0, 4);
    },
  };
}

const fallbackSettings: SiteSettings = {
  ...staticSiteSettings,
  contact: {
    phoneDigits: "",
    phoneDisplay: "",
    email: "",
    whatsappNumber: "",
    officeAddress: "",
    mapsUrl: "",
    mapsEmbedUrl: "",
    instagram: "",
    facebook: "",
    x: "",
    youtube: "",
  },
  seo: { siteName: "Wanderly Trails", defaultTitle: "", defaultDescription: "", ogImage: "" },
  home: null as unknown as SiteSettings["home"], // Home page components read their own static defaults until live data arrives
};

const fallbackValue = buildSnapshot({
  destinations: staticDestinations as unknown as Destination[],
  packages: staticPackages as unknown as Package[],
  blogPosts: staticBlogPosts,
  testimonials: staticTestimonials as unknown as Testimonial[],
  itineraries: [],
  settings: fallbackSettings,
});

const SiteContentContext = createContext<SiteContentContextValue>({ ...fallbackValue, loading: true });

export function ContentProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<SiteContentContextValue>({ ...fallbackValue, loading: true });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/public/content")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data: SiteContentSnapshot) => {
        if (cancelled) return;
        setValue(buildSnapshot(data));
      })
      .catch((err) => {
        // Live data na milе to static fallback pe hi rehta hai — site down nahi hoti
        console.warn("[content] falling back to static data:", err);
        if (!cancelled) setValue((v) => ({ ...v, loading: false }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useContent() {
  return useContext(SiteContentContext);
}
