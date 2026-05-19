import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { aboutHome } from "@/data/homeContent";

export default function HomeAbout() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={aboutHome.imageMain}
                alt="Travelers on an adventure"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Center content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <span className="luxury-label inline-block rounded-full glass-panel border-0 px-4 py-1.5">
              {aboutHome.badge}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-[2.5rem]">
              {aboutHome.title}
              <br />
              <span className="text-foreground">{aboutHome.titleHighlight}</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{aboutHome.paragraph1}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{aboutHome.paragraph2}</p>
            <Link
              href="/about"
              className="luxury-btn mt-8 hover:gap-3"
            >
              {aboutHome.cta}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:col-span-3 lg:block"
          >
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={aboutHome.imageSide}
                alt="Group travel experience"
                className="aspect-square w-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-1 divide-y border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {aboutHome.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center py-8 text-center sm:py-10"
            >
              <p className="font-serif text-4xl font-bold text-foreground md:text-5xl">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
