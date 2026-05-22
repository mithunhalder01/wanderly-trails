import { Link } from "wouter";
import { Star, Clock, Hotel, Utensils, Bus, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

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
  const reviewCount = 20 + ((pkg.id * 7) % 120);
  const discountPercent = Math.max(15, Math.min(55, Math.round((pkg.nights / pkg.duration) * 100)));
  const originalPrice = Math.round(pkg.price / (1 - discountPercent / 100));
  const imageGallery = useMemo(() => {
    const fallbackByCategory: Record<string, string> = {
      Beaches: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      Adventure: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      Family: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      Luxury: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      Honeymoon: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
    };
    const categoryFallback =
      fallbackByCategory[pkg.category] ||
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80";
    return [
      pkg.imageUrl,
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      `https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80`,
      categoryFallback,
    ];
  }, [pkg.category, pkg.imageUrl]);
  const [activeImage, setActiveImage] = useState(0);

  const onPrev = () => {
    setActiveImage((prev) => (prev - 1 + imageGallery.length) % imageGallery.length);
  };

  const onNext = () => {
    setActiveImage((prev) => (prev + 1) % imageGallery.length);
  };

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
          src={imageGallery[activeImage]}
          alt={pkg.title}
          onError={() => {
            setActiveImage((prev) => (prev + 1) % imageGallery.length);
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <button type="button" onClick={onPrev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white/90 sm:left-3 sm:p-2">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button type="button" onClick={onNext} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white/90 sm:right-3 sm:p-2">
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-zinc-700/85 px-2 py-0.5 text-white backdrop-blur-sm sm:right-3 sm:top-3 sm:px-2.5 sm:py-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 sm:h-3.5 sm:w-3.5" />
          <span className="text-[11px] font-semibold sm:text-xs">{pkg.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="flex h-[172px] flex-col p-2.5 sm:h-[240px] sm:p-3.5">
        <h3 className="mb-0.5 line-clamp-2 text-sm font-bold leading-snug text-foreground sm:mb-1 sm:text-base">{pkg.title}</h3>
        <p className="mb-2 line-clamp-1 text-xs text-muted-foreground sm:mb-3 sm:text-sm">{pkg.destinationName}</p>

        <div className="mb-2 flex items-center gap-1.5 sm:mb-3 sm:gap-2.5">
          <span className="rounded-md bg-emerald-700 px-2 py-0.5 text-[11px] font-bold text-white sm:px-2.5 sm:py-1 sm:text-xs">{pkg.rating.toFixed(1)}</span>
          <span className="line-clamp-1 text-xs font-semibold text-foreground sm:text-sm">Wonderful <span className="font-normal text-muted-foreground">({reviewCount})</span></span>
        </div>

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
          <span className="inline-flex h-7 flex-1 items-center justify-center rounded-full border border-zinc-300 px-2 text-[10px] font-semibold text-blue-700 whitespace-nowrap sm:h-9 sm:px-3 sm:text-xs">Deals</span>
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
