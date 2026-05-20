import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import { servicesHome } from "@/data/homeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeServices() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".services-header > *", 
      { x: -20, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    ).fromTo(".services-btn",
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.6"
    ).fromTo(".service-card", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }, 
      "-=0.4"
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative py-16 md:py-24 bg-secondary text-secondary-foreground overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-end gap-10 lg:grid-cols-2 mb-12">
          <div className="services-header">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary-foreground mb-5 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400">Our Services</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Journey Beyond
              <br />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] italic font-light">Your Imagination</span>
            </h2>
            
            <p className="mt-4 max-w-lg text-base text-white/70 leading-relaxed">
              At Wanderly Trails, we don't just plan trips — we craft unforgettable experiences across every corner of India. From heritage walks to high-altitude treks, beach stays to cultural dives — we make sure your journey is seamless, personal, and full of joy.
            </p>
          </div>
          
          <div className="services-btn flex justify-start lg:justify-end">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:border-amber-400 hover:bg-amber-400/10 hover:text-amber-400"
            >
              See More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {servicesHome.map((service) => (
            <div
              key={service.num}
              className="service-card group relative rounded-2xl border border-white/10 bg-white/5 p-8 overflow-hidden transition-all duration-500 hover:bg-white/10 backdrop-blur-sm"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-500">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="font-serif text-4xl font-bold text-white/5 group-hover:text-amber-400/20 transition-colors duration-500">
                    {service.num}
                  </span>
                </div>
                
                <h3 className="font-serif text-xl font-bold capitalize text-white mb-3 group-hover:text-amber-400 transition-colors">{service.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed flex-grow">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
