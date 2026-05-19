import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock, Users } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";


const tours = [
  {
    id: 1,
    title: "Goa Tour",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    price: "₹12,999",
    duration: "5 Days 4 Nights",
    description: "Experience the vibrant beaches, nightlife, and Portuguese heritage of Goa with our curated package.",
    highlights: ["Beach Hopping", "Water Sports", "Nightlife", "Heritage Walk"],
  },
  {
    id: 2,
    title: "Memorable Himachal",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    price: "₹15,999",
    duration: "6 Days 5 Nights",
    description: "Explore the majestic mountains, serene valleys, and charming villages of Himachal Pradesh.",
    highlights: ["Manali", "Kullu", "Rohtang Pass", "Local Culture"],
  },
  {
    id: 3,
    title: "Meghalaya Tour",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&q=80",
    price: "₹18,999",
    duration: "7 Days 6 Nights",
    description: "Discover the abode of clouds with living root bridges, waterfalls, and pristine landscapes.",
    highlights: ["Living Root Bridges", "Cherrapunji", "Shillong", "Waterfalls"],
  },
  {
    id: 4,
    title: "Spiti Circuit",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    price: "₹24,999",
    duration: "8 Days 7 Nights",
    description: "Journey through the cold desert of Spiti Valley with ancient monasteries and stunning landscapes.",
    highlights: ["Key Monastery", "Chandratal Lake", "Kaza", "Pin Valley"],
  },
];

export default function ToursSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate tours for infinite loop (only on mobile)
  const displayTours = isMobile ? [...tours, ...tours, ...tours] : tours;

  const [pageStep, setPageStep] = useState<number>(0);

  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    const computeStep = () => {
      const el = carouselRef.current;
      if (!el) return;
      const firstCard = el.querySelector<HTMLElement>(".tour-card");
      if (!firstCard) return;

      const cardRect = firstCard.getBoundingClientRect();
      const containerRect = el.getBoundingClientRect();

      // width of one horizontal item (including its snap gap)
      const gap = 24; // matches `gap-6` used in the container
      const step = cardRect.width + gap;

      setPageStep(step);

      // Initialize to the middle set to fake infinite scroll.
      if (window.innerWidth < 768) {
        const singleSetWidth = step * tours.length;
        el.scrollLeft = singleSetWidth;
      } else {
        el.scrollLeft = 0;
      }

      // Avoid layout surprises
      el.scrollLeft = el.scrollLeft;
      // silence unused var warning
      void containerRect;
    };

    computeStep();
    window.addEventListener('resize', () => {
      checkMobile();
      computeStep();
    });

    return () => {
      window.removeEventListener('resize', computeStep);
    };
  }, []);

  useEffect(() => {
    if (!isMobile || !carouselRef.current || isPaused) return;
    const el = carouselRef.current;
    if (!pageStep) return;

    const singleSetWidth = pageStep * tours.length;

    const id = window.setInterval(() => {
      if (isPaused) return;
      const maxScroll = singleSetWidth * 2;
      const next = el.scrollLeft + pageStep;

      if (next >= maxScroll) {
        el.scrollTo({ left: next - singleSetWidth, behavior: 'auto' });
      } else {
        el.scrollTo({ left: next, behavior: 'smooth' });
      }
    }, 3800);

    return () => window.clearInterval(id);
  }, [isMobile, isPaused, pageStep]);


  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mobile:py-10">
      <div className="text-center mb-14 mobile:mb-8">
        <span className="inline-block bg-primary/10 text-primary text-[11px] sm:text-xs font-bold tracking-widest uppercase px-3 sm:px-4 py-2 rounded-full mb-3">
          Handpicked Experiences
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">
          Unforgettable Moments For You
        </h2>
        <p className="text-muted-foreground text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Discover our handpicked travel experiences across India, crafted to turn every journey into a memory worth keeping.
        </p>
      </div>


      <div
        ref={carouselRef}
        className="relative flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto overflow-y-hidden pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide px-4 md:px-0 touch-pan-x"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {displayTours.map((tour, index) => (
          <motion.div
            key={`${tour.id}-${index}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % tours.length) * 0.1 }}
            className="tour-card relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group shrink-0 w-[75vw] md:w-auto snap-center"
          >
            <img
              src={tour.image}
              alt={tour.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-110 md:group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-xl shadow-lg z-10">
              <span className="text-white/90 font-bold text-xs">Starting at</span>
              <span className="block text-white font-bold text-xl">{tour.price}</span>
            </div>

            <div className="relative h-56 overflow-hidden" />


            <div className="relative mx-4 mb-4 p-4 backdrop-blur-xl bg-white/40 rounded-2xl border border-white/30">
              <h3 className="font-serif font-bold text-lg mb-1.5 text-foreground group-hover:text-primary transition-colors">
                {tour.title}
              </h3>

              <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>Small Group</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-2 leading-relaxed line-clamp-2">
                {tour.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {tour.highlights.slice(0, 3).map((highlight) => (
                  <span
                    key={highlight}
                    className="text-xs bg-white/50 backdrop-blur-sm text-foreground px-2 py-0.5 rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <Link
                href={`/packages`}
                className="inline-flex items-center gap-2 w-full justify-center bg-primary text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-primary/90 transition-all group-hover:gap-3 text-sm"
              >
                More Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-lg"
        >
          View All Tours
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
