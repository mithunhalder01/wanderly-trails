import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Headphones, Heart, Map, Sparkles } from "lucide-react";
import { whyChooseHome } from "@/data/homeContent";

const icons = [Headphones, Heart, Map];

export default function HomeWhyChoose() {
  return (
    <section className="relative py-24 md:py-32 bg-secondary text-secondary-foreground overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-foreground mb-6 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-amber-400">Why Choose Us</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
          >
            Experience Travel Like
            <br />
            <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] italic font-light">Never Before</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70 leading-relaxed"
          >
            Our trips are thoughtfully planned to bring you real experiences, genuine moments, and lasting memories.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {whyChooseHome.map((item, i) => {
            const Icon = icons[i] ?? Headphones;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-10 overflow-hidden hover:bg-white/10 transition-all duration-500"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(251,191,36,0.1)] group-hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed flex-grow mb-8">
                    {item.description}
                  </p>
                  
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 mt-auto hover:text-white transition-colors duration-300 w-max"
                  >
                    Learn More 
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
