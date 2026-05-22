import { useMemo } from "react";
import { Link } from "wouter";
import DestinationCard from "@/components/DestinationCard";
import { useContent } from "@/context/content";

function getQuery() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("q") || "").trim().toLowerCase();
}

export default function SearchPage() {
  const { destinations } = useContent();
  const query = getQuery();

  const results = useMemo(() => {
    if (!query) return [];
    return destinations.filter((d) => {
      const name = d.name.toLowerCase();
      const country = d.country.toLowerCase();
      const category = d.category.toLowerCase();
      return name.includes(query) || country.includes(query) || category.includes(query);
    });
  }, [destinations, query]);

  return (
    <div className="min-h-screen bg-background pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-foreground">
          Search Results{query ? ` for "${query}"` : ""}
        </h1>

        {!query ? (
          <p className="mt-4 text-muted-foreground">Type something in search.</p>
        ) : results.length === 0 ? (
          <p className="mt-4 text-muted-foreground">No destination found.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        )}

        <Link href="/" className="mt-8 inline-block text-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
