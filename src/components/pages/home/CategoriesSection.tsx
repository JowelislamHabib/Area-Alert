import { Zap, Wifi, Droplets, Flame, ArrowRight, Waves } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui/motion-wrapper";
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
  {
    type: "flood",
    icon: Waves,
    label: "Flood",
    href: "/reports?utilityType=flood",
    gradient: "from-cyan-500 to-blue-400",
    light: "bg-cyan-50 dark:bg-cyan-950/30",
    ring: "ring-cyan-500/20",
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
        <FadeIn className="text-center mb-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Service Categories
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            What&apos;s happening in your area
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse by utility type. Each category shows live community reports.
          </p>
        </FadeIn>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = counts[cat.type] || 0;
            return (
              <StaggerItem key={cat.type}>
                <Link href={cat.href} className="group block h-full">
                  <div className={cn(
                    "relative overflow-hidden rounded-2xl border border-border/60 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 h-full",
                    cat.light
                  )}>
                    <div className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="size-6" />
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
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
