import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight, Map, Compass } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
  exploreHref?: string;
  bannerImage: string;
  destinations: TripDestination[];
}

const MountainGraphic = () => (
  <svg
    viewBox="0 0 320 120"
    className="w-full h-full text-foreground/80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Flying birds */}
    {/* Left bird 1 */}
    <path d="M 25 35 Q 28 31 31 35 Q 34 31 37 35" />
    {/* Left bird 2 */}
    <path d="M 135 25 Q 137 22 139 25 Q 141 22 143 25" strokeWidth="0.8" />
    {/* Middle bird */}
    <path d="M 120 55 Q 122 52 124 55 Q 126 52 128 55" strokeWidth="0.8" />
    {/* Right bird */}
    <path d="M 275 52 Q 278 48 281 52 Q 284 48 287 52" />

    {/* Paraglider */}
    {/* Canopy */}
    <path d="M 220 22 C 218 8 244 8 242 22" fill="currentColor" />
    {/* Suspension lines */}
    <line x1="221" y1="22" x2="231" y2="40" strokeWidth="0.5" />
    <line x1="226" y1="22" x2="231" y2="40" strokeWidth="0.5" />
    <line x1="231" y1="22" x2="231" y2="40" strokeWidth="0.5" />
    <line x1="236" y1="22" x2="231" y2="40" strokeWidth="0.5" />
    <line x1="241" y1="22" x2="231" y2="40" strokeWidth="0.5" />
    {/* Pilot/Harness */}
    <circle cx="231" cy="42" r="1.5" fill="currentColor" />

    {/* Mountain peaks outline */}
    <path d="M 50 115 Q 70 110 90 115 L 105 107 L 120 113 L 132 100 L 145 110 L 170 75 L 190 100 L 205 70 L 220 90 L 245 55 L 265 90 L 275 80 L 295 115 L 320 115" />
    
    {/* Interior ridge detail lines */}
    <path d="M 170 75 L 178 95" opacity="0.5" />
    <path d="M 205 70 L 210 82" opacity="0.5" />
    <path d="M 245 55 L 255 85" opacity="0.5" />
  </svg>
);

export default function TripCarouselSection({
  title,
  subtitle,
  cta,
  exploreHref = "/destinations",
  bannerImage,
  destinations,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLElement>(null);
  const [, setLocation] = useLocation();

  // Stack state for mobile carousel
  const [stack, setStack] = useState<number[]>([]);

  // Initialize stack when destinations change
  useEffect(() => {
    if (destinations && destinations.length > 0) {
      setStack(destinations.map((_, i) => i));
    }
  }, [destinations]);

  const handleSwipe = (direction: "left" | "right") => {
    setStack((prev) => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const top = next.shift();
      if (top !== undefined) {
        next.push(top);
      }
      return next;
    });
  };

  const handleCardTap = (slug?: string) => {
    if (slug) {
      setLocation(`/destinations/${slug}`);
    } else {
      setLocation(exploreHref);
    }
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  useGSAP(() => {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      });

      tl.fromTo(".carousel-banner", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .fromTo(".carousel-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.4");
    }
  }, { scope: container });

  // Splitting title to add gradient to the last word for visual flair
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop();
  const firstPart = titleWords.join(" ");

  return (
    <section ref={container} className="py-16 md:py-24 relative overflow-hidden bg-background">
      {/* Desktop Layout - visible on tablet/desktop */}
      <div className="hidden md:block mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative">
          <div className="carousel-banner relative overflow-hidden rounded-[2rem] shadow-2xl border border-border/50">
            <div className="absolute inset-0 bg-black/20 z-10" />
            <img
              src={bannerImage}
              alt=""
              className="h-[280px] w-full object-cover md:h-[350px] lg:h-[400px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />

            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-16 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white w-fit mb-4 shadow-xl">
                <Map className="h-3 w-3" />
                <span className="text-xs font-semibold tracking-widest uppercase">Explore</span>
              </div>

              <h2 className="font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight drop-shadow-md">
                {firstPart} <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] italic font-semibold">{lastWord}</span>
              </h2>
              <p className="mt-3 text-sm text-white/90 md:text-base max-w-md leading-relaxed font-medium">
                {subtitle}
              </p>

              <Link
                href={exploreHref}
                className="group mt-6 w-fit inline-flex items-center justify-center gap-2 bg-white text-foreground px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                {cta} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Cards overlapping banner */}
          <div className="relative -mt-16 md:-mt-24 z-30 px-2 md:px-6">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous destinations"
              className="absolute left-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-full bg-background/90 backdrop-blur-md border border-border p-2.5 shadow-xl transition-all hover:bg-primary hover:text-white md:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next destinations"
              className="absolute right-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-full bg-background/90 backdrop-blur-md border border-border p-2.5 shadow-xl transition-all hover:bg-primary hover:text-white md:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto overflow-y-hidden pb-6 pt-2 pl-4 pr-4 scrollbar-hide snap-x snap-mandatory md:pl-8 md:pr-8"
            >
              {destinations.map((dest, i) => (
                <div
                  key={dest.name}
                  className="carousel-card shrink-0 snap-start"
                >
                  <Link
                    href="/packages"
                    className="group block relative w-[180px] overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] sm:w-[200px] md:w-[230px]"
                  >
                    <div className="relative aspect-[3/4]">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                          <p className="font-serif text-lg font-bold text-white md:text-xl mb-1">{dest.name}</p>
                          <div className="flex flex-col gap-0.5 opacity-90">
                            <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Starting Price</span>
                            <span className="text-xs md:text-sm font-bold text-amber-400">Rs. {dest.price.toLocaleString("en-IN")}/-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - visible on mobile screen only */}
      <div className="block md:hidden px-6 relative z-10 w-full overflow-hidden">
        {/* Header with connecting line and Mountain graphic */}
        <div className="relative flex items-end justify-between mb-8 pb-1 pt-6 overflow-hidden">
          {/* Horizontal connecting line */}
          <div className="absolute bottom-[13px] left-0 right-0 h-[1.2px] bg-foreground/15 z-0" />

          {/* Title */}
          <h2 className="relative text-2xl font-bold tracking-tight text-foreground z-10 bg-background pr-3 pb-[1px] select-none">
            {firstPart} <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] italic font-semibold">{lastWord}</span>
          </h2>

          {/* SVG Graphic */}
          <div className="relative w-[150px] h-[75px] z-10 bg-background pl-2 -mb-[3px] select-none pointer-events-none">
            <MountainGraphic />
          </div>
        </div>

        {/* Stack of Cards */}
        {stack.length > 0 && (
          <div className="relative w-full max-w-[270px] aspect-[3/4.2] mx-auto mb-6">
            {stack.map((destIndex, index) => {
              // index: 0 = top, 1 = behind, etc.
              const dest = destinations[destIndex];
              // Only render the top 4 cards for optimal performance
              if (index > 3) return null;

              const isTop = index === 0;

              return (
                <motion.div
                  key={dest.name}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: destinations.length - index,
                  }}
                  animate={{
                    x: index * 12,
                    y: index * 8,
                    scale: 1 - index * 0.04,
                    rotate: index * 2.5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(event, info) => {
                    if (info.offset.x < -80) {
                      handleSwipe("left");
                    } else if (info.offset.x > 80) {
                      handleSwipe("right");
                    }
                  }}
                  onTap={() => handleCardTap(dest.slug)}
                  className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border border-border/40 select-none bg-card cursor-grab active:cursor-grabbing"
                >
                  <div className="relative w-full h-full pointer-events-none">
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

                    {/* Card image */}
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="h-full w-full object-cover select-none pointer-events-none"
                      draggable="false"
                    />

                    {/* Bottom Info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                      <h3 className="font-sans text-xl font-bold text-white mb-1.5 drop-shadow-md">
                        {dest.name}
                      </h3>
                      <div className="flex flex-col gap-0.5 opacity-95">
                        <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">
                          Starting Price
                        </span>
                        <span className="text-sm font-bold text-amber-400">
                          Rs. {dest.price.toLocaleString("en-IN")}/-
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Action Hint */}
        <div className="text-center text-[11px] text-muted-foreground/60 mt-4 flex items-center justify-center gap-1.5 select-none pointer-events-none animate-pulse">
          <Compass className="h-3 w-3" />
          <span>Swipe cards left / right to browse</span>
        </div>
      </div>
    </section>
  );
}
