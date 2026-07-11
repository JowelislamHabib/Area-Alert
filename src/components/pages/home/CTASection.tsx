import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-muted/30 p-8 text-center md:p-12">
          <AlertTriangle className="mx-auto size-10 text-primary" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Help Your Community?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join AreaAlert today and help thousands stay informed about
            utility outages in Bangladesh.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg">
              <Link href="/register" className="flex items-center gap-1.5">
                Get Started Free
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/about" className="flex items-center gap-1.5">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
