import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { vibeHome } from "@/data/homeContent";

export default function HomeVibe() {
  return (
    <section className="bg-secondary py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{vibeHome.badge}</span>
        <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
          {vibeHome.title}
          <br />
          <span className="italic text-white/85">{vibeHome.titleHighlight}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/75">{vibeHome.subtitle}</p>
        <Link
          href="/packages"
          className="luxury-btn mt-8 px-8 py-4 text-base hover:gap-3"
        >
          {vibeHome.cta} <ArrowRight className="h-5 w-5" />
        </Link>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {vibeHome.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <video
                src={card.video}
                autoPlay
                muted
                loop
                playsInline
                poster={card.poster}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-lg font-bold">{card.title}</h3>
                <p className="text-xs text-white/75">{card.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
