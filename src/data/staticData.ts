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
    "name": "Himachal",
    "country": "India",
    "category": "Himachal",
    "description": "Himachal’s scenic routes, snowy peaks, and charming valley stays for an unforgettable mountain escape.",
    "imageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    "rating": 4.7,
    "startingPrice": 10499,
    "bestSeason": "March to June & Sep to Nov",
    "weather": "Cool mountain climate",
    "featured": true
  },

  {
    "id": 3,
    "name": "Kashmir",
    "country": "India",
    "category": "Nature",
    "description": "Paradise on Earth—lakes, valleys, and serene landscapes across the Kashmir region.",
    "imageUrl": "https://images.unsplash.com/photo-1595815775739-91d9c1d44e39?w=1200&q=80",
    "rating": 4.7,
    "startingPrice": 6999,
    "bestSeason": "March to June & Sep to Nov",
    "weather": "Cool and refreshing",
    "featured": true
  },
  {
    "id": 4,
    "name": "Leh Ladakh",
    "country": "India",
    "category": "Adventure",
    "description": "High-altitude desert landscapes, monasteries, and breathtaking road trips in Ladakh.",
    "imageUrl": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    "rating": 4.8,
    "startingPrice": 15800,
    "bestSeason": "May to Sep",
    "weather": "Clear skies, chilly nights",
    "featured": true
  },
  {
    "id": 5,
    "name": "Spiti Valley",
    "country": "India",
    "category": "Adventure",
    "description": "Spiti Valley circuit—ancient monasteries, cold deserts, and stunning Himalayan vistas.",
    "imageUrl": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    "rating": 4.6,
    "startingPrice": 17999,
    "bestSeason": "May to Oct",
    "weather": "Cold, crisp air with clear days",
    "featured": false
  },
  {
    "id": 6,
    "name": "Uttarakhand",
    "country": "India",
    "category": "Nature",
    "description": "Uttarakhand trails—temples, valleys, and riverside escapes for nature lovers.",
    "imageUrl": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
    "rating": 4.6,
    "startingPrice": 7499,
    "bestSeason": "Mar to Jun & Sep to Nov",
    "weather": "Pleasant temperatures",
    "featured": false
  },
  {
    "id": 7,
    "name": "Jaipur",
    "country": "India",
    "category": "Heritage",
    "description": "Pink city heritage—forts, palaces, markets, and royal experiences in Jaipur.",
    "imageUrl": "https://images.unsplash.com/photo-1542410537-844e1a9b5d38?w=1200&q=80",
    "rating": 4.7,
    "startingPrice": 20999,
    "bestSeason": "Oct to Mar",
    "weather": "Cool evenings",
    "featured": false
  },
  {
    "id": 8,
    "name": "Udaipur",
    "country": "India",
    "category": "Heritage",
    "description": "City of Lakes—royal palaces, scenic sunsets, and romantic heritage moments.",
    "imageUrl": "https://images.unsplash.com/photo-1542410537-844e1a9b5d38?w=1200&q=80",
    "rating": 4.7,
    "startingPrice": 8999,
    "bestSeason": "Oct to Mar",
    "weather": "Pleasant days, cool evenings",
    "featured": false
  },
  {
    "id": 9,
    "name": "Meghalaya",
    "country": "India",
    "category": "Nature",
    "description": "Living root bridges, misty hills, and waterfalls in Meghalaya.",
    "imageUrl": "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1200&q=80",
    "rating": 4.8,
    "startingPrice": 21499,
    "bestSeason": "Mar to Jun & Sep to Nov",
    "weather": "Misty with occasional showers",
    "featured": false
  },
  {
    "id": 10,
    "name": "Sikkim",
    "country": "India",
    "category": "Nature",
    "description": "Sikkim—mountain beauty with lakes, valleys, and serene monasteries.",
    "imageUrl": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&q=80",
    "rating": 4.7,
    "startingPrice": 18999,
    "bestSeason": "Mar to Jun & Sep to Nov",
    "weather": "Cool and clear",
    "featured": false
  },
  {
    "id": 11,
    "name": "Rajasthan",
    "country": "India",
    "category": "Adventure",
    "description": "Desert forts, camel rides, and heritage stays across royal routes in Rajasthan.",
    "imageUrl": "https://images.unsplash.com/photo-1542410537-844e1a9b5d38?w=1200&q=80",
    "rating": 4.6,
    "startingPrice": 15999,
    "bestSeason": "Oct to Mar",
    "weather": "Pleasant temperatures",
    "featured": false
  },
  {
    "id": 12,
    "name": "Andaman",
    "country": "India",
    "category": "Beaches",
    "description": "Turquoise waters and island-hopping adventures in the Andaman region.",
    "imageUrl": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    "rating": 4.6,
    "startingPrice": 19999,
    "bestSeason": "Nov to May",
    "weather": "Warm and humid",
    "featured": false
  },
  {
    "id": 13,
    "name": "Kerala",
    "country": "India",
    "category": "Family",
    "description": "Kerala backwaters and hill-station charm—houseboats, greenery, and slow travel.",
    "imageUrl": "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80",
    "rating": 4.7,
    "startingPrice": 14000,
    "bestSeason": "Sep to Mar",
    "weather": "Tropical and scenic",
    "featured": false
  },
  {
    "id": 14,
    "name": "Goa",
    "country": "India",
    "category": "Beaches",
    "description": "Sun-soaked beaches, lively nightlife, and Portuguese heritage in Goa.",
    "imageUrl": "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1200&q=80",
    "rating": 4.7,
    "startingPrice": 12999,
    "bestSeason": "Nov to Mar",
    "weather": "Warm days, cool evenings",
    "featured": false
  },
  {
    "id": 15,
    "name": "Dubai",
    "country": "UAE",


    "category": "City Break",
    "description": "Modern skyline, desert adventures, and world-class shopping. Dubai is perfect for short, high-impact vacations.",
    "imageUrl": "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1200&q=80",
    "rating": 4.7,
    "startingPrice": 44999,
    "bestSeason": "November to March",
    "weather": "Warm days, cooler evenings",
    "featured": false
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
    "id": 1001,
    "destinationId": 1,
    "destinationName": "Himachal",
    "title": "Himachal Quick Tour (4D/3N)",
    "description": "A crisp mountain escape with scenic drives, valley views, and a curated local experience.",
    "imageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    "price": 18999,
    "duration": 4,
    "nights": 3,
    "category": "Himachal",
    "rating": 4.7,
    "hotelStars": 3,
    "mealsIncluded": true,
    "transportIncluded": true,
    "includedItems": "Welcome dinner, 3 breakfasts, local sightseeing, point-to-point transfers",
    "excludedItems": "Flights, personal expenses, tips",
    "itinerary": "Day 1: Arrival & check-in. Day 2: Scenic valley tour + viewpoints. Day 3: Local market + culture stop. Day 4: Departure.",
    "featured": true
  },
  {
    "id": 1002,
    "destinationId": 1,
    "destinationName": "Himachal",
    "title": "Himachal Complete Escape (6D/5N)",
    "description": "More time to explore—mountain drives, comfortable stays, and deeper sightseeing across the region.",
    "imageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    "price": 28999,
    "duration": 6,
    "nights": 5,
    "category": "Himachal",
    "rating": 4.8,
    "hotelStars": 4,
    "mealsIncluded": true,
    "transportIncluded": true,
    "includedItems": "5 breakfasts, 2 dinners, local guide, transfers & sightseeing",
    "excludedItems": "Flights, personal expenses, activities",
    "itinerary": "Day 1: Arrival & city orientation. Day 2: Scenic route + viewpoints. Day 3: Heritage stop & local experiences. Day 4: Day trip to nearby attractions. Day 5: Leisure + market time. Day 6: Departure.",
    "featured": false
  },
  {
    "id": 1003,
    "destinationId": 1,
    "destinationName": "Himachal",
    "title": "Himachal Grand Holiday (8D/7N)",
    "description": "A full-fledged Himalayan getaway with relaxed pacing and standout scenic highlights.",
    "imageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    "price": 39999,
    "duration": 8,
    "nights": 7,
    "category": "Himachal",
    "rating": 4.9,
    "hotelStars": 4,
    "mealsIncluded": true,
    "transportIncluded": true,
    "includedItems": "7 breakfasts, curated sightseeing, local guide, transfers",
    "excludedItems": "Flights, personal expenses, tips",
    "itinerary": "Day 1: Arrival & check-in. Day 2: Scenic circuit + viewpoints. Day 3: Local culture + heritage. Day 4: Nature day trip. Day 5: Relaxed day + markets. Day 6: Scenic drive + photo stops. Day 7: Leisure/optional add-ons. Day 8: Departure.",
    "featured": false
  },
  {
    "id": 1004,
    "destinationId": 1,
    "destinationName": "Himachal",
    "title": "Himachal Explorer Circuit (7D/6N)",
    "description": "A balanced route with multiple valley stops—ideal for travelers who want variety without rushing.",
    "imageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    "price": 33999,
    "duration": 7,
    "nights": 6,
    "category": "Himachal",
    "rating": 4.8,
    "hotelStars": 4,
    "mealsIncluded": true,
    "transportIncluded": true,
    "includedItems": "6 breakfasts, 2 dinners, transfers & sightseeing, local guide",
    "excludedItems": "Flights, personal expenses, tips",
    "itinerary": "Day 1: Arrival & check-in. Day 2: Viewpoints + scenic drive. Day 3: Local market + heritage stop. Day 4: Valley day with optional activities. Day 5: Culture & nature mix. Day 6: Relaxed sightseeing + photos. Day 7: Departure.",
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
