import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Star, Clock, Hotel, Utensils, Bus, Check, X, MapPin, Download, Phone, MessageCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PackageCard from "@/components/PackageCard";
import { CONTACT_WHATSAPP_NUMBER, CONTACT_PHONE_DISPLAY } from "@/lib/contact";
import { useContent } from "@/context/content";
const tabs = ["Overview", "Itinerary", "Included", "Related"];

export default function PackageDetail() {
  const { getPackageById, getRelatedPackages } = useContent();
  const [, params] = useRoute("/packages/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  const [activeTab, setActiveTab] = useState("Overview");

  const pkg = getPackageById(id);
  const related = getRelatedPackages(id);

  if (!pkg) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-xl">Package not found.</p>
        <Link href="/packages" className="text-primary font-semibold">Back to Packages</Link>
      </div>
    );
  }

  const included = pkg.includedItems.split(",").map((s) => s.trim());
  const excluded = pkg.excludedItems.split(",").map((s) => s.trim());
  const itinerary = pkg.itinerary.split("\n");

  const whatsappMsg = encodeURIComponent(
    `Hi! I would like to book the "${pkg.title}" package.\n\nDestination: ${pkg.destinationName}\nDuration: ${pkg.duration} Days / ${pkg.nights} Nights\nPrice: ₹${pkg.price.toLocaleString()} per person\n\nPlease share the booking details. Thank you!`
  );
  const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  const handleDownloadItineraryPDF = () => {
    if (!pkg) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const itineraryHtml = pkg.itinerary.split("\n").map((day, index) => `
      <div class="itinerary-day">
        <h4 class="itinerary-day-title"><span class="itinerary-day-num">Day ${index + 1}:</span></h4>
        <p class="itinerary-day-desc">${day}</p>
      </div>
    `).join("");


    const includedHtml = included.map(item => `
      <li class="included-item"><span class="check-icon">✔</span> ${item}</li>
    `).join("");

    const excludedHtml = excluded.map(item => `
      <li class="excluded-item"><span class="x-icon">✖</span> ${item}</li>
    `).join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>${pkg.title} - Itinerary | Wanderly Trails</title>
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
              align-items: center;
              gap: 8px;
              font-size: 14px;
              color: #4b5563;
              margin-bottom: 8px;
            }
            .check-icon {
              color: #22c55e; /* green-500 */
              font-weight: bold;
            }
            .x-icon {
              color: #ef4444; /* red-500 */
              font-weight: bold;
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
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${window.location.origin}/logo.png" class="pdf-logo" alt="Logo" />
            <div class="logo">WANDERLY TRAILS</div>
            <div class="title">${pkg.title}</div>
            <div class="meta">${pkg.destinationName} • ${pkg.duration}D/${pkg.nights}N</div>
          </div>

          <img src="${pkg.imageUrl.startsWith('http') ? pkg.imageUrl : window.location.origin + pkg.imageUrl}" class="hero-img" alt="${pkg.title}" />

          <div class="section">
            <div class="section-title">About This Package</div>
            <p class="itinerary-day-desc">${pkg.description}</p>
            <ul class="included-list" style="margin-top: 15px;">
              <li class="included-item"><span class="check-icon">✔</span> ${pkg.duration} Days / ${pkg.nights} Nights</li>
              <li class="included-item"><span class="check-icon">✔</span> ${pkg.hotelStars} Star Hotel</li>
              <li class="included-item"><span class="check-icon">✔</span> Meals: ${pkg.mealsIncluded ? "Included" : "Not Included"}</li>
              <li class="included-item"><span class="check-icon">✔</span> Transport: ${pkg.transportIncluded ? "Included" : "Not Included"}</li>
              <li class="included-item"><span class="check-icon">✔</span> Rating: ${pkg.rating.toFixed(1)}/5.0</li>
              <li class="included-item"><span class="check-icon">✔</span> Price: ₹${pkg.price.toLocaleString()} per person</li>
            </ul>
          </div>

          <div class="section">
            <div class="section-title">Detailed Itinerary</div>
            <div class="itinerary-days-container">${itineraryHtml}</div>
          </div>

          <div class="section">
            <div class="section-title">What's Included & Excluded</div>
            <div style="display: flex; gap: 30px;">
              <div style="flex: 1;">
                <h4 style="color: #22c55e; margin-bottom: 10px;">Included</h4>
                <ul class="included-list">${includedHtml}</ul>
              </div>
              <div style="flex: 1;">
                <h4 style="color: #ef4444; margin-bottom: 10px;">Excluded</h4>
                <ul class="excluded-list">${excludedHtml}</ul>
              </div>
            </div>
          </div>

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
    <div className="pt-20">
      <div className="relative h-[350px] sm:h-[450px] md:h-[500px] overflow-hidden">
        <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute top-0 left-0 right-0 z-20 pt-6">
          <PageHeader 
            backHref="/" 
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Packages", href: "/packages" }]} 
            currentTitle={pkg.title} 
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <span className="inline-block bg-accent text-white text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">{pkg.category}</span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">{pkg.title}</h1>
                <div className="flex items-center gap-3 sm:gap-4 mt-2 text-white/80 text-[11px] sm:text-sm flex-wrap">
                  <div className="flex items-center gap-1"><MapPin className="w-4 h-4 text-accent" />{pkg.destinationName}</div>
                  <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{pkg.rating.toFixed(1)}</div>
                  <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{pkg.duration}D / {pkg.nights}N</div>
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end">
                <p className="text-white/60 text-[10px] sm:text-sm uppercase font-bold tracking-widest">Starting from</p>
                <p className="text-2xl sm:text-4xl font-serif font-bold text-white">₹{pkg.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  data-testid={`tab-${tab.toLowerCase()}`}
                  className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                    activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Overview" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">{pkg.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: Clock, label: "Duration", val: `${pkg.duration}D/${pkg.nights}N` },
                    { icon: Hotel, label: "Hotel", val: `${pkg.hotelStars} Star` },
                    { icon: Utensils, label: "Meals", val: pkg.mealsIncluded ? "Included" : "Not Included" },
                    { icon: Bus, label: "Transport", val: pkg.transportIncluded ? "Included" : "Not Included" },
                  ].map(({ icon: Icon, label, val }) => (
                    <div key={label} className="bg-muted rounded-xl p-4 text-center">
                      <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-semibold text-sm">{val}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "Itinerary" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {itinerary.map((day, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                    <div className="flex-1 bg-muted rounded-2xl p-4">
                      <p className="text-sm text-foreground">{day}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "Included" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-4 text-green-600">What's Included</h3>
                    <ul className="space-y-3">
                      {included.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm">
                          <Check className="w-4 h-4 text-green-600 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-4 text-red-500">Not Included</h3>
                    <ul className="space-y-3">
                      {excluded.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm">
                          <X className="w-4 h-4 text-red-500 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "Related" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {related.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:gap-5">
                    {related.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
                  </div>
                ) : <p className="text-muted-foreground">No related packages found.</p>}
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h3 className="font-serif font-bold text-xl mb-2">Book This Package</h3>
              <p className="text-muted-foreground text-sm mb-5">Book directly on WhatsApp</p>
              <div className="text-3xl font-serif font-bold text-primary mb-6">₹{pkg.price.toLocaleString()} <span className="text-sm text-muted-foreground font-normal">/ person</span></div>
              <ul className="space-y-2 mb-6">
                {[
                  pkg.mealsIncluded && "Meals included",
                  pkg.transportIncluded && "Transport included",
                  `${pkg.hotelStars}★ hotel`,
                  "24/7 support",
                ].filter(Boolean).map((item) => (
                  <li key={item as string} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-green-600" /> {item}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="btn-book-package"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5c] text-white text-center font-bold py-4 rounded-xl transition-colors shadow-md"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book on WhatsApp
              </a>
              {pkg.itinerary && (
                <button
                  onClick={handleDownloadItineraryPDF}
                  className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary text-center font-semibold py-3 rounded-xl transition-all border border-primary/20 shadow-sm mt-3 text-sm"
                >
                  <Download className="w-4 h-4" /> Download Itinerary
                </button>
              )}
              <Link href="/contact" className="block w-full border border-border text-center font-semibold py-3 rounded-xl hover:bg-muted transition-colors mt-3 text-sm">
                Have Questions? Ask Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
