import { AboutHero } from "@/components/about/AboutHero";
import { MissionVisionSection } from "@/components/about/MissionVisionSection";
import { UseCasesSection } from "@/components/about/UseCasesSection";

export const metadata = {
  title: "About AreaAlert | Community Utility Tracking",
  description: "Learn about AreaAlert's mission to build a nationwide crowdsourced utility information network in Bangladesh.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AboutHero />
      <MissionVisionSection />
      <UseCasesSection />
    </div>
  );
}