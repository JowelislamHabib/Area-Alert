import {
  MapPin,
  Zap,
  Droplet,
  Wifi,
  Flame,
  ShieldAlert,
  ShieldCheck,
  Shield,
  ArrowRight,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";

interface DistrictGridProps {
  stats: any[];
  activeTab: "districts" | "areas";
  onViewAreas?: (districtName: string) => void;
}

export function DistrictGrid({
  stats,
  activeTab,
  onViewAreas,
}: DistrictGridProps) {
  const getBadgeStyle = (level: string) => {
    if (level === "Safe")
      return "text-emerald-700 bg-emerald-50 border border-emerald-200";
    if (level === "Caution")
      return "text-amber-700 bg-amber-50 border border-amber-200";
    return "text-rose-700 bg-rose-50 border border-rose-200";
  };

  const getProgressColor = (level: string) => {
    if (level === "Safe") return "bg-emerald-500";
    if (level === "Caution") return "bg-amber-400";
    return "bg-rose-500";
  };

  const getBadgeIcon = (level: string) => {
    if (level === "Safe") return <ShieldCheck className="w-3.5 h-3.5 mr-1" />;
    if (level === "Caution") return <Shield className="w-3.5 h-3.5 mr-1" />;
    return <ShieldAlert className="w-3.5 h-3.5 mr-1" />;
  };

  const renderCard = (title: string, data: any, isDistrict: boolean) => {
    return (
      <div className="group relative bg-card rounded-2xl border border-border shadow-sm p-5 hover:shadow-md hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            {title}{" "}
            {data.district && !isDistrict ? (
              <span className="text-xs text-muted-foreground font-normal">
                ({data.district})
              </span>
            ) : null}
          </h3>
          <div
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-semibold flex items-center",
              getBadgeStyle(data.safetyLevel),
            )}
          >
            {getBadgeIcon(data.safetyLevel)}
            {data.safetyLevel}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="w-full bg-secondary rounded-full h-2 mr-4 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  getProgressColor(data.safetyLevel),
                )}
                style={{ width: `${data.score}%` }}
              />
            </div>
            <span className="text-sm font-bold">{data.score}/100</span>
          </div>
        </div>

        {/* Stats Text */}
        <div className="text-xs text-muted-foreground mb-5 flex items-center gap-2">
          <span>{data.totalReports} total reports</span>
          <span className="w-1 h-1 rounded-full bg-border"></span>
          <span
            className={
              data.activeReports > 0
                ? "text-destructive font-semibold"
                : "text-emerald-600 font-semibold"
            }
          >
            {data.activeReports} active
          </span>
          <span className="w-1 h-1 rounded-full bg-border"></span>
          <span>{data.resolvedReports} resolved</span>
        </div>

        {/* Utility Blocks */}
        <div className="grid grid-cols-5 gap-2 mb-5">
          <div className="bg-amber-500/5 hover:bg-amber-500/10 transition-colors rounded-xl p-3 flex flex-col items-center justify-center border border-amber-500/20">
            <Zap className="w-4 h-4 text-amber-500 mb-1" />
            <span
              className={cn(
                "font-bold",
                data.activeUtilities?.electricity > 0
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-amber-600/50 dark:text-amber-400/50",
              )}
            >
              {data.activeUtilities?.electricity || 0}
            </span>
            <span className="text-[10px] text-amber-600/70 dark:text-amber-400/70 font-medium">
              Elec
            </span>
          </div>
          <div className="bg-blue-500/5 hover:bg-blue-500/10 transition-colors rounded-xl p-3 flex flex-col items-center justify-center border border-blue-500/20">
            <Droplet className="w-4 h-4 text-blue-500 mb-1" />
            <span
              className={cn(
                "font-bold",
                data.activeUtilities?.water > 0
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-blue-600/50 dark:text-blue-400/50",
              )}
            >
              {data.activeUtilities?.water || 0}
            </span>
            <span className="text-[10px] text-blue-600/70 dark:text-blue-400/70 font-medium">
              Wate
            </span>
          </div>
          <div className="bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors rounded-xl p-3 flex flex-col items-center justify-center border border-indigo-500/20">
            <Wifi className="w-4 h-4 text-indigo-500 mb-1" />
            <span
              className={cn(
                "font-bold",
                data.activeUtilities?.internet > 0
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-indigo-600/50 dark:text-indigo-400/50",
              )}
            >
              {data.activeUtilities?.internet || 0}
            </span>
            <span className="text-[10px] text-indigo-600/70 dark:text-indigo-400/70 font-medium">
              Inte
            </span>
          </div>
          <div className="bg-rose-500/5 hover:bg-rose-500/10 transition-colors rounded-xl p-3 flex flex-col items-center justify-center border border-rose-500/20">
            <Flame className="w-4 h-4 text-rose-500 mb-1" />
            <span
              className={cn(
                "font-bold",
                data.activeUtilities?.gas > 0
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-rose-600/50 dark:text-rose-400/50",
              )}
            >
              {data.activeUtilities?.gas || 0}
            </span>
            <span className="text-[10px] text-rose-600/70 dark:text-rose-400/70 font-medium">
              Gas
            </span>
          </div>
          <div className="bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors rounded-xl p-3 flex flex-col items-center justify-center border border-cyan-500/20">
            <Waves className="w-4 h-4 text-cyan-500 mb-1" />
            <span
              className={cn(
                "font-bold",
                data.activeUtilities?.flood > 0
                  ? "text-cyan-600 dark:text-cyan-400"
                  : "text-cyan-600/50 dark:text-cyan-400/50",
              )}
            >
              {data.activeUtilities?.flood || 0}
            </span>
            <span className="text-[10px] text-cyan-600/70 dark:text-cyan-400/70 font-medium">
              Flood
            </span>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex justify-between items-center mt-auto pt-5">
          {isDistrict ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewAreas && onViewAreas(title)}
              className="gap-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-500 dark:hover:text-emerald-400"
            >
              View areas <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary p-0"
          >
            <Link
              href={`/reports?${isDistrict ? "district" : "area"}=${encodeURIComponent(title)}`}
              className="flex items-center gap-1.5 whitespace-nowrap px-3"
            >
              See reports <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  };

  // Generate a key based on the current stats so animation re-triggers on new data
  const gridKey = stats.map((s) => s.name).join("-");

  return (
    <StaggerContainer
      key={gridKey}
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6"
    >
      {stats.map((item) => (
        <StaggerItem key={`${item.district}-${item.name}`} className="h-full">
          {renderCard(item.name, item, activeTab === "districts")}
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
