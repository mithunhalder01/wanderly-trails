import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useMemo, useRef } from "react";
import DestinationCard from "@/components/DestinationCard";
import { useContent } from "@/context/content";

gsap.registerPlugin(ScrollTrigger);


export default function HomeTours() {
  const container = useRef<HTMLElement>(null);

  const { destinations } = useContent();
  
  const featuredDestinations = useMemo(() => {
    if (!destinations || !Array.isArray(destinations)) return [];
    return destinations.filter(d => d.featured).slice(0, 4);
  }, [destinations]);

  const mobileLoopRef = useRef<HTMLDivElement | null>(null);

  // Mobile: seamless looping for the horizontal scroll container
  useEffect(() => {
    const el = mobileLoopRef.current;
    if (!el || window.innerWidth >= 768 || featuredDestinations.length === 0) return;

    const firstItem = el.querySelector<HTMLElement>('[class*="w-[72vw]"]');
    const itemWidth = firstItem?.getBoundingClientRect().width ?? 0;
    const gap = 16; // gap-4 in tailwind is 16px
    const step = itemWidth + gap;
    const singleSetWidth = step * featuredDestinations.length;
    const startPos = singleSetWidth;

    el.scrollLeft = startPos;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const maxScroll = singleSetWidth * 2;
        if (el.scrollLeft >= maxScroll) {
          el.scrollLeft = el.scrollLeft - singleSetWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft = el.scrollLeft + singleSetWidth;
        }
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [featuredDestinations]); // Dependency on featuredDestinations to re-run if data changes.

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      },
    });
    tl.fromTo(".tours-header > *",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    ).fromTo(".destination-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Premium Background Elements */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="tours-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="tracking-wider uppercase">Available Tours</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Unforgettable Moments <br />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] italic font-light">For You</span>
            </h2>

            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Discover curated travel experiences that blend adventure, comfort, and unforgettable memories. Whether you seek mountains, beaches, or culture we have the perfect tour waiting for you.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/packages"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-semibold hover:bg-primary transition-all duration-300"
            >
              See More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Desktop: grid. Mobile: slider carousel */}
        <div className="hidden lg:block">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredDestinations.map((d) => (
              <div key={d.id} className="will-change-transform"><DestinationCard destination={d} /></div>
            ))}
          </div>
        </div>

        {/* Mobile: slider */}
        <div className="lg:hidden mt-2">
          <div
            ref={mobileLoopRef}
            className="relative flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 -mx-6"
          >
            {/* render 3 copies: 1 2 3, and we keep scroll in middle copy */}
            {[0, 1, 2].flatMap((copy) =>
              featuredDestinations.map((d, idx) => (
                <div key={`${copy}-${d.id}-${idx}`} className="snap-center shrink-0 w-[72vw] will-change-transform">
                  <div className="h-[460px]">
                    <DestinationCard destination={d} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>


        <div className="mt-2 lg:hidden">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-4 py-2 text-primary font-semibold hover:gap-3 transition-all text-lg"
          >
            View All Tours
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
