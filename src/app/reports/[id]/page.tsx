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

        <Card className="shadow-sm">
          <CardContent className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="secondary" className={`${ui.bg} ${ui.color} border-none rounded-full px-3 py-1 font-medium text-sm gap-1.5`}>
              <Icon className="size-3.5" /> 
              {ui.label} {report.ispName ? `· ${report.ispName}` : ""}
            </Badge>
            <Badge variant="outline" className={`border-none rounded-full px-3 py-1 font-medium text-sm gap-1.5 ${report.status === "resolved" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
              <div className={`size-2.5 rounded-full ${report.status === "resolved" ? "bg-emerald-500" : "bg-slate-400"}`} />
              <span className="capitalize">{report.status}</span>
            </Badge>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
            {report.shortDescription} — {report.area}, {report.district}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin className="size-4" /> {report.area}, {report.district}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" /> Reported {timeAgo}
            </div>
            <div className="flex items-center gap-1.5">
              <User className="size-4" /> By {report.reporterName}
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column (Spans 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Full Description Card */}
            <Card className="shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-4">Full Description</h2>
              <div className="prose prose-slate max-w-none mb-6">
                <p className="whitespace-pre-wrap leading-relaxed text-slate-700 text-[15px]">
                  {report.description || "No additional details provided."}
                </p>
              </div>
              <ReportMedia image={report.image} videoId={videoId} />
              </CardContent>
            </Card>

            {/* Community Validation Card */}
            <Card className="shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-1">Community Validation</h2>
                <p className="text-sm text-slate-500 mb-6">Help the community know if this report is accurate</p>
                
                <ReportValidation report={report} user={user} />
              </CardContent>
            </Card>

          </div>

          {/* Right Column (Spans 1/3) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Service Information Card */}
            <Card className="shadow-sm">
              <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-6">Service Information</h2>
              
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Utility Type</p>
                  <p className="text-[15px] font-semibold text-slate-900 capitalize">{report.utilityType}</p>
                </div>
                
                {report.ispName && (
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">ISP Name</p>
                    <p className="text-[15px] font-semibold text-slate-900">{report.ispName}</p>
                  </div>
                )}

                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Area</p>
                  <p className="text-[15px] font-semibold text-slate-900">{report.area}</p>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">District</p>
                  <p className="text-[15px] font-semibold text-slate-900">{report.district}</p>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Status</p>
                  <p className="text-[15px] font-semibold text-slate-900 capitalize">{report.status}</p>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Started At</p>
                  <p className="text-[15px] font-semibold text-slate-900">{format(new Date(report.startedAt), "MMM d, yyyy h:mm a")}</p>
                </div>
                </div>
              </CardContent>
            </Card>

            {/* Reporter Card */}
            <Card className="shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-5">Reporter</h2>
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <User className="size-5" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-slate-900">{report.reporterName}</p>
                  <p className="text-[13px] font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <Clock className="size-3.5" /> {format(new Date(report.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </main>
  );
}
