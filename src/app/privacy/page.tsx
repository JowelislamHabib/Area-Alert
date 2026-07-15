import { Shield } from "lucide-react";
import { FadeIn, SlideUp } from "@/components/ui/motion-wrapper";

export default function PrivacyPage() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-muted/30 pb-16">
      {/* Hero Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <FadeIn className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 flex items-center gap-3">
              <Shield className="w-8 h-8 opacity-90" />
              Privacy Policy
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl">
              How we collect, use, and protect your personal data.
            </p>
          </FadeIn>
        </div>
      </div>

      <SlideUp delay={0.2} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-card border border-border rounded-[var(--radius)] p-8 shadow-sm">
          <div className="max-w-4xl">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information you provide when creating an account, such as your email address, name, and profile picture. We also collect data from the utility reports you submit, which includes location data, timestamps, and utility types.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your data is used to provide and improve the AreaAlert service. Utility report data is made public to help the community stay informed, but we do not share your personal email or authentication data with third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to access, update, or delete your personal information at any time through your account dashboard. If you wish to completely remove your account and associated data, please contact our support team.
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
