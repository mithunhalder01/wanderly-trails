import { useState } from "react";
import { useSearch } from "wouter";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Clock, CheckCircle, MapPin, Users, Calendar, Star } from "lucide-react";

const WHATSAPP_NUMBER = "911234567890";

const steps = [
  { icon: MessageCircle, title: "WhatsApp karo", desc: "Hamein WhatsApp par apni trip details bhejo" },
  { icon: Users, title: "Expert se baat karo", desc: "Hamara travel expert aapko best package suggest karega" },
  { icon: Calendar, title: "Date confirm karo", desc: "Travel date aur itinerary finalize karo" },
  { icon: CheckCircle, title: "Trip enjoy karo", desc: "Pack karo aur apna dream trip enjoy karo!" },
];

const tips = [
  "Destination ka naam",
  "Travel dates",
  "Kitne log jayenge",
  "Budget range",
  "Koi special request",
];

export default function Booking() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const destination = params.get("destination") || "";
  const packageId = params.get("package") || "";

  const [name, setName] = useState("");
  const [dest, setDest] = useState(destination);
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");

  const buildWhatsAppMsg = () => {
    let msg = "Hi! Main Wanderly Trails se ek trip book karna chahta/chahti hoon.\n\n";
    if (name) msg += `*Naam:* ${name}\n`;
    if (dest) msg += `*Destination:* ${dest}\n`;
    if (date) msg += `*Travel Date:* ${date}\n`;
    if (travelers) msg += `*Travelers:* ${travelers}\n`;
    if (packageId) msg += `*Package ID:* #${packageId}\n`;
    msg += "\nPlease mujhe best package suggest karein. Shukriya!";
    return encodeURIComponent(msg);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMsg()}`, "_blank");
  };

  return (
    <div className="pt-20">
      <section className="relative h-64 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80" alt="Booking" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-secondary/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold tracking-widest uppercase text-accent block mb-3">Booking</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">WhatsApp pe Book Karo</h1>
            <p className="text-white/80 mt-2 text-lg">Fast, easy aur personal — seedha hamare expert se baat karo</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: Quick form + WhatsApp button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-2xl font-serif font-bold mb-2">Trip Details Bharo</h2>
            <p className="text-muted-foreground mb-8">Neeche details fill karo — ek click mein WhatsApp message ready ho jayega!</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Aapka Naam</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#25D366] transition-colors bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-accent" /> Destination
                </label>
                <input
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  placeholder="e.g. Goa, Bali, Kashmir"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#25D366] transition-colors bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-accent" /> Travel Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#25D366] transition-colors bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-accent" /> Travelers
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#25D366] transition-colors bg-background"
                  >
                    {["1","2","3","4","5","6","7","8","9","10+"].map((n) => (
                      <option key={n} value={n}>{n} {n === "1" ? "person" : "people"}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="mt-8 w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5c] text-white font-bold py-5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp par Book Karo
            </button>

            <p className="text-center text-xs text-muted-foreground mt-3">
              WhatsApp open hoga with pre-filled message — aap edit bhi kar sakte hain
            </p>

            <div className="mt-6 bg-muted rounded-2xl p-5">
              <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" /> Message mein ye zaroor batao:
              </p>
              <ul className="space-y-2">
                {tips.map((tip) => (
                  <li key={tip} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" /> {tip}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: How it works + contact */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-serif font-bold text-xl mb-6">Booking kaise hoti hai?</h3>
              <div className="space-y-5">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                      <step.icon className="w-5 h-5 text-[#25D366]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{step.title}</p>
                      <p className="text-muted-foreground text-sm">{step.desc}</p>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="absolute left-[1.2rem] mt-10 w-0.5 h-5 bg-border" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary text-white rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">24/7 Support</p>
                  <p className="text-white/70 text-sm">Hamesha available hain aapke liye</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I need help with my travel booking.")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5c] text-white font-bold py-3 rounded-xl transition-colors text-sm w-full"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Abhi WhatsApp karo
              </a>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <p className="font-semibold text-sm">Customers kya kehte hain?</p>
              </div>
              <p className="text-sm text-muted-foreground italic">"WhatsApp booking bahut easy thi! 10 minute mein sab confirm ho gaya. Highly recommended!"</p>
              <p className="text-xs font-semibold mt-2 text-foreground">— Priya S., Bali Trip</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
