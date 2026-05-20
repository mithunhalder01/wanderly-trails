import { Send, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const schema = z.object({ email: z.string().email("Enter a valid email") });
type FormData = z.infer<typeof schema>;

export default function HomeNewsletter() {
  const { toast } = useToast();
  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { email: "" } });
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".newsletter-card", 
      { y: 30, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: container });

  const onSubmit = (data: FormData) => {
    toast({ title: "Subscribed!", description: "You'll receive exclusive travel deals and tips." });
    form.reset();
    void data;
  };

  return (
    <section ref={container} className="relative py-16 overflow-hidden bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="newsletter-card relative rounded-[2rem] overflow-hidden">
          {/* Beautiful Gradient Background for the card */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-primary/80" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02afe5c88f?w=1920&q=80')] mix-blend-overlay opacity-20 object-cover" />
          <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-white/20 blur-[80px]" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-black/20 blur-[80px]" />

          <div className="relative z-10 px-6 py-12 md:py-16 md:px-12 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center p-2.5 bg-white/20 backdrop-blur-md rounded-xl mb-5 shadow-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight max-w-2xl">
              Get Closer With Us & Get Special Promo
            </h2>
            
            <p className="text-white/90 text-sm md:text-base mb-8 max-w-2xl leading-relaxed">
              Join our travel community and unlock early access to limited-time offers, insider discounts, and unforgettable adventures.
            </p>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-lg relative"
            >
              <div className="flex flex-col sm:flex-row gap-3 p-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-full">
                <input
                  {...form.register("email")}
                  type="email"
                  placeholder="Enter your email address"
                  data-testid="input-newsletter-email"
                  className="flex-1 bg-transparent px-5 py-3 text-white placeholder:text-white/60 outline-none w-full"
                />
                <button
                  type="submit"
                  data-testid="btn-subscribe-newsletter"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary px-6 py-3 rounded-xl sm:rounded-full font-bold shadow-lg hover:bg-white/90 transition-all duration-300 w-full sm:w-auto flex-shrink-0"
                >
                  Join Now <Send className="h-4 w-4" />
                </button>
              </div>
              {form.formState.errors.email && (
                <p className="absolute -bottom-6 left-6 text-xs text-red-200 font-medium">
                  {form.formState.errors.email.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
