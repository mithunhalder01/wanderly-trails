import { useState, useMemo, useEffect, useRef } from "react";
import { useLocation, useSearch } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, Compass, ArrowRight } from "lucide-react";
import { useContent } from "@/context/content";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DestinationCard from "@/components/DestinationCard";
import PackageCard from "@/components/PackageCard";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function SearchPage() {
  const { destinations, packages } = useContent();
  const search = useSearch();
  const [, setLocation] = useLocation();
  const params = new URLSearchParams(search);
  const initialQuery = params.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<"all" | "destinations" | "packages">("all"); // State for tab filtering

  // URL q change ke hisaab se input sync rakhein (UX fix)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleClear = () => {
    setQuery("");
    setActiveTab("all");
    setLocation("/search");
  };


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      setLocation(`/search?q=${encodeURIComponent(q)}`);
      (document.activeElement as HTMLElement)?.blur();
    }
  };

  const results = useMemo(() => {
    const normalizedQuery = initialQuery.trim().toLowerCase();
    const terms = normalizedQuery.split(/\s+/).filter(Boolean);
    
    if (terms.length === 0) return { destinations: [], packages: [] };

    let filteredDestinations = destinations.filter(d => 
      terms.every(t => `${d.name} ${d.country} ${d.category} ${d.description}`.toLowerCase().includes(t))
    );

    let filteredPackages = packages.filter(p => 
      terms.every(t => `${p.title} ${p.destinationName} ${p.category} ${p.description}`.toLowerCase().includes(t))
    );

    if (activeTab === "destinations") filteredPackages = [];
    if (activeTab === "packages") filteredDestinations = [];

    return { destinations: filteredDestinations, packages: filteredPackages };
  }, [query, destinations, packages, activeTab]);

  const totalItemsCount = results.destinations.length + results.packages.length;
  const hasQuery = !!initialQuery.trim(); // Check if there's an active search query

  const clearSearch = () => {
    setQuery("");
    setActiveTab("all");
    setLocation("/search"); // Navigate to /search without a query parameter
  };


  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12">
          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl relative group">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Kahan jaana hai? (e.g. Goa, Kashmir, Bali)"
              className="w-full h-14 sm:h-16 pl-14 pr-14 text-lg rounded-[2.5rem] border-primary/10 shadow-lg focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-card text-foreground font-medium"
              placeholder="Destination..."
              className="w-full h-12 sm:h-16 pl-12 pr-12 text-base sm:text-lg rounded-[2.5rem] border-primary/10 shadow-lg focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-card text-foreground font-medium"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              </button>
            )}
          </form>
        </div>

        {!hasQuery ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-6 border border-primary/10 shadow-inner group">
              <Compass className="w-10 h-10 text-primary group-hover:rotate-180 transition-transform duration-700" />
            </div>
            <h2 className="text-4xl font-serif font-bold mb-3 tracking-tight">Explore Wanderly</h2>
            <p className="text-muted-foreground max-w-sm text-lg leading-relaxed">Apni favourite destination ya travel package search karein.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8">
              <div>
                <Badge variant="outline" className="mb-4 px-3 py-1 text-primary border-primary/20 bg-primary/5 font-bold uppercase tracking-wider text-[10px]">
                  {totalItemsCount} results found
                </Badge>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tighter">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tighter">
                  Results for "<span className="text-primary">{initialQuery}</span>"
                </h1>
              </div>

              <div className="flex p-1 bg-muted/50 rounded-2xl border border-border">
                {(["all", "destinations", "packages"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${
                      activeTab === tab
                        ? "bg-card text-primary shadow-sm border border-border"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {results.destinations.map((dest) => (
                    <motion.div
                      key={`dest-${dest.id}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <DestinationCard destination={dest} />
                    </motion.div>
                  ))}

                  {results.packages.map((pkg, i) => (
                    <motion.div
                      key={`pkg-${pkg.id}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <PackageCard pkg={pkg} index={i} />
                    </motion.div>
                  ))}
                </AnimatePresence>
            </div>

            {totalItemsCount === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center bg-muted/20 rounded-[2rem] border border-dashed border-border"
              >
                <p className="text-xl text-muted-foreground italic">No matches found for "<span className="text-foreground font-bold">{initialQuery}</span>".</p>
                <Button variant="outline" onClick={clearSearch} className="mt-6 rounded-xl px-8 border-primary/20 hover:bg-primary/5">
                  Clear search and try again
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}