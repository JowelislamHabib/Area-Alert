import { Target, Clock, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";

export function MissionVisionSection() {
  const items = [
    {
      title: "Our Mission",
      description: "Help Bangladeshi communities share accurate utility outage information quickly and reliably.",
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Why It Matters",
      description: "Timely information saves people time, reduces uncertainty, and helps communities prepare for service disruptions.",
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      title: "Our Vision",
      description: "Empower communities to share real-time local service updates, making neighborhoods more informed, safer, and better connected.",
      icon: Globe,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <StaggerContainer delay={0.1} className="grid gap-8 md:grid-cols-3">
        {items.map((item, index) => (
          <StaggerItem key={index} className="h-full">
            <Card 
              className="group h-full relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-muted"
            >
              <div className={`absolute top-0 right-0 p-32 -mr-16 -mt-16 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${item.bgColor}`} />
              
              <CardContent className="p-8 relative z-10 flex flex-col h-full">
                <div className={`mb-6 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${item.bgColor} ${item.borderColor}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                
                <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
