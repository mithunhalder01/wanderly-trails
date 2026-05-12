import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, Hotel, Utensils, Bus, Check, X, MapPin } from "lucide-react";
import { useGetPackage, useGetRelatedPackages, getGetPackageQueryKey, getGetRelatedPackagesQueryKey } from "@workspace/api-client-react";
import PackageCard from "@/components/PackageCard";
import SectionHeading from "@/components/SectionHeading";

const tabs = ["Overview", "Itinerary", "Included", "Related"];

export default function PackageDetail() {
  const [, params] = useRoute("/packages/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  const [activeTab, setActiveTab] = useState("Overview");

  const { data: pkg, isLoading } = useGetPackage(id, { query: { enabled: !!id, queryKey: getGetPackageQueryKey(id) } });
  const { data: related } = useGetRelatedPackages(id, { query: { enabled: !!id, queryKey: getGetRelatedPackagesQueryKey(id) } });

  if (isLoading) {
    return <div className="pt-20 min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }
  if (!pkg) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-xl">Package not found.</p>
        <Link href="/packages" className="text-primary font-semibold">Back to Packages</Link>
      </div>
    );
  }

  const included = pkg.includedItems ? pkg.includedItems.split(",").map((s) => s.trim()) : ["Hotel accommodation", "Breakfast daily", "Airport transfers", "Tour guide", "All taxes"];
  const excluded = pkg.excludedItems ? pkg.excludedItems.split(",").map((s) => s.trim()) : ["International flights", "Travel insurance", "Personal expenses", "Meals not mentioned", "Entry fees not listed"];
  const itinerary = pkg.itinerary ? pkg.itinerary.split("\n") : [
    "Day 1: Arrival & Hotel Check-in — Meet your guide and settle into your luxury accommodation.",
    "Day 2: City Tour — Explore the iconic landmarks and local culture with an expert guide.",
    "Day 3: Adventure Activities — Choose from a range of activities tailored to your interests.",
    "Day 4: Scenic Excursion — A full-day trip to nearby natural wonders.",
    "Day 5: Leisure Day — Free time to explore at your own pace or relax.",
    "Day 6: Shopping & Cultural Evening — Browse local markets and enjoy a cultural performance.",
    "Day 7: Departure — Hotel checkout and airport transfer.",
  ].slice(0, pkg.duration);

  return (
    <div className="pt-20">
      {/* Banner */}
      <div className="relative h-[50vh] min-h-80 overflow-hidden">
        <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Link href="/packages" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Packages
            </Link>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <span className="inline-block bg-accent text-white text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">{pkg.category}</span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">{pkg.title}</h1>
                <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">
                  <div className="flex items-center gap-1"><MapPin className="w-4 h-4 text-accent" />{pkg.destinationName}</div>
                  <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{pkg.rating.toFixed(1)}</div>
                  <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{pkg.duration}D / {pkg.nights}N</div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-sm">Starting from</p>
                <p className="text-4xl font-serif font-bold text-white">₹{pkg.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Tabs */}
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
                {related && related.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {related.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
                  </div>
                ) : <p className="text-muted-foreground">No related packages found.</p>}
              </motion.div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h3 className="font-serif font-bold text-xl mb-2">Book This Package</h3>
              <p className="text-muted-foreground text-sm mb-5">Secure your spot now</p>
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
              <Link href={`/booking?package=${pkg.id}&destination=${encodeURIComponent(pkg.destinationName)}`} data-testid="btn-book-package" className="block w-full bg-accent text-white text-center font-bold py-4 rounded-xl hover:bg-accent/90 transition-colors shadow-md">
                Book Now
              </Link>
              <Link href="/contact" className="block w-full border border-border text-center font-semibold py-3 rounded-xl hover:bg-muted transition-colors mt-3 text-sm">
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
