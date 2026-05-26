import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const vibeCards = [
  {
    id: 1,
    video: "/vid1.mp4",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    title: "Mussoorie Magic",
    subtitle: "Queen of Hills",
  },
  {
    id: 2,
    video: "/vid2.mp4",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
    title: "Manali Snowscapes",
    subtitle: "Adventure & Snow",
  },
  {
    id: 3,
    video: "/vid3.mp4",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    title: "Himachal's Main Spots",
    subtitle: "Mountains & Valleys",
  },
  {
    id: 4,
    video: "/vid4.mp4",
    image: "https://images.unsplash.com/photo-1595815775739-91d9c1d44e39?w=600&q=80",
    title: "Top 4 Snow Places in Himachal",
    subtitle: "Winter Wonderland",
  },
];

export default function VibeSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
          Make Every Trip An Unforgettable Story
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed mb-8">
          Join our curated travel experiences designed for explorers, dreamers, and adventure lovers.
        </p>
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-primary/90 transition-all hover:gap-3 text-lg"
        >
          Vibe With Us
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {vibeCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative h-80 md:h-96 rounded-2xl overflow-hidden group cursor-pointer will-change-transform"
          >
            <video
              src={card.video}
              muted
              loop
              playsInline
              preload="none"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              poster={card.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h3 className="font-serif font-bold text-xl md:text-2xl text-white mb-1">
                {card.title}
              </h3>
              <p className="text-white/80 text-sm">{card.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
