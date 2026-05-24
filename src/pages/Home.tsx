import { lazy, Suspense } from "react";
import HomeHero from "@/components/home/HomeHero";
import HomeAbout from "@/components/home/HomeAbout";
import { indiaTrips, weekendGetaways } from "@/data/homeContent";

const TripCarouselSection = lazy(() => import("@/components/home/TripCarouselSection"));
const HomeTours = lazy(() => import("@/components/home/HomeTours"));
const HomeServices = lazy(() => import("@/components/home/HomeServices"));
const HomeVibe = lazy(() => import("@/components/home/HomeVibe"));
const HomeWhyChoose = lazy(() => import("@/components/home/HomeWhyChoose"));
const HomeJourneyFrames = lazy(() => import("@/components/home/HomeJourneyFrames"));
const HomeReviews = lazy(() => import("@/components/home/HomeReviews"));
const HomeFaq = lazy(() => import("@/components/home/HomeFaq"));
const HomeNewsletter = lazy(() => import("@/components/home/HomeNewsletter"));

function SectionFallback() {
  return <div className="min-h-[220px] w-full" aria-hidden="true" />;
}

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HomeHero />
      <HomeAbout />
      <Suspense fallback={<SectionFallback />}>
        <TripCarouselSection {...indiaTrips} exploreHref="/destinations" />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HomeTours />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TripCarouselSection {...weekendGetaways} exploreHref="/packages" />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HomeServices />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HomeVibe />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HomeWhyChoose />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HomeJourneyFrames />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HomeReviews />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HomeFaq />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HomeNewsletter />
      </Suspense>
    </div>
  );
}
