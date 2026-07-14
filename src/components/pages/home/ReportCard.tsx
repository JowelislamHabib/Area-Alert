import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Zap, Wifi, Droplets, Flame, Eye, Clock, MapPin, User } from "lucide-react";
import type { Report } from "@/lib/types";
import { cn } from "@/lib/utils";

const utilityIcons = {
  electricity: Zap,
  internet: Wifi,
  water: Droplets,
  gas: Flame,
} as const;

const utilityLabels: Record<string, string> = {
  electricity: "Electricity",
  internet: "Internet",
  water: "Water",
  gas: "Gas",
};

const utilityGradients: Record<string, string> = {
  electricity: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  internet: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  water: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  gas: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

function timeAgo(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const seconds = Math.floor((now - then) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString();
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  active: {
    label: "Active",
    classes: "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
  },
  resolved: {
    label: "Resolved",
    classes: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  },
  pending: {
    label: "Pending",
    classes: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400",
  },
};

export default function ReportCard({ report }: { report: Report }) {
  const Icon = utilityIcons[report.utilityType] || Zap;
  const status = statusConfig[report.status] || statusConfig.pending;

  return (
    <div className="group relative bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
      <div className={`h-1 bg-gradient-to-r ${utilityGradients[report.utilityType] || "bg-primary"}`} />
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex size-10 items-center justify-center rounded-xl ${utilityGradients[report.utilityType] || "bg-primary/10 text-primary"}`}>
              <Icon className="size-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">
                {utilityLabels[report.utilityType] || report.utilityType}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                {report.area}, {report.district}
              </div>
            </div>
          </div>
          <Badge variant="outline" className={`text-[11px] px-2 py-0.5 font-medium ${status.classes}`}>
            {status.label}
          </Badge>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
          {report.shortDescription}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {timeAgo(report.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <User className="size-3" />
              {report.reporterName}
            </span>
          </div>
          <Link
            href={`/reports/${report._id}`}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "h-7 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
            )}
          >
            <Eye className="size-3.5 mr-1" />
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
