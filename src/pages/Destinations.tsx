import { useState, useMemo, useRef } from "react";
import DestinationCard from "@/components/DestinationCard";
import PageHero from "@/components/PageHero";
import { useContent } from "@/context/content";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

export default function Destinations() {
  const { destinations } = useContent();
  const [active, setActive] = useState("All");
  const container = useRef<HTMLElement>(null);

  const categories = useMemo(() => {
    // Dynamically add "International" if there are any non-Indian destinations
    const hasInternational = destinations.some(d => d.country !== "India");
    const baseCategories = ["All", "India", "Beaches", "Mountains", "Desert"];
    return hasInternational ? [...baseCategories, "International"] : baseCategories;
  }, [destinations]);
  
  // Update filter logic to include "International"
  const filtered = useMemo(() => {
    return destinations.filter((dest) => {
      const country = (dest.country || "").toLowerCase();
      const desc = (dest.description || "").toLowerCase();
      const name = (dest.name || "").toLowerCase();
      const cat = (dest.category || "").toLowerCase();

      if (active === "All") return true;
      if (active === "India") return country === "india";
      if (active === "International") return country !== "india";
      
      if (active === "Beaches") {
        const beachKeywords = ["beach", "island", "coastal", "goa", "phuket", "maldives", "andaman", "lakshadweep", "konkan"];
        return beachKeywords.some(key => cat.includes(key) || name.includes(key) || desc.includes(key));
      }
      if (active === "Mountains") {
        const mountainKeywords = ["mountain", "himalayan", "hill station", "himachal", "kashmir", "ladakh", "leh", "spiti", "uttarakhand", "mussoorie", "nepal", "bhutan", "sikkim", "munnar"];
        return mountainKeywords.some(key => cat.includes(key) || name.includes(key) || desc.includes(key));
      }
      if (active === "Desert") {
        const desertKeywords = ["rajasthan", "uae", "dubai", "sand dunes", "kutch", "gujarat"]; // Removed generic "desert" keyword
        return desertKeywords.some(key => cat.includes(key) || name.includes(key) || desc.includes(key));
      }
      return cat === active.toLowerCase();
    });
  }, [active, destinations]);
  // Removed GSAP animation for cards, as Framer Motion will handle it.

  return (
    <div className="pt-20 bg-background min-h-screen overflow-x-hidden">
      <PageHero
        video="/sec-heading-vid/des.mp4"
        image="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
        alt="Destinations"
        badge="Explore the World"
        title="All Destinations"
        subtitle="Discover curated Indian destinations for every travel style."
        backHref="/"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />

      <section ref={container} className="py-16 pb-44 md:py-24 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                data-testid={`filter-destination-${cat.toLowerCase()}`}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  active === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                    : "bg-foreground/5 text-muted-foreground border border-border/50 hover:bg-foreground/10 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-card border border-border shadow-sm">
            <p className="text-sm font-medium">
              <span className="text-muted-foreground mr-1">Showing</span> 
              <span className="font-bold text-foreground">{filtered.length}</span>
              <span className="text-muted-foreground ml-1">destinations</span>
            </p>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> 
            <AnimatePresence> {/* Wrap with AnimatePresence */}
              {filtered.map((d) => (
                <motion.div
                  key={d.id} // Key is crucial for AnimatePresence to track items
                  layout // Enables smooth layout transitions
                  initial={{ opacity: 0, y: 50, scale: 0.8 }} // Initial state for entering items
                  animate={{ opacity: 1, y: 0, scale: 1 }} // Animation for present items
                  exit={{ opacity: 0, y: -50, scale: 0.8 }} // Animation for exiting items
                  transition={{ duration: 0.3, ease: "easeOut" }} // Transition properties
                >
                  <DestinationCard destination={d} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="relative z-10 text-center py-20 bg-card/50 rounded-3xl border border-border/50">
            <p className="text-muted-foreground text-lg font-medium">No destinations found for this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
