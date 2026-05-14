import { motion } from "framer-motion";
import { testimonials } from "@/data/staticData";
import TestimonialCard from "@/components/TestimonialCard";
import SectionHeading from "@/components/SectionHeading";

export default function Testimonials() {
  return (
    <div className="pt-20">
      <section className="relative h-64 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&q=80" alt="Testimonials" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-secondary/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold tracking-widest uppercase text-accent block mb-3">Real Reviews</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">What Travelers Say</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "4.9", label: "Average Rating" },
              { num: "5000+", label: "Happy Travelers" },
              { num: "98%", label: "Would Recommend" },
              { num: "120+", label: "Destinations" },
            ].map(({ num, label }) => (
              <div key={label} className="bg-card rounded-2xl p-6 shadow-sm">
                <p className="text-3xl font-serif font-bold text-primary">{num}</p>
                <p className="text-muted-foreground text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Reviews" title="Customer Stories" subtitle="Real experiences from our travellers" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
