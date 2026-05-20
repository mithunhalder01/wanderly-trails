import { Link } from "wouter";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { availableTours } from "@/data/homeContent";
import { CONTACT_WHATSAPP_NUMBER } from "@/lib/contact";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeTours() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".tours-header > *",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    ).fromTo(".tour-card",
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {availableTours.slice(0, 4).map((tour) => (
            <article
              key={tour.id}
              className="tour-card group relative flex flex-col h-full rounded-2xl bg-card border border-border/50 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-primary/30 transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 z-20">
                  <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] uppercase tracking-widest font-bold shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                    Featured
                  </div>
                </div>
                {/* Beautiful Gradient overlay at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent top-1/2 z-10" />
              </div>

              <div className="flex flex-col flex-grow p-5 relative z-20 -mt-6">
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-primary mb-2">
                  <MapPin className="h-3 w-3" />
                  <span>India</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {tour.title}
                </h3>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-xs text-muted-foreground">Starting From:</span>
                  <span className="text-base font-bold text-foreground">₹{tour.price.toLocaleString("en-IN")}/-</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-5 line-clamp-3">
                  {tour.description}
                </p>

                <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
                  <Link
                    href={`/packages/${tour.id}`}
                    className="w-full inline-flex justify-center items-center py-2.5 px-2 rounded-xl bg-foreground/5 backdrop-blur-md border border-border/50 text-foreground hover:bg-foreground/10 hover:border-border transition-all duration-300 text-[13px] font-bold shadow-sm"
                  >
                    Explore
                  </Link>
                  <a
                    href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in booking the "${tour.title}" package. Can you share more details?`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex justify-center items-center py-2.5 px-2 rounded-xl bg-primary/10 backdrop-blur-md border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-[13px] font-bold shadow-sm"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
