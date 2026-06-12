// /Users/mac/Documents/wanderly-trails/src/pages/KashmirItinerary.tsx
import { Link } from "wouter";
import { ArrowLeft, Phone, MessageCircle, Download } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { CONTACT_WHATSAPP_NUMBER, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_DIGITS } from "@/lib/contact";
import { kashmirItineraryData, generateKashmirItineraryHtmlForPDF } from "@/data/kashmirItineraryData";

export default function KashmirItinerary() {
  const contactPhone = CONTACT_PHONE_DISPLAY;
  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in the Kashmir Tour package (${kashmirItineraryData.durationPrice}). Can you please share more details or help me book?`
  );
  const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  const handleDownloadPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${kashmirItineraryData.title} - Itinerary | Wanderly Trails</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              padding: 50px;
              color: #1f2937;
              line-height: 1.6;
              max-width: 800px;
              margin: 20px auto;
              background-color: #ffffff;
              border: 10px double #AA771C;
              position: relative;
            }
            .pdf-logo {
              width: 80px;
              height: 80px;
              object-fit: contain;
              margin-bottom: 10px;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #BF953F;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 26px;
              font-weight: 800;
              letter-spacing: 2px;
              color: #AA771C;
            }
            .title {
              font-size: 36px;
              font-weight: 700;
              margin-top: 10px;
              margin-bottom: 5px;
              color: #111827;
            }
            .meta {
              font-size: 14px;
              color: #4b5563;
              text-transform: uppercase;
              letter-spacing: 1px;
              font-weight: 600;
            }
            .hero-img {
              width: 100%;
              height: 350px;
              object-fit: cover;
              border-radius: 15px;
              margin-bottom: 30px;
              border: 1px solid #f0e6d2;
            }
            .section {
              margin-bottom: 35px;
            }
            .section-title {
              font-size: 20px;
              font-weight: 700;
              border-left: 4px solid #BF953F;
              padding-left: 12px;
              margin-bottom: 15px;
              color: #AA771C;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .itinerary-day {
              margin-bottom: 20px;
              padding-left: 15px;
              border-left: 3px solid #BF953F;
            }
            .itinerary-day-title {
              font-size: 16px;
              font-weight: 700;
              color: #111827;
              margin-bottom: 5px;
            }
            .itinerary-day-num {
              color: #AA771C;
              margin-right: 5px;
            }
            .itinerary-day-desc {
              font-size: 14px;
              color: #4b5563;
              line-height: 1.6;
            }
            .included-list, .excluded-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .included-item, .excluded-item {
              display: flex;
              align-items: flex-start; /* Changed to flex-start for multi-line items */
              gap: 8px;
              font-size: 14px;
              color: #4b5563;
              margin-bottom: 8px;
            }
            .check-icon {
              color: #22c55e; /* green-500 */
              font-weight: bold;
              flex-shrink: 0; /* Prevent icon from shrinking */
            }
            .x-icon {
              color: #ef4444; /* red-500 */
              font-weight: bold;
              flex-shrink: 0; /* Prevent icon from shrinking */
            }
            .contact-info {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
            }
            .contact-info p {
              margin-bottom: 5px;
              font-size: 14px;
              color: #4b5563;
            }
            .footer {
              text-align: center;
              margin-top: 50px;
              font-size: 12px;
              color: #9ca3af;
              border-top: 1px solid #e5e7eb;
              padding-top: 20px;
            }
            .itinerary-meta {
              font-size: 14px;
              color: #4b5563;
              margin-bottom: 10px;
              font-weight: 600;
            }
            .itinerary-price-overview {
              font-size: 16px;
              color: #1f2937;
              font-weight: 700;
              margin-bottom: 10px;
            }
            .itinerary-contact {
              font-size: 14px;
              color: #4b5563;
              margin-bottom: 20px;
            }
            .pricing-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .pricing-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 15px;
              border-bottom: 1px solid #e5e7eb;
            }
            .pricing-row:last-child {
              border-bottom: none;
            }
            .pricing-row.header {
              background-color: #f0f0f0;
              font-weight: 700;
              color: #111827;
            }
            .pricing-row span {
              flex: 1;
              text-align: center;
              font-size: 13px;
              color: #4b5563;
            }
            .pricing-row.header span {
              color: #111827;
            }
            .pricing-note {
              font-size: 11px;
              color: #6b7280;
              text-align: center;
              margin-top: 15px;
            }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${window.location.origin}/logo.png" class="pdf-logo" alt="Logo" />
            <div class="logo">WANDERLY TRAILS</div>
            <div class="title">${kashmirItineraryData.title} Tour</div>
            <div class="meta">${kashmirItineraryData.route}</div>
          </div>

          <img src="${window.location.origin}/kashmir.png" class="hero-img" alt="${kashmirItineraryData.title}" />

          ${generateKashmirItineraryHtmlForPDF()}

          <div class="contact-info">
            <p>For bookings and inquiries, contact us:</p>
            <p>Phone: ${CONTACT_PHONE_DISPLAY}</p>
            <p>WhatsApp: ${CONTACT_WHATSAPP_NUMBER}</p>
          </div>

          <div class="footer">
            <p>Generated by Wanderly Trails. Book online at wanderly-trails.com or contact us on WhatsApp.</p>
            <p>&copy; ${new Date().getFullYear()} Wanderly Trails. All rights reserved.</p>
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="pt-20 bg-background min-h-screen">
      <div className="relative h-[250px] overflow-hidden">
        <img
          src="/kashmir.png" // Using the image from content.json for Kashmir
          alt="Kashmir Tour"
          fetchpriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 z-20 pt-6">
          <PageHeader
            backHref="/destinations/3" // Link back to Kashmir destination detail
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinations", href: "/destinations" }, { label: "Kashmir", href: "/destinations/3" }]}
            currentTitle="Kashmir Tour"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight drop-shadow-md">
            {kashmirItineraryData.title.toUpperCase()} TOUR
          </h1>
          <p className="text-white/80 text-sm md:text-base mt-2">
            {kashmirItineraryData.route}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Info */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Contact for Booking</h2>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold">{contactPhone}</span>
              </div>
              <p className="text-muted-foreground mt-2">
                Scroll down for full itinerary details.
              </p>
            </div>

            {/* Timeline Summary */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Your Timeline Summary</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
                {kashmirItineraryData.days.map((day, idx) => (
                  <div key={idx} className="bg-muted p-3 rounded-lg">
                    <p className="font-semibold text-sm">DAY {idx + 1}</p>
                    <p className="text-xs text-muted-foreground">{day.heading.split(' - ')[1] || day.heading}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Itinerary */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Detailed Itinerary</h2>
              <div className="space-y-6">
                {kashmirItineraryData.days.map((day, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-lg text-primary">{day.day} {day.heading}</h3>
                    <p className="text-muted-foreground mt-1">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost of Package */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Cost of Package Per Person</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Pax</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Standard</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Deluxe</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Super Deluxe</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {kashmirItineraryData.pricing.map((p, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-foreground">{p.pax}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-muted-foreground">₹{p.standard}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-muted-foreground">₹{p.deluxe}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-muted-foreground">₹{p.superDeluxe}</td>
                      </tr>
                    ))}
                    <tr className="bg-muted/50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-foreground">Extra Person</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-bold text-primary">₹{kashmirItineraryData.extraPersonPricing.standard}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-bold text-primary">₹{kashmirItineraryData.extraPersonPricing.deluxe}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-bold text-primary">₹{kashmirItineraryData.extraPersonPricing.superDeluxe}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">* Prices mentioned are estimates. Contact support for exact quote based on travel dates.</p>
            </div>

            {/* Inclusions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Inclusions</h2>
              <ul className="space-y-2 text-muted-foreground text-sm">
                {kashmirItineraryData.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2"><span className="text-green-600">✔</span> {item}</li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Exclusions</h2>
              <ul className="space-y-2 text-muted-foreground text-sm">
                {kashmirItineraryData.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2"><span className="text-red-500">✖</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar - Book Now */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h3 className="font-serif font-bold text-xl mb-2">Book This Trip</h3>
              <p className="text-muted-foreground text-sm mb-5">Get in touch with our experts for booking.</p>
              <div className="text-3xl font-serif font-bold text-primary mb-6">₹16,500/- <span className="text-sm text-muted-foreground font-normal">/ person (starting)</span></div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5c] text-white text-center font-bold py-4 rounded-xl transition-colors shadow-md"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book on WhatsApp
              </a>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary text-center font-semibold py-3 rounded-xl transition-all border border-primary/20 shadow-sm mt-3 text-sm"
              >
                <Download className="w-4 h-4" /> Download Itinerary
              </button>
              <a
                href={`tel:${CONTACT_PHONE_DIGITS}`}
                className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary text-center font-semibold py-3 rounded-xl transition-all border border-primary/20 shadow-sm mt-3 text-sm"
              >
                <Phone className="w-4 h-4" /> Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}