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
    description: "Goa is India's smallest state, known for its stunning beaches, vibrant nightlife, Portuguese-influenced architecture, and fresh seafood. The golden sands, swaying palms, and turquoise waters make it a paradise for beach lovers and partygoers alike.",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    rating: 4.8,
    startingPrice: 8999,
    bestSeason: "Oct – Mar",
    weather: "Tropical, 25–35°C",
    featured: true,
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    category: "International",
    description: "Bali is an island paradise in Indonesia offering a unique blend of spiritual traditions, lush rice terraces, volcanic mountains, and pristine beaches. Known as the Island of Gods, it's a top destination for honeymooners and spiritual seekers.",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    rating: 4.9,
    startingPrice: 29999,
    bestSeason: "Apr – Oct",
    weather: "Tropical, 26–30°C",
    featured: true,
  },
  {
    id: 3,
    name: "Dubai",
    country: "UAE",
    category: "International",
    description: "Dubai is a city of superlatives — the world's tallest building, largest mall, and most luxurious hotels. This futuristic metropolis combines ultra-modern architecture with traditional Arabian culture in the heart of the desert.",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    rating: 4.7,
    startingPrice: 35000,
    bestSeason: "Nov – Mar",
    weather: "Desert, 20–35°C",
    featured: true,
  },
  {
    id: 4,
    name: "Kashmir",
    country: "India",
    category: "Mountains",
    description: "Kashmir, often called 'Paradise on Earth', is a breathtaking valley surrounded by the majestic Himalayas. From the serene Dal Lake and its iconic houseboats to the meadows of Gulmarg, Kashmir is nature's finest masterpiece.",
    imageUrl: "https://images.unsplash.com/photo-1604608672516-f1b9b6c5eca5?w=800&q=80",
    rating: 4.9,
    startingPrice: 15999,
    bestSeason: "Mar – Jun, Sep – Nov",
    weather: "Alpine, -2–25°C",
    featured: true,
  },
  {
    id: 5,
    name: "Switzerland",
    country: "Europe",
    category: "International",
    description: "Switzerland offers some of the world's most dramatic Alpine scenery — snow-capped peaks, pristine lakes, and charming villages. Whether skiing in winter or hiking in summer, Switzerland is a year-round adventure.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    rating: 4.9,
    startingPrice: 89999,
    bestSeason: "Jun – Sep, Dec – Feb",
    weather: "Alpine, -5–25°C",
    featured: false,
  },
  {
    id: 6,
    name: "Rajasthan",
    country: "India",
    category: "Desert",
    description: "Rajasthan, the Land of Kings, is India's most colourful state. Royal forts, lavish palaces, camel rides in the Thar Desert, and vibrant bazaars make it a cultural treasure. Visit Jaipur, Jodhpur, and Udaipur for an unforgettable experience.",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    rating: 4.7,
    startingPrice: 11999,
    bestSeason: "Oct – Mar",
    weather: "Desert, 10–40°C",
    featured: false,
  },
  {
    id: 7,
    name: "Maldives",
    country: "Maldives",
    category: "Beaches",
    description: "The Maldives is the ultimate tropical escape — crystal-clear turquoise lagoons, overwater bungalows, and some of the world's best snorkeling and diving. It's a dream destination for honeymooners and luxury seekers.",
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    rating: 4.9,
    startingPrice: 79999,
    bestSeason: "Nov – Apr",
    weather: "Tropical, 26–30°C",
    featured: false,
  },
  {
    id: 8,
    name: "Kerala",
    country: "India",
    category: "India",
    description: "Kerala, 'God's Own Country', is famous for its tranquil backwaters, lush hill stations, pristine beaches, and Ayurvedic wellness retreats. Cruise through the palm-lined canals of Alleppey or explore the tea gardens of Munnar.",
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    rating: 4.8,
    startingPrice: 12999,
    bestSeason: "Sep – Mar",
    weather: "Tropical, 20–35°C",
    featured: false,
  },
];

export const packages: Package[] = [
  {
    id: 1,
    destinationId: 1,
    destinationName: "Goa, India",
    title: "Goa Beach Paradise",
    description: "Experience the magic of Goa with this all-inclusive beach package. Enjoy sun-soaked days on pristine beaches, explore vibrant flea markets, taste authentic Goan cuisine, and relish breathtaking sunsets over the Arabian Sea.",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    price: 12999,
    duration: 5,
    nights: 4,
    category: "Beaches",
    rating: 4.8,
    hotelStars: 4,
    mealsIncluded: true,
    transportIncluded: true,
    includedItems: "Hotel accommodation, Breakfast & dinner daily, Airport transfers, North & South Goa sightseeing, Beach water sports, Tour guide",
    excludedItems: "Airfare, Travel insurance, Lunch, Personal expenses, Entry fees not listed",
    itinerary: "Day 1: Arrival at Goa Airport, check-in & welcome dinner\nDay 2: North Goa beaches – Baga, Calangute, Anjuna flea market\nDay 3: Old Goa churches, Spice plantation tour, Mandovi River cruise\nDay 4: South Goa – Palolem, Colva beach, water sports\nDay 5: Leisure morning, checkout & departure",
    featured: true,
  },
  {
    id: 2,
    destinationId: 2,
    destinationName: "Bali, Indonesia",
    title: "Bali Honeymoon Special",
    description: "Celebrate your love story in the magical Island of Gods. This romantic package includes a private villa with pool, candlelit dinners, couples' spa, temple tours, and everything you need for an unforgettable honeymoon.",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    price: 49999,
    duration: 7,
    nights: 6,
    category: "Honeymoon",
    rating: 4.9,
    hotelStars: 5,
    mealsIncluded: true,
    transportIncluded: true,
    includedItems: "Private pool villa, All meals, Airport pick-up & drop, Romantic candlelit dinner, Couples spa session, Tanah Lot temple tour, Ubud rice terrace tour, Mount Batur sunrise trek",
    excludedItems: "International airfare, Visa fees, Personal shopping, Optional water sports, Tips & gratuities",
    itinerary: "Day 1: Arrive Denpasar, private transfer to villa, welcome dinner\nDay 2: Ubud – Sacred Monkey Forest, rice terraces, art markets\nDay 3: Couples spa & wellness day, romantic sunset at Tanah Lot\nDay 4: Mount Batur sunrise trek, natural hot springs\nDay 5: Seminyak beach, water sports & beachside lunch\nDay 6: Leisure day, candlelit farewell dinner\nDay 7: Checkout & departure",
    featured: true,
  },
  {
    id: 3,
    destinationId: 3,
    destinationName: "Dubai, UAE",
    title: "Dubai City of Dreams",
    description: "Step into the future with our premium Dubai package. Visit the iconic Burj Khalifa, shop at the world's largest mall, experience a thrilling desert safari, and soak in the opulence of this extraordinary city.",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    price: 55000,
    duration: 6,
    nights: 5,
    category: "Luxury",
    rating: 4.7,
    hotelStars: 5,
    mealsIncluded: true,
    transportIncluded: true,
    includedItems: "5-star hotel, Breakfast daily, Airport transfers, Burj Khalifa ticket, Dubai Mall visit, Desert safari with BBQ dinner, Dubai Creek & Gold Souk tour, City tour",
    excludedItems: "International flights, Visa fees, Lunch & dinner (except safari), Personal shopping, Optional activities",
    itinerary: "Day 1: Arrive Dubai, hotel check-in, evening Dubai Mall & Burj Khalifa\nDay 2: Dubai city tour – Gold Souk, Spice Souk, Dubai Creek, Al Fahidi\nDay 3: Desert safari – dune bashing, camel ride, BBQ dinner & stargazing\nDay 4: Palm Jumeirah, Atlantis Aquaventure, Dubai Marina\nDay 5: Abu Dhabi day trip – Sheikh Zayed Mosque, Ferrari World\nDay 6: Leisure morning, duty-free shopping, departure",
    featured: true,
  },
  {
    id: 4,
    destinationId: 4,
    destinationName: "Kashmir, India",
    title: "Kashmir Valley Romance",
    description: "Float on the serene Dal Lake in a traditional shikara, stay in a luxurious houseboat, and witness the breathtaking beauty of Kashmir's valleys, meadows, and snow-capped peaks. Paradise awaits.",
    imageUrl: "https://images.unsplash.com/photo-1604608672516-f1b9b6c5eca5?w=800&q=80",
    price: 22999,
    duration: 7,
    nights: 6,
    category: "Honeymoon",
    rating: 4.9,
    hotelStars: 4,
    mealsIncluded: true,
    transportIncluded: true,
    includedItems: "Luxury houseboat stay, All meals, Airport transfers, Shikara ride, Gulmarg gondola ride, Pahalgam valley tour, Sonmarg excursion, Saffron field visit",
    excludedItems: "Airfare, Travel insurance, Personal shopping, Horse rides, Tips",
    itinerary: "Day 1: Arrive Srinagar, check-in houseboat, shikara sunset ride\nDay 2: Mughal Gardens – Shalimar Bagh, Nishat Bagh, Chashme Shahi\nDay 3: Gulmarg – gondola ride, snow activities\nDay 4: Pahalgam – Betaab Valley, Aru Valley, Baisaran meadows\nDay 5: Sonmarg – Thajiwas Glacier, river rafting\nDay 6: Local bazaar shopping, local cuisine evening\nDay 7: Checkout & departure from Srinagar",
    featured: true,
  },
  {
    id: 5,
    destinationId: 5,
    destinationName: "Switzerland, Europe",
    title: "Swiss Alps Adventure",
    description: "Explore the stunning Swiss Alps with this premium European getaway. Ride the Jungfraujoch train to the Top of Europe, cruise the pristine Lake Geneva, and explore Lucerne's charming medieval old town.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    price: 149999,
    duration: 8,
    nights: 7,
    category: "Adventure",
    rating: 4.8,
    hotelStars: 5,
    mealsIncluded: true,
    transportIncluded: true,
    includedItems: "5-star hotel, Breakfast & dinner, Swiss Travel Pass, Jungfraujoch excursion, Lake Geneva cruise, Lucerne city tour, Interlaken adventure, Airport transfers",
    excludedItems: "International flights, Visa fees, Lunch, Personal expenses, Optional ski passes",
    itinerary: "Day 1: Arrive Zurich, hotel check-in, city walk\nDay 2: Jungfraujoch – Top of Europe by train\nDay 3: Interlaken – adventure activities, paragliding option\nDay 4: Lucerne – Chapel Bridge, Lion Monument, lake cruise\nDay 5: Geneva – Jet d'Eau, UN Palace, Lake Geneva\nDay 6: Bern – Bear Park, Rose Garden, Parliament\nDay 7: Mt. Pilatus or Titlis excursion\nDay 8: Departure from Zurich",
    featured: false,
  },
  {
    id: 6,
    destinationId: 6,
    destinationName: "Rajasthan, India",
    title: "Royal Rajasthan Tour",
    description: "Travel like royalty through the land of maharajas. Visit magnificent forts, palatial hotels, experience a camel safari in the Thar Desert, and immerse yourself in the colourful culture of Rajasthan.",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    price: 18999,
    duration: 8,
    nights: 7,
    category: "Adventure",
    rating: 4.6,
    hotelStars: 4,
    mealsIncluded: true,
    transportIncluded: true,
    includedItems: "Heritage hotel, Breakfast daily, AC vehicle, Jaipur city tour, Amber Fort, Jaisalmer Desert Camp, Camel safari, Udaipur lake tour, Jodhpur Mehrangarh Fort",
    excludedItems: "Airfare, Lunch & dinner, Personal shopping, Entry fees, Tips",
    itinerary: "Day 1: Arrive Jaipur, check-in heritage hotel, local orientation\nDay 2: Jaipur – Amber Fort, City Palace, Hawa Mahal, Jantar Mantar\nDay 3: Drive Jaisalmer – Sam Sand Dunes, desert camp\nDay 4: Camel safari, sunrise at dunes, Jaisalmer fort\nDay 5: Drive Jodhpur – Mehrangarh Fort, Jaswant Thada\nDay 6: Drive Udaipur – City Palace, Pichola Lake boat ride\nDay 7: Ranakpur temples, Chittorgarh fort\nDay 8: Departure",
    featured: false,
  },
  {
    id: 7,
    destinationId: 7,
    destinationName: "Maldives",
    title: "Maldives Luxury Escape",
    description: "Indulge in absolute luxury at an exclusive overwater villa in the Maldives. Snorkel with manta rays, dine under the stars, and wake up to the most stunning ocean views in the world.",
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    price: 129999,
    duration: 6,
    nights: 5,
    category: "Luxury",
    rating: 5.0,
    hotelStars: 5,
    mealsIncluded: true,
    transportIncluded: true,
    includedItems: "Overwater bungalow, All-inclusive meals, Seaplane transfers, Snorkeling, Sunset dolphin cruise, Water sports, Spa session, Underwater restaurant dinner",
    excludedItems: "International flights, Visa fees, Diving courses, Personal expenses, Alcohol (beyond package)",
    itinerary: "Day 1: Arrive Malé, seaplane to resort, welcome drinks & dinner\nDay 2: Snorkeling safari, dolphin sunset cruise\nDay 3: Water sports – jet ski, banana boat, parasailing\nDay 4: House reef diving, spa day, underwater restaurant dinner\nDay 5: Sandbank picnic, island hopping\nDay 6: Leisure morning, departure",
    featured: false,
  },
  {
    id: 8,
    destinationId: 8,
    destinationName: "Kerala, India",
    title: "Kerala Backwaters Bliss",
    description: "Cruise through Kerala's enchanting backwaters on a traditional kettuvallam houseboat, rejuvenate with Ayurvedic spa treatments, and explore the lush tea and spice plantations of Munnar.",
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    price: 16999,
    duration: 6,
    nights: 5,
    category: "Family",
    rating: 4.7,
    hotelStars: 4,
    mealsIncluded: true,
    transportIncluded: true,
    includedItems: "Houseboat stay, Resort accommodation, All meals, Alleppey houseboat cruise, Munnar tea estate tour, Periyar Wildlife Sanctuary, Ayurvedic massage, Cochin heritage tour",
    excludedItems: "Airfare, Personal shopping, Optional water sports, Tips",
    itinerary: "Day 1: Arrive Cochin, heritage walk, kathakali dance show\nDay 2: Drive Munnar – tea gardens, Echo Point, Mattupetty Dam\nDay 3: Thekkady – Periyar Tiger Reserve boat safari, spice plantation\nDay 4: Drive Alleppey, houseboat check-in, backwater cruise\nDay 5: Kovalam beach – Ayurvedic spa, lighthouse, sunset\nDay 6: Drive Trivandrum, Padmanabhaswamy Temple, departure",
    featured: false,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 10 Hidden Beaches in Goa You Must Visit",
    excerpt: "Beyond the crowded shores of Baga and Calangute lie some of Goa's best-kept secrets — pristine, untouched beaches that few tourists know about.",
    content: "Goa is famous the world over for its beautiful beaches, but most tourists only know the popular ones. Hidden gems like Butterfly Beach, Honeymoon Beach, and Cola Beach offer a peaceful escape from the crowds.\n\nButterfly Beach is only accessible by boat and is surrounded by lush greenery. The water is crystal clear and there are almost no facilities, which means it stays wonderfully pristine. You can hire a fisherman's boat from Palolem for about ₹500 return.\n\nCola Beach is perhaps the most magical — a freshwater lagoon sits right next to the sea, creating a unique swimming experience. The beach is backed by dramatic red cliffs and swaying palms. It's a 3km walk from the road, which deters most tourists.\n\nKakolem Beach (Tiger Beach) requires a 30-minute trek through the jungle. Once you arrive, you'll be rewarded with a completely empty beach with dramatic rock formations and powerful waves.\n\nHoneymoon Beach near Butterfly is accessible only by boat. True to its name, it's a perfect romantic hideaway. The soft white sand and swaying palms make it an ideal spot for couples.\n\nArambol Beach in North Goa has a sweet lake just behind the beach where you can swim. The lake is warm and slightly sulphurous — perfect for soaking. The beach itself has a laid-back hippie vibe.\n\nTo explore these hidden beaches, hire a local fisherman as a guide. They know these coastlines intimately and can take you safely to spots no guidebook mentions.",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    category: "Destinations",
    author: "Priya Sharma",
    readTime: 8,
    publishedAt: "2024-11-15T00:00:00Z",
  },
  {
    id: 2,
    title: "A First-Timer's Complete Guide to Bali",
    excerpt: "Planning your first trip to the Island of Gods? This comprehensive guide covers everything from the best neighbourhoods to stay in, to must-try foods and cultural etiquette.",
    content: "Bali can feel overwhelming for first-time visitors. With so many areas, temples, and activities, knowing where to begin is the biggest challenge. This guide will help you plan the perfect first visit.\n\nWhere to stay: Seminyak is ideal for beach lovers and shoppers. Ubud is perfect for culture and spirituality. Canggu suits digital nomads and surfers. Jimbaran is great for romantic sunset dinners by the beach.\n\nMust-visit temples: Tanah Lot is Bali's most photographed temple, perched on a rock in the sea. Best at sunset. Uluwatu Temple sits on a dramatic cliff 70 metres above the Indian Ocean — the kecak fire dance here at sunset is unmissable. Besakih, the Mother Temple, is Bali's largest and most sacred temple complex on the slopes of Mount Agung.\n\nFood you must try: Nasi Goreng (fried rice), Babi Guling (suckling pig at Ibu Oka in Ubud), Bebek Betutu (slow-cooked duck), and fresh tropical fruit from the markets.\n\nCultural tips: Always dress modestly at temples. Carry a sarong. When Nyepi (Day of Silence) falls, the entire island goes dark for 24 hours. Respect local ceremonies — if you see an offering procession, give way and don't photograph without permission.",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    category: "Destinations",
    author: "Rahul Mehta",
    readTime: 12,
    publishedAt: "2024-10-28T00:00:00Z",
  },
  {
    id: 3,
    title: "How to Travel India on a Budget: Tips That Actually Work",
    excerpt: "India is one of the world's most rewarding budget destinations, but it helps to know the tricks. From cheap trains to local dhabas, here's how to stretch every rupee.",
    content: "India offers extraordinary experiences at a fraction of what you'd pay elsewhere. With some planning, you can travel comfortably for as little as ₹1,500 per day including accommodation, food, and transport.\n\nTrain travel: India's rail network is the world's largest and incredibly affordable. Book on IRCTC 90 days in advance for the best prices. Sleeper class is very cheap; AC 3-Tier (3A) is comfortable for long journeys.\n\nAccommodation: Government-run tourist bungalows and YMCAs offer clean, safe rooms for ₹500-800. Dharamshalas near major temples provide free or very cheap accommodation.\n\nFood: Eat where locals eat — dhabas on highways, thali restaurants in cities. A full meal rarely costs more than ₹80-120. Railway station food is often excellent and very cheap.\n\nState buses vs private buses: State buses are far cheaper than private tourist buses. They're slower but give you a real Indian experience.\n\nFree sights: Many of India's greatest monuments — ghats in Varanasi, Lodhi Gardens in Delhi, Gateway of India — are free to visit. Major temples charge no entry.",
    imageUrl: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80",
    category: "Budget Travel",
    author: "Anjali Krishnan",
    readTime: 10,
    publishedAt: "2024-09-12T00:00:00Z",
  },
  {
    id: 4,
    title: "Kashmir in Winter: A Snow-Covered Wonderland",
    excerpt: "Most tourists visit Kashmir in summer, but winter reveals a completely different, breathtakingly beautiful side of the valley — frozen lakes, snow-draped chinars, and empty streets.",
    content: "While most travellers flock to Kashmir between May and September, the winter months of December through February transform the valley into a magical snow globe.\n\nDal Lake in winter: The famous lake partially freezes, and locals cross it on foot or skate across its surface. Watching the sun rise over a frozen Dal Lake from your houseboat, with snow-capped mountains reflected in the ice, is one of the most extraordinary sights in India.\n\nGulmarg ski resort: This is Asia's best ski resort and operates from December to March. You can rent ski equipment and take lessons even if you're a complete beginner. The gondola up to Apharwat Peak offers views that rival anything in the Alps.\n\nThe quiet: In winter, most tourist infrastructure shuts down, and you'll have the valley mostly to yourself. Local Kashmiris are extraordinarily warm and hospitable in winter — they appreciate visitors who come during the off-season.\n\nSaffron harvest: The brief autumn saffron harvest in Pampore near Srinagar, just before winter sets in, turns the fields purple with crocus flowers. It's one of India's most spectacular and least-known natural events.",
    imageUrl: "https://images.unsplash.com/photo-1604608672516-f1b9b6c5eca5?w=800&q=80",
    category: "Destinations",
    author: "Vikram Nair",
    readTime: 7,
    publishedAt: "2024-12-01T00:00:00Z",
  },
  {
    id: 5,
    title: "Dubai Visa Guide for Indian Travelers (2025 Update)",
    excerpt: "Planning a Dubai trip from India? Here's everything you need to know about the visa process — types, costs, processing time, and the safest way to apply.",
    content: "Dubai remains one of the most popular international destinations for Indian travelers. The visa process is straightforward, but there are several options and some common pitfalls to avoid.\n\nVisa-on-arrival: Indian citizens with a valid US, UK, EU, or Australian visa can get a visa on arrival in Dubai. This is a 14-day stamp, renewable once for another 14 days.\n\nStandard tourist visa: Applied for online through the ICA (Federal Authority for Identity, Citizenship, Customs & Port Security) website or through an authorised travel agency. Takes 3-5 working days. Cost: approximately ₹6,000-8,000 for a 30-day single entry.\n\nMulti-entry visa: Valid for 6 months with stays of 30 or 90 days. Best for frequent travellers.\n\nApply through an authorised agent: If you're unsure, apply through a registered travel agent. They handle paperwork and guarantee your visa is legitimate. Avoid very cheap offers from unknown sources — many are scams.\n\nDocuments needed: Valid passport (6 months validity), recent passport photo with white background, confirmed return flight ticket, hotel booking, bank statement (last 3 months).",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    category: "Visa Guide",
    author: "Sonia Patel",
    readTime: 9,
    publishedAt: "2025-01-05T00:00:00Z",
  },
  {
    id: 6,
    title: "Best Beach Destinations in Asia for 2025",
    excerpt: "From the turquoise atolls of the Maldives to the dramatic limestone karsts of Thailand's Krabi, we rank Asia's finest beach destinations for your 2025 travel wishlist.",
    content: "Asia is home to some of the world's greatest beaches, from the famous to the wonderfully obscure. Here's our definitive ranking for 2025.\n\n1. Maldives: Nothing touches the Maldives for sheer water clarity and luxury. The sandbanks (sandbars that appear at low tide) are among the most surreal natural phenomena on earth.\n\n2. El Nido, Philippines: Dramatic limestone cliffs, hidden lagoons, and some of the clearest water in the world. Island-hopping tours from El Nido are breathtaking.\n\n3. Gili Islands, Indonesia: Three tiny car-free islands off Lombok. No motorised vehicles, world-class snorkelling, and a wonderfully laid-back vibe.\n\n4. Radhanagar Beach, Andaman: Consistently ranked among Asia's best beaches, Radhanagar is everything you imagine when you think of a perfect beach — white sand, turquoise water, jungle backdrop.\n\n5. Krabi, Thailand: The combination of beach, rock-climbing, and island-hopping makes Krabi irresistible. Railay Beach, accessible only by boat, is a world unto itself.\n\nTop tip: Visit these destinations outside school holidays (avoid May, October, and December 20–January 5) for significantly lower prices and fewer crowds.",
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    category: "Beaches",
    author: "Arjun Desai",
    readTime: 6,
    publishedAt: "2025-02-10T00:00:00Z",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya & Rohan Sharma",
    location: "Mumbai, India",
    rating: 5,
    review: "Our Bali honeymoon was absolutely magical! Wanderly Trails took care of every single detail — the private villa was stunning, the itinerary was perfectly balanced, and whenever we had a question our guide was just a call away. We couldn't have asked for a more perfect start to our married life.",
    avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&q=80",
    destination: "Bali Honeymoon Special",
  },
  {
    id: 2,
    name: "Vikram Nair",
    location: "Bangalore, India",
    rating: 5,
    review: "The Swiss Alps Adventure was beyond anything I'd imagined. The Jungfraujoch experience was jaw-dropping. What impressed me most was how smoothly everything was organised — trains on time, hotels perfectly located, and guides who genuinely knew their destinations. Will absolutely book again.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    destination: "Swiss Alps Adventure",
  },
  {
    id: 3,
    name: "Ananya & Family",
    location: "Delhi, India",
    rating: 5,
    review: "We took our family of 5 (including two kids under 10) to Kerala and it was perfect. The houseboat experience on the backwaters was the highlight — the kids were fascinated. Wanderly Trails understood exactly what a family holiday needs. Every meal was delicious, every hotel family-friendly.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    destination: "Kerala Backwaters Bliss",
  },
  {
    id: 4,
    name: "Siddharth Rao",
    location: "Pune, India",
    rating: 4,
    review: "Did the Dubai City of Dreams package for a solo trip and it was great value. The desert safari was the highlight — dune bashing was thrilling and the BBQ under the stars was unforgettable. One suggestion: could include more free evenings for independent exploration. Otherwise, excellent.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    destination: "Dubai City of Dreams",
  },
  {
    id: 5,
    name: "Meera & Suresh",
    location: "Chennai, India",
    rating: 5,
    review: "Kashmir in spring was like entering a dream. The tulip gardens were in full bloom, the shikara ride on Dal Lake at dawn was beyond words, and Gulmarg's snow was a first for both of us. Our guide was incredibly knowledgeable and warm. Thank you Wanderly Trails for this memory of a lifetime.",
    avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&q=80",
    destination: "Kashmir Valley Romance",
  },
  {
    id: 6,
    name: "Rahul Gupta",
    location: "Hyderabad, India",
    rating: 5,
    review: "Went with a group of 8 friends for the Goa package. The organisers nailed everything — from the beach hotel right on Calangute to the North & South Goa sightseeing. The water sports arrangements were seamless. Great pricing, zero hassle. This is the only way to do Goa!",
    avatarUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&q=80",
    destination: "Goa Beach Paradise",
  },
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
