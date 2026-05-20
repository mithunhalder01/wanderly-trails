import { useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight, Map } from "lucide-react";
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
  const container = useRef<HTMLElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".carousel-banner", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(".carousel-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.4");
  }, { scope: container });

  // Splitting title to add gradient to the last word for visual flair
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop();
  const firstPart = titleWords.join(" ");

  return (
    <section ref={container} className="py-16 md:py-24 relative overflow-hidden bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">

        {/* WanderOn-style hero banner with overlapping cards */}
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
    </section>
  );
}
