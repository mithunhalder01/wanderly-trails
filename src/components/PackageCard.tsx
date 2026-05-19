import { Link } from "wouter";
import { Star, Clock, Hotel, Utensils, Bus } from "lucide-react";
import { motion } from "framer-motion";

interface Package {
  id: number;
  title: string;
  destinationName: string;
  imageUrl: string;
  price: number;
  duration: number;
  nights: number;
  category: string;
  rating: number;
  hotelStars: number;
  mealsIncluded: boolean;
  transportIncluded: boolean;
  description: string;
}

interface Props {
  pkg: Package;
  index?: number;
}

export default function PackageCard({ pkg, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      data-testid={`card-package-${pkg.id}`}
      className="luxury-card group overflow-hidden hover:-translate-y-0.5"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={pkg.imageUrl}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-white/10 backdrop-blur-md text-white/85 text-xs font-bold px-3 py-1 rounded-full border border-white/15 shadow-sm">
            {pkg.category}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-foreground">{pkg.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif font-bold text-lg text-foreground mb-1">{pkg.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{pkg.destinationName}</p>

        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>{pkg.duration}D / {pkg.nights}N</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Hotel className="w-3.5 h-3.5 text-primary" />
            <span>{pkg.hotelStars}★ Hotel</span>
          </div>
          {pkg.mealsIncluded && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Utensils className="w-3.5 h-3.5" />
              <span>Meals</span>
            </div>
          )}
          {pkg.transportIncluded && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Bus className="w-3.5 h-3.5" />
              <span>Transport</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">Starting from</span>
            <p className="text-xl font-serif font-bold text-primary">₹{pkg.price.toLocaleString()}</p>
          </div>
          <Link
            href={`/packages/${pkg.id}`}
            data-testid={`btn-view-package-${pkg.id}`}
            className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
