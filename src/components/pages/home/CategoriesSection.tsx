import Link from "next/link";
import { Zap, Wifi, Droplets, Flame, ArrowRight } from "lucide-react";
import { getReports } from "@/lib/actions/report";
import { cn } from "@/lib/utils";

const categories = [
  {
    type: "electricity",
    icon: Zap,
    label: "Electricity",
    href: "/reports?utilityType=electricity",
    gradient: "from-amber-500 to-yellow-400",
    light: "bg-amber-50 dark:bg-amber-950/30",
    ring: "ring-amber-500/20",
  },
  {
    type: "internet",
    icon: Wifi,
    label: "Internet",
    href: "/reports?utilityType=internet",
    gradient: "from-blue-500 to-indigo-400",
    light: "bg-blue-50 dark:bg-blue-950/30",
    ring: "ring-blue-500/20",
  },
  {
    type: "water",
    icon: Droplets,
    label: "Water",
    href: "/reports?utilityType=water",
    gradient: "from-cyan-500 to-teal-400",
    light: "bg-cyan-50 dark:bg-cyan-950/30",
    ring: "ring-cyan-500/20",
  },
  {
    type: "gas",
    icon: Flame,
    label: "Gas",
    href: "/reports?utilityType=gas",
    gradient: "from-orange-500 to-red-400",
    light: "bg-orange-50 dark:bg-orange-950/30",
    ring: "ring-orange-500/20",
  },
];

export default async function CategoriesSection() {
  const result = await getReports({ limit: "1000" });
  const reports = result.success ? result.reports : [];
  const counts: Record<string, number> = {};
  for (const r of reports) {
    counts[r.utilityType] = (counts[r.utilityType] || 0) + 1;
  }

  return (
    <section className="py-24 sm:py-32 bg-secondary dark:bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Service Categories
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            What&apos;s happening in your area
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse by utility type. Each category shows live community reports.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = counts[cat.type] || 0;
            return (
              <Link key={cat.type} href={cat.href} className="group block">
                <div className={cn(
                  "relative overflow-hidden rounded-2xl border border-border/60 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1",
                  cat.light
                )}>
                  <div className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="size-7" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    {cat.label}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">{count}</span>
                    <span className="text-sm text-muted-foreground">{count === 1 ? "report" : "reports"}</span>
                  </div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/40 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-white/5" />
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View reports <ArrowRight className="size-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
