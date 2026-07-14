import { getReports, getReportStatsData } from "@/lib/actions/report";
import { ReportsFilter } from "./ReportsFilter";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import {
  Zap,
  Wifi,
  Droplets,
  Flame,
  MapPin,
  ArrowUp,
  CheckCircle,
  ThumbsDown,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  User,
  HelpCircle,
  FileText,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { PaginationControls } from "./PaginationControls";
import fs from "fs";
import path from "path";
import type { Report } from "@/lib/types";

const UTILITY_ICONS = {
  electricity: {
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    gradient: "from-amber-500 to-yellow-400",
    label: "Electricity",
  },
  internet: {
    icon: Wifi,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    gradient: "from-blue-500 to-indigo-400",
    label: "Internet",
  },
  water: {
    icon: Droplets,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    gradient: "from-cyan-500 to-teal-400",
    label: "Water",
  },
  gas: {
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    gradient: "from-orange-500 to-red-400",
    label: "Gas",
  },
};

const STATUS_STYLES: Record<string, { dot: string; badge: string; label: string }> = {
  active: { dot: "bg-red-500", badge: "bg-red-500/10 text-red-600 dark:text-red-400", label: "Active" },
  resolved: { dot: "bg-emerald-500", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Resolved" },
  pending: { dot: "bg-yellow-500", badge: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400", label: "Pending" },
};

function getAreaData() {
  const filePath = path.join(process.cwd(), "public", "data", "area.json");
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const areaData = getAreaData();
  const { reports, totalPages = 1, currentPage = 1, error } = await getReports(params);
  const stats = await getReportStatsData();

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-muted/30 pb-8">
      {/* Hero Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 flex items-center gap-3">
              <FileText className="w-8 h-8 opacity-90" />
              Explore Reports
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-xl">
              Browse and filter community utility outage reports across Bangladesh
            </p>

            {stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20 rounded-lg px-3 py-2.5 flex flex-col justify-center gap-1 overflow-hidden">
                  <div className="flex items-center text-[11px] font-medium text-primary-foreground/80 uppercase tracking-wider">
                    <TrendingUp className="w-3 h-3 mr-1.5 text-red-400 shrink-0" />
                    <span className="truncate">Most reported district</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 truncate">
                    <strong className="text-sm truncate">{stats.mostReportedDistrict?.district || "N/A"}</strong>
                    <span className="text-xs text-primary-foreground/60 font-medium shrink-0">({stats.mostReportedDistrict?.totalReports || 0})</span>
                  </div>
                </div>
                
                <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20 rounded-lg px-3 py-2.5 flex flex-col justify-center gap-1 overflow-hidden">
                  <div className="flex items-center text-[11px] font-medium text-primary-foreground/80 uppercase tracking-wider">
                    <TrendingDown className="w-3 h-3 mr-1.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Safest district</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 truncate">
                    <strong className="text-sm truncate">{stats.lowestReportedDistrict?.district || "N/A"}</strong>
                    <span className="text-xs text-primary-foreground/60 font-medium shrink-0">({stats.lowestReportedDistrict?.totalReports || 0})</span>
                  </div>
                </div>
                
                <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20 rounded-lg px-3 py-2.5 flex flex-col justify-center gap-1 overflow-hidden">
                  <div className="flex items-center text-[11px] font-medium text-primary-foreground/80 uppercase tracking-wider">
                    <MapPin className="w-3 h-3 mr-1.5 text-orange-400 shrink-0" />
                    <span className="truncate">Most reported area</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 truncate">
                    <strong className="text-sm truncate">{stats.mostReportedArea?.area || "N/A"}</strong>
                    <span className="text-xs text-primary-foreground/60 font-medium shrink-0">({stats.mostReportedArea?.totalReports || 0})</span>
                  </div>
                </div>
                
                <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20 rounded-lg px-3 py-2.5 flex flex-col justify-center gap-1 overflow-hidden">
                  <div className="flex items-center text-[11px] font-medium text-primary-foreground/80 uppercase tracking-wider">
                    <TrendingDown className="w-3 h-3 mr-1.5 text-blue-400 shrink-0" />
                    <span className="truncate">Safest area</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 truncate">
                    <strong className="text-sm truncate">{stats.lowestReportedArea?.area || "N/A"}</strong>
                    <span className="text-xs text-primary-foreground/60 font-medium shrink-0">({stats.lowestReportedArea?.totalReports || 0})</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-8">
        <div>
          <ReportsFilter areaData={areaData}>
            <SearchInput />
          </ReportsFilter>
        </div>

        <div className="flex flex-col gap-8 items-start">
          {/* Main Feed */}
          <div className="flex-1 space-y-6 w-full">
            {error ? (
              <div className="p-8 text-center bg-card rounded-xl border border-destructive/50 text-destructive">
                {error}
              </div>
            ) : reports?.length === 0 ? (
              <div className="p-12 text-center bg-card rounded-xl border border-border/50 text-muted-foreground flex flex-col items-center justify-center">
                <MapPin className="size-12 mb-4 opacity-20" />
                <h3 className="text-xl font-semibold mb-2">No reports found</h3>
                <p>Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {reports?.map((report: Report) => {
                  const ui =
                    UTILITY_ICONS[report.utilityType] ||
                    UTILITY_ICONS.electricity;
                  const Icon = ui.icon;
                  const timeAgo = formatDistanceToNow(
                    new Date(report.createdAt),
                    { addSuffix: true },
                  );
                  const upvotesCount = report.upvotes?.length || 0;
                  const resolvedVotesCount = report.resolvedVotes?.length || 0;
                  const downvotesCount = report.downvotes?.length || 0;
                  const status = STATUS_STYLES[report.status] || STATUS_STYLES.pending;

                  return (
                    <Link
                      href={`/reports/${report._id}`}
                      key={report._id}
                      className="block h-full"
                    >
                      <div className="group relative bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col cursor-pointer">
                        <div className="p-5 flex-1 flex flex-col">
                          {/* Header: icon + status */}
                          <div className="flex items-start justify-between mb-4">
                            <div className={`flex size-10 items-center justify-center rounded-xl ${ui.bg} ${ui.color}`}>
                              <Icon className="size-5" />
                            </div>
                            <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.badge}`}>
                              <span className={`size-1.5 rounded-full ${status.dot}`} />
                              {status.label}
                            </div>
                          </div>

                          {/* Area + District */}
                          <div className="mb-3">
                            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {report.area}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {report.district}
                            </p>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
                            {report.shortDescription}
                          </p>

                          {/* Vote counts */}
                          <div className="flex items-center gap-2 mb-3">
                            <Tooltip>
                              <TooltipTrigger className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-lg px-2 py-1">
                                <ArrowUp className="size-3" /> {upvotesCount}
                              </TooltipTrigger>
                              <TooltipContent>Confirmed</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 rounded-lg px-2 py-1">
                                <CheckCircle className="size-3" /> {resolvedVotesCount}
                              </TooltipTrigger>
                              <TooltipContent>Resolved</TooltipContent>
                            </Tooltip>
                            {downvotesCount > 0 && (
                              <Tooltip>
                                <TooltipTrigger className="flex items-center gap-1 text-[11px] font-semibold text-red-600 dark:text-red-400 bg-red-500/10 rounded-lg px-2 py-1">
                                  <ThumbsDown className="size-3" /> {downvotesCount}
                                </TooltipTrigger>
                                <TooltipContent>Faked</TooltipContent>
                              </Tooltip>
                            )}
                          </div>

                          {/* Footer: verified + time */}
                          <div className="flex items-center justify-between pt-3 border-t border-border/50">
                            {upvotesCount > 0 ? (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                  <ShieldCheck className="size-3.5 mr-1" />
                                  Verified by {upvotesCount} {upvotesCount === 1 ? "user" : "users"}
                                </div>
                                {/* Stacked avatars */}
                                <div className="flex -space-x-1.5">
                                  {report.upvotes.slice(0, 3).map((userId: string, i: number) => {
                                    const colors = ["bg-primary/20 text-primary", "bg-blue-500/20 text-blue-500", "bg-purple-500/20 text-purple-500"];
                                    return (
                                      <div
                                        key={userId}
                                        className={`size-5 rounded-full border-2 border-background flex items-center justify-center ${colors[i % 3]}`}
                                        style={{ zIndex: 3 - i }}
                                      >
                                        <User className="size-2.5" />
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : (
                              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                <HelpCircle className="size-3.5" />
                                Help us verify this
                              </span>
                            )}
                            <span className="text-[11px] text-muted-foreground">
                              {timeAgo}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
            
            {/* Pagination Controls */}
            {reports && reports.length > 0 && (
              <PaginationControls currentPage={currentPage} totalPages={totalPages} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
