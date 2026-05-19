export interface Destination {
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

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Goa",
    country: "India",
    category: "Beaches",
    description:
      "Goa is India's smallest state, known for its stunning beaches, vibrant nightlife, Portuguese-influenced architecture, and fresh seafood. The golden sands, swaying palms, and turquoise waters make it a paradise for beach lovers and partygoers alike.",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    rating: 4.8,
    startingPrice: 8999,
    bestSeason: "Oct – Mar",
    weather: "Tropical, 25–35°C",
    featured: true,
  },
  {
    id: 9,
    name: "Manali",
    country: "India",
    category: "Himachal",
    description:
      "Manali is a mountain paradise in Himachal Pradesh—snowy peaks, apple orchards, and scenic drives like Rohtang Pass for an unforgettable escape.",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    rating: 4.7,
    startingPrice: 13999,
    bestSeason: "Mar – Jun, Sep – Nov",
    weather: "Cool mountain climate",
    featured: true,
  },
  {
    id: 10,
    name: "Honeymoon at Spiti",
    country: "India",
    category: "Himachal",
    description:
      "Experience Spiti’s cold deserts, monasteries, and breathtaking landscapes—an offbeat Himachal adventure designed for couples.",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    rating: 4.7,
    startingPrice: 25999,
    bestSeason: "May – Sep",
    weather: "Chilly nights, clear days",
    featured: true,
  },
  {
    id: 11,
    name: "Meghalaya",
    country: "India",
    category: "Nature",
    description:
      "Meghalaya is the land of living root bridges, misty hills, and cascading waterfalls—perfect for nature lovers and slow explorers.",
    imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80",
    rating: 4.8,
    startingPrice: 16999,
    bestSeason: "Mar – Jun, Sep – Nov",
    weather: "Misty with occasional showers",
    featured: true,
  },
  {
    id: 12,
    name: "Goa (North Goa)",
    country: "India",
    category: "Beaches",
    description:
      "North Goa is all about lively beaches, flea markets, and vibrant nightlife—ideal for beach lovers who want energy and fun.",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    rating: 4.6,
    startingPrice: 10999,
    bestSeason: "Nov – Mar",
    weather: "Warm and sunny",
    featured: true,
  },
  {
    id: 2,
    name: "Kashmir",
    country: "India",
    category: "Mountains",
    description:
      "Kashmir, often called 'Paradise on Earth', is a breathtaking valley surrounded by the majestic Himalayas. From the serene Dal Lake and its iconic houseboats to the meadows of Gulmarg, Kashmir is nature's finest masterpiece.",
    imageUrl: "https://images.unsplash.com/photo-1604608672516-f1b9b6c5eca5?w=800&q=80",
    rating: 4.9,
    startingPrice: 15999,
    bestSeason: "Mar – Jun, Sep – Nov",
    weather: "Alpine, -2–25°C",
    featured: true,
  },
  {
    id: 3,
    name: "Rajasthan",
    country: "India",
    category: "Desert",
    description:
      "Rajasthan, the Land of Kings, is India's most colourful state. Royal forts, lavish palaces, camel rides in the Thar Desert, and vibrant bazaars make it a cultural treasure. Visit Jaipur, Jodhpur, and Udaipur for an unforgettable experience.",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    rating: 4.7,
    startingPrice: 11999,
    bestSeason: "Oct – Mar",
    weather: "Desert, 10–40°C",
    featured: false,
  },
  {
    id: 4,
    name: "Kerala",
    country: "India",
    category: "Backwaters",
    description:
      "Kerala, 'God's Own Country', is famous for its tranquil backwaters, lush hill stations, pristine beaches, and Ayurvedic wellness retreats. Cruise through the palm-lined canals of Alleppey or explore the tea gardens of Munnar.",
    imageUrl: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=800&q=80",
    rating: 4.8,
    startingPrice: 12999,
    bestSeason: "Sep – Mar",
    weather: "Tropical, 20–35°C",
    featured: true,
  },
  {
    id: 5,
    name: "Andaman Islands",
    country: "India",
    category: "Beaches",
    description:
      "Turquoise waters, coral reefs, and island-hopping adventures. Ideal for scuba lovers and beach seekers.",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    rating: 4.6,
    startingPrice: 24999,
    bestSeason: "Nov – May",
    weather: "Ocean breeze, warm & humid",
    featured: true,
  },
  {
    id: 6,
    name: "Sikkim",
    country: "India",
    category: "Mountains",
    description:
      "Himalayan landscapes, monasteries, and scenic drives. A serene escape for nature lovers and trekkers.",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    rating: 4.6,
    startingPrice: 16999,
    bestSeason: "Mar – Jun, Sep – Dec",
    weather: "Cool mountain climate",
    featured: true,
  },
  {
    id: 7,
    name: "Udaipur",
    country: "India",
    category: "Heritage",
    description:
      "City of Lakes with royal palaces, vibrant markets, and scenic cruises. A romantic heritage escape in Rajasthan.",
    imageUrl: "https://images.unsplash.com/photo-1549641409-65a114cdb2f7?w=800&q=80",
    rating: 4.7,
    startingPrice: 14999,
    bestSeason: "Oct – Mar",
    weather: "Pleasant days, cool evenings",
    featured: false,
  },
  {
    id: 8,
    name: "Ladakh",
    country: "India",
    category: "Adventure",
    description:
      "High-altitude desert landscapes, monasteries, and breathtaking road trips. For travelers who want the ultimate adventure.",
    imageUrl: "https://images.unsplash.com/photo-1501706362039-c6e80973c2f4?w=800&q=80",
    rating: 4.8,
    startingPrice: 29999,
    bestSeason: "May – Sep",
    weather: "Clear skies in summer",
    featured: false,
  },
];

export const packages: Package[] = [
  {
    id: 1,
    destinationId: 1,
    destinationName: "Goa, India",
    title: "Goa Beach Paradise",
    description:
      "Experience the magic of Goa with this all-inclusive beach package. Enjoy sun-soaked days on pristine beaches, explore vibrant flea markets, taste authentic Goan cuisine, and relish breathtaking sunsets over the Arabian Sea.",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    price: 12999,
    duration: 5,
    nights: 4,
    category: "Beaches",
    rating: 4.8,
    hotelStars: 4,
    mealsIncluded: true,
    transportIncluded: true,
    includedItems:
      "Hotel accommodation, Breakfast & dinner daily, Airport transfers, North & South Goa sightseeing, Beach water sports, Tour guide",
    excludedItems:
      "Airfare, Travel insurance, Lunch, Personal expenses, Entry fees not listed",
    itinerary:
      "Day 1: Arrival at Goa Airport, check-in & welcome dinner\nDay 2: North Goa beaches – Baga, Calangute, Anjuna flea market\nDay 3: Old Goa churches, Spice plantation tour, Mandovi River cruise\nDay 4: South Goa – Palolem, Colva beach, water sports\nDay 5: Leisure morning, checkout & departure",
    featured: true,
  },
  {
    id: 2,
    destinationId: 2,
    destinationName: "Bali, Indonesia",
    title: "Bali Honeymoon Special",
    description:
      "Celebrate your love story in the magical Island of Gods. This romantic package includes a private villa with pool, candlelit dinners, couples' spa, temple tours, and everything you need for an unforgettable honeymoon.",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    price: 49999,
    duration: 7,
    nights: 6,
    category: "Honeymoon",
    rating: 4.9,
    hotelStars: 5,
    mealsIncluded: true,
    transportIncluded: true,
    includedItems:
      "Private pool villa, All meals, Airport pick-up & drop, Romantic candlelit dinner, Couples spa session, Tanah Lot temple tour, Ubud rice terrace tour, Mount Batur sunrise trek",
    excludedItems:
      "International airfare, Visa fees, Personal shopping, Optional water sports, Tips & gratuities",
    itinerary:
      "Day 1: Arrive Denpasar, private transfer to villa, welcome dinner\nDay 2: Ubud – Sacred Monkey Forest, rice terraces, art markets\nDay 3: Couples spa & wellness day, romantic sunset at Tanah Lot\nDay 4: Mount Batur sunrise trek, natural hot springs\nDay 5: Seminyak beach, water sports & beachside lunch\nDay 6: Leisure day, candlelit farewell dinner\nDay 7: Checkout & departure",
    featured: true,
  },
];

export const blogPosts: BlogPost[] = [];

export const testimonials: Testimonial[] = [];

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

