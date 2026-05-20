import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import { CONTACT_EMAIL, CONTACT_WHATSAPP_NUMBER } from "@/lib/contact";

const faqs = [
  { q: "What is your refund policy?", a: "We offer a full refund if you cancel 30+ days before departure, 50% refund for 15-29 days, and no refund for cancellations within 14 days. Travel insurance is strongly recommended." },
  { q: "Can I cancel or modify my booking?", a: "Yes, you can modify or cancel your booking through our customer support team. Cancellation charges apply depending on how close to the travel date the cancellation is made." },
  { q: "Is the payment process safe?", a: "Absolutely. We use 256-bit SSL encryption for all transactions. Your financial data is never stored on our servers. We support UPI, net banking, and all major credit/debit cards." },
  { q: "Do I need a passport for domestic travel?", a: "No passport is needed for domestic travel within India. A valid government-issued photo ID (Aadhaar, Voter ID, or Driving License) is sufficient." },
  { q: "What is included in the package price?", a: "Package prices typically include hotel accommodation, daily breakfast, airport transfers, local transport, and guided sightseeing. Specific inclusions are listed on each package detail page." },
  { q: "Do you offer travel insurance?", a: "Yes, we partner with leading insurance providers to offer comprehensive travel insurance. We strongly recommend purchasing insurance for all bookings." },
  { q: "How do I get my travel documents?", a: "All travel documents, vouchers, and itineraries are sent to your registered email 48 hours before departure. You can also access them through your user dashboard." },
  { q: "Can I customize a package?", a: "Absolutely! Contact our travel experts for custom-built packages tailored to your preferences, budget, and schedule. We specialize in creating personalized travel experiences." },
  { q: "What languages do your guides speak?", a: "Our guides speak Hindi, English, and the local language of the destination." },
  { q: "How do I contact support during my trip?", a: "We provide 24/7 emergency support via WhatsApp and phone. Your travel documents include emergency contact numbers for your specific destination." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="pt-20">
      <PageHero
        image="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
        alt="Frequently asked questions"
        badge="Got Questions?"
        title="Frequently Asked Questions"
        subtitle="Quick answers about booking, cancellation, payments, and support."
      />

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="FAQ" title="Everything You Need to Know" subtitle="Can't find what you're looking for? Contact our support team." />

        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              data-testid={`faq-item-${i}`}
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                data-testid={`faq-toggle-${i}`}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-primary text-white rounded-2xl p-8 text-center">
          <h3 className="font-serif font-bold text-xl mb-2">Still have questions?</h3>
          <p className="text-white/70 mb-5 text-sm">Our team is ready to help you plan your perfect journey.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`mailto:${CONTACT_EMAIL}`} className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">Email Us</a>
            <a href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
