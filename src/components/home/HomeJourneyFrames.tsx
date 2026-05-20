import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

interface FrameItem {
  id: number;
  image: string;
  location: string;
}

const frames: FrameItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=800&auto=format&fit=crop&q=80",
    location: "Kashmir",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80",
    location: "Rajasthan",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&auto=format&fit=crop&q=80",
    location: "Sikkim",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&auto=format&fit=crop&q=80",
    location: "Ladakh",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
    location: "Himachal",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    location: "Goa",
  },
];

export default function HomeJourneyFrames() {
  const [activeIndex, setActiveIndex] = useState(3); // Start with Ladakh (index 3) active
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const minSwipeDistance = 50;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? frames.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === frames.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground uppercase mb-2">
          Journey In Frames
        </h2>
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase italic">
          Pictures Perfect Moments
        </p>
      </div>

      {/* 3D Carousel Wrapper */}
      <div 
        className="relative mx-auto max-w-[1400px] h-[300px] sm:h-[360px] lg:h-[450px] flex items-center justify-center journey-container mt-8"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        
        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 sm:left-12 lg:left-24 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-600 hover:scale-110 active:scale-95"
          aria-label="Previous Frame"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 sm:right-12 lg:right-24 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-600 hover:scale-110 active:scale-95"
          aria-label="Next Frame"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* 3D Track */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          {frames.map((frame, index) => {
            const diff = index - activeIndex;
            const total = frames.length;
            let offset = diff;
            
            // Shortest circular path calculation
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const absOffset = Math.abs(offset);
            
            // Curve math: rotate Y away from center, push Z back, scale down
            const rotateY = offset * -18; // Inward rotation
            const translateZ = absOffset * -70; // Depth pushback
            const scale = 1 - absOffset * 0.08; // Scaling factor
            const zIndex = 50 - absOffset;
            const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.35;

            return (
              <div
                key={frame.id}
                onClick={() => setActiveIndex(index)}
                className="absolute rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.25)] border border-white/10 cursor-pointer select-none origin-center transition-all duration-700 ease-out"
                style={{
                  width: "var(--card-width)",
                  height: "var(--card-height)",
                  transform: `translateX(calc(${offset} * var(--card-gap))) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity: absOffset > 2 ? 0 : opacity,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  pointerEvents: absOffset > 2 ? "none" : "auto",
                }}
              >
                {/* Image & Overlay */}
                <div className="relative w-full h-full group">
                  <img
                    src={frame.image}
                    alt={frame.location}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                    loading={index === 3 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 z-10 pointer-events-none" />

                  {/* Location Pill */}
                  <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-lg transition-transform duration-300 group-hover:translate-x-1">
                    <MapPin className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400/10" />
                    <span className="text-white text-xs font-semibold tracking-wide">
                      {frame.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
