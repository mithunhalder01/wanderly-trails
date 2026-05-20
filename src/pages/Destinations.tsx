import { useState, useMemo, useRef } from "react";
import DestinationCard from "@/components/DestinationCard";
import PageHero from "@/components/PageHero";
import { useContent } from "@/context/content";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const categories = ["All", "India", "Beaches", "Mountains", "Desert"];

export default function Destinations() {
  const { destinations } = useContent();
  const [active, setActive] = useState("All");
  const container = useRef<HTMLElement>(null);

  const filtered = useMemo(() => {
    if (active === "All") return destinations;
    if (active === "India") return destinations.filter((d) => d.country === "India");
    return destinations.filter((d) => d.category === active);
  }, [active, destinations]);

  useGSAP(() => {
    gsap.fromTo(".destination-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, { scope: container, dependencies: [filtered] });

  return (
    <div className="pt-20 bg-background min-h-screen">
      <PageHero
        image="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
        alt="Destinations"
        badge="Explore the World"
        title="All Destinations"
        subtitle="Discover curated Indian destinations for every travel style."
        backHref="/"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />

      <section ref={container} className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            {filtered.map((d) => <DestinationCard key={d.id} destination={d} />)}
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
