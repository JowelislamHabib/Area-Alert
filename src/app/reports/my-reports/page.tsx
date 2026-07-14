import { getReports } from "@/lib/actions/report";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, format } from "date-fns";
import Link from "next/link";
import {
  FileText,
  Activity,
  CheckCircle,
  MapPin,
  Eye,
  Zap,
  Wifi,
  Droplets,
  Flame,
  ThumbsUp,
  Waves,
  Plus,
} from "lucide-react";
import { DeleteReportButton } from "./DeleteReportButton";

const UTILITY_ICONS = {
  electricity: { icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
  internet: { icon: Wifi, color: "text-purple-500", bg: "bg-purple-500/10" },
  water: { icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10" },
  gas: { icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
  flood: { icon: Waves, color: "text-cyan-500", bg: "bg-cyan-500/10" },
};

export default async function MyReportsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const { reports = [], error } = await getReports({
    reporterId: session.user.id,
  });

  const totalReports = reports?.length || 0;
  const activeReports =
    reports?.filter((r: any) => r.status === "active").length || 0;
  const resolvedReports =
    reports?.filter((r: any) => r.status === "resolved").length || 0;
    
  const totalUpvotes = reports?.reduce((acc: number, r: any) => acc + (r.upvotes?.length || 0), 0) || 0;

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">
              My Reports
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your submitted utility outage reports
            </p>
          </div>
          <Button className="gap-2" render={<Link href="/add-report" />} nativeButton={false}>
            <Plus className="size-4" />
            Report New Outage
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reports
              </CardTitle>
              <FileText className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReports}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Outages
              </CardTitle>
              <Activity className="size-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeReports}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Resolved Issues
              </CardTitle>
              <CheckCircle className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolvedReports}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upvotes
              </CardTitle>
              <ThumbsUp className="size-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUpvotes}</div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Table/List */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b bg-muted/20">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              Report History
            </h2>
          </div>

          {error ? (
            <div className="p-8 text-center text-destructive border-t">
              {error}
            </div>
          ) : reports?.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <FileText className="size-6 text-primary opacity-80" />
              </div>
              <h3 className="text-lg font-semibold mb-1">No reports yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-4">
                You haven't submitted any utility outage reports yet.
              </p>
              <Button variant="outline" className="gap-2" render={<Link href="/add-report" />} nativeButton={false}>
                <Plus className="size-4" />
                Submit your first report
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground bg-muted/40 border-b">
                  <tr>
                    <th scope="col" className="h-10 px-4 align-middle font-medium">Service</th>
                    <th scope="col" className="h-10 px-4 align-middle font-medium">Location</th>
                    <th scope="col" className="h-10 px-4 align-middle font-medium">Status</th>
                    <th scope="col" className="h-10 px-4 align-middle font-medium">Date</th>
                    <th scope="col" className="h-10 px-4 align-middle font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {reports.map((report: any) => {
                    const ui = UTILITY_ICONS[report.utilityType as keyof typeof UTILITY_ICONS] || UTILITY_ICONS.electricity;
                    const Icon = ui.icon;
                    const isActive = report.status === "active";

                    return (
                      <tr key={report._id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4 align-middle whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-md ${ui.bg}`}>
                              <Icon className={`size-3.5 ${ui.color}`} />
                            </div>
                            <span className="font-medium capitalize">{report.utilityType}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span className="font-medium">{report.area}</span>
                            <span className="text-xs text-muted-foreground">{report.district}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle whitespace-nowrap">
                          <Badge
                            variant={isActive ? "destructive" : "default"}
                            className={`capitalize text-[11px] px-2 py-0.5 ${!isActive ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
                          >
                            {report.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {format(new Date(report.createdAt), "MMM d, yyyy")}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 align-middle whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="text-muted-foreground hover:text-primary"
                              render={<Link href={`/reports/${report._id}`} title="View Report" />} nativeButton={false}
                            >
                              <Eye className="size-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <DeleteReportButton id={report._id} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
