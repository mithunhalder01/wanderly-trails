import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";

const photos = [
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Beach Sunset", cat: "Beaches", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", alt: "Mountain View", cat: "Mountains", span: "" },
  { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80", alt: "Forest Trail", cat: "Adventure", span: "" },
  { src: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80", alt: "Old City", cat: "Culture", span: "" },
  { src: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80", alt: "Resort Pool", cat: "Luxury", span: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80", alt: "Local Market", cat: "Culture", span: "" },
  { src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80", alt: "Alpine Meadows", cat: "Mountains", span: "" },
  { src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80", alt: "Night Sky", cat: "Adventure", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80", alt: "Ancient Ruins", cat: "Culture", span: "" },
  { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", alt: "Hotel Room", cat: "Luxury", span: "" },
  { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80", alt: "City Lights", cat: "City", span: "" },
  { src: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&q=80", alt: "Waterfall", cat: "Adventure", span: "" },
];

const categories = ["All", "Beaches", "Mountains", "Adventure", "Luxury", "Culture", "City"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof photos[0] | null>(null);

  const filtered = filter === "All" ? photos : photos.filter((p) => p.cat === filter);

  return (
    <div className="pt-20">
      <PageHero
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80"
        alt="Travel Gallery"
        badge="Our Memories"
        title="Travel Gallery"
        subtitle="A visual collection of places, experiences, and traveler moments."
      />

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} data-testid={`filter-gallery-${cat.toLowerCase()}`}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filter === cat ? "bg-primary text-white shadow-md" : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-48">
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.src}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(photo)}
              data-testid={`gallery-photo-${i}`}
              className={`${photo.span} relative group cursor-pointer overflow-hidden rounded-2xl h-48 md:h-56`}
            >
              <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-white/90 text-xs font-semibold px-2 py-1 rounded-full">{photo.cat}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white hover:text-accent transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selected.src}
              alt={selected.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
