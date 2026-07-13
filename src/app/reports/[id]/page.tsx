import { getReportById } from "@/lib/actions/report";
import { notFound } from "next/navigation";
import { formatDistanceToNow, format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Clock,
  MapPin,
  User,
  Zap,
  Wifi,
  Droplets,
  Flame,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ReportMedia } from "./ReportMedia";
import { ReportValidation } from "./ReportValidation";
import { UpdateReportDialog } from "./UpdateReportDialog";
import { DeleteReportButton } from "../my-reports/DeleteReportButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const UTILITY_ICONS = {
  electricity: {
    icon: Zap,
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-100 dark:bg-yellow-500/10",
    label: "Electricity",
  },
  internet: {
    icon: Wifi,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-500/10",
    label: "Internet",
  },
  water: {
    icon: Droplets,
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-100 dark:bg-cyan-500/10",
    label: "Water",
  },
  gas: {
    icon: Flame,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-100 dark:bg-orange-500/10",
    label: "Gas",
  },
};

function getYoutubeVideoId(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/,
  );
  return match ? match[1] : null;
}

export default async function ReportDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { report, error } = await getReportById(id);

  if (error || !report) {
    notFound();
  }

  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const ui =
    UTILITY_ICONS[report.utilityType as keyof typeof UTILITY_ICONS] ||
    UTILITY_ICONS.electricity;
  const Icon = ui.icon;

  const videoId = report.videoUrl ? getYoutubeVideoId(report.videoUrl) : null;
  const timeAgo = formatDistanceToNow(new Date(report.createdAt), {
    addSuffix: true,
  });
  const exactTime = format(new Date(report.createdAt), "MMM d, yyyy h:mm a");

  return (
    <main className="min-h-screen bg-background py-6 px-4 sm:px-8 font-sans text-foreground">
      <div className="container mx-auto max-w-5xl space-y-6">
        {/* Back Link and Actions */}
        <div className="flex justify-between items-center">
          <Link
            href="/reports"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4 mr-2" /> Back to Explore
          </Link>
          {user?.id === report.reporterId && (
            <div className="flex items-center gap-2">
              <UpdateReportDialog report={report} />
              <DeleteReportButton id={report._id} />
            </div>
          )}
        </div>

        <Card className="shadow-sm p-0 gap-0 overflow-hidden border-border/50 relative bg-card">
          {/* Subtle grid texture fading out at the bottom of the header area */}
          <div className="absolute inset-x-0 top-0 h-48 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:24px] pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent)]" />

          <div className="p-4 sm:p-6 lg:p-8 relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-4 mt-1">
              <Badge
                variant="secondary"
                className={`${ui.bg} ${ui.color} border-none rounded-full px-3 py-1 font-semibold text-xs tracking-wide uppercase gap-1.5`}
              >
                <Icon className="size-3.5" />
                {ui.label} {report.ispName ? `· ${report.ispName}` : ""}
              </Badge>
              <Badge
                variant="outline"
                className={`border-none rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-wider gap-1.5 ${report.status === "active" ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400" : report.status === "resolved" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}
              >
                <div
                  className={`size-2 rounded-full animate-pulse ${report.status === "active" ? "bg-red-500" : report.status === "resolved" ? "bg-emerald-500" : "bg-muted-foreground"}`}
                />
                {report.status}
              </Badge>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-4 tracking-tight leading-tight">
              {report.shortDescription}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground font-medium mt-4">
              <div className="flex items-center gap-1.5 bg-secondary/50 dark:bg-secondary/20 px-2.5 py-1.5 rounded-md">
                <MapPin className="size-3.5 shrink-0" /> {report.area},{" "}
                {report.district}
              </div>
              <div className="flex items-center gap-1.5 bg-secondary/50 dark:bg-secondary/20 px-2.5 py-1.5 rounded-md">
                <Clock className="size-3.5 shrink-0" /> Reported {timeAgo}
              </div>
              <div className="flex items-center gap-1.5 bg-secondary/50 dark:bg-secondary/20 px-2.5 py-1.5 rounded-md">
                <User className="size-3.5 shrink-0" /> By {report.reporterName}
              </div>
            </div>
          </div>
        </Card>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Left Column (Spans 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Full Description Card */}
            <Card className="shadow-sm p-0 gap-0 border-border/50 overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-border/40 bg-muted/20">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Full Description
                </h2>
              </div>
              <div className="p-5 sm:p-6">
                <div className="prose prose-slate max-w-none mb-6">
                  <p className="whitespace-pre-wrap leading-relaxed text-foreground/90 text-[15px]">
                    {report.description || "No additional details provided."}
                  </p>
                </div>
                <ReportMedia image={report.image} videoId={videoId} />
              </div>
            </Card>

            {/* Community Validation Card */}
            <Card className="shadow-sm p-0 gap-0 border-border/50 overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-border/40 bg-muted/20">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Community Validation
                </h2>
                <p className="text-xs text-muted-foreground/80">
                  Help the community know if this report is accurate
                </p>
              </div>
              <div className="p-5 sm:p-6">
                <ReportValidation report={report} user={user} />
              </div>
            </Card>
          </div>

          {/* Right Column (Spans 1/3) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Service Information Card */}
            <Card className="shadow-sm p-0 gap-0 border-border/50 overflow-hidden">
              <div className="p-5 border-b border-border/40 bg-muted/20">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Service Information
                </h2>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      Utility Type
                    </p>
                    <p className="text-[13px] font-semibold text-foreground capitalize">
                      {report.utilityType}
                    </p>
                  </div>

                  {report.ispName && (
                    <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                        ISP Name
                      </p>
                      <p className="text-[13px] font-semibold text-foreground">
                        {report.ispName}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      Area
                    </p>
                    <p
                      className="text-[13px] font-semibold text-foreground text-right max-w-[150px] truncate"
                      title={report.area}
                    >
                      {report.area}
                    </p>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      District
                    </p>
                    <p className="text-[13px] font-semibold text-foreground">
                      {report.district}
                    </p>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      Status
                    </p>
                    <p className="text-[13px] font-semibold text-foreground capitalize">
                      {report.status}
                    </p>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      Started At
                    </p>
                    <p className="text-[13px] font-semibold text-foreground">
                      {format(new Date(report.startedAt), "MMM d, yyyy h:mm a")}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Reporter Card */}
            <Card className="shadow-sm p-0 gap-0 border-border/50 overflow-hidden">
              <div className="p-5 border-b border-border/40 bg-muted/20">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Reporter
                </h2>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center overflow-hidden shrink-0">
                    {report.reporterImage ? (
                      <Image
                        src={report.reporterImage}
                        alt={report.reporterName}
                        width={40}
                        height={40}
                        className="size-full object-cover"
                      />
                    ) : (
                      <User className="size-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-foreground">
                      {report.reporterName}
                    </p>
                    <p className="text-[12px] font-medium text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <Clock className="size-3" /> Joined:{" "}
                      {format(new Date(report.createdAt), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
