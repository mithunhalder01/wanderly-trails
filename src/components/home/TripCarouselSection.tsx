import { useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface TripDestination {
  name: string;
  price: number;
  image: string;
  slug?: string;
}

interface Props {
  title: string;
  subtitle: string;
  cta: string;
  bannerImage: string;
  destinations: TripDestination[];
  exploreHref?: string;
}

export default function TripCarouselSection({
  title,
  subtitle,
  cta,
  bannerImage,
  destinations,
  exploreHref = "/destinations",
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* WanderOn-style hero banner with overlapping cards */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={bannerImage}
              alt=""
              className="h-[280px] w-full object-cover md:h-[340px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
              <h2 className="font-serif text-3xl font-bold text-white md:text-5xl">{title}</h2>
              <p className="mt-2 max-w-md text-sm text-white/85 md:text-base">{subtitle}</p>
              <Link
                href={exploreHref}
                className="luxury-btn-glass mt-5 w-fit px-6 py-2.5"
              >
                {cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Cards overlapping banner */}
          <div className="relative -mt-16 md:-mt-20">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous destinations"
              className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full glass p-2 transition hover:bg-white/90 md:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next destinations"
              className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full glass p-2 transition hover:bg-white/90 md:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-2 pl-4 pr-4 scrollbar-hide snap-x snap-mandatory md:pl-8 md:pr-8"
            >
              {destinations.map((dest, i) => (
                <Link
                  key={dest.name}
                  href="/packages"
                  className="group relative w-[160px] shrink-0 snap-start overflow-hidden rounded-2xl shadow-lg transition-transform hover:-translate-y-1 sm:w-[180px] md:w-[200px]"
                >
                  <div className="relative aspect-[3/4]">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="font-serif text-base font-bold text-white md:text-lg">{dest.name}</p>
                      <p className="mt-0.5 text-[11px] font-medium text-white/90 md:text-xs">
                        Starting Price Rs. {dest.price.toLocaleString("en-IN")}/-
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
