import fs from "fs/promises";
import path from "path";

const rootDir = process.cwd();
const contentPath = path.join(rootDir, "src", "data", "content.json");
const staticDataPath = path.join(rootDir, "src", "data", "staticData.ts");

async function main() {
  const raw = await fs.readFile(contentPath, "utf-8");
  const json = JSON.parse(raw) as any;

  const destinations = JSON.stringify(json.destinations ?? [], null, 2);
  const packages = JSON.stringify(json.packages ?? [], null, 2);
  const blogPosts = JSON.stringify(json.blogPosts ?? [], null, 2);
  const testimonials = JSON.stringify(json.testimonials ?? [], null, 2);

  const out = `export interface Destination {
  id: number;
  name: string;
  country: string;
  category: string;
  description: string;
  imageUrl: string;
  rating: number;
  startingPrice: number;
  bestSeason: string;
  weather: string;
  featured: boolean;
}

export interface Package {
  id: number;
  destinationId: number;
  destinationName: string;
  title: string;
  description: string;
  imageUrl: string;
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
  featured: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  readTime: number;
  publishedAt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatarUrl: string;
  destination: string;
}

export const destinations: Destination[] = ${destinations};

export const packages: Package[] = ${packages};

export const blogPosts: BlogPost[] = ${blogPosts};

export const testimonials: Testimonial[] = ${testimonials};

export const getDestinationById = (id: number) => destinations.find((d) => d.id === id);
export const getPackageById = (id: number) => packages.find((p) => p.id === id);
export const getBlogPostById = (id: number) => blogPosts.find((b) => b.id === id);
export const getRelatedPackages = (packageId: number) => {
  const pkg = getPackageById(packageId);
  if (!pkg) return [];
  return packages
    .filter((p) => p.id !== packageId && (p.destinationId === pkg.destinationId || p.category === pkg.category))
    .slice(0, 4);
};
export const getPackagesByDestination = (destId: number) => packages.filter((p) => p.destinationId === destId);
export const featuredDestinations = destinations.filter((d) => d.featured);
export const featuredPackages = packages.filter((p) => p.featured);
`;

  await fs.writeFile(staticDataPath, out, "utf-8");
  console.log("staticData.ts synced from content.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

