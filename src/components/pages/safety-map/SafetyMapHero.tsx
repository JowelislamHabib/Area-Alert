import { ShieldCheck } from "lucide-react";

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
    <div className="bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 opacity-90" />
            Area Safety Overview
          </h1>
          <p className="text-emerald-50 text-base md:text-lg mb-8 max-w-xl">
            See which districts and areas have the most active utility issues. Use this to make informed decisions about where to live, work, or visit.
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium flex items-center">
              <strong className="mr-1.5">{safeCount}</strong> {activeType} currently safe
            </div>
            <div className="bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium flex items-center">
              <strong className="mr-1.5">{activeCount}</strong> {activeType} with active issues
            </div>
            <div className="bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium flex items-center">
              <strong className="mr-1.5">{activeOutages}</strong> active outages right now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
