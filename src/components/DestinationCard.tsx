import { Link } from "wouter";
import { Star, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

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

export default function DestinationCard({ destination, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      data-testid={`card-destination-${destination.id}`}
      className="luxury-card group overflow-hidden hover:-translate-y-0.5"
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-foreground">
            {destination.category}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-semibold">{destination.rating.toFixed(1)}</span>
          </div>
          <span className="rounded-full border border-white/30 bg-white/20 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            From ₹{destination.startingPrice.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-serif font-bold text-lg text-foreground">{destination.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{destination.country}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{destination.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>Best: {destination.bestSeason}</span>
          </div>
          <Link
            href={`/destinations/${destination.id}`}
            data-testid={`btn-explore-destination-${destination.id}`}
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Explore &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
