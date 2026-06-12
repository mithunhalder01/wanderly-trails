import { Link } from "wouter";
import { Star, Clock, Hotel, Utensils, Bus } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";

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
  const discountPercent = Math.max(15, Math.min(55, Math.round((pkg.nights / pkg.duration) * 100)));
  const originalPrice = Math.round(pkg.price / (1 - discountPercent / 100));
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      data-testid={`card-package-${pkg.id}`}
      className="luxury-card group h-full w-full min-w-0 overflow-hidden hover:-translate-y-0.5"
    >
      <div className="relative overflow-hidden h-28 sm:h-36">
        <img
          src={pkg.imageUrl}
          alt={pkg.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-zinc-700/85 px-2 py-0.5 text-white backdrop-blur-sm sm:right-3 sm:top-3 sm:px-2.5 sm:py-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 sm:h-3.5 sm:w-3.5" />
          <span className="text-[11px] font-semibold sm:text-xs">{pkg.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="flex h-[225px] flex-col p-2.5 sm:h-[260px] sm:p-3.5">
        <span className="mb-1 text-[10px] font-extrabold uppercase tracking-widest text-primary sm:mb-1.5 sm:text-xs">
          {pkg.destinationName}
        </span>
        <h3 className="mb-2 line-clamp-2 text-sm font-bold leading-normal text-foreground sm:mb-3 sm:text-base min-h-[2.8em]">
          {pkg.title}
        </h3>

        <div className="mb-2 flex items-center gap-2 text-[10px] sm:mb-3 sm:gap-3 sm:text-[11px]">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>{pkg.duration}D / {pkg.nights}N</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Hotel className="w-3.5 h-3.5 text-primary" />
            <span>{pkg.hotelStars}★ Hotel</span>
          </div>
          <div className={`hidden items-center gap-1 text-xs sm:flex ${pkg.mealsIncluded ? "text-green-600" : "text-muted-foreground/50"}`}>
              <Utensils className="w-3.5 h-3.5" />
              <span>Meals</span>
            </div>
          <div className={`hidden items-center gap-1 text-xs sm:flex ${pkg.transportIncluded ? "text-green-600" : "text-muted-foreground/50"}`}>
              <Bus className="w-3.5 h-3.5" />
              <span>Transport</span>
            </div>
        </div>

        <div className="mb-2 space-y-0.5 border-t border-border pt-2 sm:mb-3 sm:pt-2.5">
          <span className="inline-flex rounded-md bg-emerald-700 px-2 py-0.5 text-[10px] font-bold text-white sm:px-2.5 sm:text-xs">{discountPercent}% off</span>
          <p className="text-xl font-bold leading-none text-foreground sm:text-3xl">
            ₹{pkg.price.toLocaleString()}
            <span className="ml-1.5 text-sm font-medium text-muted-foreground line-through sm:ml-2 sm:text-xl">₹{originalPrice.toLocaleString()}</span>
          </p>
        </div>

        <div className="mt-auto flex items-center gap-1.5 sm:gap-2">
          <Link
            href={`/booking?package=${pkg.id}`}
            data-testid={`btn-enquire-package-${pkg.id}`}
            className="inline-flex h-7 flex-1 items-center justify-center rounded-md border border-primary/30 bg-primary/5 px-2 text-[10px] font-semibold whitespace-nowrap text-primary transition-colors shadow-sm hover:bg-primary/10 sm:h-9 sm:rounded-lg sm:px-3 sm:text-xs"
          >
            Enquire
          </Link>
          <Link
            href={`/packages/${pkg.id}`}
            data-testid={`btn-view-package-${pkg.id}`}
            className="inline-flex h-7 flex-1 items-center justify-center rounded-md bg-primary px-2 text-[10px] font-semibold whitespace-nowrap text-white transition-colors shadow-sm hover:bg-primary/90 sm:h-9 sm:rounded-lg sm:px-3 sm:text-xs"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
