import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Heart, CreditCard, Download, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "wouter";

const mockBookings = [
  { id: 1, destination: "Bali, Indonesia", package: "Bali Honeymoon Special", date: "2026-06-15", travelers: 2, status: "confirmed", amount: 45000 },
  { id: 2, destination: "Goa, India", package: "Goa Beach Getaway", date: "2026-07-20", travelers: 4, status: "pending", amount: 28000 },
  { id: 3, destination: "Kashmir, India", package: "Kashmir Valley Tour", date: "2025-12-10", travelers: 2, status: "completed", amount: 35000 },
];

const wishlist = [
  { id: 1, name: "Switzerland Alps", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=80", price: 95000 },
  { id: 2, name: "Dubai Luxury", img: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=300&q=80", price: 55000 },
  { id: 3, name: "Maldives Retreat", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80", price: 120000 },
];

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
  confirmed: { color: "text-green-600 bg-green-50", icon: CheckCircle },
  pending: { color: "text-yellow-600 bg-yellow-50", icon: AlertCircle },
  completed: { color: "text-blue-600 bg-blue-50", icon: CheckCircle },
};

export default function Dashboard() {
  return (
    <div className="pt-20 min-h-screen bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-serif font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground mb-8">Welcome back, Traveler</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: MapPin, label: "Total Trips", val: "3", color: "text-primary bg-primary/10" },
              { icon: CreditCard, label: "Total Spent", val: "₹1,08,000", color: "text-accent bg-accent/10" },
              { icon: Heart, label: "Wishlist", val: "3", color: "text-pink-500 bg-pink-50" },
              { icon: Calendar, label: "Upcoming", val: "2", color: "text-green-600 bg-green-50" },
            ].map(({ icon: Icon, label, val, color }) => (
              <div key={label} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-serif font-bold text-lg">{val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bookings */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <h2 className="font-serif font-bold text-xl mb-5">My Bookings</h2>
            <div className="space-y-4">
              {mockBookings.map((b) => {
                const cfg = statusConfig[b.status];
                const StatusIcon = cfg.icon;
                return (
                  <div key={b.id} data-testid={`card-booking-${b.id}`} className="flex items-center justify-between flex-wrap gap-4 p-4 bg-muted rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{b.package}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{b.date}</span>
                          <span>{b.travelers} travelers</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-primary">₹{b.amount.toLocaleString()}</span>
                      <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                      <button className="p-2 hover:bg-muted-foreground/10 rounded-lg transition-colors" title="Download">
                        <Download className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Wishlist */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-serif font-bold text-xl mb-5">My Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {wishlist.map((item) => (
                <div key={item.id} data-testid={`card-wishlist-${item.id}`} className="group relative bg-muted rounded-2xl overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-40 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <div>
                      <p className="text-white font-semibold text-sm">{item.name}</p>
                      <p className="text-white/70 text-xs">From ₹{item.price.toLocaleString()}</p>
                    </div>
                    <Link href="/packages" className="bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-accent/90 transition-colors">
                      Book
                    </Link>
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
