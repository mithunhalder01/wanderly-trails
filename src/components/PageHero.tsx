import { motion } from "framer-motion";
import PageHeader from "./PageHeader";

interface PageHeroProps {
  image: string;
  alt: string;
  badge: string;
  title: string;
  subtitle?: string;
  heightClass?: string;
  backHref?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHero({
  image,
  alt,
  badge,
  title,
  subtitle,
  heightClass = "h-[400px] md:h-[450px]",
  backHref,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className={`relative ${heightClass} flex flex-col overflow-hidden`}>
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />

      {backHref && breadcrumbs && (
        <div className="relative z-20 pt-6">
          <PageHeader backHref={backHref} breadcrumbs={breadcrumbs} currentTitle={title} className="!bg-transparent !py-0" />
        </div>
      )}

      <div className="relative z-10 flex-1 flex flex-col justify-center mx-auto max-w-7xl w-full px-4 text-white sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="mb-3 inline-block rounded-full border border-white/30 bg-black/35 px-4 py-1.5 text-white font-semibold uppercase tracking-[0.2em] text-[11px] backdrop-blur-md">
            {badge}
          </span>
          <h1 className="text-4xl font-serif font-bold text-white md:text-5xl lg:text-7xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {title}
          </h1>
          {subtitle && <p className="mt-4 max-w-2xl text-sm text-white md:mt-6 md:text-xl font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  );
}
