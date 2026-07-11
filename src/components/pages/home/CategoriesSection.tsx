"use client";

import { useReveal, spring } from "@/lib/useReveal";
import { Zap, Wifi, Droplet, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categories = [
  { title: "Electricity", description: "Power outages, voltage fluctuations, and grid failures.", icon: Zap, count: "1,234", color: "text-[#F59E0B]", bg: "bg-[#FEF3C7] dark:bg-amber-950/30" },
  { title: "Internet", description: "Broadband, fiber, and mobile network disruptions.", icon: Wifi, count: "856", color: "text-[#8B5CF6]", bg: "bg-[#EDE9FE] dark:bg-purple-950/30" },
  { title: "Water", description: "Supply interruptions, pressure issues, and pipeline breaks.", icon: Droplet, count: "567", color: "text-[#3B82F6]", bg: "bg-[#DBEAFE] dark:bg-blue-950/30" },
  { title: "Gas", description: "Gas line outages, pressure drops, and supply schedules.", icon: Flame, count: "342", color: "text-[#EF4444]", bg: "bg-[#FEE2E2] dark:bg-red-950/30" },
];

function CategoryCard({ category, index }: { category: (typeof categories)[number]; index: number }) {
  const [ref, revealed] = useReveal();
  const Icon = category.icon;

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
      <div className="group h-full rounded-2xl bg-card border border-border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <div className={`mb-6 flex size-14 items-center justify-center rounded-2xl ${category.bg} ${category.color} transition-transform group-hover:scale-110 duration-300`}>
          <Icon className="size-6" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          {category.title}
        </h3>
        <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
          {category.description}
        </p>
        <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
          <span className="text-sm font-medium text-muted-foreground">Active Reports</span>
          <span className="text-xl font-bold text-foreground">{category.count}</span>
        </div>
      </div>
    </div>
  );
}

export default function CategoriesSection() {
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
              Service Categories
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
            Track outages across all major utility services.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => (
            <CategoryCard key={category.title} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
