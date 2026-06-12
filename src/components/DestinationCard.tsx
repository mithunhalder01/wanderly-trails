import { useMemo, memo } from "react";
import { Link } from "wouter";
import { Star, MapPin, Calendar, ArrowRight } from "lucide-react";
import { useContent } from "@/context/content";


interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  category: string;
  startingPrice: number;
  rating: number;
  bestSeason: string;
}

interface Props {
  destination: Destination;
  index?: number;
}

const DestinationCard = memo(function DestinationCard({ destination }: Props) {
  const { getPackagesByDestination } = useContent();
  
  const relatedPackages = useMemo(() => 
    getPackagesByDestination(destination.id), 
    [getPackagesByDestination, destination.id]
  );

  const durationBadges = relatedPackages
    .map((p) => ({ nights: p.nights, days: p.duration }))
    .filter((x) => x.days && x.nights)
    .map((x) => `${x.nights}N/${x.days}D`);

  // Keep unique + limit to 3 badges (as per UI space)
  const uniqueBadges = Array.from(new Set(durationBadges)).slice(0, 3);

  return (
    <div
      data-testid={`card-destination-${destination.id}`}
      className="destination-card luxury-card group relative flex flex-col h-[380px] md:h-[420px] rounded-3xl border border-white/10 overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 bg-zinc-950"
    >
      {/* Full Card Image */}
      <img
        src={destination.imageUrl}
        alt={destination.name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Dark high-contrast overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

      {/* Category Badge - top left */}
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-widest font-extrabold shadow-lg">
          {destination.category}
        </span>
      </div>

      {/* Rating Badge - top right */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg">
        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
        <span className="text-white text-xs font-extrabold leading-none">{destination.rating.toFixed(1)}</span>
      </div>

      <div 
        style={{
          maskImage: "linear-gradient(to top, black 45%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 45%, transparent 100%)"
        }}
        className="absolute bottom-0 left-0 right-0 p-5 pt-16 bg-black/85 backdrop-blur-[10px] z-20 flex flex-col transition-all duration-300 group-hover:bg-black/90"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-extrabold text-amber-400">
            <MapPin className="h-3 w-3" />
            <span>{destination.country}</span>
          </div>
          <span className="text-[10px] text-white/70 font-semibold">
            From <span className="text-white text-xs font-extrabold">₹{destination.startingPrice.toLocaleString()}</span>
          </span>
        </div>

        {uniqueBadges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {uniqueBadges.map((b) => (
              <span
                key={b}
                className="text-[9px] bg-white/10 border border-white/15 text-white/90 px-2 py-0.5 rounded-full font-bold"
              >
                {b}
              </span>
            ))}
          </div>
        )}


        <h3 className="font-serif text-lg font-bold text-white mb-2 leading-tight group-hover:text-amber-300 transition-colors">
          {destination.name}
        </h3>

        <p className="text-[11px] text-white/75 leading-relaxed mb-4">
          {destination.description}
        </p>

        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <div className="flex items-center gap-1 text-[9px] text-white/60 font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
            <span>Best: {destination.bestSeason}</span>
          </div>
          <Link
            href={`/destinations/${destination.id}`}
            data-testid={`btn-explore-destination-${destination.id}`}
            className="inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300 text-[10px] font-bold shadow-sm"
          >
            Explore <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
});

export default DestinationCard;
