import { Link } from "wouter";
import { Star, MapPin, Calendar, ArrowRight } from "lucide-react";

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

export default function DestinationCard({ destination }: Props) {
  return (
    <div
      data-testid={`card-destination-${destination.id}`}
      className="destination-card luxury-card group relative flex flex-col h-full rounded-2xl bg-card border border-border/50 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-primary/30 transition-all duration-500"
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent top-1/2 z-10" />
        
        <div className="absolute top-3 left-3 z-20">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] uppercase tracking-widest font-bold shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            {destination.category}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm border border-white/10">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-bold">{destination.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-5 relative z-20 -mt-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-primary">
            <MapPin className="h-3 w-3" />
            <span>{destination.country}</span>
          </div>
          <span className="text-xs text-muted-foreground font-semibold">
            From <span className="text-foreground text-sm font-bold">₹{destination.startingPrice.toLocaleString()}</span>
          </span>
        </div>

        <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {destination.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 flex-grow mb-5">
          {destination.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Best: {destination.bestSeason}</span>
          </div>
          <Link
            href={`/destinations/${destination.id}`}
            data-testid={`btn-explore-destination-${destination.id}`}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-foreground/5 backdrop-blur-md border border-border/50 text-foreground hover:bg-foreground/10 hover:border-border transition-all duration-300 text-xs font-bold shadow-sm"
          >
            Explore <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
