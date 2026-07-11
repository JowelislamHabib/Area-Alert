"use client";

import { useReveal, spring } from "@/lib/useReveal";
import { UserPlus, TriangleAlert, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  { step: 1, title: "Create an Account", description: "Sign up for free with your email or Google account. No credit card required.", icon: UserPlus },
  { step: 2, title: "Report Utility Status", description: "Select your service type, area, and status. Add details to help your neighbors.", icon: TriangleAlert },
  { step: 3, title: "Help Your Community", description: "Browse reports, stay informed, and contribute updates to keep everyone in the loop.", icon: Heart },
];

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const [ref, revealed] = useReveal();
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(24px)",
        filter: revealed ? "blur(0)" : "blur(4px)",
        transition: `all 800ms ${spring} ${index * 120}ms`,
      }}
    >
      <div className="flex h-full flex-col items-center text-center p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 text-9xl font-black text-muted/30 select-none -translate-y-6 translate-x-4">
          {step.step}
        </div>
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 relative z-10">
          <Icon className="size-7" />
        </div>
        <h3 className="mb-3 text-xl font-semibold text-foreground relative z-10">
          {step.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed relative z-10">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
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
              How It Works
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
            Three simple steps to start helping your community.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <StepCard key={step.step} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
