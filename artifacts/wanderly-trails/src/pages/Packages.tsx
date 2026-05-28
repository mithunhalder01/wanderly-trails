import { useState, useMemo, useRef } from "react";
import { useSearch } from "wouter";
import { motion } from "framer-motion";
import { SlidersHorizontal, Volume2, VolumeX } from "lucide-react";
import { packages } from "@/data/staticData";
import PackageCard from "@/components/PackageCard";

const categories = ["All", "Adventure", "Honeymoon", "Family", "Solo", "Luxury", "Beaches"];
const durations = ["All", "1-3", "4-7", "8-14", "15+"];
const budgets = ["All", "Under ₹15,000", "₹15,000-₹30,000", "₹30,000-₹60,000", "₹60,000+"];

const HEADER_VIDEO = "/packagesvid.mp4";

export default function Packages() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const defaultCategory = params.get("category") || "All";

  const [category, setCategory] = useState(defaultCategory);
  const [duration, setDuration] = useState("All");
  const [budget, setBudget] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const filteredPackages = useMemo(() => {
    return packages.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (duration !== "All") {
        if (duration === "1-3" && !(p.duration >= 1 && p.duration <= 3)) return false;
        if (duration === "4-7" && !(p.duration >= 4 && p.duration <= 7)) return false;
        if (duration === "8-14" && !(p.duration >= 8 && p.duration <= 14)) return false;
        if (duration === "15+" && p.duration < 15) return false;
      }
      if (budget === "Under ₹15,000" && p.price >= 15000) return false;
      if (budget === "₹15,000-₹30,000" && !(p.price >= 15000 && p.price <= 30000)) return false;
      if (budget === "₹30,000-₹60,000" && !(p.price >= 30000 && p.price <= 60000)) return false;
      if (budget === "₹60,000+" && p.price <= 60000) return false;
      return true;
    });
  }, [category, duration, budget]);

  const toggleMute = () => {
    setMuted((m) => {
      if (videoRef.current) videoRef.current.muted = !m;
      return !m;
    });
  };

  return (
    <div className="pt-20">
      {/* ── Video Hero Header ── */}
      <section className="relative h-64 sm:h-80 md:h-96 flex items-end overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          src={HEADER_VIDEO}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-secondary/30" />

        {/* Mute toggle */}
        <button
          type="button"
          onClick={toggleMute}
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1.5 text-white text-xs font-medium hover:bg-black/60 transition-all"
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          {muted ? "Unmute" : "Mute"}
        </button>

        {/* Text content — anchored to bottom */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-white">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <span className="text-xs font-bold tracking-widest uppercase text-amber-400 block mb-2">
              Find Your Trip
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold drop-shadow-lg">
              All Packages
            </h1>
            <p className="mt-2 text-sm md:text-base text-white/80 max-w-lg">
              Handcrafted itineraries for every kind of explorer — from mountains to beaches.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Packages content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">{filteredPackages.length} packages found</p>
          <button
            onClick={() => setShowFilters(!showFilters)}
            data-testid="btn-toggle-filters"
            className="flex items-center gap-2 text-sm font-semibold text-foreground border border-border px-4 py-2 rounded-xl hover:bg-muted transition-colors md:hidden"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <div className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 shrink-0`}>
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-serif font-bold text-lg">Filters</h3>
                <button
                  onClick={() => { setCategory("All"); setDuration("All"); setBudget("All"); }}
                  className="text-xs text-primary hover:text-primary/80 font-semibold"
                >
                  Reset
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      data-testid={`filter-pkg-category-${c.toLowerCase()}`}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        category === c ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Duration (Days)</h4>
                <div className="flex flex-wrap gap-2">
                  {durations.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        duration === d ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3">Budget</h4>
                <div className="flex flex-col gap-2">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-left transition-all ${
                        budget === b ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cards grid */}
          <div className="flex-1">
            {filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPackages.map((p, i) => (
                  <PackageCard key={p.id} pkg={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No packages match your filters.</p>
                <button
                  onClick={() => { setCategory("All"); setDuration("All"); setBudget("All"); }}
                  className="mt-4 text-primary font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}