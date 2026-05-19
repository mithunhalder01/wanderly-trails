import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { availableTours } from "@/data/homeContent";

export default function HomeTours() {
  return (
    <section className="luxury-section-alt py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="luxury-label">Available Tours</span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Unforgettable Moments
            <br />
            <span className="text-foreground/70 italic">For You</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Discover our handpicked travel experiences across India, crafted to turn every journey into a memory worth keeping.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {availableTours.map((tour, i) => (
            <motion.article
              key={tour.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="luxury-card group overflow-hidden transition-all hover:-translate-y-0.5"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-foreground">{tour.title}</h3>
                <p className="mt-1 text-sm font-bold text-primary">
                  Starting From: ₹{tour.price.toLocaleString("en-IN")}/-
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {tour.description}
                </p>
                <Link
                  href={`/packages/${tour.id}`}
                  className="luxury-btn-outline mt-4 w-full py-2.5 group-hover:gap-3"
                >
                  More Details <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
          >
            View All Tours <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
