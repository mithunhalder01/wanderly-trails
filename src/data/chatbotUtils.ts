import { availableTours, indiaTrips, weekendGetaways, servicesHome, whyChooseHome, homeFaqs } from '@/data/homeContent';
import { destinations, packages } from '@/data/staticData';

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
export function findTourDetails(query: string): string | null {
  const lowerCaseQuery = query.toLowerCase();

  // Search in availableTours
  const foundTour = availableTours.find(tour =>
    tour.title.toLowerCase().includes(lowerCaseQuery) ||
    tour.id.toString() === query
  );

  if (foundTour) {
    return `"${foundTour.title}" (ID: ${foundTour.id}): ${foundTour.description} Price: ₹${foundTour.price.toLocaleString()}.`;
  }

  // Search in high-quality staticData packages
  const foundPackage = packages.find(pkg => 
    pkg.title.toLowerCase().includes(lowerCaseQuery) || 
    pkg.destinationName.toLowerCase().includes(lowerCaseQuery)
  );

  if (foundPackage) {
    return `Package: "${foundPackage.title}" for ${foundPackage.destinationName}. Duration: ${foundPackage.duration} Days. Price: ₹${foundPackage.price.toLocaleString()}. Itinerary: ${foundPackage.description}`;
  }

  // Search in staticData destinations
  const foundDest = destinations.find(d => d.name.toLowerCase().includes(lowerCaseQuery));
  if (foundDest) {
    return `${foundDest.name} is a beautiful destination in ${foundDest.country}. 
            Rating: ${foundDest.rating}/5. 
            Best Season: ${foundDest.bestSeason}. 
            Starting Price: ₹${foundDest.startingPrice.toLocaleString()}. 
            Description: ${foundDest.description}`;
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

  return "I couldn't find details for that specific tour or destination. Please try being more specific with the name or ID, or ask me to list available tours.";
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

  // Smart check for specific topics
  if (lowerCaseQuery.includes("price") || lowerCaseQuery.includes("cheap")) {
    return "Our packages start from ₹6,999 (Kashmir/Himachal). You can check the 'Packages' page for a full list sorted by price!";
  }

  const foundFaq = homeFaqs.find(faq =>
    faq.q.toLowerCase().includes(lowerCaseQuery)
  );

  if (foundFaq) {
    return `Question: "${foundFaq.q}" Answer: "${foundFaq.a}"`;
  }

  return "I couldn't find an answer to that specific question in my FAQs. Could you please rephrase or ask about a different topic?";
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