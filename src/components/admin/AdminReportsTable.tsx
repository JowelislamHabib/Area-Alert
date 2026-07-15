"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { getReports, deleteReport } from "@/lib/actions/report";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { UpdateReportDialog } from "@/app/reports/[id]/UpdateReportDialog";
import { SlideUp } from "@/components/ui/motion-wrapper";
import type { Report } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  AlertCircle,
  Activity,
  CheckCircle2,
  Trash2,
  Zap,
  Wifi,
  Droplets,
  Flame,
  Waves
} from "lucide-react";
import { cn } from "@/lib/utils";

const utilityStyles: Record<string, { icon: typeof Zap; color: string; bg: string }> = {
  electricity: {
    icon: Zap,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
  },
  internet: {
    icon: Wifi,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
  },
  water: {
    icon: Droplets,
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  gas: {
    icon: Flame,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
  },
  flood: {
    icon: Waves,
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
  },
};

export function AdminReportsTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("reportsPage") || "1", 10);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const updatePage = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("reportsPage", newPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const fetchAllReports = async (currentPage = page) => {
    setLoading(true);
    const res = await getReports({ page: currentPage.toString(), limit: "10" });
    if (res.success) {
      setReports(res.reports || []);
      if (res.totalPages) setTotalPages(res.totalPages);
    } else {
      toast.error("Failed to fetch reports");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllReports(page);
  }, [page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    const res = await deleteReport(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Report deleted");
      fetchAllReports(page);
    }
  };

  return (
    <SlideUp delay={0.1} className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent border-b-muted">
              <TableHead className="font-semibold text-foreground h-12">Utility</TableHead>
              <TableHead className="font-semibold text-foreground">Location</TableHead>
              <TableHead className="font-semibold text-foreground">Reporter</TableHead>
              <TableHead className="font-semibold text-foreground">Status</TableHead>
              <TableHead className="font-semibold text-foreground">Date</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="h-32 text-center text-muted-foreground animate-pulse">Loading reports...</TableCell></TableRow>
            ) : reports.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="h-32 text-center text-muted-foreground">No reports found</TableCell></TableRow>
            ) : (
              reports.map(report => {
                const ui = utilityStyles[report.utilityType?.toLowerCase()] || {
                  icon: Activity,
                  color: "text-primary",
                  bg: "bg-primary/10",
                };
                const Icon = ui.icon;
                
                return (
                <TableRow key={report._id} className="hover:bg-muted/40 transition-colors group">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", ui.bg)}>
                        <Icon className={cn("h-4 w-4", ui.color)} />
                      </div>
                      <span className="capitalize">{report.utilityType}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{report.area}</span>
                      <span className="text-xs text-muted-foreground">{report.district}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{report.reporterName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {report.status === "active" ? (
                      <Badge variant="destructive" className="gap-1 bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">
                        <AlertCircle className="h-3 w-3" /> Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1 text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 dark:text-emerald-400 dark:border-emerald-900/50 dark:bg-emerald-900/20">
                        <CheckCircle2 className="h-3 w-3" /> Resolved
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{format(new Date(report.createdAt), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <UpdateReportDialog report={report} asIcon />
                      <Tooltip>
                        <TooltipTrigger render={
                          <Button 
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(report._id)}
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          />
                        }>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete Report</span>
                        </TooltipTrigger>
                        <TooltipContent>Delete Report</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between border-t bg-muted/20 px-6 py-4">
        <div className="text-sm text-muted-foreground">
          Showing page <span className="font-medium text-foreground">{page}</span> of <span className="font-medium text-foreground">{totalPages}</span>
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
    </SlideUp>
  );
}
