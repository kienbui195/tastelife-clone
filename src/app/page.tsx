'use client';

import ComingSoonSection from "@/components/CommingSoonSection";
import ContinueWatchingSection from "@/components/ContinueWatching";
import FeatureSection from "@/components/FeatureMoviesSection";
import NewReleaseSection from "@/components/NewReleaseSection";
import RecommendedSection from "@/components/RecommededSection";
import TopPickSection from "@/components/TopPickSection";
import TrendingSection from "@/components/TrendingSection";

export default function Home() {
  return (
    <div className="">
      <FeatureSection />
      <div className="px-4 space-y-8">
        <TrendingSection />
        <TopPickSection />
        <NewReleaseSection />
        <ContinueWatchingSection />
        <ComingSoonSection />
        <RecommendedSection />
      </div>
    </div>
  );
}
