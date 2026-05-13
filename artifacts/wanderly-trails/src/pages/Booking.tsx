import { useState } from "react";
import { useSearch } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, CreditCard, Smartphone, Building2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone is required"),
  destination: z.string().min(2, "Destination is required"),
  travelers: z.coerce.number().min(1, "At least 1 traveler"),
  budget: z.string().min(1, "Budget is required"),
  travelDate: z.string().min(1, "Travel date is required"),
  specialRequests: z.string().optional(),
});
type BookingForm = z.infer<typeof schema>;

export default function Booking() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const destDefault = params.get("destination") || "";
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingForm>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", destination: destDefault, travelers: 1, budget: "", travelDate: "", specialRequests: "" },
  });

  const onSubmit = (_data: BookingForm) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({ title: "Booking Confirmed!", description: "We'll contact you within 24 hours to finalize your trip." });
      form.reset();
    }, 1200);
  };

  return (
    <div className="pt-20">
      <section className="relative h-64 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80" alt="Booking" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-secondary/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold tracking-widest uppercase text-accent block mb-3">Start Your Journey</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">Book Your Trip</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-serif font-bold mb-8">Booking Details</h2>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Full Name *</label>
                    <input {...form.register("name")} data-testid="input-booking-name" placeholder="Your full name"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
                    {form.formState.errors.name && <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Email Address *</label>
                    <input {...form.register("email")} type="email" data-testid="input-booking-email" placeholder="your@email.com"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
                    {form.formState.errors.email && <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Phone Number *</label>
                    <input {...form.register("phone")} data-testid="input-booking-phone" placeholder="+91 9876543210"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
                    {form.formState.errors.phone && <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Number of Travelers *</label>
                    <input {...form.register("travelers")} type="number" min={1} data-testid="input-booking-travelers"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
                    {form.formState.errors.travelers && <p className="text-red-500 text-xs mt-1">{form.formState.errors.travelers.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5">Destination *</label>
                  <input {...form.register("destination")} data-testid="input-booking-destination" placeholder="e.g. Bali, Indonesia"
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
                  {form.formState.errors.destination && <p className="text-red-500 text-xs mt-1">{form.formState.errors.destination.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Travel Date *</label>
                    <input {...form.register("travelDate")} type="date" data-testid="input-booking-date"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background" />
                    {form.formState.errors.travelDate && <p className="text-red-500 text-xs mt-1">{form.formState.errors.travelDate.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Budget Range *</label>
                    <select {...form.register("budget")} data-testid="select-booking-budget"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background">
                      <option value="">Select budget</option>
                      <option value="Under ₹15,000">Under ₹15,000</option>
                      <option value="₹15,000 - ₹30,000">₹15,000 - ₹30,000</option>
                      <option value="₹30,000 - ₹60,000">₹30,000 - ₹60,000</option>
                      <option value="₹60,000+">₹60,000+</option>
                    </select>
                    {form.formState.errors.budget && <p className="text-red-500 text-xs mt-1">{form.formState.errors.budget.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5">Special Requests</label>
                  <textarea {...form.register("specialRequests")} rows={3} data-testid="input-booking-requests" placeholder="Any special requirements or preferences..."
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background resize-none" />
                </div>

                <button type="submit" data-testid="btn-submit-booking" disabled={isSubmitting}
                  className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-accent/90 transition-colors shadow-md text-lg disabled:opacity-60">
                  {isSubmitting ? "Submitting..." : "Confirm Booking"}
                </button>

                {submitted && (
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-700 text-sm font-medium">Booking confirmed! We'll be in touch soon.</p>
                  </div>
                )}
              </form>
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-serif font-bold text-lg mb-4">Payment Methods</h3>
              <div className="space-y-3">
                {[
                  { icon: Smartphone, label: "UPI Payment", desc: "PhonePe, GPay, Paytm" },
                  { icon: CreditCard, label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay" },
                  { icon: Building2, label: "Net Banking", desc: "All major banks" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-muted">
                    <Icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary text-white rounded-2xl p-6">
              <h3 className="font-serif font-bold text-lg mb-3">Need Help?</h3>
              <p className="text-white/70 text-sm mb-4">Our travel experts are available 24/7 to help you plan your perfect trip.</p>
              <a href="tel:+911234567890" className="block bg-white/20 hover:bg-white/30 text-white text-center font-semibold py-2.5 rounded-xl transition-colors text-sm">
                Call: +91 12345 67890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
