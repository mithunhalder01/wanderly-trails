import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({ email: z.string().email("Enter a valid email") });
type FormData = z.infer<typeof schema>;

export default function HomeNewsletter() {
  const { toast } = useToast();
  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { email: "" } });

  const onSubmit = (data: FormData) => {
    toast({ title: "Subscribed!", description: "You'll receive exclusive travel deals and tips." });
    form.reset();
    void data;
  };

  return (
    <section className="border-y border-border/60 bg-secondary py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="text-center lg:text-left">
            <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">
              Get Closer With Us & Get Exclusive Travel Deals
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Join our travel community and unlock early access to limited-time offers, insider discounts, and unforgettable adventures.
            </p>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              {...form.register("email")}
              type="email"
              placeholder="Your Email"
              data-testid="input-newsletter-email"
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white backdrop-blur-sm placeholder:text-white/45 outline-none focus:border-white/40"
            />
            <button
              type="submit"
              data-testid="btn-subscribe-newsletter"
              className="luxury-btn-glass px-7 py-3"
            >
              Join Now <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
        {form.formState.errors.email && (
          <p className="mt-2 text-center text-sm text-red-200 lg:text-left">{form.formState.errors.email.message}</p>
        )}
      </div>
    </section>
  );
}
