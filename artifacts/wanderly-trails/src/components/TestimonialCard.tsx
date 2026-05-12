import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatarUrl: string;
  packageName: string;
}

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <div
      data-testid={`card-testimonial-${testimonial.id}`}
      className="bg-card rounded-2xl p-6 shadow-sm border border-border flex flex-col gap-4 h-full"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-muted"}`}
            />
          ))}
        </div>
        <Quote className="w-8 h-8 text-primary/20" />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{testimonial.review}"</p>
      <div className="text-xs text-accent font-semibold">{testimonial.packageName}</div>
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <img
          src={testimonial.avatarUrl}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}
