import { motion } from "framer-motion";
import { testimonials } from "@/data/staticData";
import TestimonialCard from "@/components/TestimonialCard";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";

export default function Testimonials() {
  return (
    <div className="pt-20">
      <PageHero
        image="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&q=80"
        alt="Traveler Testimonials"
        badge="Real Reviews"
        title="What Travelers Say"
        subtitle="Verified guest feedback from domestic and international tours."
      />

      <section className="py-16 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "4.9", label: "Average Rating" },
              { num: "5000+", label: "Happy Travelers" },
              { num: "98%", label: "Would Recommend" },
              { num: "120+", label: "Destinations" },
            ].map(({ num, label }) => (
              <div key={label} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <p className="text-3xl font-serif font-bold text-foreground">{num}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
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
