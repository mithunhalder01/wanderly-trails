import { createContext, useContext, type ReactNode } from "react";
import {
  blogPosts,
  destinations,
  packages,
  siteSettings,
  testimonials,
  type BlogPost,
  type Destination,
  type Package,
  type SiteSettings,
  type Testimonial,
} from "@/data/staticData";

export type { SiteSettings };

export interface SiteContentSnapshot {
  destinations: Destination[];
  packages: Package[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  settings: SiteSettings;
}

interface SiteContentContextValue extends SiteContentSnapshot {
  featuredDestinations: Destination[];
  featuredPackages: Package[];
  getDestinationById: (id: number) => Destination | undefined;
  getPackageById: (id: number) => Package | undefined;
  getBlogPostById: (id: number) => BlogPost | undefined;
  getPackagesByDestination: (destinationId: number) => Package[];
  getRelatedPackages: (packageId: number) => Package[];
}

// Content build-time par resolve ho jata hai — koi runtime fetch nahi,
// isliye pehle hi paint par poora data available hota hai.
const contentValue: SiteContentContextValue = {
  destinations,
  packages,
  blogPosts,
  testimonials,
  settings: siteSettings,
  featuredDestinations: destinations.filter((item) => item.featured),
  featuredPackages: packages.filter((item) => item.featured),
  getDestinationById: (id) => destinations.find((item) => item.id === id),
  getPackageById: (id) => packages.find((item) => item.id === id),
  getBlogPostById: (id) => blogPosts.find((item) => item.id === id),
  getPackagesByDestination: (destinationId) =>
    packages.filter((item) => item.destinationId === destinationId),
  getRelatedPackages: (packageId) => {
    const current = packages.find((item) => item.id === packageId);
    if (!current) {
      return [];
    }
    return packages
      .filter(
        (item) =>
          item.id !== packageId &&
          (item.destinationId === current.destinationId || item.category === current.category)
      )
      .slice(0, 4);
  },
};

const SiteContentContext = createContext<SiteContentContextValue>(contentValue);

export function ContentProvider({ children }: { children: ReactNode }) {
  return <SiteContentContext.Provider value={contentValue}>{children}</SiteContentContext.Provider>;
}

export function useContent() {
  return useContext(SiteContentContext);
}
