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
      <div className="absolute inset-0 bg-black/50" />

      {backHref && breadcrumbs && (
        <div className="relative z-20 pt-6">
          <PageHeader backHref={backHref} breadcrumbs={breadcrumbs} currentTitle={title} className="!bg-transparent !py-0" />
        </div>
      )}

      <div className="relative z-10 flex-1 flex flex-col justify-center mx-auto max-w-7xl w-full px-4 text-white sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="luxury-label mb-3 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-md text-white/80 font-bold uppercase tracking-widest text-xs">
            {badge}
          </span>
          <h1 className="text-4xl font-serif font-bold md:text-5xl lg:text-7xl text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] drop-shadow-md">
            {title}
          </h1>
          {subtitle && <p className="mt-6 max-w-2xl text-base text-white/90 md:text-xl font-medium leading-relaxed drop-shadow-sm">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  );
}
