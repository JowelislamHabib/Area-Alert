import { Zap, Wifi, Droplets, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  {
    title: "Electricity",
    description: "Power outages, voltage fluctuations, and grid failures.",
    icon: Zap,
    count: "1,234",
  },
  {
    title: "Internet",
    description: "Broadband, fiber, and mobile network disruptions.",
    icon: Wifi,
    count: "856",
  },
  {
    title: "Water",
    description: "Supply interruptions, pressure issues, and pipeline breaks.",
    icon: Droplets,
    count: "567",
  },
  {
    title: "Gas",
    description: "Gas line outages, pressure drops, and supply schedules.",
    icon: Flame,
    count: "342",
  },
];

export default function CategoriesSection() {
  return (
    <section className="border-b py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Service Categories
          </h2>
          <p className="mt-2 text-muted-foreground">
            Track outages across all major utility services.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <category.icon className="size-8 text-primary" />
                <CardTitle className="text-base font-semibold">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
                <p className="text-2xl font-bold">{category.count}</p>
                <p className="text-xs text-muted-foreground">
                  total reports
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
