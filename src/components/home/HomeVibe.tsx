import { Link } from "wouter";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { vibeHome } from "@/data/homeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeVibe() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".vibe-header > *",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    ).fromTo(".vibe-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.2"
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* Premium Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="vibe-header">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">{vibeHome.badge}</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {vibeHome.title}
            <br />
            <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] italic font-light">{vibeHome.titleHighlight}</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            {vibeHome.subtitle}
          </p>

          <div>
            <Link
              href="/packages"
              className="group inline-flex items-center gap-2 px-6 py-3 mt-6 rounded-full bg-foreground text-background font-bold hover:bg-primary transition-all duration-300 shadow-md hover:shadow-primary/30"
            >
              {vibeHome.cta} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {vibeHome.cards.map((card) => (
            <div
              key={card.title}
              className="vibe-card group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg border border-border/50 cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />

              <video
                src={card.video}
                autoPlay
                muted
                loop
                playsInline
                poster={card.poster}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 transform scale-50 group-hover:scale-100 transition-transform duration-500">
                  <PlayCircle className="h-5 w-5 text-white" />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

              <div className="absolute bottom-0 left-0 right-0 p-5 z-20 text-left transform transition-transform duration-300 group-hover:-translate-y-2">
                <h3 className="font-serif text-lg font-bold text-white mb-1">{card.title}</h3>
                <p className="text-xs font-medium text-white/80 uppercase tracking-wider">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
