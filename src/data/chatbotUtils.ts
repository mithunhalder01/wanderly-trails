import { availableTours, indiaTrips, weekendGetaways, servicesHome, whyChooseHome, homeFaqs } from '@/data/homeContent';
import { destinations, packages } from '@/data/staticData';
import { CONTACT_PHONE_DISPLAY, CONTACT_WHATSAPP_NUMBER } from '@/lib/contact';

/**
 * Generates a time-aware greeting for the chatbot.
 * @returns A greeting message.
 */
export function getChatbotGreeting(): string {
  const hour = new Date().getHours();
  let greeting: string;

  if (hour < 12) {
    greeting = "Good morning! How can I help you explore India today?";
  } else if (hour < 18) {
    greeting = "Good afternoon! Looking for an adventure? I'm here to help!";
  } else {
    greeting = "Good evening! Ready to plan your next trip? Let me know how I can assist.";
  }

  return greeting;
}

/**
 * Returns a list of all available tour titles.
 * @returns An array of tour titles.
 */
export function getAllTourTitles(): string[] {
  return availableTours.map(tour => tour.title);
}

/**
 * Finds tour details based on a query (title or ID).
 * Searches through available tours, India trips, and weekend getaways.
 * @param query - The search query (e.g., "Goa Tour", "101", "Himachal").
 * @returns A formatted string of tour details or a "not found" message.
 */
export function findTourDetails(query: string): string {
  const lowerCaseQuery = query.toLowerCase();

  // Check for Itinerary specific requests
  if (lowerCaseQuery.includes("itinerary") || lowerCaseQuery.includes("plan")) {
    if (lowerCaseQuery.includes("ladakh")) {
      return "We have a legendary 9D/8N Ladakh circuit: Delhi-Manali-Leh-Pangong. It starts at ₹31,999/-. Would you like me to show you the full day-by-day itinerary?";
    }
    if (lowerCaseQuery.includes("himachal")) {
      return "Our Himachal Backpacking covers Shimla, Manali, Kasol, and Dalhousie (8D/7N) for just ₹12,999/-. It includes stays, meals, and a bonfire party!";
    }
  }

  // Search in availableTours
  const foundTour = availableTours.find(tour =>
    tour.title.toLowerCase().includes(lowerCaseQuery) ||
    tour.id.toString() === query
  );

  if (foundTour) {
    return `🌟 *${foundTour.title}*\n💰 Price: ₹${foundTour.price.toLocaleString()}\n📝 ${foundTour.description}\n\nWould you like to book this?`;
  }

  // Search in high-quality staticData packages
  const foundPackage = packages.find(pkg => 
    pkg.title.toLowerCase().includes(lowerCaseQuery) || 
    pkg.destinationName.toLowerCase().includes(lowerCaseQuery)
  );

  if (foundPackage) {
    return `📦 *${foundPackage.title}*\n📍 Location: ${foundPackage.destinationName}\n⏳ Duration: ${foundPackage.duration} Days / ${foundPackage.nights} Nights\n💵 Price: ₹${foundPackage.price.toLocaleString()}\n✨ Includes: ${foundPackage.hotelStars}★ Hotel, Meals & Transport.`;
  }

  // Search in staticData destinations
  const foundDest = destinations.find(d => d.name.toLowerCase().includes(lowerCaseQuery));
  if (foundDest) {
    return `📍 *${foundDest.name}, ${foundDest.country}*\n⭐ Rating: ${foundDest.rating}/5\n🌤️ Best Season: ${foundDest.bestSeason}\n📉 Starts from: ₹${foundDest.startingPrice.toLocaleString()}\n\n${foundDest.description}`;
  }

  // Search in India Trips destinations
  const foundIndiaTrip = indiaTrips.destinations.find(dest =>
    dest.name.toLowerCase().includes(lowerCaseQuery) ||
    dest.slug?.toLowerCase() === lowerCaseQuery // Use optional chaining for slug
  );

  if (foundIndiaTrip) {
    return `"${foundIndiaTrip.name}" in India Trips: Price: ₹${foundIndiaTrip.price.toLocaleString()}. Image: ${foundIndiaTrip.image}`;
  }

  // Search in Weekend Getaways destinations
  const foundWeekendGetaway = weekendGetaways.destinations.find(dest =>
    dest.name.toLowerCase().includes(lowerCaseQuery)
  );

  if (foundWeekendGetaway) {
    return `"${foundWeekendGetaway.name}" in Weekend Getaways: Price: ₹${foundWeekendGetaway.price.toLocaleString()}. Image: ${foundWeekendGetaway.image}`;
  }

  return ""; // Return empty if nothing found to let other handlers try
}

/**
 * Provides general information about a specific category of trips.
 * @param category - The category to get info for ('indiaTrips' or 'weekendGetaways').
 * @returns A formatted string of category details or null if category is unknown.
 */
export function getCategoryInfo(category: 'indiaTrips' | 'weekendGetaways'): string | null {
  if (category === 'indiaTrips') {
    const destinations = indiaTrips.destinations.map(d => `${d.name} (₹${d.price.toLocaleString()})`).join(', ');
    return `${indiaTrips.title}: ${indiaTrips.subtitle}. Destinations include: ${destinations}.`;
  } else if (category === 'weekendGetaways') {
    const destinations = weekendGetaways.destinations.map(d => `${d.name} (₹${d.price.toLocaleString()})`).join(', ');
    return `${weekendGetaways.title}: ${weekendGetaways.subtitle}. Destinations include: ${destinations}.`;
  }
  return null;
}

/**
 * Finds an answer to a frequently asked question based on a query.
 * Searches through the 'homeFaqs' data.
 * @param query - The user's question or keywords related to an FAQ.
 * @returns The answer to the FAQ or a "not found" message.
 */
export function getFAQAnswer(query: string): string {
  const lowerCaseQuery = query.toLowerCase();

  // Advanced Intent: Booking & Payments
  const bookingKeywords = ["book", "reserve", "confirm", "slot", "pay", "payment"];
  if (bookingKeywords.some(k => lowerCaseQuery.includes(k))) {
    return `Booking your dream trip is simple! ✈️\n\n1️⃣ Select a package and click 'Book Now'.\n2️⃣ Chat with us on WhatsApp for instant confirmation.\n3️⃣ Or call our experts at ${CONTACT_PHONE_DISPLAY}.\n\nWhich destination are you looking at?`;
  }

  // Intent: Contact & Support
  const contactKeywords = ["contact", "call", "phone", "number", "email", "address", "office", "support"];
  if (contactKeywords.some(k => lowerCaseQuery.includes(k))) {
    return `We're here to help! 📞\n\n• Phone: ${CONTACT_PHONE_DISPLAY}\n• WhatsApp: +${CONTACT_WHATSAPP_NUMBER}\n• Email: Support is available 24/7. Shall I have a travel expert call you back?`;
  }

  // Smart check for pricing
  if (lowerCaseQuery.includes("price") || lowerCaseQuery.includes("cost") || lowerCaseQuery.includes("how much") || lowerCaseQuery.includes("cheap")) {
    if (lowerCaseQuery.includes("bali")) return "Bali packages start at ₹32,999/- per person (including stays & tours). 🏝️";
    if (lowerCaseQuery.includes("goa")) return "Goa escapes start as low as ₹10,499/-. 🏖️";
    return "Our curated trips start from just ₹6,999 (Kashmir/Himachal). You can check the 'Packages' page for the full price list!";
  }

  const foundFaq = homeFaqs.find(faq =>
    faq.q.toLowerCase().includes(lowerCaseQuery)
  );

  if (foundFaq) {
    return `Question: "${foundFaq.q}" Answer: "${foundFaq.a}"`;
  }

  return "";
}

/**
 * Master function to handle all queries smartly.
 */
export function handleSmartQuery(query: string): string {
  const text = query.trim().toLowerCase();
  
  if (text.length < 2) return "I'm listening! Please type a destination or a question (e.g., 'Bali' or 'How to book?').";

  // 1. Try FAQ/Intents
  const faq = getFAQAnswer(text);
  if (faq) return faq;

  // 2. Try Tour/Destination Search
  const tour = findTourDetails(text);
  if (tour) return tour;

  // 3. Check for greetings
  if (["hi", "hello", "hey", "sup"].includes(text)) {
    return `${getChatbotGreeting()} I can help you find the perfect trip to Goa, Himachal, Ladakh, or even Bali! 🏔️🏖️`;
  }

  // 4. Check for service list
  if (text.includes("service") || text.includes("offer")) {
    return listAllServices();
  }

  // 5. Ultimate Fallback
  const topDestinations = destinations.slice(0, 3).map(d => d.name).join(", ");
  return `I'm not quite sure about "${query}". Would you like to explore our top destinations like ${topDestinations}? Or you can speak to our expert at ${CONTACT_PHONE_DISPLAY}! 😊`;
}

/**
 * Returns a formatted string of all available services.
 * @returns A string listing all services.
 */
export function listAllServices(): string {
  if (servicesHome.length === 0) {
    return "Currently, no services are listed.";
  }
  const serviceTitles = servicesHome.map(service => service.title).join(', ');
  return `We offer several services, including: ${serviceTitles}. You can ask me for details about a specific service.`;
}

/**
 * Finds and returns details for a specific service.
 * @param query - The name or part of the name of the service.
 * @returns A formatted string of service details or a "not found" message.
 */
export function getServiceDetails(query: string): string {
  const lowerCaseQuery = query.toLowerCase();

  const foundService = servicesHome.find(service =>
    service.title.toLowerCase().includes(lowerCaseQuery)
  );

  if (foundService) {
    return `Service: "${foundService.title}". Description: "${foundService.description}"`;
  }

  return "I couldn't find details for that service. Please try listing all services or ask for a different one.";
}

/**
 * Returns a formatted string of all "Why Choose Us" reasons.
 * @returns A string listing all reasons.
 */
export function listWhyChooseReasons(): string {
  if (whyChooseHome.length === 0) {
    return "Currently, no specific reasons to choose us are listed.";
  }
  const reasonTitles = whyChooseHome.map(reason => reason.title).join(', ');
  return `Here are some reasons to choose Wanderly Trails: ${reasonTitles}. You can ask me for details about a specific reason.`;
}

/**
 * Finds and returns details for a specific "Why Choose Us" reason.
 * @param query - The title or part of the title of the reason.
 * @returns A formatted string of reason details or a "not found" message.
 */
export function getWhyChooseDetails(query: string): string {
  const lowerCaseQuery = query.toLowerCase();

  const foundReason = whyChooseHome.find(reason =>
    reason.title.toLowerCase().includes(lowerCaseQuery)
  );

  if (foundReason) {
    return `Reason: "${foundReason.title}". Description: "${foundReason.description}"`;
  }

  return "I couldn't find details for that reason. Please try listing all reasons or ask for a different one.";
}