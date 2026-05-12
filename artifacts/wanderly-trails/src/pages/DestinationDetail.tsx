import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Calendar, Star, Thermometer, ArrowLeft } from "lucide-react";
import { useGetDestination, useListPackages, getGetDestinationQueryKey } from "@workspace/api-client-react";
import PackageCard from "@/components/PackageCard";
import SectionHeading from "@/components/SectionHeading";

export default function DestinationDetail() {
  const [, params] = useRoute("/destinations/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  const { data: destination, isLoading } = useGetDestination(id, { query: { enabled: !!id, queryKey: getGetDestinationQueryKey(id) } });
  const { data: packages } = useListPackages();
  const related = packages?.filter((p) => p.destinationId === id) ?? [];

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!destination) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-xl">Destination not found.</p>
        <Link href="/destinations" className="text-primary font-semibold">Back to Destinations</Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="relative h-96 overflow-hidden">
        <img src={destination.imageUrl} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Link href="/destinations" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Destinations
            </Link>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">{destination.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-white/80">{destination.country}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-semibold">{destination.rating.toFixed(1)}</span>
                </div>
                <span className="text-white font-bold text-xl">From ₹{destination.startingPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-bold mb-4">About {destination.name}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{destination.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-muted rounded-2xl p-4">
                <Calendar className="w-5 h-5 text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Best Season</p>
                <p className="font-semibold text-sm">{destination.bestSeason}</p>
              </div>
              {destination.weather && (
                <div className="bg-muted rounded-2xl p-4">
                  <Thermometer className="w-5 h-5 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">Weather</p>
                  <p className="font-semibold text-sm">{destination.weather}</p>
                </div>
              )}
              <div className="bg-muted rounded-2xl p-4">
                <MapPin className="w-5 h-5 text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-semibold text-sm">{destination.category}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 h-fit">
            <h3 className="font-serif font-bold text-xl mb-4">Quick Info</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Country</span>
                <span className="font-semibold">{destination.country}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Category</span>
                <span className="font-semibold">{destination.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Best Season</span>
                <span className="font-semibold">{destination.bestSeason}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Starting Price</span>
                <span className="font-bold text-primary">₹{destination.startingPrice.toLocaleString()}</span>
              </div>
            </div>
            <Link href="/booking" className="block mt-6 bg-accent text-white text-center font-semibold py-3 rounded-xl hover:bg-accent/90 transition-colors">
              Book Now
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <SectionHeading badge="Available" title={`Packages for ${destination.name}`} subtitle="Choose from our curated packages" center={false} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {related.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
