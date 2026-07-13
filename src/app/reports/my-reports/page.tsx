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
  ArrowRight,
} from "lucide-react";
import { DeleteReportButton } from "./DeleteReportButton";

const UTILITY_ICONS = {
  electricity: { icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  internet: { icon: Wifi, color: "text-blue-500", bg: "bg-blue-500/10" },
  water: { icon: Droplets, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  gas: { icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
};

export default async function MyReportsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const { reports = [], error } = await getReports({
    reporterId: session.user.id,
    limit: "100",
  });

  const totalReports = reports?.length || 0;
  const activeReports =
    reports?.filter((r: any) => r.status === "active").length || 0;
  const resolvedReports =
    reports?.filter((r: any) => r.status === "resolved").length || 0;

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-5xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">
              My Reports
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your submitted utility outage reports
            </p>
          </div>
          <Button render={<Link href="/add-report" />}>Report New Outage</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-card hover:shadow-md transition-shadow border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Reports
              </CardTitle>
              <FileText className="size-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalReports}</div>
            </CardContent>
          </Card>

          <Card className="bg-card hover:shadow-md transition-shadow border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Outages
              </CardTitle>
              <Activity className="size-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeReports}</div>
            </CardContent>
          </Card>

          <Card className="bg-card hover:shadow-md transition-shadow border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resolved Issues
              </CardTitle>
              <CheckCircle className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{resolvedReports}</div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Table/List */}
        <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-muted/20">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="size-5 text-primary" />
              Report History
            </h2>
          </div>

          {error ? (
            <div className="p-8 text-center text-destructive border-t border-border/50">
              {error}
            </div>
          ) : reports?.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <FileText className="size-8 text-primary opacity-80" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No reports yet</h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                You haven't submitted any utility outage reports yet. Help your
                community by reporting outages in your area.
              </p>
              <Button variant="outline" render={<Link href="/add-report" />}>
                Submit your first report
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Service
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Date Reported
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-semibold text-right"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {reports.map((report: any) => {
                    const ui =
                      UTILITY_ICONS[
                        report.utilityType as keyof typeof UTILITY_ICONS
                      ] || UTILITY_ICONS.electricity;
                    const Icon = ui.icon;
                    const isActive = report.status === "active";

                    return (
                      <tr
                        key={report._id}
                        className="bg-card hover:bg-muted/30 transition-colors group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${ui.bg}`}>
                              <Icon className={`size-4 ${ui.color}`} />
                            </div>
                            <span className="font-medium capitalize">
                              {report.utilityType}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">
                              {report.area}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {report.district}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={isActive ? "destructive" : "default"}
                            className={
                              !isActive
                                ? "bg-emerald-500 hover:bg-emerald-600"
                                : ""
                            }
                          >
                            {report.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">
                              {format(
                                new Date(report.createdAt),
                                "MMM d, yyyy",
                              )}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(report.createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                              render={<Link href={`/reports/${report._id}`} title="View Report" />}
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
        </div>
      </div>
    </main>
  );
}
