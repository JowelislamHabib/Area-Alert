import { MapPin } from "lucide-react";
import { FadeIn } from "@/components/ui/motion-wrapper";

export function AboutHero() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <FadeIn className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 flex items-center gap-3">
            <MapPin className="w-8 h-8 opacity-90" />
            About AreaAlert
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl text-balance">
            We are building a more connected and informed Bangladesh by
            providing a platform for citizens to report and track essential
            utility services in their neighborhoods.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
