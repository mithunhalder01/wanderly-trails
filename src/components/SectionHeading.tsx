import { motion } from "framer-motion";

interface Props {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({ badge, title, subtitle, center = true }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={center ? "text-center" : ""}
    >
      {badge && (
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3 bg-accent/10 px-4 py-1.5 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}
