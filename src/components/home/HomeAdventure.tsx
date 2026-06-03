import { ArrowRight, Compass, Globe, Sparkles, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { adventureHome } from "@/data/homeContent";

const iconMap = {
  compass: Compass,
  globe: Globe,
  wand: Wand2,
};

export default function HomeAdventure() {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-10 w-[420px] h-[420px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl text-center mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-5">
            <Sparkles className="h-4 w-4" />
            {adventureHome.badge}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {adventureHome.title}
            <br />
            <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] italic font-light">
              {adventureHome.titleHighlight}
            </span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">
            {adventureHome.subtitle}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {adventureHome.cards.map((card, index) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap] ?? Compass;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-zinc-950/90 p-8 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 flex h-full flex-col gap-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-white/60">{card.label}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-white/70">{card.description}</p>
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors duration-300"
                    >
                      {card.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
