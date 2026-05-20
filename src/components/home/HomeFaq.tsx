import { useState, useRef } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { homeFaqs } from "@/data/homeContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".faq-header > *",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    ).fromTo(".faq-item",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
      "-=0.2"
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* Premium Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="faq-header text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">FAQ's</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Frequently Asked
            <br />
            <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728,#FBF5B7,#AA771C)] italic font-light">Questions</span>
          </h2>

          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Got questions before you book? Here are answers to what travelers like you ask us the most.
          </p>
        </div>

        <div className="space-y-4">
          {homeFaqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={faq.q}
                className={`faq-item overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen
                    ? "border-primary/30 bg-primary/5 shadow-md"
                    : "border-border/50 bg-card hover:border-primary/20 hover:bg-card/80"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  data-testid={`home-faq-toggle-${i}`}
                  className="flex w-full items-center justify-between px-5 py-4 text-left font-bold text-foreground group"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 text-base transition-colors group-hover:text-primary">{faq.q}</span>
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full border transition-colors ${isOpen ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border group-hover:border-primary/30 group-hover:text-primary"
                    }`}>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm md:text-base leading-relaxed text-muted-foreground border-t border-border/50 pt-3 mt-2 mx-2">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
