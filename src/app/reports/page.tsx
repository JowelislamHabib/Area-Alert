import { getReports } from "@/lib/actions/report";
import { ReportsFilter } from "./ReportsFilter";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Zap, Wifi, Droplets, Flame, MapPin, ArrowUp, MessageSquare, Paperclip, CheckCircle, ThumbsDown, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import fs from "fs";
import path from "path";
import type { Report } from "@/lib/types";

const UTILITY_ICONS = {
  electricity: { icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Electricity" },
  internet: { icon: Wifi, color: "text-blue-500", bg: "bg-blue-500/10", label: "Internet" },
  water: { icon: Droplets, color: "text-cyan-500", bg: "bg-cyan-500/10", label: "Water" },
  gas: { icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10", label: "Gas" },
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
      <div className="container mx-auto space-y-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Explore Reports</h1>
          <p className="text-muted-foreground text-sm mb-6">Browse and filter community utility outage reports across Bangladesh</p>
          
          <div className="flex items-center gap-3 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by area, district, or description..." className="pl-9 h-11 bg-card border-border/50 shadow-sm" />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-11 px-4 gap-2 bg-card border-border/50 shadow-sm shrink-0">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader className="px-0 pb-2">
                  <SheetTitle>Filter Reports</SheetTitle>
                </SheetHeader>
                <ReportsFilter areaData={areaData} />
              </SheetContent>
            </Sheet>
          </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {reports?.map((report: Report) => {
                  const ui = UTILITY_ICONS[report.utilityType] || UTILITY_ICONS.electricity;
                  const Icon = ui.icon;
                  const timeAgo = formatDistanceToNow(new Date(report.createdAt), { addSuffix: true });
                  const upvotesCount = report.upvotes?.length || 0;
                  const resolvedVotesCount = report.resolvedVotes?.length || 0;
                  const downvotesCount = report.downvotes?.length || 0;

                  return (
                    <Link href={`/reports/${report._id}`} key={report._id} className="block h-full">
                      <Card className="p-0 gap-0 hover:border-primary/50 transition-all duration-300 hover:shadow-md h-full flex flex-col bg-card/80 backdrop-blur-sm cursor-pointer group overflow-hidden">
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex items-start justify-between mb-3">
                            <div className={`p-2 rounded-xl ${ui.bg}`}>
                              <Icon className={`size-4 ${ui.color}`} />
                            </div>
                            <Badge variant={report.status === "active" ? "destructive" : report.status === "resolved" ? "default" : "secondary"} className={`text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 ${report.status === 'resolved' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}>
                              {report.status}
                            </Badge>
                          </div>
                          
                          <h3 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">
                            {report.area}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5 mb-2 line-clamp-1">{report.district}</p>
                          
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 line-clamp-2 mb-3 flex-1">
                            {report.shortDescription}
                          </p>

                          <div className="flex items-center gap-1.5 mt-auto flex-wrap pt-2">
                            <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50/80 px-1.5 py-0.5 rounded">
                              <ArrowUp className="size-3" /> {upvotesCount}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-semibold text-blue-600 bg-blue-50/80 px-1.5 py-0.5 rounded">
                              <CheckCircle className="size-3" /> {resolvedVotesCount}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-50/80 px-1.5 py-0.5 rounded">
                              <ThumbsDown className="size-3" /> {downvotesCount}
                            </div>
                            <span className="text-[10px] text-muted-foreground font-medium ml-auto">{timeAgo}</span>
                          </div>
                        </div>
                        <div className="bg-muted/40 px-4 py-2.5 flex items-center gap-2 border-t border-border/50 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                          <span className="truncate max-w-[100px] text-foreground/80">{ui.label}</span>
                          {(report.image || report.videoUrl) && (
                            <span className="flex items-center gap-1 ml-auto text-blue-600 dark:text-blue-400">
                              Media <Paperclip className="size-3" />
                            </span>
                          )}
                        </div>
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
