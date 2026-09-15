import type { HomeContent, Itinerary, SiteSettings } from "../../shared/types";
import * as staticData from "../../src/data/staticData";
import * as home from "../../src/data/homeContent";
import * as contact from "../../src/lib/contact";
import { kashmirItineraryData } from "../../src/data/kashmirItineraryData";
import { ladakhItineraryData } from "../../src/data/ladakhItineraryData";

/**
 * Purani hardcoded files se default settings banate hain — first run pe
 * DB me yahi seed hota hai. Uske baad admin panel se sab edit hota hai.
 */
export function defaultHomeContent(): HomeContent {
  return {
    hero: {
      brandLine: home.homeHero.brandLine,
      title: home.homeHero.title,
      titleHighlight: home.homeHero.titleHighlight,
      description: home.homeHero.description,
      ctaPrimary: home.homeHero.ctaPrimary,
      ctaSecondary: home.homeHero.ctaSecondary,
      video: "/hero-video.mp4",
      image: home.homeHero.image,
    },
    stats: {
      tours: { ...home.homeStats.tours },
      rating: { ...home.homeStats.rating },
      customers: { ...home.homeStats.customers },
    },
    about: { ...home.aboutHome, stats: [...home.aboutHome.stats] },
    indiaTrips: { ...home.indiaTrips, destinations: [...home.indiaTrips.destinations] },
    weekendGetaways: {
      ...home.weekendGetaways,
      destinations: home.weekendGetaways.destinations.map((d) => ({ ...d, slug: "" })),
    },
    services: [...home.servicesHome],
    whyChoose: [...home.whyChooseHome],
    vibe: { ...home.vibeHome, cards: [...home.vibeHome.cards] },
    faqs: [...home.homeFaqs],
    footerDestinations: [...home.footerDestinations],
  };
}

export function defaultSettings(): SiteSettings {
  return {
    ...staticData.siteSettings,
    contact: {
      phoneDigits: contact.CONTACT_PHONE_DIGITS,
      phoneDisplay: contact.CONTACT_PHONE_DISPLAY,
      email: contact.CONTACT_EMAIL,
      whatsappNumber: contact.CONTACT_WHATSAPP_NUMBER,
      officeAddress: contact.CONTACT_OFFICE_ADDRESS,
      mapsUrl: contact.CONTACT_MAPS_URL,
      mapsEmbedUrl: contact.CONTACT_MAPS_EMBED_URL,
      instagram: contact.SOCIAL_LINKS.instagram,
      facebook: contact.SOCIAL_LINKS.facebook,
      x: contact.SOCIAL_LINKS.x,
      youtube: contact.SOCIAL_LINKS.youtube,
    },
    seo: {
      siteName: "Wanderly Trails",
      defaultTitle: "Wanderly Trails — Explore India, Discover New Adventures",
      defaultDescription:
        "Curated travel packages across India — Himachal, Kashmir, Ladakh, Meghalaya, Kerala and more. Group trips, weekend getaways and custom itineraries.",
      ogImage: "/opengraph.jpg",
    },
    home: defaultHomeContent(),
  };
}

const HIMACHAL_DAYS = [
  ["DAY 1", "DELHI TO SHIMLA", "Morning 10 AM Departure from Delhi to Shimla. Night reach at Shimla. Check-in & Rest in Leisure, Dinner & Overnight stay at Hotel."],
  ["DAY 2", "SHIMLA - KUFRI", "Breakfast. Morning 9 AM checkout and proceed to visit sightseeing Kufri, Green Valley. Visit Mall Road, St. Christ Church, The Ridge, Scandal Point. Dinner. Night departure to Manali at 10 PM."],
  ["DAY 3", "MANALI LOCAL SIGHTSEEING", "Reach Manali at 9 AM and Check into Hotel (Early check-in depends upon availability of rooms). Afternoon, Proceed to visit Local Sightseeing of Hadimba Temple, Van Vihar, Tibetan Monastery and Mall Road. Have Dinner. Overnight Stay at Hotel."],
  ["DAY 4", "SOLANG VALLEY & MORE", "Breakfast. At 8 AM proceed to Solang Valley, Atal Tunnel (if open). Adventurous trekk of Jogini Waterfall (If time permits), Vashisht Temple & Hot Spring. Have Dinner with Bonfire & Enjoy Music Party. Overnight Stay at Manali."],
  ["DAY 5", "KULLU - KASOL", "Breakfast and then checkout & Proceed to Kullu Rafting Point. Visit Kasol, Manikaran Sahib. Enjoy Dinner at Langar “where food prepared from healthy sulphuric water”. Later at 10 PM proceed to Dalhousie."],
  ["DAY 6", "KHAJJIAR - DALHOUSIE", "Morning Reach at Dalhousie. Have Breakfast & Rest. Afternoon visit to Khajjiar, Mini Switzerland of India. Mall Road, St John’s Church & Gandhi Chowk. Have Dinner. Overnight stay at Dalhousie."],
  ["DAY 7", "AMRITSAR", "Breakfast. Proceed to Amritsar. Visit Wagah Border (if open), Golden Temple & Market. Have Dinner at Golden Temple Langar “The World’s Largest Kitchen”. Night departure to Delhi."],
  ["DAY 8", "REACH DELHI", "Reach Delhi. Trip Ends with Wonderful Memories of Himalayas."],
];

/** Teen purane hardcoded itinerary pages — ab DB se aayenge. */
export function defaultItineraries(): Omit<Itinerary, "id">[] {
  return [
    {
      title: "Himachal Backpacking",
      slug: "himachal-backpacking",
      subtitle: "SHIMLA | MANALI | DALHOUSIE | KASOL | AMRITSAR",
      route: "Delhi - Shimla - Manali - Kasol - Dalhousie - Amritsar - Delhi",
      durationPrice: "8D/7N at Rs.12,999/- ONWARDS",
      contact: contact.CONTACT_PHONE_DISPLAY,
      about: "",
      heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
      destinationId: 1,
      days: HIMACHAL_DAYS.map(([day, heading, description]) => ({ day, heading, description })),
      pricing: [
        { type: "Triple/Quad Sharing", price: "12,999" },
        { type: "Double Sharing", price: "14,999" },
      ],
      inclusions: [
        "Anjani Mahadev Trek (if time permits)",
        "Adventure trekking of Jogini Waterfall",
        "Bonfire, activities Burma Bridge, Balanced Bridge, Rock Climbing (if you choose to stay 1N at Manali camp at the time of booking)",
        "Music party",
        "All transfers from Delhi by AC Tempo Traveller",
        "2 nights stay at Manali",
        "1 night stay at Shimla",
        "1 night stay at Dalhousie",
        "Early check-ins at Manali & Dalhousie (if rooms are available)",
        "5 breakfast, 5 dinner and 2 langar",
        "Toll, parking and transport taxes",
        "Virtual travel manager",
        "Sightseeing or “Dhersaari Masti”",
      ],
      exclusions: [
        "Personal expenses",
        "5% GST on billing",
        "Any cost arising due to natural calamities like landslides, road blocks etc. (to be borne by the client directly on the spot)",
        "Anything not mentioned in inclusions",
      ],
      notes: [],
      precautionsSafety: [],
      termsAndConditions: [
        "Standard time of check-in at 1 AM, early check-ins depend on availability, your cooperation is appreciable.",
        "Transportation shall be provided as per the itinerary and will not be at disposal. (AC will not work on hills)",
        "Wanderly Trails will not be liable for any delay in, change to or cancellation of trips due to force majeure — circumstances beyond the reasonable control of the company including war, riot, lockdown, civil strife, terrorist activity, industrial dispute, disease, disaster, adverse weather, fire, restricted entry, flight/train cancellation and strike. We will do our best to make suitable alternate arrangements but are not liable for refunds/compensation arising out of this.",
        "Change of hotel and/or tour programme due to unavoidable circumstances not in control of the company — same category of hotel will be allotted.",
        "Registration once booked cannot be cancelled, transferred or exchanged.",
        "In case of breakdown of the vehicle, travellers have to wait for repair or another alternate option arranged by the company.",
        "Covid guidelines must be followed by all travellers.",
        "Travellers are solely responsible for any mishap, theft, loss, injuries, or illegal activities during the tour.",
        "Wanderly Trails reserves the right to take photographs of participants (with their consent) for promotional purposes. Participants who prefer not to be photographed must inform the tour leader at the start of the trip.",
      ],
      paymentPolicy: ["₹4000 INR at the time of registration", "Balance payment 4 days before departure"],
      cancellationPolicy: [
        "Registration charges are non refundable.",
        "If cancellations are made within 2 days before the start date of the trip, 100% of booking value will be charged as cancellation fees.",
        "In case of unforeseen weather conditions or government restrictions, certain activities may be cancelled; we will try our best to provide an alternate feasible activity. No refund will be provided for the same.",
        "In case of lockdown at the destination, a credit shell will be released for future bookings, after deduction of IRCTC/airline cancellation charges.",
        "If cancelled 5 days before the start date of the trip, 50% of booking value will be charged as cancellation fees.",
      ],
      pdfUrl: "",
      published: true,
    },
    {
      title: "Kashmir Tour",
      slug: "kashmir-tour",
      subtitle: kashmirItineraryData.route,
      route: kashmirItineraryData.route,
      durationPrice: kashmirItineraryData.durationPrice,
      contact: kashmirItineraryData.contact,
      about: "",
      heroImage: "/kashmir.webp",
      destinationId: 3,
      days: kashmirItineraryData.days,
      // Purani file me pax × hotel-category table thi; simple type/price rows me convert
      pricing: [
        ...kashmirItineraryData.pricing.flatMap((row) => [
          { type: `${row.pax} — Standard`, price: row.standard },
          { type: `${row.pax} — Deluxe`, price: row.deluxe },
          { type: `${row.pax} — Super Deluxe`, price: row.superDeluxe },
        ]),
        { type: "Extra person — Standard", price: kashmirItineraryData.extraPersonPricing.standard },
        { type: "Extra person — Deluxe", price: kashmirItineraryData.extraPersonPricing.deluxe },
        { type: "Extra person — Super Deluxe", price: kashmirItineraryData.extraPersonPricing.superDeluxe },
      ],
      inclusions: kashmirItineraryData.inclusions,
      exclusions: kashmirItineraryData.exclusions,
      notes: [],
      precautionsSafety: [],
      termsAndConditions: [],
      paymentPolicy: [],
      cancellationPolicy: [],
      pdfUrl: "",
      published: true,
    },
    {
      title: "Ladakh Tour",
      slug: "ladakh-tour",
      subtitle: ladakhItineraryData.route,
      route: ladakhItineraryData.route,
      durationPrice: ladakhItineraryData.durationPrice,
      contact: ladakhItineraryData.contact,
      about: ladakhItineraryData.about,
      heroImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1920&q=80",
      destinationId: 4,
      days: ladakhItineraryData.days,
      pricing: ladakhItineraryData.pricing,
      inclusions: ladakhItineraryData.inclusions,
      exclusions: ladakhItineraryData.exclusions,
      notes: ladakhItineraryData.notes,
      precautionsSafety: ladakhItineraryData.precautionsSafety,
      termsAndConditions: ladakhItineraryData.termsAndConditions,
      paymentPolicy: [],
      cancellationPolicy: [],
      pdfUrl: "",
      published: true,
    },
  ];
}

export { staticData };
