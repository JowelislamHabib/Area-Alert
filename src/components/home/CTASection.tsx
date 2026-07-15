import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ShieldCheck, MapPin, BellRing, Users } from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from "@/components/ui/motion-wrapper";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center rounded-[var(--radius)] bg-primary/5 p-8 sm:p-12 lg:p-16 border border-primary/10 shadow-sm relative overflow-hidden">
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <StaggerContainer className="flex flex-col items-start text-left relative z-10">
            <StaggerItem>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
                Ready to make your neighborhood safer?
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground text-balance">
                Join thousands of community members reporting and resolving
                utility issues in real-time. Your contribution makes a
                difference.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  href="/reports/add"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full sm:w-auto font-semibold shadow-md",
                  )}
                >
                  Report an Issue
                  <ArrowRight className="ml-2 size-4" />
                </Link>
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "w-full sm:w-auto font-semibold bg-background",
                  )}
                >
                  <ShieldCheck className="mr-2 size-4" />
                  Join the Community
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Right side placeholder / abstract composition */}
          <FadeIn
            delay={0.2}
            className="relative h-full min-h-[400px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-background via-muted/30 to-muted/50 border border-border flex items-center justify-center p-8 shadow-inner z-10"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]" />

            <div className="relative w-full max-w-sm aspect-square">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

              {/* Floating Card 1 */}
              <div className="absolute top-4 left-4 sm:top-8 sm:left-0 bg-background/90 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-xl flex items-center gap-4 transform -rotate-6 hover:rotate-0 transition-transform duration-500 hover:scale-105">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <MapPin className="size-6" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground">
                    64 Districts
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Nationwide Coverage
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute bottom-24 right-0 sm:-right-4 bg-background/90 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-xl flex items-center gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500 hover:scale-105">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <BellRing className="size-6" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground">
                    Real-time
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Instant Alerts
                  </div>
                </div>
              </div>

              {/* Floating Card 3 */}
              <div className="absolute -bottom-2 left-12 bg-background/90 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-xl flex items-center gap-4 transform -rotate-2 hover:rotate-0 transition-transform duration-500 hover:scale-105">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                  <Users className="size-6" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground">
                    1,240+
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Active Users
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
