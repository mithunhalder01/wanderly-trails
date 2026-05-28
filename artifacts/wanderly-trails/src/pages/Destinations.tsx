import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { destinations } from "@/data/staticData";
import DestinationCard from "@/components/DestinationCard";
import PageHero from "@/components/PageHero";

const categories = ["All", "India", "International", "Beaches", "Mountains", "Desert"];

export default function Destinations() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return destinations;
    if (active === "India") return destinations.filter((d) => d.country === "India");
    if (active === "International") return destinations.filter((d) => d.country !== "India");
    return destinations.filter((d) => d.category === active);
  }, [active]);

  return (
    <div className="pt-20">
      <PageHero
        video="https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4"
        image="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
        alt="Wanderly Trails Destinations"
        badge="Explore the World"
        title="All Destinations"
        subtitle="From the golden beaches of Goa to the peaks of Kashmir, find your next adventure."
        backHref="/"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />

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

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((d, i) => <DestinationCard key={d.id} destination={d} index={i} />)}
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
