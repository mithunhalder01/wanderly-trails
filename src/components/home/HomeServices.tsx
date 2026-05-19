import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { servicesHome } from "@/data/homeContent";

export default function HomeServices() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Services</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Journey Beyond
              <br />
              <span className="text-foreground/70 italic">Your Imagination</span>
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground leading-relaxed">
              At Wanderly Trails, we don't just plan trips — we craft unforgettable experiences across every corner of India. From heritage walks to high-altitude treks, beach stays to cultural dives — we make sure your journey is seamless, personal, and full of joy.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/15 px-6 py-3 text-sm font-bold transition-all hover:border-primary hover:text-primary"
            >
              See More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {servicesHome.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <span className="absolute right-6 top-6 font-serif text-5xl font-bold text-primary/15">
                {service.num}
              </span>
              <h3 className="font-serif text-xl font-bold capitalize text-foreground">{service.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
