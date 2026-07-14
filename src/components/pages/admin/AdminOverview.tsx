"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, ShieldAlert, ShieldCheck } from "lucide-react";

export function AdminOverview() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("overviewPage") || "1", 10);
  const [stats, setStats] = useState({
    safeCount: 0,
    activeCount: 0,
    activeOutages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState<any[]>([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const updatePage = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("overviewPage", newPage.toString());
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
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Safe Districts
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.safeCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Affected Districts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.activeCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Active Outages
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.activeOutages}
            </div>
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
                <TableHead className="font-semibold text-foreground">
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
                    <TableCell>
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
    </div>
  );
}
