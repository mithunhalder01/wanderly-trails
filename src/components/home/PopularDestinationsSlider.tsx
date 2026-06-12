import { useRef } from "react";
import { useContent } from "@/context/content";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CONTACT_WHATSAPP_NUMBER } from "@/lib/contact";

export default function PopularDestinationsSlider() {
  const { destinations } = useContent();
  const scrollRef = useRef<HTMLDivElement>(null);

  const items = destinations.slice(0, 10);

  return (
    <section className="pt-16 pb-2 bg-background overflow-hidden relative">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Heading Section */}
        <div className="flex items-center justify-between mb-12 px-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif tracking-tight">
              Explore popular destinations
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase opacity-60">
              SWIPE
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </div>
        </div>

        {/* Slider Container: Horizontal scrolling with hidden scrollbar */}
        <div 
          ref={scrollRef}
          className="flex gap-8 md:gap-12 overflow-x-auto pb-4 px-2 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none relative z-10"
          style={{ 
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {items.map((dest) => (
            <motion.div key={dest.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: dest.id * 0.05 }}>
              {(() => {
                const isInternational = dest.country !== "India";
                const whatsappMessage = encodeURIComponent(
                  `Hi! I'm interested in the ${dest.name} (${dest.country}) package. Can you tell me more?`
                );
                const whatsappLink = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${whatsappMessage}`;

                return (
                  <Link
                    href={isInternational ? whatsappLink : `/destinations/${dest.id}`}
                    target={isInternational ? "_blank" : "_self"}
                    className="flex-shrink-0 flex flex-col items-center gap-4 snap-start group cursor-pointer"
                  >
              {/* Circular Destination Card */}
              <div className="relative">
                <div className="w-[100px] h-[100px] sm:w-[115px] sm:h-[115px] md:w-[130px] md:h-[130px] rounded-full border-2 border-transparent group-hover:border-primary/40 transition-all duration-500 absolute -inset-1 z-0" />
                <div className="w-[100px] h-[100px] sm:w-[115px] sm:h-[115px] md:w-[130px] md:h-[130px] rounded-full border border-border/50 overflow-hidden shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 relative bg-muted z-10">
                <img 
                  src={dest.imageUrl} 
                  alt={dest.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  draggable="false"
                />
                <div className="c_l">
                  
                </div>
              </div>
              </div>
              
              {/* Destination Label */}
              <span className="text-xs sm:text-sm font-semibold text-foreground/90 text-center tracking-tight transition-colors group-hover:text-primary group-hover:font-bold">
                {dest.name}
              </span>
                  </Link>
                );
              })()}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CSS to hide scrollbar while keeping functionality */}
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      ` }} />
    </section>
  );
}