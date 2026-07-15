import Link from "next/link";
import { Zap, Wifi, Droplets, Flame, MapPin, ArrowUp, CheckCircle, ThumbsDown, ShieldCheck, User, Waves, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Report } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

const utilityIcons = {
  electricity: Zap,
  internet: Wifi,
  water: Droplets,
  gas: Flame,
  flood: Waves,
} as const;

const utilityStyles: Record<string, { icon: typeof Zap; color: string; bg: string; label: string }> = {
  electricity: {
    icon: Zap,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    label: "Electricity",
  },
  internet: {
    icon: Wifi,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    label: "Internet",
  },
  water: {
    icon: Droplets,
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
    label: "Water",
  },
  gas: {
    icon: Flame,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
    label: "Gas",
  },
  flood: {
    icon: Waves,
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
    label: "Flood",
  },
};

const STATUS_STYLES: Record<string, { dot: string; badge: string; label: string }> = {
  active: { dot: "bg-red-500", badge: "bg-red-500/10 text-red-600 dark:text-red-400", label: "Active" },
  resolved: { dot: "bg-emerald-500", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Resolved" },
  pending: { dot: "bg-yellow-500", badge: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400", label: "Pending" },
};

export default function ReportCard({ report }: { report: Report }) {
  const ui = utilityStyles[report.utilityType] || utilityStyles.electricity;
  const Icon = ui.icon;
  const status = STATUS_STYLES[report.status] || STATUS_STYLES.pending;
  const upvotesCount = report.upvotes?.length || 0;
  const resolvedVotesCount = report.resolvedVotes?.length || 0;
  const downvotesCount = report.downvotes?.length || 0;
  const timeAgo = formatDistanceToNow(new Date(report.createdAt), { addSuffix: true });

  return (
    <Link href={`/reports/${report._id}`} className="block h-full">
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
              <div className="flex items-center gap-2 min-w-0 mr-2">
                <div className="flex items-center text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                  <ShieldCheck className="size-3.5 mr-1 shrink-0" />
                  <span className="truncate">Verified by {upvotesCount} {upvotesCount === 1 ? "user" : "users"}</span>
                </div>
                {/* Stacked avatars */}
                <div className="flex -space-x-1.5 shrink-0">
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
              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground truncate mr-2">
                <HelpCircle className="size-3.5 shrink-0" />
                <span className="truncate">Help us verify this</span>
              </span>
            )}
            <span className="text-[11px] text-muted-foreground shrink-0">
              {timeAgo}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
