import HomeHero from "@/components/home/HomeHero";
import HomeAbout from "@/components/home/HomeAbout";
import TripCarouselSection from "@/components/home/TripCarouselSection";
import HomeTours from "@/components/home/HomeTours";
import HomeServices from "@/components/home/HomeServices";
import HomeVibe from "@/components/home/HomeVibe";
import HomeWhyChoose from "@/components/home/HomeWhyChoose";
import HomeReviews from "@/components/home/HomeReviews";
import HomeFaq from "@/components/home/HomeFaq";
import HomeNewsletter from "@/components/home/HomeNewsletter";
import { indiaTrips, internationalTrips } from "@/data/homeContent";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HomeHero />
      <HomeAbout />
      <TripCarouselSection {...indiaTrips} exploreHref="/destinations" />
      <HomeTours />
      <TripCarouselSection {...internationalTrips} exploreHref="/packages" />
      <HomeServices />
      <HomeVibe />
      <HomeWhyChoose />
      <HomeReviews />
      <HomeFaq />
      <HomeNewsletter />
    </div>
  );
}
