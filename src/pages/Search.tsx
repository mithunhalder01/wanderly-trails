import { useState, useMemo, useEffect, useRef } from "react";
import { useLocation, useSearch } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, MapPin, Package, X, Compass, ArrowRight } from "lucide-react";
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
  const [isSearching, setIsSearching] = useState(!!initialQuery);
  const [activeTab, setActiveTab] = useState<"all" | "destinations" | "packages">("all");
  const inputRef = useRef<HTMLInputElement>(null);

  // URL Sync: Navbar ya URL change hone par data update hoga
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [initialQuery]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      // Keyboard focus hatane ke liye blur use karenge taaki mobile keyboard close ho jaye
      inputRef.current?.blur();
      
      setIsSearching(true);
      // URL update karenge using setLocation taaki router state sync ho jaye
      setLocation(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setIsSearching(false);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
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

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="popLayout">
          {!isSearching ? (
            <motion.div 
              key="search-input"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center mb-12"
            >
              <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl relative group">
                <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input // Mobile size reduced
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Kahan jaana hai? (e.g. Goa, Kashmir, Bali)"
                  className="w-full h-14 sm:h-20 pl-14 pr-24 text-base sm:text-xl rounded-[2.5rem] border-primary/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all bg-card text-foreground font-medium"
                  autoFocus
                />
                <Button // Mobile size reduced
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 sm:h-14 px-6 sm:px-8 rounded-[1.8rem] font-bold text-sm sm:text-base shadow-lg"
                >
                  Search
                </Button>
              </form>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-6 border border-primary/10 shadow-inner group">
                  <Compass className="w-10 h-10 text-primary group-hover:rotate-180 transition-transform duration-700" />
                </div>
                <h2 className="text-4xl font-serif font-bold mb-3 tracking-tight">Explore Wanderly</h2>
                <p className="text-muted-foreground max-w-sm text-lg leading-relaxed">Apni favourite destination ya travel package search karein.</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="results-header"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              {/* Results Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8">
                <div>
                  <Badge variant="outline" className="mb-4 px-3 py-1 text-primary border-primary/20 bg-primary/5 font-bold uppercase tracking-wider text-[9px] sm:text-[10px] animate-in fade-in slide-in-from-left-4 duration-500">
                    {totalItemsCount} results found
                  </Badge>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700">
                    Search Result
                  </h1>
                  <p className="text-muted-foreground mt-3 text-base sm:text-xl animate-in fade-in duration-1000">
                    Showing matches for "<span className="text-foreground font-bold">{query}</span>"
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex p-0.5 sm:p-1 bg-muted/50 rounded-2xl border border-border">
                    {(["all", "destinations", "packages"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-xs sm:px-6 sm:py-2.5 sm:text-sm font-bold rounded-xl transition-all ${
                          activeTab === tab 
                            ? "bg-card text-primary shadow-sm border border-border" 
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" // Changed to sm for mobile
                    onClick={clearSearch}
                    className="rounded-xl h-10 sm:h-12 gap-2 hover:bg-primary/5 hover:text-primary transition-all border-border shadow-sm font-bold text-sm"
                  >
                    <X className="w-4 h-4" /> New Search
                  </Button>
                </div>
              </div>

              <motion.div // Gap reduced for mobile
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
              >
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
              </motion.div>

              {totalItemsCount === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="py-24 text-center bg-muted/20 rounded-[2rem] border border-dashed border-border"
                >
                  <p className="text-xl text-muted-foreground italic">No matches found for "<span className="text-foreground font-bold">{query}</span>".</p>
                  <Button variant="outline" onClick={clearSearch} className="mt-6 rounded-xl px-8 border-primary/20 hover:bg-primary/5">
                    Clear search and try again
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}