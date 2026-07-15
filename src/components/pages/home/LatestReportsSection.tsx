import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getReports } from "@/lib/actions/report";
import ReportCard from "./ReportCard";
import { FileText, ArrowRight } from "lucide-react";
import type { Report } from "@/lib/types";
import { cn } from "@/lib/utils";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui/motion-wrapper";

export default async function LatestReportsSection() {
  const result = await getReports({ limit: "8", sortBy: "newest" });
  const reports = result.success ? result.reports : [];

  return (
    <section className="relative py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Latest Updates
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
              Recent reports
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Real-time updates from communities across Bangladesh.
            </p>
          </div>
          <Link
            href="/reports"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "font-medium self-start sm:self-auto hover:bg-primary hover:text-primary-foreground"
            )}
          >
            View all reports <ArrowRight className="ml-1.5 size-4" />
          </Link>
        </FadeIn>

        {reports.length === 0 ? (
          <FadeIn className="flex flex-col items-center justify-center py-20 text-center space-y-5">
            <div className="flex size-20 items-center justify-center rounded-3xl bg-muted">
              <FileText className="size-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground">No reports yet</h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Be the first to report a utility outage in your area and help your community.
              </p>
            </div>
            <Link href="/add-report" className={cn(buttonVariants())}>
              Report an Outage
            </Link>
          </FadeIn>
        ) : (
          <>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {reports.slice(0, 8).map((report: Report) => (
                <StaggerItem key={report._id}>
                  <ReportCard report={report} />
                </StaggerItem>
              ))}
            </StaggerContainer>
            <div className="mt-12 text-center sm:hidden">
              <Link 
                href="/reports" 
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "hover:bg-primary hover:text-primary-foreground"
                )}
              >
                View all reports <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
