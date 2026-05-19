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
        <span className="luxury-label mb-3 inline-block rounded-full border border-border/60 bg-background/60 px-4 py-1.5 backdrop-blur-sm">
          {badge}
        </span>
      )}
      <h2 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
