import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Facebook, Youtube } from "lucide-react";
import { homeHero, homeStats } from "@/data/homeContent";
import { CONTACT_WHATSAPP_NUMBER, SOCIAL_LINKS } from "@/lib/contact";
import AnimatedCounter from "./AnimatedCounter";

const WHATSAPP_MSG = encodeURIComponent(
  "Hi! I want to explore India with Wanderly Trails. Please help me plan my trip."
);

export default function HomeHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-secondary text-white">
      <img
        src={homeHero.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-secondary/40" />

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <motion.div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="luxury-label mb-4 text-white/60">{homeHero.brandLine}</p>
            <h1 className="text-4xl font-semibold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
              {homeHero.title}
              <br />
              <span className="italic text-white/90">{homeHero.titleHighlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              {homeHero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/packages"
                data-testid="hero-explore-btn"
                className="luxury-btn-glass px-8 py-4 text-base hover:-translate-y-0.5"
              >
                {homeHero.ctaPrimary} <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noreferrer"
                className="wa-btn px-8 py-4 text-base hover:-translate-y-0.5"
              >
                {homeHero.ctaSecondary}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start gap-8 lg:items-end lg:text-right"
          >
            <div className="glass-dark rounded-2xl px-8 py-6 lg:px-10">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-white/55">
                People join us:
              </p>
              <p className="text-6xl font-semibold tabular-nums text-white md:text-7xl">
                <AnimatedCounter target={homeStats.tours.value} suffix={homeStats.tours.suffix} />
              </p>
              <p className="mt-1 text-sm text-white/70">{homeStats.tours.label}</p>
              <p className="mt-4 text-base font-medium text-white/85">
                {homeStats.rating.display} {homeStats.rating.label}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-white/55">Follow us</span>
              {[
                { href: SOCIAL_LINKS.instagram, Icon: Instagram, label: "Instagram" },
                { href: SOCIAL_LINKS.facebook, Icon: Facebook, label: "Facebook" },
                { href: SOCIAL_LINKS.youtube, Icon: Youtube, label: "Youtube" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
