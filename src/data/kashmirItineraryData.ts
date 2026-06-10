// /Users/mac/Documents/wanderly-trails/src/data/kashmirItineraryData.ts

export const kashmirItineraryData = {
  title: "Kashmir",
  route: "Srinagar - Pahalgam - Gulmarg - Srinagar",
  durationPrice: "6D/5N at Rs.16500/- ONWARDS",
  contact: "91-7903639845, 7992433486",
  days: [
    {
      day: "Day 01:",
      heading: "Arrive - Srinagar",
      description: "On arrival at the Srinagar airport and transfer to Houseboat. In evening Shikara ride in world famous dal lake. Later return houseboat and overnight stay at the houseboat."
    },
    {
      day: "Day 02:",
      heading: "Srinagar to Pahalgam (92 kilometers / 2 hrs drive)",
      description: "After Breakfast, we drive to Pahalgam via Pampore, Avantipura and the village of Bijbehara which remains famous as the bread basket of Kashmir. We switch from the national highway 1A at Khanabal and drive through the second largest city of Anantnag. From here the road turns scenic as we drive parallel on the Lidder River flowing from the opposite direction. In Pahalgam, check-in at the hotel and spend the rest of the day at leisure. Overnight stay at the hotel in Pahalgam."
    },
    {
      day: "Day 03:",
      heading: "Pahalgam to Gulmarg (135 kilometers / 2.3 hrs drive)",
      description: "After breakfast in the morning, proceed towards Gulmarg. Enroute you get to see the beautiful Tangmarg town and drive ahead on a scenic drive of 14 kilometers to Gulmarg. Arrive in Gulmarg early in the afternoon and check in at the hotel. Later, begin a short tour, boarding the Gondola cable car system ( at your own cost)( (the 08 minutes ropeway). Descend back to Gulmarg after an hour and later indulge in some horse-riding. Stay overnight at hotel in Gulmarg."
    },
    {
      day: "Day 04:",
      heading: "Gulmarg to Srinagar",
      description: "After Breakfast take some sightseeing of Gulmarg and later proceed to Srinagar , check in the hotel & after refresh take some sightseeing of Srinagar half day tour of world famous Mughal Gardens visiting the Nishat Bagh (The garden of pleasure) and Shalimar Bagh (Adobe of love) , Shankaracharya Temple , Pari Mahal , Hazratbal Shrine. Evening back to Srinagar. Overnight Stay in the Hotel."
    },
    {
      day: "Day 05:",
      heading: "Srinagar - Sonamarg - Srinagar",
      description: "After breakfasts proceed to full day excursion of Sonamarg which is one of the most beautiful drives from Srinagar. Sonamarg also called Meadows of Gold is located at a height of 2692 meters. You may take a pony ride (at your own cost) to Thajiwas Glacier where snow remains round the year. Evening Back to Srinagar. Overnight Stay in the hotel."
    },
    {
      day: "Day 06:",
      heading: "Srinagar Airport Drop",
      description: "After your breakfast, we will assist you with transfers to Srinagar Airport. However, on your way, you can make a brief stopover for Shopping and then for your onward flight."
    }
  ],
  pricing: [
    { pax: "Min. 2 Pax per person", standard: "13100", deluxe: "16500", superDeluxe: "21900" },
    { pax: "Min. 4 Pax per person", standard: "17300", deluxe: "14200", superDeluxe: "18500" },
    { pax: "Min. 6 Pax per person", standard: "21350", deluxe: "24850", superDeluxe: "22350" }
  ],
  extraPersonPricing: {
    standard: "8200",
    deluxe: "11200",
    superDeluxe: "13600"
  },
  inclusions: [
    "Accommodation in deluxe room on twin sharing.",
    "03 Night stay at Srinagar.",
    "01 Night stay at Gulmarg.",
    "01 Night stay at Pahalgam.",
    "Transfer and sightseeing as per the above tour Itinerary by non-a/c car.",
    "Welcome drink on arrival.",
    "Complimentary Shikara Ride in Dal Lake.",
    "Accommodation on Breakfast & Dinner.",
    "Transport by Indica, Tavera.",
    "All toll taxes, drivers allowances, Fuel charges, interstate permit if necessary, all taxes.",
    "All currently applicable Hotel taxes."
  ],
  exclusions: [
    "All kind of personal expenses such as tips, laundry, telephone bills and beverages, Camera Fees.",
    "Cable Car Tickets, Any meals unless and otherwise specifically mentioned.",
    "Any claim due to road blocks, curfew, accident etc.",
    "Any other services' not specified in the Column \"Inclusions\""
  ]
};

export const generateKashmirItineraryHtmlForPDF = () => {
  const itineraryHtml = kashmirItineraryData.days.map((day, index) => `
    <div class="itinerary-day">
      <h4 class="itinerary-day-title"><span class="itinerary-day-num">${day.day}</span> ${day.heading}</h4>
      <p class="itinerary-day-desc">${day.description}</p>
    </div>
  `).join("");

  const pricingHtml = `
    <div class="pricing-table">
      <div class="pricing-row header"><span>Pax</span><span>Standard</span><span>Deluxe</span><span>Super Deluxe</span></div>
      ${kashmirItineraryData.pricing.map(p => `
        <div class="pricing-row"><span>${p.pax}</span><span>₹${p.standard}</span><span>₹${p.deluxe}</span><span>₹${p.superDeluxe}</span></div>
      `).join("")}
      <div class="pricing-row extra-person"><span>Extra Person</span><span>₹${kashmirItineraryData.extraPersonPricing.standard}</span><span>₹${kashmirItineraryData.extraPersonPricing.deluxe}</span><span>₹${kashmirItineraryData.extraPersonPricing.superDeluxe}</span></div>
    </div>
    <p class="pricing-note">* Prices mentioned are estimates. Contact support for exact quote based on travel dates.</p>
  `;

  const inclusionsHtml = kashmirItineraryData.inclusions.map(item => `
    <li class="included-item"><span class="check-icon">✔</span> ${item}</li>
  `).join("");

  const exclusionsHtml = kashmirItineraryData.exclusions.map(item => `
    <li class="excluded-item"><span class="x-icon">✖</span> ${item}</li>
  `).join("");

  return `
    <div class="section">
      <div class="section-title">Detailed 6D/5N Itinerary</div>
      <p class="itinerary-meta">${kashmirItineraryData.route}</p>
      <p class="itinerary-price-overview">${kashmirItineraryData.durationPrice}</p>
      <p class="itinerary-contact">Contact us: ${kashmirItineraryData.contact}</p>
      <div class="itinerary-days-container">${itineraryHtml}</div>
      <div class="section-title mt-8">Plan Rates & Pricing</div>
      ${pricingHtml}
    </div>
    <div class="section">
      <div class="section-title">Inclusions & Exclusions</div>
      <div style="display: flex; gap: 30px;">
        <div style="flex: 1;">
          <h4 style="color: #22c55e; margin-bottom: 10px;">Included</h4>
          <ul class="included-list">${inclusionsHtml}</ul>
        </div>
        <div style="flex: 1;">
          <h4 style="color: #ef4444; margin-bottom: 10px;">Excluded</h4>
          <ul class="excluded-list">${exclusionsHtml}</ul>
        </div>
      </div>
    </div>
  `;
};