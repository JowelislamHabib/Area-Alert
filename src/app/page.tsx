import HeroSection from "@/components/pages/home/HeroSection";
import FeaturesSection from "@/components/pages/home/FeaturesSection";
import LatestReportsSection from "@/components/pages/home/LatestReportsSection";
import StatsSection from "@/components/pages/home/StatsSection";
import HowItWorksSection from "@/components/pages/home/HowItWorksSection";
import FAQSection from "@/components/pages/home/FAQSection";
import CTASection from "@/components/pages/home/CTASection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      {/* <CategoriesSection /> */}
      <LatestReportsSection />
      <StatsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
