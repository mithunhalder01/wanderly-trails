import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useContent } from "@/context/content";

export default function HomeReviews() {
  const { testimonials } = useContent();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const t = testimonials[idx];

  return (
    <section className="luxury-section-alt py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Reviews</span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Real Stories From
            <br />
            <span className="text-foreground/70 italic">Real Explorers</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            See how travelers from across India experienced the magic of the mountains.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-3xl">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-3xl p-8 text-center md:p-12"
          >
            <div className="mb-4 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < t.rating ? "fill-foreground/70 text-foreground/70" : "text-muted"}`}
                />
              ))}
            </div>
            <p className="text-lg leading-relaxed text-foreground md:text-xl">"{t.review}"</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <img src={t.avatarUrl} alt={t.name} className="h-14 w-14 rounded-full object-cover" />
              <div className="text-left">
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.location}</p>
                <p className="text-xs font-semibold text-primary">{t.destination}</p>
              </div>
            </div>
          </motion.div>

          {testimonials.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-0 top-1/2 hidden -translate-x-full -translate-y-1/2 rounded-full border border-border bg-white p-2 shadow-sm md:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next review"
                onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
                className="absolute right-0 top-1/2 hidden translate-x-full -translate-y-1/2 rounded-full border border-border bg-white p-2 shadow-sm md:flex"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Review ${i + 1}`}
                    onClick={() => setIdx(i)}
                    className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : "w-4 bg-muted-foreground/30"}`}
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
