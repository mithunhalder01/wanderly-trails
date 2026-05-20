import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react";
import { useContent } from "@/context/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeReviews() {
  const { testimonials } = useContent();
  const [idx, setIdx] = useState(0);
  const container = useRef<HTMLElement>(null);
  const reviewCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials.length]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".reviews-header > *", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    ).fromTo(".review-card-container", 
      { scale: 0.95, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }, 
      "-=0.2"
    );
  }, { scope: container });

  // Animate card content on index change
  useGSAP(() => {
    if (!reviewCardRef.current) return;
    gsap.fromTo(reviewCardRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
  }, { dependencies: [idx] });

  if (testimonials.length === 0) return null;

  const t = testimonials[idx];

  return (
    <section ref={container} className="relative py-16 md:py-24 bg-secondary text-secondary-foreground overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="reviews-header text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary-foreground mb-5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400">Reviews</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
            Real Stories From
            <br />
            <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] italic font-light">Real Explorers</span>
          </h2>
          
          <p className="text-base text-white/70 leading-relaxed">
            See how travelers from across India experienced the magic of the mountains.
          </p>
        </div>

        <div className="review-card-container relative mx-auto max-w-4xl">
          <div
            ref={reviewCardRef}
            className="relative rounded-[2rem] bg-white/5 backdrop-blur-lg border border-white/10 p-8 md:p-12 text-center shadow-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="mb-6 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-white/20"}`}
                  />
                ))}
              </div>
              <p className="text-lg md:text-2xl leading-relaxed text-white font-medium italic">"{t.review}"</p>
              
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="relative h-14 w-14">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm animate-pulse" />
                  <img src={t.avatarUrl} alt={t.name} className="relative h-14 w-14 rounded-full object-cover border-2 border-white/20" />
                </div>
                <div className="text-left">
                  <p className="text-base font-bold text-white">{t.name}</p>
                  <p className="text-xs font-medium text-white/60">{t.location}</p>
                  <div className="mt-1 inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20">
                    {t.destination}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {testimonials.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-0 top-1/2 hidden -translate-x-6 -translate-y-1/2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-3 text-white shadow-xl transition-all hover:bg-primary hover:border-primary md:flex hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next review"
                onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
                className="absolute right-0 top-1/2 hidden translate-x-6 -translate-y-1/2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-3 text-white shadow-xl transition-all hover:bg-primary hover:border-primary md:flex hover:scale-110"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="mt-8 flex justify-center gap-2.5">
                {testimonials.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Review ${i + 1}`}
                    onClick={() => setIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-8 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
