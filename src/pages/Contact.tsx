import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import {
  CONTACT_EMAIL,
  CONTACT_MAPS_EMBED_URL,
  CONTACT_MAPS_URL,
  CONTACT_OFFICE_ADDRESS,
  CONTACT_PHONE_DIGITS,
  CONTACT_PHONE_DISPLAY,
  CONTACT_WHATSAPP_NUMBER,
} from "@/lib/contact";

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
      <PageHero
        image="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1920&q=80"
        alt="Contact Wanderly Trails"
        badge="Get In Touch"
        title="Contact Us"
        subtitle="Our travel experts are ready to help you plan the right trip."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6 lg:p-8">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Let's Talk</h2>
              <p className="text-muted-foreground">Have a question or ready to plan your next adventure? Our team is here to help.</p>
            </div>

            {[
              { icon: Phone, label: "Phone", val: CONTACT_PHONE_DISPLAY, href: `tel:+91${CONTACT_PHONE_DIGITS}` },
              { icon: Mail, label: "Email", val: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
              { icon: MapPin, label: "Office", val: CONTACT_OFFICE_ADDRESS, href: CONTACT_MAPS_URL },
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
              href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              data-testid="btn-whatsapp"
              className="flex items-center gap-3 bg-green-500 text-white font-bold px-6 py-4 rounded-2xl hover:bg-green-600 transition-colors shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>

            <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted">
              <iframe
                title="Wanderly Trails Office Location"
                src={CONTACT_MAPS_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full border-0"
              />
              <a
                href={CONTACT_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="block px-4 py-2 text-xs font-semibold text-primary hover:text-primary/80"
              >
                Open in Google Maps
              </a>
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
