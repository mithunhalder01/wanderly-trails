import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactForm = z.infer<typeof schema>;

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const onSubmit = (_data: ContactForm) => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
      form.reset();
    }, 1000);
  };

  return (
    <div className="pt-20">
      <section className="relative h-64 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1920&q=80" alt="Contact" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-secondary/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold tracking-widest uppercase text-accent block mb-3">Get In Touch</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">Contact Us</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Let's Talk</h2>
              <p className="text-muted-foreground">Have a question or ready to plan your next adventure? Our team is here to help.</p>
            </div>

            {[
              { icon: Phone, label: "Phone", val: "+91 12345 67890", href: "tel:+911234567890" },
              { icon: Mail, label: "Email", val: "wanderlytrails.in@gmail.com", href: "mailto:wanderlytrails.in@gmail.com" },
              { icon: MapPin, label: "Office", val: "123 Travel Street, Mumbai, MH 400001" },
            ].map(({ icon: Icon, label, val, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="font-semibold text-foreground hover:text-primary transition-colors text-sm">{val}</a>
                  ) : (
                    <p className="font-semibold text-foreground text-sm">{val}</p>
                  )}
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noreferrer"
              data-testid="btn-whatsapp"
              className="flex items-center gap-3 bg-green-500 text-white font-bold px-6 py-4 rounded-2xl hover:bg-green-600 transition-colors shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>

            <div className="bg-muted rounded-2xl h-52 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">123 Travel Street, Mumbai</p>
                <p className="text-xs">Google Maps Integration</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Your Name *</label>
                    <input {...form.register("name")} data-testid="input-contact-name" placeholder="Full name"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
                    {form.formState.errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Email Address *</label>
                    <input {...form.register("email")} type="email" data-testid="input-contact-email" placeholder="your@email.com"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
                    {form.formState.errors.email && <p className="text-red-500 text-xs mt-1">Valid email required</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Phone Number *</label>
                    <input {...form.register("phone")} data-testid="input-contact-phone" placeholder="+91 9876543210"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
                    {form.formState.errors.phone && <p className="text-red-500 text-xs mt-1">Phone is required</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Subject</label>
                    <input {...form.register("subject")} data-testid="input-contact-subject" placeholder="How can we help?"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Message *</label>
                  <textarea {...form.register("message")} rows={5} data-testid="input-contact-message" placeholder="Tell us about your dream trip..."
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background resize-none" />
                  {form.formState.errors.message && <p className="text-red-500 text-xs mt-1">{form.formState.errors.message.message}</p>}
                </div>
                <button type="submit" data-testid="btn-submit-contact" disabled={isSending}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-md text-base disabled:opacity-60">
                  {isSending ? "Sending..." : "Send Message"}
                </button>
                {submitted && (
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-700 text-sm font-medium">Message sent! We'll reply within 24 hours.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
