"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SlideUp } from "@/components/ui/motion-wrapper";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MapPin,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Shield,
  CheckCircle2,
  FileText,
  Activity
} from "lucide-react";
import { getAdminReportStats } from "@/lib/actions/admin";
import type { AdminReportStats } from "@/lib/types";

export function AdminOverview() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [statsData, setStatsData] = useState<AdminReportStats[]>([]);
  const [stats, setStats] = useState({
    safeCount: 0,
    activeCount: 0,
    activeOutages: 0,
    resolvedOutages: 0,
    totalReports: 0,
  });
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const fetchStats = (currentPage = page) => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/safety-stats?page=${currentPage}&limit=10`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.overview) {
          setStats(data.overview);
        }
        if (data.stats) {
          setStatsData(data.stats);
        }
        if (data.totalPages) {
          setTotalPages(data.totalPages);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats(page);
  }, [page]);

  return (
    <SlideUp delay={0.1} className="space-y-4">
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        
        {/* Safe Districts Card */}
        <Card className="bg-card/40 backdrop-blur-md border-emerald-500/20 shadow-sm relative overflow-hidden group hover:shadow-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Safe Districts
            </CardTitle>
            <div className="p-2 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-foreground">
              {loading ? "..." : stats.safeCount}
            </div>
            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-1 font-medium">Fully operational</p>
          </CardContent>
        </Card>

        {/* Affected Districts Card */}
        <Card className="bg-card/40 backdrop-blur-md border-amber-500/20 shadow-sm relative overflow-hidden group hover:shadow-amber-500/10 hover:border-amber-500/40 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-500">
              Affected Districts
            </CardTitle>
            <div className="p-2 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-foreground">
              {loading ? "..." : stats.activeCount}
            </div>
            <p className="text-xs text-amber-600/80 dark:text-amber-500/80 mt-1 font-medium">Caution advised</p>
          </CardContent>
        </Card>

        {/* Active Outages Card */}
        <Card className="bg-card/40 backdrop-blur-md border-destructive/20 shadow-sm relative overflow-hidden group hover:shadow-destructive/10 hover:border-destructive/40 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-destructive">
              Active Outages
            </CardTitle>
            <div className="p-2 bg-destructive/10 dark:bg-destructive/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Activity className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-foreground">
              {loading ? "..." : stats.activeOutages}
            </div>
            <p className="text-xs text-destructive/80 mt-1 font-medium">Ongoing incidents</p>
          </CardContent>
        </Card>

        {/* Resolved Outages Card */}
        <Card className="bg-card/40 backdrop-blur-md border-indigo-500/20 shadow-sm relative overflow-hidden group hover:shadow-indigo-500/10 hover:border-indigo-500/40 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-400">
              Resolved Reports
            </CardTitle>
            <div className="p-2 bg-indigo-100/50 dark:bg-indigo-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-foreground">
              {loading ? "..." : stats.resolvedOutages}
            </div>
            <p className="text-xs text-indigo-600/80 dark:text-indigo-400/80 mt-1 font-medium">Successfully fixed</p>
          </CardContent>
        </Card>

        {/* Total Reports Card */}
        <Card className="bg-card/40 backdrop-blur-md border-purple-500/20 shadow-sm relative overflow-hidden group hover:shadow-purple-500/10 hover:border-purple-500/40 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-400">
              Total Reports
            </CardTitle>
            <div className="p-2 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-foreground">
              {loading ? "..." : stats.totalReports}
            </div>
            <p className="text-xs text-purple-600/80 dark:text-purple-400/80 mt-1 font-medium">All time submitted</p>
          </CardContent>
        </Card>
        
      </div>

      <div className="mt-8 rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-b-muted">
                <TableHead className="font-semibold text-foreground h-12">
                  District
                </TableHead>
                <TableHead className="text-right font-semibold text-foreground">
                  Total Reports
                </TableHead>
                <TableHead className="text-right font-semibold text-foreground">
                  Active Outages
                </TableHead>
                <TableHead className="text-right font-semibold text-foreground">
                  Score
                </TableHead>
                <TableHead className="text-right font-semibold text-foreground">
                  Safety Level
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground animate-pulse"
                  >
                    Loading stats...
                  </TableCell>
                </TableRow>
              ) : statsData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                statsData.map((s, i) => (
                  <TableRow
                    key={i}
                    className="hover:bg-muted/40 transition-colors group"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <span>{s.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {s.totalReports}
                    </TableCell>
                    <TableCell className="text-right">
                      {s.activeReports}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold">{s.score}</span>
                      <span className="text-muted-foreground text-xs">
                        /100
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {s.safetyLevel === "Safe" ? (
                        <Badge
                          variant="outline"
                          className="gap-1 text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 dark:text-emerald-400 dark:border-emerald-900/50 dark:bg-emerald-900/20"
                        >
                          <ShieldCheck className="h-3 w-3" /> Safe
                        </Badge>
                      ) : s.safetyLevel === "Caution" ? (
                        <Badge
                          variant="secondary"
                          className="gap-1 bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400"
                        >
                          <AlertTriangle className="h-3 w-3" /> Caution
                        </Badge>
                      ) : (
                        <Badge
                          variant="destructive"
                          className="gap-1 bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
                        >
                          <ShieldAlert className="h-3 w-3" /> Danger
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between border-t bg-muted/20 px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Showing page{" "}
            <span className="font-medium text-foreground">{page}</span> of{" "}
            <span className="font-medium text-foreground">{totalPages}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="shadow-sm"
              onClick={() => updatePage(Math.max(1, page - 1))}
              disabled={page === 1 || loading}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="shadow-sm"
              onClick={() => updatePage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages || loading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </SlideUp>
  );
}
