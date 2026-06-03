import { motion } from "framer-motion";
import { Link } from "wouter";
import { useContent } from "@/context/content";

export default function HomeDestinations() {
  const { destinations } = useContent();
  const featured = destinations.slice(0, 10);

  return (
    <section className="lg:hidden relative py-10 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-primary/90 mb-1">
              Destinations
            </p>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Explore popular destinations
            </h2>
          </div>
          <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase">
            Swipe
          </p>
        </div>

        <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-4">
            {featured.slice(0, 8).map((destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.id}`}
                className="flex min-w-[80px] flex-col items-center gap-2 text-center"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-full shadow-[0_18px_50px_-30px_rgba(15,23,42,0.9)] ring-1 ring-white/10">
                  <img src={destination.imageUrl} alt={destination.name} className="h-full w-full object-cover" />
                </div>
                <p className="text-[11px] font-semibold text-foreground leading-tight">
                  {destination.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
