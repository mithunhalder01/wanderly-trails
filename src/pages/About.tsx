import { motion } from "framer-motion";
import { Users, MapPin, Star, Award, Target, Eye } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PageHeader from "@/components/PageHeader";
import PageHero from "@/components/PageHero";

const placeholderAvatar = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original";

const team = [
  { name: "Arjun Mehta", role: "Founder & CEO", img: placeholderAvatar, bio: "15+ years in travel industry, passionate about creating unforgettable journeys." },
  { name: "Priya Sharma", role: "Head of Destinations", img: placeholderAvatar, bio: "Expert in international travel with knowledge of 80+ countries." },
  { name: "Rohit Verma", role: "Lead Tour Guide", img: placeholderAvatar, bio: "Award-winning guide with deep expertise in adventure and luxury travel." },
  { name: "Sneha Patel", role: "Customer Experience", img: placeholderAvatar, bio: "Dedicated to making every traveler's experience seamless and memorable." },
];

const achievements = [
  { icon: Users, num: "5000+", label: "Happy Travelers" },
  { icon: MapPin, num: "120+", label: "Destinations" },
  { icon: Star, num: "4.9", label: "Average Rating" },
  { icon: Award, num: "10+", label: "Industry Awards" },
];

export default function About() {
  return (
    <div className="pt-20">
      <PageHero
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80"
        alt="About Wanderly Trails"
        badge="Our Story"
        title="About Wanderly Trails"
        subtitle="A trusted India tour and travel agency focused on safe, memorable, and well-planned holidays."
        backHref="/"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />

      {/* Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-bold tracking-widest uppercase text-accent block mb-3">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">How Wanderly Trails Began</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Founded in 2015 by Arjun Mehta, Wanderly Trails started with a simple belief: travel should be accessible, safe, and truly memorable for everyone. What began as a small team of passionate explorers has grown into one of India's most trusted travel agencies.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5">
              We've taken thousands of travelers to their dream destinations — from the golden beaches of Goa to the snow-capped peaks of Kashmir, from the bustling souks of Dubai to the serene temples of Bali.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every trip we craft is a labor of love — meticulously planned, beautifully executed, and filled with moments that last a lifetime.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80" alt="Team" className="rounded-3xl shadow-xl w-full object-cover h-96" />
            <div className="absolute -bottom-6 -left-6 bg-primary text-white rounded-2xl p-6 shadow-xl">
              <p className="text-4xl font-serif font-bold">10+</p>
              <p className="text-white/80 text-sm">Years of Excellence</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Purpose" title="Mission & Vision" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif font-bold text-2xl mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To make travel easy, affordable, and memorable for everyone. We're dedicated to crafting personalized journeys that go beyond sightseeing — creating transformative experiences that broaden perspectives and build lifelong memories.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-serif font-bold text-2xl mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become the most trusted travel companion for every Indian traveler — known for safety, quality, and the ability to turn travel dreams into reality. We envision a world where great travel experiences are accessible to all.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Track Record" title="Our Achievements" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center">
            {achievements.map(({ icon: Icon, num, label }) => (
              <motion.div key={label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <p className="mb-2 text-3xl font-serif font-bold text-foreground">{num}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="The Team" title="Meet Our Experts" subtitle="The passionate people behind every perfect trip" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-testid={`card-team-${i}`}
              className="group text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-5 rounded-2xl overflow-hidden">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
              </div>
              <h3 className="font-serif font-bold text-lg">{member.name}</h3>
              <p className="text-accent text-sm font-semibold mb-2">{member.role}</p>
              <p className="text-muted-foreground text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
