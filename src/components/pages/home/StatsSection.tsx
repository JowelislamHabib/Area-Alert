"use client";

import { useReveal, spring } from "@/lib/useReveal";
import { FileText, MapPin, Layers, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Total Reports", value: "2,999+", icon: FileText },
  { label: "Active Areas", value: "64", icon: MapPin },
  { label: "Categories", value: "4", icon: Layers },
  { label: "Community Members", value: "1,200+", icon: Users },
];

function StatCard({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const [ref, revealed] = useReveal();
  const Icon = stat.icon;

  return (
    <div
      ref={ref}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(24px)",
        filter: revealed ? "blur(0)" : "blur(4px)",
        transition: `all 800ms ${spring} ${index * 100}ms`,
      }}
    >
      <div className="flex h-full flex-col items-center text-center p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
        <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-6" />
        </div>
        <p className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {stat.value}
        </p>
        <p className="mt-2 text-sm font-medium text-muted-foreground">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const [eyebrowRef, eyebrowRevealed] = useReveal();
  const [headingRef, headingRevealed] = useReveal();

  return (
    <section className="bg-muted/30 py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <div
            ref={eyebrowRef}
            style={{
              opacity: eyebrowRevealed ? 1 : 0,
              transform: eyebrowRevealed ? "translateY(0)" : "translateY(16px)",
              transition: `all 700ms ${spring}`,
            }}
          >
            <Badge variant="outline" className="mb-6">
              Platform Statistics
            </Badge>
          </div>
          
          <h2
            ref={headingRef}
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl max-w-2xl"
            style={{
              opacity: headingRevealed ? 1 : 0,
              transform: headingRevealed ? "translateY(0)" : "translateY(24px)",
              transition: `all 800ms ${spring} 100ms`,
            }}
          >
            Growing every day with help from our community.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
