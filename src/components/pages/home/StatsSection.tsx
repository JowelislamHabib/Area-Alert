import { FileText, MapPin, Layers, Users } from "lucide-react";

const stats = [
  {
    label: "Total Reports",
    value: "2,999+",
    icon: FileText,
  },
  {
    label: "Active Areas",
    value: "64",
    icon: MapPin,
  },
  {
    label: "Categories",
    value: "4",
    icon: Layers,
  },
  {
    label: "Community Members",
    value: "1,200+",
    icon: Users,
  },
];

export default function StatsSection() {
  return (
    <section className="border-b bg-primary py-16 text-primary-foreground md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Platform Statistics
          </h2>
          <p className="mt-2 opacity-80">
            Growing every day with help from our community.
          </p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <stat.icon className="size-8 opacity-80" />
              <span className="text-4xl font-bold tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm opacity-80">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
