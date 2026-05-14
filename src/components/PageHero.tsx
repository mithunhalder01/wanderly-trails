import { motion } from "framer-motion";

interface PageHeroProps {
  image: string;
  alt: string;
  badge: string;
  title: string;
  subtitle?: string;
  heightClass?: string;
}

export default function PageHero({
  image,
  alt,
  badge,
  title,
  subtitle,
  heightClass = "h-64 md:h-80",
}: PageHeroProps) {
  return (
    <section className={`relative ${heightClass} flex items-center overflow-hidden`}>
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-secondary/70" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-white sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-accent">{badge}</span>
          <h1 className="text-4xl font-serif font-bold md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  );
}
