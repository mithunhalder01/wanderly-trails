import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  blogPosts as defaultBlogPosts,
  destinations as defaultDestinations,
  packages as defaultPackages,
  testimonials as defaultTestimonials,
  type BlogPost,
  type Destination,
  type Package,
  type Testimonial,
} from "@/data/staticData";

const STORAGE_KEY = "wanderly_content_v1";

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
}

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
  upsertDestination: (payload: Omit<Destination, "id"> & { id?: number }) => number;
  upsertPackage: (payload: Omit<Package, "id"> & { id?: number }) => number;
  upsertBlogPost: (payload: Omit<BlogPost, "id"> & { id?: number }) => number;
  upsertTestimonial: (payload: Omit<Testimonial, "id"> & { id?: number }) => number;
  deleteDestination: (id: number) => void;
  deletePackage: (id: number) => void;
  deleteBlogPost: (id: number) => void;
  deleteTestimonial: (id: number) => void;
  updateSettings: (updates: Partial<SiteSettings>) => void;
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (jsonPayload: string) => { ok: true } | { ok: false; error: string };
}

const defaultSettings: SiteSettings = {
  heroTag: "Travel Smart",
  heroTitle: "Discover Your",
  heroHighlight: "Dream Destination",
  heroSubtitle:
    "Curated packages for every traveler — from Goa beaches to Bali villas.",
  heroPrimaryCta: "Explore Packages",
  heroSecondaryCta: "Customize Trip",
  featuredDestinationCount: 4,
  featuredPackageCount: 6,
  featuredBlogCount: 3,
  showTrustBar: true,
};

const cloneData = <T,>(value: T): T => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
};

const buildDefaultSnapshot = (): SiteContentSnapshot => ({
  destinations: cloneData(defaultDestinations),
  packages: cloneData(defaultPackages),
  blogPosts: cloneData(defaultBlogPosts),
  testimonials: cloneData(defaultTestimonials),
  settings: cloneData(defaultSettings),
});

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const normalizeCount = (value: unknown, fallback: number) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  return clamp(numeric, 1, 12);
};

const sanitizeSettings = (rawSettings: unknown): SiteSettings => {
  if (!rawSettings || typeof rawSettings !== "object") {
    return cloneData(defaultSettings);
  }

  const candidate = rawSettings as Partial<SiteSettings>;
  return {
    heroTag: candidate.heroTag?.trim() || defaultSettings.heroTag,
    heroTitle: candidate.heroTitle?.trim() || defaultSettings.heroTitle,
    heroHighlight: candidate.heroHighlight?.trim() || defaultSettings.heroHighlight,
    heroSubtitle: candidate.heroSubtitle?.trim() || defaultSettings.heroSubtitle,
    heroPrimaryCta: candidate.heroPrimaryCta?.trim() || defaultSettings.heroPrimaryCta,
    heroSecondaryCta: candidate.heroSecondaryCta?.trim() || defaultSettings.heroSecondaryCta,
    featuredDestinationCount: normalizeCount(
      candidate.featuredDestinationCount,
      defaultSettings.featuredDestinationCount
    ),
    featuredPackageCount: normalizeCount(
      candidate.featuredPackageCount,
      defaultSettings.featuredPackageCount
    ),
    featuredBlogCount: normalizeCount(
      candidate.featuredBlogCount,
      defaultSettings.featuredBlogCount
    ),
    showTrustBar:
      typeof candidate.showTrustBar === "boolean"
        ? candidate.showTrustBar
        : defaultSettings.showTrustBar,
  };
};

const ensureArray = <T,>(value: unknown, fallback: T[]): T[] =>
  Array.isArray(value) ? (value as T[]) : fallback;

const sanitizeSnapshot = (rawValue: unknown): SiteContentSnapshot => {
  const fallback = buildDefaultSnapshot();

  if (!rawValue || typeof rawValue !== "object") {
    return fallback;
  }

  const parsed = rawValue as Partial<SiteContentSnapshot>;

  return {
    destinations: ensureArray(parsed.destinations, fallback.destinations),
    packages: ensureArray(parsed.packages, fallback.packages),
    blogPosts: ensureArray(parsed.blogPosts, fallback.blogPosts),
    testimonials: ensureArray(parsed.testimonials, fallback.testimonials),
    settings: sanitizeSettings(parsed.settings),
  };
};

const loadInitialSnapshot = (): SiteContentSnapshot => {
  if (typeof window === "undefined") {
    return buildDefaultSnapshot();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return buildDefaultSnapshot();
    }

    return sanitizeSnapshot(JSON.parse(raw));
  } catch {
    return buildDefaultSnapshot();
  }
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

const getNextId = <T extends { id: number }>(rows: T[]): number =>
  rows.length === 0 ? 1 : Math.max(...rows.map((row) => row.id)) + 1;

export function ContentProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<SiteContentSnapshot>(() => loadInitialSnapshot());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      // Ignore storage errors (private mode / quotas)
    }
  }, [snapshot]);

  const upsertDestination = useCallback(
    (payload: Omit<Destination, "id"> & { id?: number }) => {
      let targetId = payload.id ?? 0;

      setSnapshot((prev) => {
        const exists = payload.id ? prev.destinations.some((item) => item.id === payload.id) : false;
        targetId = exists ? (payload.id as number) : getNextId(prev.destinations);

        const row: Destination = { ...payload, id: targetId };
        const nextDestinations = exists
          ? prev.destinations.map((item) => (item.id === targetId ? row : item))
          : [row, ...prev.destinations];

        return {
          ...prev,
          destinations: nextDestinations,
        };
      });

      return targetId;
    },
    []
  );

  const upsertPackage = useCallback((payload: Omit<Package, "id"> & { id?: number }) => {
    let targetId = payload.id ?? 0;

    setSnapshot((prev) => {
      const exists = payload.id ? prev.packages.some((item) => item.id === payload.id) : false;
      targetId = exists ? (payload.id as number) : getNextId(prev.packages);

      const row: Package = { ...payload, id: targetId };
      const nextPackages = exists
        ? prev.packages.map((item) => (item.id === targetId ? row : item))
        : [row, ...prev.packages];

      return {
        ...prev,
        packages: nextPackages,
      };
    });

    return targetId;
  }, []);

  const upsertBlogPost = useCallback((payload: Omit<BlogPost, "id"> & { id?: number }) => {
    let targetId = payload.id ?? 0;

    setSnapshot((prev) => {
      const exists = payload.id ? prev.blogPosts.some((item) => item.id === payload.id) : false;
      targetId = exists ? (payload.id as number) : getNextId(prev.blogPosts);

      const row: BlogPost = { ...payload, id: targetId };
      const nextBlogPosts = exists
        ? prev.blogPosts.map((item) => (item.id === targetId ? row : item))
        : [row, ...prev.blogPosts];

      return {
        ...prev,
        blogPosts: nextBlogPosts,
      };
    });

    return targetId;
  }, []);

  const upsertTestimonial = useCallback(
    (payload: Omit<Testimonial, "id"> & { id?: number }) => {
      let targetId = payload.id ?? 0;

      setSnapshot((prev) => {
        const exists = payload.id ? prev.testimonials.some((item) => item.id === payload.id) : false;
        targetId = exists ? (payload.id as number) : getNextId(prev.testimonials);

        const row: Testimonial = { ...payload, id: targetId };
        const nextTestimonials = exists
          ? prev.testimonials.map((item) => (item.id === targetId ? row : item))
          : [row, ...prev.testimonials];

        return {
          ...prev,
          testimonials: nextTestimonials,
        };
      });

      return targetId;
    },
    []
  );

  const deleteDestination = useCallback((id: number) => {
    setSnapshot((prev) => ({
      ...prev,
      destinations: prev.destinations.filter((item) => item.id !== id),
      packages: prev.packages.filter((item) => item.destinationId !== id),
    }));
  }, []);

  const deletePackage = useCallback((id: number) => {
    setSnapshot((prev) => ({
      ...prev,
      packages: prev.packages.filter((item) => item.id !== id),
    }));
  }, []);

  const deleteBlogPost = useCallback((id: number) => {
    setSnapshot((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.filter((item) => item.id !== id),
    }));
  }, []);

  const deleteTestimonial = useCallback((id: number) => {
    setSnapshot((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((item) => item.id !== id),
    }));
  }, []);

  const updateSettings = useCallback((updates: Partial<SiteSettings>) => {
    setSnapshot((prev) => ({
      ...prev,
      settings: sanitizeSettings({
        ...prev.settings,
        ...updates,
      }),
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setSnapshot(buildDefaultSnapshot());
  }, []);

  const exportData = useCallback(() => JSON.stringify(snapshot, null, 2), [snapshot]);

  const importData = useCallback((jsonPayload: string) => {
    try {
      const parsed = JSON.parse(jsonPayload);
      const sanitized = sanitizeSnapshot(parsed);
      setSnapshot(sanitized);
      return { ok: true } as const;
    } catch {
      return { ok: false, error: "Invalid JSON payload. Please paste valid exported JSON." } as const;
    }
  }, []);

  const value = useMemo<SiteContentContextValue>(() => {
    const featuredDestinations = snapshot.destinations.filter((item) => item.featured);
    const featuredPackages = snapshot.packages.filter((item) => item.featured);

    return {
      ...snapshot,
      featuredDestinations,
      featuredPackages,
      getDestinationById: (id: number) => snapshot.destinations.find((item) => item.id === id),
      getPackageById: (id: number) => snapshot.packages.find((item) => item.id === id),
      getBlogPostById: (id: number) => snapshot.blogPosts.find((item) => item.id === id),
      getPackagesByDestination: (destinationId: number) =>
        snapshot.packages.filter((item) => item.destinationId === destinationId),
      getRelatedPackages: (packageId: number) => {
        const current = snapshot.packages.find((item) => item.id === packageId);
        if (!current) {
          return [];
        }
        return snapshot.packages
          .filter(
            (item) =>
              item.id !== packageId &&
              (item.destinationId === current.destinationId || item.category === current.category)
          )
          .slice(0, 4);
      },
      upsertDestination,
      upsertPackage,
      upsertBlogPost,
      upsertTestimonial,
      deleteDestination,
      deletePackage,
      deleteBlogPost,
      deleteTestimonial,
      updateSettings,
      resetToDefaults,
      exportData,
      importData,
    };
  }, [
    snapshot,
    upsertDestination,
    upsertPackage,
    upsertBlogPost,
    upsertTestimonial,
    deleteDestination,
    deletePackage,
    deleteBlogPost,
    deleteTestimonial,
    updateSettings,
    resetToDefaults,
    exportData,
    importData,
  ]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useContent must be used inside ContentProvider");
  }
  return context;
}
