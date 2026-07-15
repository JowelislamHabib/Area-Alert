import { getReports, getReportStatsData } from "@/lib/actions/report";
import ReportCard from "@/components/pages/home/ReportCard";
import { ReportsFilter } from "./ReportsFilter";
import {
  TrendingUp,
  TrendingDown,
  MapPin,
  FileText,
} from "lucide-react";
import { SearchInput } from "./SearchInput";
import { PaginationControls } from "./PaginationControls";
import fs from "fs";
import path from "path";
import type { Report } from "@/lib/types";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";

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
  const {
    reports,
    totalPages = 1,
    currentPage = 1,
    error,
  } = await getReports(params);
  const stats = await getReportStatsData();

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-muted/30 pb-8">
      {/* Hero Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="max-w-4xl">
            <FadeIn>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 flex items-center gap-3">
                <FileText className="w-8 h-8 opacity-90" />
                Explore Reports
              </h1>
              <p className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-xl">
                Browse and filter community utility outage reports across
                Bangladesh
              </p>
            </FadeIn>

            {stats && (
              <StaggerContainer delay={0.2} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <StaggerItem className="h-full">
                  <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20 rounded-lg px-3 py-2.5 flex flex-col justify-center gap-1 overflow-hidden h-full">
                    <div className="flex items-center text-[11px] font-medium text-primary-foreground/80 uppercase tracking-wider">
                      <TrendingUp className="w-3 h-3 mr-1.5 text-red-400 shrink-0" />
                      <span className="truncate">Most reported district</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 truncate">
                      <strong className="text-sm truncate">
                        {stats.mostReportedDistrict?.district || "N/A"}
                      </strong>
                      <span className="text-xs text-primary-foreground/60 font-medium shrink-0">
                        ({stats.mostReportedDistrict?.totalReports || 0})
                      </span>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem className="h-full">
                  <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20 rounded-lg px-3 py-2.5 flex flex-col justify-center gap-1 overflow-hidden h-full">
                    <div className="flex items-center text-[11px] font-medium text-primary-foreground/80 uppercase tracking-wider">
                      <TrendingDown className="w-3 h-3 mr-1.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Safest district</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 truncate">
                      <strong className="text-sm truncate">
                        {stats.lowestReportedDistrict?.district || "N/A"}
                      </strong>
                      <span className="text-xs text-primary-foreground/60 font-medium shrink-0">
                        ({stats.lowestReportedDistrict?.totalReports || 0})
                      </span>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem className="h-full">
                  <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20 rounded-lg px-3 py-2.5 flex flex-col justify-center gap-1 overflow-hidden h-full">
                    <div className="flex items-center text-[11px] font-medium text-primary-foreground/80 uppercase tracking-wider">
                      <MapPin className="w-3 h-3 mr-1.5 text-orange-400 shrink-0" />
                      <span className="truncate">Most reported area</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 truncate">
                      <strong className="text-sm truncate">
                        {stats.mostReportedArea?.area || "N/A"}
                      </strong>
                      <span className="text-xs text-primary-foreground/60 font-medium shrink-0">
                        ({stats.mostReportedArea?.totalReports || 0})
                      </span>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem className="h-full">
                  <div className="bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20 rounded-lg px-3 py-2.5 flex flex-col justify-center gap-1 overflow-hidden h-full">
                    <div className="flex items-center text-[11px] font-medium text-primary-foreground/80 uppercase tracking-wider">
                      <TrendingDown className="w-3 h-3 mr-1.5 text-blue-400 shrink-0" />
                      <span className="truncate">Safest area</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 truncate">
                      <strong className="text-sm truncate">
                        {stats.lowestReportedArea?.area || "N/A"}
                      </strong>
                      <span className="text-xs text-primary-foreground/60 font-medium shrink-0">
                        ({stats.lowestReportedArea?.totalReports || 0})
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-8">
        <FadeIn delay={0.1}>
          <ReportsFilter areaData={areaData}>
            <SearchInput />
          </ReportsFilter>
        </FadeIn>

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
              <StaggerContainer key={currentPage} delay={0.2} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {reports?.map((report: Report) => (
                  <StaggerItem key={report._id} className="h-full">
                    <ReportCard report={report} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            {/* Pagination Controls */}
            {reports && reports.length > 0 && (
              <FadeIn delay={0.3}>
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
