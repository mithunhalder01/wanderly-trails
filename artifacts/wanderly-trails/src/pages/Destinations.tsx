import { useState } from "react";
import { motion } from "framer-motion";
import { useListDestinations } from "@workspace/api-client-react";
import DestinationCard from "@/components/DestinationCard";
import SectionHeading from "@/components/SectionHeading";

const categories = ["All", "India", "International", "Beaches", "Mountains", "Desert"];

export default function Destinations() {
  const [active, setActive] = useState("All");
  const { data: destinations, isLoading } = useListDestinations(
    active !== "All" ? { category: active } : {},
  );

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-64 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80" alt="Destinations" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-secondary/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold tracking-widest uppercase text-accent block mb-3">Explore the World</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">All Destinations</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              data-testid={`filter-destination-${cat.toLowerCase()}`}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                active === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-muted rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : destinations && destinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations.map((d, i) => <DestinationCard key={d.id} destination={d} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No destinations found for this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
