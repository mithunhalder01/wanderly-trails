import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { MapPin, Calendar, Star, Thermometer, Download } from "lucide-react";
import PackageCard from "@/components/PackageCard";
import SectionHeading from "@/components/SectionHeading";
import PageHeader from "@/components/PageHeader";
import { useContent } from "@/context/content";

export default function DestinationDetail() {
  const { getDestinationById, getPackagesByDestination } = useContent();
  const [, params] = useRoute("/destinations/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  const destination = getDestinationById(id);
  const related = getPackagesByDestination(id);

  const heroImage = useMemo(() => {
    const name = (destination?.name ?? "").toLowerCase();

    const heroByName: Array<[RegExp, string]> = [
      [/(^|\b)goa(\b|$)/i, "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/bltea57b2eea49b1ca0/686f68cb1e063116c08e1053/alexey-turenkov-bWJiSZjIgTM-unsplash-HEADERMOBILE.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart"],
      [/(^|\b)manali(\b|$)/i, "https://cdn.trekthehimalayas.com/images/HomePageImages/Desktop/ef74d78c-3f2c-49a0-9611-80be45c3e54b_Solang-Valley%20(1).jpg"],
      [/(^|\b)meghalaya(\b|$)/i, "/meghalya.png"],
      [/(^|\b)rajasthan(\b|$)/i, "https://images.unsplash.com/photo-1524492412937-430c6b6f9a55?w=1920&q=80"],
      [/(^|\b)jaipur(\b|$)/i, "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920&q=80"],
      [/(^|\b)udaipur(\b|$)/i, "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?w=1920&q=80"],
      [/(^|\b)ladakh(\b|$)/i, "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1920&q=80"],
      [/(^|\b)leh(\b|$)/i, "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1920&q=80"],
      [/(^|\b)andaman(\b|$)/i, "https://images.unsplash.com/photo-1589133641163-c4419b58354b?w=1920&q=80"],
      [/(^|\b)bali(\b|$)/i, "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80"],
      [/(^|\b)dubai(\b|$)/i, "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80"],
      [/(^|\b)sikkim(\b|$)/i, "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1920&q=80"],
      [/(^|\b)spiti(\b|$)/i, "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80"],
      [/(^|\b)uttarakhand(\b|$)/i, "https://images.unsplash.com/photo-1545562083-a600704fa487?w=1920&q=80"],
      [/(^|\b)munnar(\b|$)/i, "/munnar.png"],
    ];

    for (const [re, url] of heroByName) {
      if (re.test(name)) return url;
    }

    return destination?.imageUrl;
  }, [destination]);

  const heroVideo = useMemo(() => {
    const name = (destination?.name ?? "").toLowerCase();
    if (/(^|\b)kerala(\b|$)/i.test(name)) {
      return "/sec-heading-vid/kerala-vid.mp4";
    }
    if (/(^|\b)himachal(\b|$)/i.test(name)) {
      return "/our-promiss.mp4";
    }
    return "/sec-heading-vid/des.mp4";
  }, [destination]);

  const handleDownloadPDF = () => {
    if (!destination) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${destination.name} - Travel Brochure | Wanderly Trails</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              padding: 40px;
              color: #1f2937;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              background-color: #ffffff;
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
            .grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
              margin-bottom: 30px;
              background: #fdfbf7;
              padding: 20px;
              border-radius: 12px;
              border: 1px solid #f0e6d2;
            }
            .grid-item {
              display: flex;
              flex-direction: column;
            }
            .grid-item span {
              font-size: 11px;
              color: #6b7280;
              text-transform: uppercase;
              font-weight: 700;
              letter-spacing: 0.5px;
            }
            .grid-item strong {
              font-size: 15px;
              color: #1f2937;
              margin-top: 2px;
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
            .about-text {
              color: #4b5563;
              font-size: 15px;
              line-height: 1.7;
            }
            .package-card {
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              padding: 20px;
              margin-bottom: 20px;
              background: #fafafa;
            }
            .package-title {
              font-size: 18px;
              font-weight: 700;
              color: #111827;
              margin-bottom: 5px;
            }
            .package-meta {
              font-size: 13px;
              color: #4b5563;
              font-weight: 600;
              margin-bottom: 10px;
            }
            .package-desc {
              margin: 0 0 12px 0;
              font-size: 14px;
              color: #4b5563;
            }
            .package-price {
              font-weight: 700;
              font-size: 16px;
              color: #AA771C;
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
            <div class="logo">WANDERLY TRAILS</div>
            <div class="title">${destination.name} Brochure</div>
            <div class="meta">${destination.country} • ${destination.category}</div>
          </div>

          <div class="grid">
            <div class="grid-item">
              <span>Best Season to Visit</span>
              <strong>${destination.bestSeason}</strong>
            </div>
            <div class="grid-item">
              <span>Weather</span>
              <strong>${destination.weather}</strong>
            </div>
            <div class="grid-item">
              <span>Starting Price</span>
              <strong>₹${destination.startingPrice.toLocaleString()} per person</strong>
            </div>
            <div class="grid-item">
              <span>Rating</span>
              <strong>★ ${destination.rating.toFixed(1)} / 5.0</strong>
            </div>
          </div>

          <div class="section">
            <div class="section-title">About the Destination</div>
            <p class="about-text">${destination.description}</p>
          </div>

          <!-- Remove related package section from PDF to avoid wrong/TripZada content -->
          <!-- ${related.length > 0 ? `
            <div class="section">
              <div class="section-title">Available Tour Packages</div>
              ${related.map((p) => `
                <div class="package-card">
                  <div class="package-title">${p.title}</div>
                  <div class="package-meta">${p.duration} Days / ${p.nights} Nights • ${p.hotelStars}★ Hotel</div>
                  <p class="package-desc">${p.description}</p>
                  <div class="package-price">Package Price: ₹${p.price.toLocaleString()}/- per person</div>
                </div>
              `).join("")}
            </div>
          ` : ""} -->


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

  if (!destination) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-xl">Destination not found.</p>
        <Link href="/destinations" className="text-primary font-semibold">Back to Destinations</Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="relative h-[300px] sm:h-[380px] md:h-[450px] overflow-hidden">
        <video
          src={heroVideo}
          poster={heroImage}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
        
        <div className="absolute top-0 left-0 right-0 z-20 pt-6">
          <PageHeader 
            backHref="/" 
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinations", href: "/destinations" }]} 
            currentTitle={destination.name} 
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 z-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white drop-shadow-md">{destination.name}</h1>

                <div className="mt-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-white/90 text-xs md:text-base font-medium">{destination.country}</span>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-end gap-3 flex-wrap border-t border-white/15 pt-3 md:border-none md:pt-0">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 w-fit">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-white/80 text-[9px] font-bold uppercase tracking-wider">Rating</span>
                    <span className="text-white font-extrabold text-sm">{destination.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="text-white/70 text-[9px] font-bold uppercase tracking-wider">From</span>
                  <span className="text-white font-extrabold text-xl md:text-3xl drop-shadow-sm">₹{destination.startingPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-bold mb-4">About {destination.name}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{destination.description}</p>

            {/* Extra long-form details (content already in destination fields) */}
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-serif font-bold text-lg mb-2">Why Visit {destination.name}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {destination.description}
                </p>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg mb-2">What to Expect</h3>
                <ul className="space-y-2 text-muted-foreground text-lg">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    Best season: {destination.bestSeason}
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    Typical weather: {destination.weather}
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    Travel style/category: {destination.category}
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-muted rounded-2xl p-4">
                <Calendar className="w-5 h-5 text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Best Season</p>
                <p className="font-semibold text-sm">{destination.bestSeason}</p>
              </div>
              <div className="bg-muted rounded-2xl p-4">
                <Thermometer className="w-5 h-5 text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Weather</p>
                <p className="font-semibold text-sm">{destination.weather}</p>
              </div>
              <div className="bg-muted rounded-2xl p-4">
                <MapPin className="w-5 h-5 text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-semibold text-sm">{destination.category}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 h-fit">
            <h3 className="font-serif font-bold text-xl mb-4">Quick Info</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Country</span>
                <span className="font-semibold">{destination.country}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Category</span>
                <span className="font-semibold">{destination.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Best Season</span>
                <span className="font-semibold">{destination.bestSeason}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Starting Price</span>
                <span className="font-bold text-primary">₹{destination.startingPrice.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center justify-center gap-2 w-full mt-6 bg-primary/10 hover:bg-primary/20 text-primary text-center font-semibold py-3 rounded-xl transition-all border border-primary/20 shadow-sm"
            >
              <Download className="w-4 h-4" /> Download PDF Brochure
            </button>
            <Link href="/booking" className="block mt-3 bg-accent text-white text-center font-semibold py-3 rounded-xl hover:bg-accent/90 transition-colors">
              Book Now
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
            <SectionHeading badge="Available" title={`Packages for ${destination.name}`} subtitle="Choose from our curated packages" center={false} />
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 mt-8">
              {related.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
