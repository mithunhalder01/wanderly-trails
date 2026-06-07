import { useState } from "react";
import { Link } from "wouter";
import { destinations, getAssetUrl } from "@/data/staticData";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

// ── COLORFUL FLOATING BAR ICONS ──
const FlightsIcon = () => (
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/40">
    <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRNAoE5exIFCrlJGn5msF1dB7lgg81rlHEHeBiq8wjuEz5p8WvM" alt="" />
  </div>
);

const HolidayPackagesIcon = () => (
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40">
    <img src="data:image/png;base64,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" alt="" />
  </div>
);

const DestinationGuideIcon = () => (
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40">
    <img src="data:image/png;base64,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" alt="" />
  </div>
);

const ThingsToDoIcon = () => (
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-950/40">
    <img src="data:image/png;base64,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" alt="" />
  </div>
);

// ── CUSTOM STATS BAR ICONS ──
const GlobePlaneIcon = () => (
  <img 
    src="data:image/jpeg;base64,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" 
    alt="Travel Experiences" 
    className="w-11 h-11 object-contain rounded-lg"
  />
);

const GlobePinsIcon = () => (
  <img 
    src="https://media.istockphoto.com/id/1390124452/vector/cartoon-planet-earth-with-red-pointers.jpg?s=612x612&w=0&k=20&c=Lk3zOKPphQBerybOovZmhUP5sKK86_9IvQg0faJWjmE=" 
    alt="Countries" 
    className="w-11 h-11 object-contain rounded-lg"
  />
);

const PriceGuaranteedIcon = () => (
  <img 
    src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTUaBScoNxB6oSBWARq_qP8Tls96i7Ob7HBT5c_UvgSVOZJtDE-" 
    alt="Best Price Guaranteed" 
    className="w-11 h-11 object-contain rounded-lg"
  />
);

const UsersIcon = () => (
  <svg className="w-11 h-11" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="38" cy="24" r="7" fill="url(#userGradBack)" />
    <path d="M28 44C28 38.5 32.5 35 38 35C43.5 35 48 38.5 48 44" fill="url(#userGradBack)" />
    <circle cx="26" cy="28" r="8" fill="url(#userGradFront)" />
    <path d="M14 50C14 43.5 19.5 39 26 39C32.5 39 38 43.5 38 50" fill="url(#userGradFront)" />
    <defs>
      <linearGradient id="userGradBack" x1="31" y1="17" x2="48" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF8A65" />
        <stop offset="1" stopColor="#E64A19" />
      </linearGradient>
      <linearGradient id="userGradFront" x1="18" y1="20" x2="38" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFB74D" />
        <stop offset="1" stopColor="#F57C00" />
      </linearGradient>
    </defs>
  </svg>
);

export default function HomeDestinations() {
  const featured = destinations.filter((d) => d.rating >= 4.5);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <section className="relative pb-16 md:pb-24 bg-background overflow-visible">
      
      {/* ── OVERLAPPING FLOATING TRANSITION BAR ── */}
      <div className="relative z-20 -translate-y-1/2 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex items-center justify-between py-3 px-4 md:px-8 gap-1.5 md:gap-4">
          
          <Link href="/packages" className="flex-1 flex items-center justify-center gap-3 px-1 md:px-3 py-1 border-r border-gray-100 dark:border-zinc-800 hover:opacity-85 transition-opacity group">
            <FlightsIcon />
            <span className="hidden md:inline text-[11px] sm:text-xs md:text-sm font-bold text-gray-850 dark:text-zinc-205 whitespace-nowrap">Flights</span>
          </Link>
          
          <Link href="/packages" className="flex-1 flex items-center justify-center gap-3 px-1 md:px-3 py-1 border-r border-gray-100 dark:border-zinc-800 hover:opacity-85 transition-opacity group">
            <HolidayPackagesIcon />
            <span className="hidden md:inline text-[11px] sm:text-xs md:text-sm font-bold text-gray-850 dark:text-zinc-205 whitespace-nowrap">Holiday Packages</span>
          </Link>
          
          <Link href="/destinations" className="flex-1 flex items-center justify-center gap-3 px-1 md:px-3 py-1 border-r border-gray-100 dark:border-zinc-800 hover:opacity-85 transition-opacity group">
            <DestinationGuideIcon />
            <span className="hidden md:inline text-[11px] sm:text-xs md:text-sm font-bold text-gray-850 dark:text-zinc-205 whitespace-nowrap">Travel Destination Guide</span>
          </Link>
          
          <Link href="/packages" className="flex-1 flex items-center justify-center gap-3 px-1 md:px-3 py-1 last:border-0 hover:opacity-85 transition-opacity group">
            <ThingsToDoIcon />
            <span className="hidden md:inline text-[11px] sm:text-xs md:text-sm font-bold text-gray-850 dark:text-zinc-205 whitespace-nowrap">Things To Do</span>
          </Link>
          
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10 pt-16">

        {/* ── FIND THE PERFECT PLACE SECTION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Button */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-foreground tracking-tight leading-tight font-sans">
              Find The <br className="hidden lg:inline" />Perfect Place
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground/80 mt-3 max-w-xs leading-relaxed">
              A list of the top 75 Best Tourist Places to See in world for a perfect holiday or a trip.
            </p>
            <Link href="/destinations">
              <span className="cursor-pointer inline-flex items-center justify-center bg-[#D95F4F] hover:bg-[#C54E3E] text-white px-6 py-2.5 rounded-full font-bold transition-all duration-350 mt-6 text-xs select-none">
                View More
              </span>
            </Link>
          </div>

          {/* Right Column: Swiper Carousel */}
          <div className="lg:col-span-8 w-full overflow-hidden relative">
            <Swiper
              onSwiper={setSwiper}
              slidesPerView={1.2}
              spaceBetween={16}
              loop={true}
              breakpoints={{
                480: { slidesPerView: 1.6, spaceBetween: 16 },
                640: { slidesPerView: 2.4, spaceBetween: 20 },
                1024: { slidesPerView: 3.2, spaceBetween: 20 },
                1280: { slidesPerView: 4, spaceBetween: 20 }
              }}
              className="w-full pb-4"
            >
              {featured.map((dest) => (
                <SwiperSlide key={dest.id} className="py-2">
                  <Link href={`/destinations/${dest.id}`}>
                    <div className="group relative h-[250px] sm:h-[270px] rounded-[20px] border border-border/30 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 bg-zinc-950 cursor-pointer">
                      
                      {/* Destination Image */}
                      <img
                        src={getAssetUrl(dest.imageUrl)}
                        alt={dest.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay for Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                      
                      {/* Top Left: Title Text (Clean white text resembling the design mockup) */}
                      <div className="absolute top-4 left-4 z-20 max-w-[85%]">
                        <span className="text-white text-sm sm:text-base font-bold tracking-wide drop-shadow-md leading-tight block">
                          {dest.name}
                        </span>
                        <span className="text-white/75 text-[9px] uppercase tracking-widest font-semibold block mt-0.5">
                          {dest.country}
                        </span>
                      </div>
 
                      {/* Bottom Left: Rating Badge Pill */}
                      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E2583E] text-white shadow-sm">
                        <Star className="w-3 h-3 fill-white text-white" />
                        <span className="text-[10px] sm:text-xs font-bold leading-none">{dest.rating.toFixed(1)}</span>
                      </div>
 
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom BACK & NEXT Swiper Controls */}
            <div className="flex items-center justify-center lg:justify-start gap-8 mt-5">
              <button
                type="button"
                onClick={() => swiper?.slidePrev()}
                className="group flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="Previous Slide"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted-foreground/30 group-hover:border-foreground/80 transition-colors">
                  <ChevronLeft className="h-3.5 w-3.5" />
                </div>
                BACK
              </button>
              
              <button
                type="button"
                onClick={() => swiper?.slideNext()}
                className="group flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors duration-300"
                aria-label="Next Slide"
              >
                NEXT
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E2583E] text-white group-hover:bg-[#C54E3E] transition-colors shadow-md shadow-[#E2583E]/15">
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </button>
            </div>
 
          </div>
        </div>
      </div>
    </section>
  );
}
