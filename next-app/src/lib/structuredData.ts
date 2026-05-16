import { DEFAULT_DESCRIPTION, DEFAULT_IMAGE, SITE_NAME, SITE_URL, toAbsoluteUrl } from "@/lib/seo";

type Graph = Record<string, unknown>[];

export function buildOrganizationSchema() {
  return {
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: DEFAULT_IMAGE,
    description: DEFAULT_DESCRIPTION,
    areaServed: "India",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Noida",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
    sameAs: [],
  };
}

export function buildWebsiteSchema() {
  return {
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
  };
}

export function buildWebPageSchema(opts: {
  url: string;
  title: string;
  description?: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${opts.url}#webpage`,
    url: opts.url,
    name: opts.title,
    description: opts.description || DEFAULT_DESCRIPTION,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    inLanguage: "en-IN",
  };
}

export function buildBreadCrumbListSchema(items: { label: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.label,
      item: toAbsoluteUrl(it.url.replace(SITE_URL, "")),
    })),
  };
}

export function buildFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function buildTravelAgencyBaseGraph(opts: {
  canonicalUrl: string;
  pageTitle: string;
  pageDescription?: string;
  schemaExtras?: Record<string, unknown>[];
}) {
  const graph: Graph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema({
      url: opts.canonicalUrl,
      title: opts.pageTitle,
      description: opts.pageDescription,
    }),
  ];
  if (opts.schemaExtras?.length) graph.push(...opts.schemaExtras);
  return graph;
}

