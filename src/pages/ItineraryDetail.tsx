import { useRoute, Link } from "wouter";
import { Download, Phone, MapPin, FileWarning } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useContent } from "@/context/content";
import { CONTACT_PHONE_DIGITS } from "@/lib/contact";
import NotFound from "./not-found";

/**
 * Generic itinerary page — DB me admin ne jo bhi itinerary banayi ho (Itineraries
 * section me), wo yahan render hoti hai. Himachal/Kashmir/Ladakh ke apne dedicated
 * pages already hain; baaki sab (future itineraries) is route se serve hote hain.
 */
export default function ItineraryDetail() {
  const [, params] = useRoute("/itinerary/:slug");
  const { itineraries, settings, loading } = useContent();
  const itinerary = itineraries.find((i) => i.slug === params?.slug);

  if (!itinerary && !loading) return <NotFound />;
  if (!itinerary) return <div className="pt-20 min-h-screen bg-background" />;

  const whatsappMsg = encodeURIComponent(`Hi! I'm interested in ${itinerary.title} (${itinerary.durationPrice}). Can you share more details?`);
  const whatsappUrl = `https://wa.me/${settings.contact.whatsappNumber || "91" + CONTACT_PHONE_DIGITS}?text=${whatsappMsg}`;

  return (
    <div className="pt-20 bg-background min-h-screen">
      <div className="relative h-[250px] overflow-hidden">
        <img src={itinerary.heroImage} alt={itinerary.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 z-20 pt-6">
          <PageHeader backHref="/destinations" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinations", href: "/destinations" }]} currentTitle={itinerary.title} />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight drop-shadow-md">{itinerary.title.toUpperCase()}</h1>
          {itinerary.route && <p className="text-white/80 text-sm md:text-base mt-2">{itinerary.route}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {itinerary.about && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xl font-serif font-bold mb-3">About This Trip</h2>
                {itinerary.about.split("\n\n").map((p, i) => (
                  <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-3 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {itinerary.days.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xl font-serif font-bold mb-4">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {itinerary.days.map((day, idx) => (
                    <div key={idx}>
                      <h3 className="font-semibold text-lg text-primary">
                        {day.day} {day.heading}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">{day.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {itinerary.pricing.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xl font-serif font-bold mb-4">Pricing</h2>
                <div className="space-y-2">
                  {itinerary.pricing.map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                      <span className="text-sm text-muted-foreground">{p.type}</span>
                      <span className="font-bold text-primary">₹{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {itinerary.inclusions.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xl font-serif font-bold mb-4">Inclusions</h2>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  {itinerary.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600">✔</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {itinerary.exclusions.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xl font-serif font-bold mb-4">Exclusions</h2>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  {itinerary.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-500">✖</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {[
              { title: "Notes", items: itinerary.notes },
              { title: "Safety & Precautions", items: itinerary.precautionsSafety },
              { title: "Terms & Conditions", items: itinerary.termsAndConditions },
              { title: "Payment Policy", items: itinerary.paymentPolicy },
              { title: "Cancellation Policy", items: itinerary.cancellationPolicy },
            ]
              .filter((s) => s.items.length > 0)
              .map((s) => (
                <div key={s.title} className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-serif font-bold mb-4">{s.title}</h2>
                  <ul className="space-y-2 text-muted-foreground text-sm list-disc pl-5">
                    {s.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h3 className="font-serif font-bold text-xl mb-2">Book This Trip</h3>
              {itinerary.durationPrice && <div className="text-lg font-serif font-bold text-primary mb-5">{itinerary.durationPrice}</div>}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5c] text-white text-center font-bold py-4 rounded-xl transition-colors shadow-md"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book on WhatsApp
              </a>

              {itinerary.pdfUrl ? (
                <a
                  href={itinerary.pdfUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary text-center font-semibold py-3 rounded-xl transition-all border border-primary/20 shadow-sm mt-3 text-sm"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 w-full bg-muted text-muted-foreground text-center font-medium py-3 rounded-xl mt-3 text-xs">
                  <FileWarning className="w-4 h-4" /> PDF brochure coming soon
                </div>
              )}

              <a
                href={`tel:${settings.contact.phoneDigits || CONTACT_PHONE_DIGITS}`}
                className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary text-center font-semibold py-3 rounded-xl transition-all border border-primary/20 shadow-sm mt-3 text-sm"
              >
                <Phone className="w-4 h-4" /> Call Us
              </a>

              {itinerary.destinationId ? (
                <Link
                  href={`/destinations/${itinerary.destinationId}`}
                  className="flex items-center justify-center gap-2 w-full text-primary text-center font-medium py-2.5 mt-3 text-sm hover:underline"
                >
                  <MapPin className="w-3.5 h-3.5" /> View Destination
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
