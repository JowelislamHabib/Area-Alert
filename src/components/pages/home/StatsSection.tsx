import { getReports, getReportStatsData } from "@/lib/actions/report";
import StatCard from "./StatCard";
import StatsCharts from "./StatsCharts";
import { FileText, MapPin, Grid3X3, Users } from "lucide-react";
import type { Report } from "@/lib/types";

export type ChartData = {
  utilityData: { name: string; value: number; color: string }[];
  districtData: { name: string; value: number; color: string }[];
  statusData: { name: string; value: number; color: string }[];
};

function aggregateChartData(reports: Report[]): ChartData {
  const utilityCounts: Record<string, number> = {};
  const districtCounts: Record<string, number> = {};
  const statusCounts: Record<string, number> = { active: 0, resolved: 0, pending: 0 };

  for (const r of reports) {
    utilityCounts[r.utilityType] = (utilityCounts[r.utilityType] || 0) + 1;
    districtCounts[r.district] = (districtCounts[r.district] || 0) + 1;
    if (statusCounts[r.status] !== undefined) statusCounts[r.status]++;
  }

  const utilityColors: Record<string, string> = {
    electricity: "#f59e0b",
    internet: "#3b82f6",
    water: "#06b6d4",
    gas: "#f97316",
    flood: "#06b6d4",
  };
  const utilityLabels: Record<string, string> = {
    electricity: "Electricity",
    internet: "Internet",
    water: "Water",
    gas: "Gas",
    flood: "Flood",
  };

  const utilityData = Object.entries(utilityCounts).map(([type, value]) => ({
    name: utilityLabels[type] || type,
    value,
    color: utilityColors[type] || "#888",
  }));

  const districtColors = [
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
    "#06b6d4", // cyan-500
    "#f59e0b", // amber-500
    "#10b981", // emerald-500
  ];

  const districtData = Object.entries(districtCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((item, index) => ({ ...item, color: districtColors[index % districtColors.length] }));

  const statusData = [
    { name: "Active", value: statusCounts.active, color: "#ef4444" },
    { name: "Resolved", value: statusCounts.resolved, color: "#10b981" },
    { name: "Pending", value: statusCounts.pending, color: "#eab308" },
  ].filter((d) => d.value > 0);

  return { utilityData, districtData, statusData };
}

export default async function StatsSection() {
  const [reportsResult, statsData] = await Promise.all([
    getReports({ limit: "10000" }),
    getReportStatsData(),
  ]);

  const reports = reportsResult.success ? (reportsResult.reports as Report[]) : [];
  const total = typeof reportsResult.total === "number" ? reportsResult.total : reports.length;

  const chartData = aggregateChartData(reports);

  const uniqueReporters = new Set(reports.map((r) => r.reporterId)).size;
  const mostActiveDistrict = statsData?.mostReportedDistrict;

  return (
    <section className="relative py-24 sm:py-32 bg-secondary dark:bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Platform Stats
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Numbers that matter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how the community is growing and which areas need attention.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Total Reports"
            value={total.toLocaleString()}
            icon={FileText}
            accent="from-blue-500 to-indigo-500"
          />
          <StatCard
            label="Most Active District"
            value={mostActiveDistrict ? mostActiveDistrict.totalReports : "0"}
            icon={MapPin}
            description={mostActiveDistrict ? mostActiveDistrict.district : "No data yet"}
            accent="from-purple-500 to-pink-500"
          />
          <StatCard
            label="Service Categories"
            value={4}
            icon={Grid3X3}
            description="Electricity, Internet, Water, Gas"
            accent="from-emerald-500 to-teal-500"
          />
          <StatCard
            label="Community Members"
            value={uniqueReporters}
            icon={Users}
            accent="from-orange-500 to-red-500"
          />
        </div>

        <StatsCharts chartData={chartData} hasData={reports.length > 0} />
      </div>
    </section>
  );
}
