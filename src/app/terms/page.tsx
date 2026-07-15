import { ShieldAlert } from "lucide-react";
import { FadeIn, SlideUp } from "@/components/ui/motion-wrapper";

export default function TermsPage() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-muted/30 pb-16">
      {/* Hero Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <FadeIn className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 opacity-90" />
              Terms of Service
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl">
              Please read these terms carefully before using AreaAlert.
            </p>
          </FadeIn>
        </div>
      </div>

      <SlideUp delay={0.2} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-card border border-border rounded-[var(--radius)] p-8 shadow-sm">
          <div className="max-w-4xl">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using AreaAlert, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Community Guidelines</h2>
                <p className="text-muted-foreground leading-relaxed">
                  When submitting reports, you agree to provide accurate and truthful information. False reporting, spam, or abusive behavior may result in immediate account suspension or termination. AreaAlert relies on the integrity of its community members.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your use of AreaAlert is also governed by our Privacy Policy, which outlines how we collect and use your data. Please review our Privacy Policy to understand our practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AreaAlert provides crowd-sourced utility data "as is". We are not responsible for the accuracy of reports or any decisions made based on this information. In no event shall AreaAlert or its suppliers be liable for any damages arising out of the use or inability to use the materials on the platform.
                </p>
              </section>

              <div className="pt-8 mt-8 border-t border-border">
                <p className="text-sm text-muted-foreground font-medium">
                  Last updated: July 15, 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </SlideUp>
    </main>
  );
}
