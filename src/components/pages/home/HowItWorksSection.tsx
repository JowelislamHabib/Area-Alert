import { UserPlus, TriangleAlert, Heart } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Create an Account",
    description:
      "Sign up for free with your email or Google account. No credit card required.",
    icon: UserPlus,
  },
  {
    step: 2,
    title: "Report Utility Status",
    description:
      "Select your service type, area, and status. Add details to help your neighbors.",
    icon: TriangleAlert,
  },
  {
    step: 3,
    title: "Help Your Community",
    description:
      "Browse reports, stay informed, and contribute updates to keep everyone in the loop.",
    icon: Heart,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="border-b py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            How It Works
          </h2>
          <p className="mt-2 text-muted-foreground">
            Three simple steps to start helping your community.
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative flex flex-col items-center text-center"
            >
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px w-full translate-x-1/2 bg-border md:block" />
              )}
              <div className="relative flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <step.icon className="size-7" />
              </div>
              <span className="mt-3 text-sm font-medium text-muted-foreground">
                Step {step.step}
              </span>
              <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
