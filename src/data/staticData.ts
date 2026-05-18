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

// NOTE: keep these in sync with src/data/content.json
// (regenerate using: node src/data/syncStaticData.ts)
export const destinations: Destination[] = [
  {
    "id": 1,
    "name": "Goa",
    "country": "India",
    "category": "Beaches",
    "description": "Sun-soaked beaches, lively nightlife, and Portuguese heritage. Perfect for aa relaxed coastal getaway.",
    "imageUrl": "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&q=80",
    "rating": 4.7,
    "startingPrice": 12999,
    "bestSeason": "November to March",
    "weather": "Warm days, cool evenings, low humidity",
    "featured": true
  },
  {
    "id": 2,
    "name": "Bali",
    "country": "Indonesia",
    "category": "Luxury",
    "description": "Tropical temples, boutique resorts, and unforgettable spa experiences. A premium island escape.",
    "imageUrl": "https://images.unsplash.com/photo-1501889088093-5c9f0b1c5b6b?w=1200&q=80",
    "rating": 4.8,
    "startingPrice": 38999,
    "bestSeason": "April to October",
    "weather": "Dry season with bright skies",
    "featured": true
  },
  {
    "id": 3,
    "name": "Rajasthan",
    "country": "India",
    "category": "Adventure",
    "description": "Desert forts, camel rides, and heritage stays. Experience India’s royal routes in style.",
    "imageUrl": "https://images.unsplash.com/photo-1542410537-844e1a9b5d38?w=1200&q=80",
    "rating": 4.6,
    "startingPrice": 18999,
    "bestSeason": "October to March",
    "weather": "Pleasant temperatures, cool nights",
    "featured": false
  },
  {
    "id": 4,
    "name": "Kerala Backwaters",
    "country": "India",
    "category": "Family",
    "description": "Houseboat cruises, lush greenery, and serene riverside villages for a slow travel experience.",
    "imageUrl": "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=1200&q=80",
    "rating": 4.7,
    "startingPrice": 14999,
    "bestSeason": "September to March",
    "weather": "Comfortable and scenic backwaters",
    "featured": true
  }
];

export const packages: Package[] = [
  {
    "id": 101,
    "destinationId": 1,
    "destinationName": "Goa",
    "title": "Goa Chill & Coastal Lights (3D/2N)",
    "description": "Beach hopping, sunset cruise, and a laid-back itinerary with curated stops.",
    "imageUrl": "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1200&q=80",
    "price": 15999,
    "duration": 3,
    "nights": 2,
    "category": "Beaches",
    "rating": 4.6,
    "hotelStars": 3,
    "mealsIncluded": true,
    "transportIncluded": true,
    "includedItems": "Airport pick-up, 2 breakfasts, sunset cruise, local sightseeing",
    "excludedItems": "Flights, personal expenses, tips",
    "itinerary": "Day 1: Check-in & beach walk. Day 2: North Goa sightseeing + cruise. Day 3: Transfer & departure.",
    "featured": true
  },
  {
    "id": 102,
    "destinationId": 1,
    "destinationName": "Goa",
    "title": "Adventure North Goa (5D/4N)",
    "description": "Water sports, forts, and vibrant markets—built for active travelers.",
    "imageUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
    "price": 27999,
    "duration": 5,
    "nights": 4,
    "category": "Adventure",
    "rating": 4.7,
    "hotelStars": 3,
    "mealsIncluded": true,
    "transportIncluded": true,
    "includedItems": "Breakfasts, scooter/vehicle support, guided fort walk",
    "excludedItems": "Flights, optional activities",
    "itinerary": "Day 1: Arrival & evening markets. Day 2: Forts + beaches. Day 3: Water sport session. Day 4: Culture tour. Day 5: Departure.",
    "featured": false
  },
  {
    "id": 201,
    "destinationId": 2,
    "destinationName": "Bali",
    "title": "Bali Luxury Retreat (6D/5N)",
    "description": "Boutique stays, private transfers, and temple visits with a premium touch.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    "price": 55999,
    "duration": 6,
    "nights": 5,
    "category": "Luxury",
    "rating": 4.9,
    "hotelStars": 5,
    "mealsIncluded": false,
    "transportIncluded": true,
    "includedItems": "Private transfers, curated experiences, bottled water",
    "excludedItems": "International flights, meals, add-ons",
    "itinerary": "Day 1: Arrival & welcome dinner. Day 2: Ubud temple tour. Day 3: Spa & art village. Day 4: Beach day. Day 5: Nusa trip. Day 6: Departure.",
    "featured": true
  },
  {
    "id": 301,
    "destinationId": 3,
    "destinationName": "Rajasthan",
    "title": "Desert & Forts Explorer (7D/6N)",
    "description": "Camel rides, heritage dinners, and royal palaces across Rajasthan.",
    "imageUrl": "https://images.unsplash.com/photo-1524492412937-430c6b6f9a55?w=1200&q=80",
    "price": 47999,
    "duration": 7,
    "nights": 6,
    "category": "Adventure",
    "rating": 4.7,
    "hotelStars": 4,
    "mealsIncluded": true,
    "transportIncluded": true,
    "includedItems": "Breakfasts, heritage dinner, guided sightseeing",
    "excludedItems": "Flights, souvenirs",
    "itinerary": "Day 1: Arrival & city orientation. Day 2: Forts & bazaars. Day 3: Desert camp. Day 4: Heritage tour. Day 5: Culture show. Day 6: Scenic drives. Day 7: Departure.",
    "featured": false
  },
  {
    "id": 401,
    "destinationId": 4,
    "destinationName": "Kerala Backwaters",
    "title": "Backwater Family Cruise (4D/3N)",
    "description": "Houseboat stay, village lunch, and slow travel moments for families.",
    "imageUrl": "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80",
    "price": 23999,
    "duration": 4,
    "nights": 3,
    "category": "Family",
    "rating": 4.6,
    "hotelStars": 4,
    "mealsIncluded": true,
    "transportIncluded": true,
    "includedItems": "Houseboat cruise, meals, backwater guide",
    "excludedItems": "Flights, personal expenses",
    "itinerary": "Day 1: Arrival & check-in. Day 2: Backwater cruise. Day 3: Village lunch + sightseeing. Day 4: Departure.",
    "featured": true
  },
  {
    "id": 402,
    "destinationId": 4,
    "destinationName": "Kerala Backwaters",
    "title": "Solo Serenity in Kerala (5D/4N)",
    "description": "Mindful stays, scenic boat rides, and café-friendly local routes.",
    "imageUrl": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80",
    "price": 29999,
    "duration": 5,
    "nights": 4,
    "category": "Solo",
    "rating": 4.5,
    "hotelStars": 3,
    "mealsIncluded": false,
    "transportIncluded": true,
    "includedItems": "Transfers, curated itinerary, local guide",
    "excludedItems": "Meals, flights",
    "itinerary": "Day 1: Arrival. Day 2: Cruise + markets. Day 3: Nature trails. Day 4: Cooking class. Day 5: Departure.",
    "featured": false
  }
];

export const blogPosts: BlogPost[] = [
  {
    "id": 501,
    "title": "How to Plan a Stress-Free Beach Trip",
    "excerpt": "A quick checklist for booking, packing, and building a flexible itinerary.",
    "content": "Planning a beach trip doesn’t have to be complicated. Start with the best season, book early if you travel during peak months, and leave room for spontaneous moments like sunset walks or local markets. Choose transfers that reduce travel stress and pick one ‘anchor activity’ per day to keep your schedule enjoyable.",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    "category": "Beaches",
    "author": "Wanderly Trails Team",
    "readTime": 6,
    "publishedAt": "2026-01-10"
  },
  {
    "id": 502,
    "title": "Luxury Travel: What’s Actually Worth It?",
    "excerpt": "From hotel star ratings to private transfers—here’s how to spend smarter.",
    "content": "Luxury travel is not just about expensive hotels. It’s about reducing friction—private transfers, curated experiences, and thoughtful pacing. Look for packages that include the experiences you’d otherwise need to plan yourself, and prioritize comfort that matches your travel style. The best luxury trips feel effortless from start to finish.",
    "imageUrl": "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
    "category": "Luxury",
    "author": "Advisor Center",
    "readTime": 7,
    "publishedAt": "2026-02-02"
  },
  {
    "id": 503,
    "title": "Family Itineraries That Keep Everyone Happy",
    "excerpt": "Balancing activities, rest time, and kid-friendly fun across 4–7 days.",
    "content": "Family travel works best when you plan for energy levels, not just attractions. Mix interactive activities with downtime, pick destinations with convenient transport, and schedule meals and breaks that prevent burnout. A great family itinerary has variety, but also a predictable rhythm—everyone knows what’s coming next.",
    "imageUrl": "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80",
    "category": "Family",
    "author": "Wanderly Trails Team",
    "readTime": 5,
    "publishedAt": "2026-03-12"
  }
];

export const testimonials: Testimonial[] = [
  {
    "id": 701,
    "name": "Aarav Sharma",
    "location": "Mumbai, India",
    "rating": 5,
    "review": "Everything was smooth from booking to itinerary. The destinations felt curated, not rushed.",
    "avatarUrl": "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=256&q=80",
    "destination": "Goa"
  },
  {
    "id": 702,
    "name": "Sara Ahmed",
    "location": "Delhi, India",
    "rating": 5,
    "review": "Our Bali luxury retreat was exactly what we wanted—private transfers and perfect pacing.",
    "avatarUrl": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=256&q=80",
    "destination": "Bali"
  },
  {
    "id": 703,
    "name": "Rahul Verma",
    "location": "Bengaluru, India",
    "rating": 4,
    "review": "Kerala trip was fantastic. Loved the houseboat experience and family-friendly schedule.",
    "avatarUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&q=80",
    "destination": "Kerala Backwaters"
  }
];


export const getDestinationById = (id: number) => destinations.find((d) => d.id === id);
export const getPackageById = (id: number) => packages.find((p) => p.id === id);
export const getBlogPostById = (id: number) => blogPosts.find((b) => b.id === id);
export const getRelatedPackages = (packageId: number) => {
  const pkg = getPackageById(packageId);
  if (!pkg) return [];
  return packages.filter((p) => p.id !== packageId && (p.destinationId === pkg.destinationId || p.category === pkg.category)).slice(0, 4);
};
export const getPackagesByDestination = (destId: number) => packages.filter((p) => p.destinationId === destId);
export const featuredDestinations = destinations.filter((d) => d.featured);
export const featuredPackages = packages.filter((p) => p.featured);
