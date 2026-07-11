import Link from "next/link";
import { AlertTriangle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto flex flex-col items-center px-4 py-24 text-center md:py-32 md:px-6">
        <div className="mb-6 flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <AlertTriangle className="size-3.5" />
          Community-Powered Utility Tracking
        </div>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Stay Informed About{" "}
          <span className="text-primary">Utility Services</span> in Your Area
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
          AreaAlert helps communities report and monitor electricity, water,
          gas, and internet outages across Bangladesh.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg">
            <Link href="/reports" className="flex items-center gap-1.5">
              <Search className="size-4" />
              Explore Reports
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/report" className="flex items-center gap-1.5">
              <AlertTriangle className="size-4" />
              Report an Outage
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
