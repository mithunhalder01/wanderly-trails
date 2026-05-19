import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Headphones, Heart, Map } from "lucide-react";
import { whyChooseHome } from "@/data/homeContent";

const icons = [Headphones, Heart, Map];

export default function HomeWhyChoose() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Why Choose Us</span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Experience Travel Like
            <br />
            <span className="text-foreground/70 italic">Never Before</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Our trips are thoughtfully planned to bring you real experiences, genuine moments, and lasting memories.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {whyChooseHome.map((item, i) => {
            const Icon = icons[i] ?? Headphones;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <Link
                  href="/about"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary transition-all hover:gap-2"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
