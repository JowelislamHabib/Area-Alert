import { getReports } from "@/lib/actions/report";
import { ReportsFilter } from "./ReportsFilter";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Zap, Wifi, Droplets, Flame, MapPin, ArrowUp, MessageSquare } from "lucide-react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import type { Report } from "@/lib/types";

const UTILITY_ICONS = {
  electricity: { icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  internet: { icon: Wifi, color: "text-blue-500", bg: "bg-blue-500/10" },
  water: { icon: Droplets, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  gas: { icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
};

function getAreaData() {
  const filePath = path.join(process.cwd(), "public", "data", "area.json");
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

export default async function ReportsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const params = await searchParams;
  const areaData = getAreaData();
  const { reports, error } = await getReports(params);

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-muted/30 py-8 px-4">
      <div className="container max-w-6xl mx-auto space-y-8">
        
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">Live Outage Reports</h1>
          <p className="text-muted-foreground text-lg">See what's happening in your area right now.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar */}
          <aside className="w-full md:w-64 lg:w-80 shrink-0">
            <ReportsFilter areaData={areaData} />
          </aside>

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
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {reports?.map((report: Report) => {
                  const ui = UTILITY_ICONS[report.utilityType] || UTILITY_ICONS.electricity;
                  const Icon = ui.icon;
                  const timeAgo = formatDistanceToNow(new Date(report.createdAt), { addSuffix: true });
                  const upvotesCount = report.upvotes?.length || 0;

                  return (
                    <Link href={`/reports/${report._id}`} key={report._id}>
                      <Card className="hover:border-primary/50 transition-colors h-full flex flex-col bg-card/80 backdrop-blur-sm cursor-pointer group">
                        <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${ui.bg}`}>
                              <Icon className={`size-5 ${ui.color}`} />
                            </div>
                            <div>
                              <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                                {report.district} &gt; {report.area}
                              </CardTitle>
                              <p className="text-xs text-muted-foreground mt-0.5">{timeAgo}</p>
                            </div>
                          </div>
                          <Badge variant={report.status === "pending" ? "secondary" : "default"} className="capitalize">
                            {report.status}
                          </Badge>
                        </CardHeader>
                        <CardContent className="pb-4 flex-1">
                          <p className="text-sm font-medium line-clamp-2 mb-2">
                            {report.shortDescription}
                          </p>
                          {report.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {report.description}
                            </p>
                          )}
                          {(report.image || report.videoUrl) && (
                            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-blue-500 bg-blue-500/10 w-fit px-2 py-1 rounded-md">
                              Contains Media
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="pt-0 border-t border-border/50 flex items-center gap-4 mt-auto py-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <ArrowUp className="size-4" /> {upvotesCount}
                          </div>
                          {report.ispName && (
                            <div className="ml-auto text-xs border border-border px-2 py-0.5 rounded-full">
                              {report.ispName}
                            </div>
                          )}
                        </CardFooter>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
