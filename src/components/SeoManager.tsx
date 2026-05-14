import { useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { getBlogPostById, getDestinationById, getPackageById } from "@/data/staticData";
import {
  CONTACT_EMAIL,
  CONTACT_MAPS_URL,
  CONTACT_OFFICE_ADDRESS,
  CONTACT_PHONE_DISPLAY,
  SOCIAL_LINKS,
} from "@/lib/contact";

const SITE_NAME = "Wanderly Trails";
const SITE_URL = "https://wanderlytrails.com";
const DEFAULT_IMAGE = `${SITE_URL}/opengraph.jpg`;
const DEFAULT_DESCRIPTION =
  "Wanderly Trails is a trusted India tour and travel agency for domestic and international holiday packages, honeymoon tours, family trips, and custom itineraries.";
const DEFAULT_KEYWORDS =
  "tour and travel agency in India, India tour packages, honeymoon packages, family trip packages, holiday packages, Wanderly Trails";

type SeoPayload = {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  robots: string;
  ogType: "website" | "article";
  ogImage: string;
  articlePublishedTime?: string;
  schemaExtras?: Record<string, unknown>[];
};

const STATIC_PAGES: Record<string, Omit<SeoPayload, "canonicalPath" | "ogImage">> = {
  "/": {
    title: "Wanderly Trails | Tour and Travel Agency in India",
    description:
      "Book domestic and international trips with Wanderly Trails. Explore curated India tour packages, honeymoon holidays, family tours, and custom travel plans.",
    keywords:
      "tour and travel agency in India, best travel agency India, India holiday packages, Goa package, Kashmir package, Bali package",
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    ogType: "website",
  },
  "/about": {
    title: "About Wanderly Trails | Trusted India Travel Agency",
    description:
      "Learn about Wanderly Trails, a customer-focused India tour and travel agency helping travelers plan smooth, memorable holidays since 2015.",
    keywords: `${DEFAULT_KEYWORDS}, about wanderly trails`,
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    ogType: "website",
  },
  "/destinations": {
    title: "Top Travel Destinations | Wanderly Trails",
    description:
      "Explore popular travel destinations in India and abroad including Goa, Kashmir, Kerala, Bali, Dubai, Maldives, and more.",
    keywords: `${DEFAULT_KEYWORDS}, best travel destinations`,
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    ogType: "website",
  },
  "/packages": {
    title: "Tour Packages from India | Wanderly Trails",
    description:
      "Compare affordable and premium tour packages with itinerary, inclusions, and pricing. Book beach, honeymoon, adventure, and family trips.",
    keywords: `${DEFAULT_KEYWORDS}, tour packages from India, affordable holiday packages`,
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    ogType: "website",
  },
  "/gallery": {
    title: "Travel Gallery | Wanderly Trails",
    description:
      "Browse real trip photos and destination moments from Wanderly Trails travelers across India and international locations.",
    keywords: `${DEFAULT_KEYWORDS}, travel photos, trip gallery`,
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    ogType: "website",
  },
  "/blog": {
    title: "Travel Blog | Tips, Guides & Itineraries | Wanderly Trails",
    description:
      "Read travel guides, destination tips, visa insights, and planning ideas to make your next holiday easy and memorable.",
    keywords: `${DEFAULT_KEYWORDS}, travel blog india, travel tips`,
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    ogType: "website",
  },
  "/testimonials": {
    title: "Customer Reviews | Wanderly Trails",
    description:
      "Read verified traveler feedback and real experiences from customers who booked their trips with Wanderly Trails.",
    keywords: `${DEFAULT_KEYWORDS}, customer reviews, travel testimonials`,
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    ogType: "website",
  },
  "/booking": {
    title: "Book Your Trip | Wanderly Trails",
    description:
      "Book your next vacation with Wanderly Trails. Get personalized packages, quick support, and smooth booking assistance.",
    keywords: `${DEFAULT_KEYWORDS}, book tour package, trip booking india`,
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    ogType: "website",
  },
  "/faq": {
    title: "FAQ | Wanderly Trails",
    description:
      "Find answers about booking, payments, cancellations, inclusions, and travel planning with Wanderly Trails.",
    keywords: `${DEFAULT_KEYWORDS}, travel faq`,
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    ogType: "website",
  },
  "/contact": {
    title: "Contact Wanderly Trails | Travel Support",
    description:
      "Contact Wanderly Trails for customized tour planning, package details, and booking support for India and international trips.",
    keywords: `${DEFAULT_KEYWORDS}, contact travel agency`,
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    ogType: "website",
  },
};

const normalizePath = (pathname: string) => {
  const cleanPath = pathname.split(/[?#]/)[0] || "/";
  if (cleanPath === "/") return "/";
  return cleanPath.replace(/\/+$/, "") || "/";
};

const toAbsoluteUrl = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

const getNotFoundSeo = (path: string): SeoPayload => ({
  title: `Page Not Found | ${SITE_NAME}`,
  description: "This page is not available.",
  keywords: DEFAULT_KEYWORDS,
  canonicalPath: path,
  robots: "noindex, nofollow",
  ogType: "website",
  ogImage: DEFAULT_IMAGE,
});

const buildSeoForPath = (path: string): SeoPayload => {
  const staticSeo = STATIC_PAGES[path];
  if (staticSeo) {
    return {
      ...staticSeo,
      canonicalPath: path,
      ogImage: DEFAULT_IMAGE,
    };
  }

  const destinationMatch = path.match(/^\/destinations\/(\d+)$/);
  if (destinationMatch) {
    const destination = getDestinationById(Number(destinationMatch[1]));
    if (!destination) return getNotFoundSeo(path);

    return {
      title: `${destination.name} Tour Packages | Wanderly Trails`,
      description: `Plan your ${destination.name} trip with Wanderly Trails, a trusted India tour and travel agency. Check highlights, best season, and tour packages starting from ₹${destination.startingPrice.toLocaleString()}.`,
      keywords: `${destination.name} tour package, ${destination.name} trip from India, ${DEFAULT_KEYWORDS}`,
      canonicalPath: path,
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      ogType: "website",
      ogImage: destination.imageUrl || DEFAULT_IMAGE,
      schemaExtras: [
        {
          "@type": "TouristDestination",
          name: destination.name,
          description: destination.description,
          image: destination.imageUrl,
          touristType: destination.category,
        },
      ],
    };
  }

  const packageMatch = path.match(/^\/packages\/(\d+)$/);
  if (packageMatch) {
    const pkg = getPackageById(Number(packageMatch[1]));
    if (!pkg) return getNotFoundSeo(path);

    return {
      title: `${pkg.title} | ${pkg.duration}D/${pkg.nights}N Package | Wanderly Trails`,
      description: `${pkg.title} package for ${pkg.destinationName} with itinerary, inclusions, and pricing from ₹${pkg.price.toLocaleString()}. Book with Wanderly Trails.`,
      keywords: `${pkg.title}, ${pkg.destinationName} package, holiday package booking, ${DEFAULT_KEYWORDS}`,
      canonicalPath: path,
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      ogType: "website",
      ogImage: pkg.imageUrl || DEFAULT_IMAGE,
      schemaExtras: [
        {
          "@type": "TouristTrip",
          name: pkg.title,
          description: pkg.description,
          itinerary: pkg.itinerary,
          provider: {
            "@type": "TravelAgency",
            name: SITE_NAME,
            url: SITE_URL,
          },
        },
      ],
    };
  }

  const blogMatch = path.match(/^\/blog\/(\d+)$/);
  if (blogMatch) {
    const post = getBlogPostById(Number(blogMatch[1]));
    if (!post) return getNotFoundSeo(path);

    const publishedDate = new Date(post.publishedAt);
    const isoDate = Number.isNaN(publishedDate.getTime()) ? undefined : publishedDate.toISOString();

    return {
      title: `${post.title} | Wanderly Trails Blog`,
      description: post.excerpt,
      keywords: `${post.category}, travel guide, travel tips, ${DEFAULT_KEYWORDS}`,
      canonicalPath: path,
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      ogType: "article",
      ogImage: post.imageUrl || DEFAULT_IMAGE,
      articlePublishedTime: isoDate,
      schemaExtras: [
        {
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: post.imageUrl,
          author: {
            "@type": "Person",
            name: post.author,
          },
          publisher: {
            "@id": `${SITE_URL}/#organization`,
          },
          datePublished: isoDate,
          mainEntityOfPage: toAbsoluteUrl(path),
        },
      ],
    };
  }

  return getNotFoundSeo(path);
};

const upsertMetaTag = (attr: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const upsertLinkTag = (rel: string, href: string) => {
  let link = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

const upsertJsonLd = (schema: Record<string, unknown>) => {
  let script = document.head.querySelector("#seo-json-ld") as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = "seo-json-ld";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
};

export default function SeoManager() {
  const [location] = useLocation();

  const seo = useMemo(() => {
    const path = normalizePath(location || "/");
    return buildSeoForPath(path);
  }, [location]);

  useEffect(() => {
    const canonicalUrl = toAbsoluteUrl(seo.canonicalPath);

    document.title = seo.title;
    document.documentElement.lang = "en-IN";

    upsertMetaTag("name", "description", seo.description || DEFAULT_DESCRIPTION);
    upsertMetaTag("name", "keywords", seo.keywords || DEFAULT_KEYWORDS);
    upsertMetaTag("name", "robots", seo.robots);
    upsertMetaTag("name", "googlebot", seo.robots);
    upsertMetaTag("name", "author", SITE_NAME);
    upsertMetaTag("name", "geo.region", "IN");
    upsertMetaTag("name", "geo.placename", "India");

    upsertMetaTag("property", "og:site_name", SITE_NAME);
    upsertMetaTag("property", "og:title", seo.title);
    upsertMetaTag("property", "og:description", seo.description || DEFAULT_DESCRIPTION);
    upsertMetaTag("property", "og:type", seo.ogType);
    upsertMetaTag("property", "og:url", canonicalUrl);
    upsertMetaTag("property", "og:image", seo.ogImage || DEFAULT_IMAGE);
    upsertMetaTag("property", "og:locale", "en_IN");

    upsertMetaTag("name", "twitter:card", "summary_large_image");
    upsertMetaTag("name", "twitter:title", seo.title);
    upsertMetaTag("name", "twitter:description", seo.description || DEFAULT_DESCRIPTION);
    upsertMetaTag("name", "twitter:image", seo.ogImage || DEFAULT_IMAGE);

    if (seo.articlePublishedTime) {
      upsertMetaTag("property", "article:published_time", seo.articlePublishedTime);
    }

    upsertLinkTag("canonical", canonicalUrl);

    const schemaGraph: Record<string, unknown>[] = [
      {
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: DEFAULT_IMAGE,
        description: DEFAULT_DESCRIPTION,
        areaServed: "India",
        telephone: CONTACT_PHONE_DISPLAY,
        email: CONTACT_EMAIL,
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT_OFFICE_ADDRESS,
          addressLocality: "Noida",
          addressRegion: "Uttar Pradesh",
          postalCode: "201301",
          addressCountry: "IN",
        },
        hasMap: CONTACT_MAPS_URL,
        sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.x, SOCIAL_LINKS.facebook, SOCIAL_LINKS.youtube],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/packages?destination={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: seo.title,
        description: seo.description || DEFAULT_DESCRIPTION,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        inLanguage: "en-IN",
      },
    ];

    if (seo.schemaExtras && seo.schemaExtras.length > 0) {
      schemaGraph.push(...seo.schemaExtras);
    }

    upsertJsonLd({
      "@context": "https://schema.org",
      "@graph": schemaGraph,
    });
  }, [seo]);

  return null;
}
