import { BadgeCheck, Timer, MapPin, Smartphone } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Community Verified",
    description:
      "Reports confirmed by multiple users in your area. Trust what your neighbors are reporting.",
    accent: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Timer,
    title: "Lightning Fast",
    description:
      "Submit an outage report in under 60 seconds. Select, describe, done.",
    accent: "from-amber-500 to-orange-500",
  },
  {
    icon: MapPin,
    title: "Hyperlocal Search",
    description:
      "Search by area, district, or utility type. Get the exact status of your neighborhood.",
    accent: "from-blue-500 to-indigo-500",
  },
  {
    icon: Smartphone,
    title: "Always Accessible",
    description:
      "Fully responsive for phone, tablet, or desktop. Check before you leave the house.",
    accent: "from-purple-500 to-pink-500",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why AreaAlert
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Built for your community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Purpose-built for Bangladeshi communities to share and find utility
            service information quickly.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-card rounded-2xl border border-border/60 p-6 space-y-5 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
              >
                <div className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accent} text-white shadow-lg shadow-primary/10`}>
                  <Icon className="size-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
