import { MapPin } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pb-24">
      <div className="absolute inset-0 bg-[url('https://ui.shadcn.com/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" />
            <span>About AreaAlert</span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
            Empowering Communities with <span className="text-primary">Real-Time Data</span>
          </h1>
          
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
            We are building a more connected and informed Bangladesh by providing a platform for 
            citizens to report and track essential utility services in their neighborhoods.
          </p>
        </div>
      </div>
    </section>
  );
}
