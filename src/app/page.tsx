import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import LatestReportsSection from "@/components/reports/LatestReportsSection";
import StatsSection from "@/components/home/StatsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import StoriesSection from "@/components/stories/StoriesSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      {/* <CategoriesSection /> */}
      <LatestReportsSection />
      <StatsSection />
      <StoriesSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
