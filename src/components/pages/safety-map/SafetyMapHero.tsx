import { ShieldCheck } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";

interface SafetyMapHeroProps {
  overview: {
    safeCount: number;
    activeCount: number;
    activeOutages: number;
  };
  activeType: "districts" | "areas";
}

export function SafetyMapHero({ overview, activeType }: SafetyMapHeroProps) {
  const { safeCount, activeCount, activeOutages } = overview;

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="max-w-3xl">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 opacity-90" />
              Area Safety Overview
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-xl">
              See which districts and areas have the most active utility issues. Use this to make informed decisions about where to live, work, or visit.
            </p>
          </FadeIn>

          <StaggerContainer delay={0.2} className="flex flex-wrap gap-3">
            <StaggerItem>
              <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20 rounded-lg px-4 py-1.5 text-sm font-medium flex items-center">
                <strong className="mr-1.5">{safeCount}</strong> {activeType} currently safe
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20 rounded-lg px-4 py-1.5 text-sm font-medium flex items-center">
                <strong className="mr-1.5">{activeCount}</strong> {activeType} with active issues
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20 rounded-lg px-4 py-1.5 text-sm font-medium flex items-center">
                <strong className="mr-1.5">{activeOutages}</strong> active outages right now
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
}
