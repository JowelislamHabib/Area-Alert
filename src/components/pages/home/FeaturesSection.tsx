"use client";

import { useReveal, spring } from "@/lib/useReveal";
import { ShieldCheck, Clock, MapPin, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  { title: "Community Verified Updates", description: "Real-time outage reports verified by people in your area. Know what is happening before you head out.", icon: ShieldCheck },
  { title: "Fast Reporting", description: "Report an outage in seconds. Select your service, area, and status.", icon: Clock },
  { title: "Search by Area", description: "Find outages in any district across Bangladesh. Filter by service type and status.", icon: MapPin },
  { title: "Mobile Friendly", description: "Works on every device. Report and browse on the go.", icon: Smartphone },
];

function FeatureCard({ feature, index }: { feature: (typeof features)[number]; index: number }) {
  const [ref, revealed] = useReveal();
  const Icon = feature.icon;

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
      <div className="h-full rounded-2xl bg-background p-8 border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
        <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="size-7" />
        </div>
        <h3 className="mb-3 text-xl font-semibold text-foreground">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const [eyebrowRef, eyebrowRevealed] = useReveal();
  const [headingRef, headingRevealed] = useReveal();

  return (
    <section className="bg-background py-24 md:py-32">
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
              Features
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
            Built to keep communities connected and informed.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
