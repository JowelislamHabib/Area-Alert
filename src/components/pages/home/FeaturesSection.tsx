import { BadgeCheck, Clock, MapPin, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Community Verified Updates",
    description:
      "Real-time outage reports verified by people in your area. Know what's happening before you head out.",
    icon: BadgeCheck,
  },
  {
    title: "Fast Reporting",
    description:
      "Report an outage in seconds. No complicated forms — just select your service, area, and status.",
    icon: Clock,
  },
  {
    title: "Search by Area",
    description:
      "Find outages in any district or area across Bangladesh. Filter by service type and status.",
    icon: MapPin,
  },
  {
    title: "Mobile Friendly",
    description:
      "Works flawlessly on all devices. Report and browse on the go with our responsive design.",
    icon: Smartphone,
  },
];

export default function FeaturesSection() {
  return (
    <section className="border-b py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why AreaAlert?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Built to keep communities connected and informed during service
            disruptions.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 bg-muted/30">
              <CardHeader>
                <feature.icon className="size-8 text-primary" />
                <CardTitle className="text-base font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
