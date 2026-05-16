import { useState, useMemo } from "react";
import DestinationCard from "@/components/DestinationCard";
import PageHero from "@/components/PageHero";
import PageHeader from "@/components/PageHeader";
import { useContent } from "@/context/content";

const categories = ["All", "India", "International", "Beaches", "Mountains", "Desert"];

export default function Destinations() {
  const { destinations } = useContent();
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
        image="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
        alt="Destinations"
        badge="Explore the World"
        title="All Destinations"
        subtitle="Discover curated domestic and international destinations for every travel style."
        backHref="/"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4">
          <p className="text-sm text-muted-foreground">Showing {filtered.length} destinations</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70">{active}</p>
        </div>

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
