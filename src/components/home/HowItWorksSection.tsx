import { UserPlus, FileText, HeartHandshake } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui/motion-wrapper";

const steps = [
  {
    icon: UserPlus,
    title: "Create an Account",
    description:
      "Sign up with your email or Google in under a minute. No complicated forms.",
    step: "01",
    accent: "from-blue-500 to-indigo-500",
  },
  {
    icon: FileText,
    title: "Report Utility Status",
    description:
      "Select your area, describe the issue, and submit. Electricity, water, gas, or internet.",
    step: "02",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: HeartHandshake,
    title: "Help Your Community",
    description:
      "Your report helps neighbors make informed decisions. Together we build a reliable map.",
    step: "03",
    accent: "from-purple-500 to-pink-500",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-secondary dark:bg-secondary/30 overflow-hidden">
      {/* Decorative gradient blur in the background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-20 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Three steps to get started
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Start contributing to your community's infrastructure awareness in minutes.
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.title}>
                <div className="group relative overflow-hidden rounded-[2rem] bg-background border border-border/50 p-8 sm:p-10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 h-full">
                  {/* Huge Background Number */}
                  <div className="absolute -bottom-8 -right-4 text-[10rem] font-black leading-none text-muted/30 select-none transition-all duration-500 group-hover:text-primary/5 group-hover:-translate-y-4 group-hover:-translate-x-2 group-hover:-rotate-6 pointer-events-none">
                    {step.step}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.accent} text-white shadow-lg shadow-primary/10 mb-8 transition-transform duration-500 group-hover:scale-110 shrink-0`}>
                      <Icon className="size-6" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
