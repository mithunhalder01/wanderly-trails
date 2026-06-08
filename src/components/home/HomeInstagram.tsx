import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeInstagram() {
  useEffect(() => {
    // Elfsight script load karein
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-5 shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span className="tracking-[0.2em] uppercase">Connect With Us</span>
          </motion.div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Follow the Journey</h2>
        </div>
        
        {/* Elfsight Widget Div */}
        <div className="elfsight-app-0d545f8f-f68d-4405-b068-5caaa7d3c57c" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
}