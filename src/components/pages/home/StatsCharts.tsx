"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { ChartData } from "./StatsSection";
import { useReveal } from "@/lib/useReveal";

interface TooltipPayload {
  name: string;
  value: number;
  color?: string;
  fill?: string;
  payload?: { color?: string };
}

function GlassTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-2xl bg-card/40 border border-white/20 dark:border-white/10 rounded-xl px-4 py-3 shadow-xl shadow-black/10 dark:shadow-black/30">
      {label && <p className="text-xs font-semibold text-foreground mb-1">{label}</p>}
      {payload.map((entry: TooltipPayload, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color || entry.fill }} />
          {entry.name}: <span className="font-semibold text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

function PieTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  return (
    <div className="backdrop-blur-2xl bg-card/40 border border-white/20 dark:border-white/10 rounded-xl px-4 py-3 shadow-xl shadow-black/10 dark:shadow-black/30">
      <div className="flex items-center gap-2 text-xs">
        <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.payload?.color }} />
        <span className="text-muted-foreground">{entry.name}:</span>
        <span className="font-semibold text-foreground">{entry.value}</span>
      </div>
    </div>
  );
}

function CustomLegend({ payload }: any) {
  if (!payload?.length) return null;
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-2">
      {payload.map((entry: any, index: number) => {
        const color = entry.payload?.color || entry.color;
        return (
          <div key={`item-${index}`} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
            <span className="text-xs text-muted-foreground">{entry.value}</span>
          </div>
        );
      })}
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
      {children}
    </div>
  );
}

function LinearGradientDefs({ data, prefix }: { data: { color: string }[]; prefix: string }) {
  return (
    <defs>
      {data.map((entry, i) => (
        <linearGradient key={`grad-${prefix}-${i}`} id={`grad-${prefix}-${i}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
          <stop offset="100%" stopColor={entry.color} stopOpacity={0.05} />
        </linearGradient>
      ))}
    </defs>
  );
}

export default function StatsCharts({
  chartData,
  hasData,
}: {
  chartData: ChartData;
  hasData: boolean;
}) {
  const [ref, revealed] = useReveal();

  if (!hasData) return null;

  return (
    <div ref={ref} className="grid md:grid-cols-3 gap-5 mt-12">
      {/* Utility Pie */}
      <ChartCard title="Reports by Utility">
        {revealed ? (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <LinearGradientDefs data={chartData.utilityData} prefix="util" />
              <Pie
                data={chartData.utilityData}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
                animationBegin={0}
                animationDuration={1000}
                isAnimationActive={true}
              >
                {chartData.utilityData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#grad-util-${index})`}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} cursor={{ fill: "transparent" }} />
              <Legend
                verticalAlign="bottom"
                height={40}
                content={<CustomLegend />}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ height: 260 }} />
        )}
      </ChartCard>

      {/* District Bar */}
      <ChartCard title="Top Districts">
        {revealed ? (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData.districtData} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
              <LinearGradientDefs data={chartData.districtData} prefix="dist" />
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<GlassTooltip />} cursor={{ fill: "transparent" }} />
              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                barSize={32}
                animationBegin={0}
                animationDuration={1000}
                isAnimationActive={true}
              >
                {chartData.districtData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#grad-dist-${index})`} stroke="none" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ height: 260 }} />
        )}
      </ChartCard>

      {/* Status Pie */}
      <ChartCard title="Status Overview">
        {revealed ? (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <LinearGradientDefs data={chartData.statusData} prefix="status" />
              <Pie
                data={chartData.statusData}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
                animationBegin={0}
                animationDuration={1000}
                isAnimationActive={true}
              >
                {chartData.statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#grad-status-${index})`}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} cursor={{ fill: "transparent" }} />
              <Legend
                verticalAlign="bottom"
                height={40}
                content={<CustomLegend />}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ height: 260 }} />
        )}
      </ChartCard>
    </div>
  );
}
