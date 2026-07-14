import { Users, Laptop, Newspaper, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UseCasesSection() {
  const useCases = [
    {
      title: "Residents & Families",
      description: "Save time by checking local utility conditions—like ATM power or waterlogging—before leaving home or sending kids to school.",
      icon: Users,
    },
    {
      title: "Remote Workers & Students",
      description: "Instantly verify if an internet outage is isolated to your home or affecting the whole area before joining important calls or exams.",
      icon: Laptop,
    },
    {
      title: "Journalists & Researchers",
      description: "Access community-reported trends to identify recurring infrastructure problems and support data-driven stories.",
      icon: Newspaper,
    },
    {
      title: "Local Authorities & NGOs",
      description: "Gain situational awareness during emergencies, helping prioritize maintenance and plan relief efforts effectively.",
      icon: Building2,
    },
  ];

  return (
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Who We Serve
          </h2>
          <p className="text-lg text-muted-foreground">
            AreaAlert is built for everyone. By turning individual reports into collective insight, 
            we help various groups across Bangladesh make better decisions every day.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase, index) => (
            <Card key={index} className="bg-background border-muted/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <useCase.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
