import { getReportById } from "@/lib/actions/report";
import { notFound } from "next/navigation";
import { formatDistanceToNow, format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, MapPin, User, Zap, Wifi, Droplets, Flame } from "lucide-react";
import Link from "next/link";
import { ReportMedia } from "./ReportMedia";
import { ReportValidation } from "./ReportValidation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const UTILITY_ICONS = {
  electricity: { icon: Zap, color: "text-yellow-600", bg: "bg-yellow-100", label: "Electricity" },
  internet: { icon: Wifi, color: "text-purple-600", bg: "bg-purple-100", label: "Internet" },
  water: { icon: Droplets, color: "text-cyan-600", bg: "bg-cyan-100", label: "Water" },
  gas: { icon: Flame, color: "text-orange-600", bg: "bg-orange-100", label: "Gas" },
};

function getYoutubeVideoId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  return match ? match[1] : null;
}

export default async function ReportDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { report, error } = await getReportById(id);

  if (error || !report) {
    notFound();
  }

  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const ui = UTILITY_ICONS[report.utilityType as keyof typeof UTILITY_ICONS] || UTILITY_ICONS.electricity;
  const Icon = ui.icon;
  
  const videoId = report.videoUrl ? getYoutubeVideoId(report.videoUrl) : null;
  const timeAgo = formatDistanceToNow(new Date(report.createdAt), { addSuffix: true });
  const exactTime = format(new Date(report.createdAt), "MMM d, yyyy h:mm a");

  return (
    <main className="min-h-screen bg-[#FDFDFD] py-6 px-4 sm:px-8 font-sans text-slate-900">
      <div className="container mx-auto space-y-6">
        
        {/* Back Link */}
        <Link href="/reports" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="size-4 mr-2" /> Back to Explore
        </Link>

        <Card className="shadow-sm p-0 gap-0 overflow-hidden border-border/50">
          <div className="p-5 sm:p-6 lg:p-8 relative">
            {/* Soft background gradient based on status */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${report.status === "active" ? "bg-red-500" : report.status === "resolved" ? "bg-emerald-500" : "bg-slate-400"}`} />
            
            <div className="flex flex-wrap items-center gap-3 mb-5 mt-1">
              <Badge variant="secondary" className={`${ui.bg} ${ui.color} border-none rounded-full px-3 py-1 font-semibold text-xs tracking-wide uppercase gap-1.5`}>
                <Icon className="size-3.5" /> 
                {ui.label} {report.ispName ? `· ${report.ispName}` : ""}
              </Badge>
              <Badge variant="outline" className={`border-none rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-wider gap-1.5 ${report.status === "active" ? "bg-red-50 text-red-600" : report.status === "resolved" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"}`}>
                <div className={`size-2 rounded-full animate-pulse ${report.status === "active" ? "bg-red-500" : report.status === "resolved" ? "bg-emerald-500" : "bg-slate-400"}`} />
                {report.status}
              </Badge>
            </div>
          
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-5 tracking-tight leading-tight">
              {report.shortDescription} — {report.area}, {report.district}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-md">
                <MapPin className="size-3.5" /> {report.area}, {report.district}
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-md">
                <Clock className="size-3.5" /> Reported {timeAgo}
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-md">
                <User className="size-3.5" /> By {report.reporterName}
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
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Full Description</h2>
              </div>
              <div className="p-5 sm:p-6">
                <div className="prose prose-slate max-w-none mb-6">
                  <p className="whitespace-pre-wrap leading-relaxed text-slate-700 text-[15px]">
                    {report.description || "No additional details provided."}
                  </p>
                </div>
                <ReportMedia image={report.image} videoId={videoId} />
              </div>
            </Card>

            {/* Community Validation Card */}
            <Card className="shadow-sm p-0 gap-0 border-border/50 overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-border/40 bg-muted/20">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">Community Validation</h2>
                <p className="text-xs text-muted-foreground/80">Help the community know if this report is accurate</p>
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
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Service Information</h2>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Utility Type</p>
                    <p className="text-[13px] font-semibold text-slate-900 capitalize">{report.utilityType}</p>
                  </div>
                  
                  {report.ispName && (
                    <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">ISP Name</p>
                      <p className="text-[13px] font-semibold text-slate-900">{report.ispName}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Area</p>
                    <p className="text-[13px] font-semibold text-slate-900 text-right max-w-[150px] truncate" title={report.area}>{report.area}</p>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">District</p>
                    <p className="text-[13px] font-semibold text-slate-900">{report.district}</p>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</p>
                    <p className="text-[13px] font-semibold text-slate-900 capitalize">{report.status}</p>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Started At</p>
                    <p className="text-[13px] font-semibold text-slate-900">{format(new Date(report.startedAt), "MMM d, yyyy h:mm a")}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Reporter Card */}
            <Card className="shadow-sm p-0 gap-0 border-border/50 overflow-hidden">
              <div className="p-5 border-b border-border/40 bg-muted/20">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Reporter</h2>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <User className="size-4" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-slate-900">{report.reporterName}</p>
                    <p className="text-[12px] font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <Clock className="size-3" /> {format(new Date(report.createdAt), "MMM d, yyyy")}
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
