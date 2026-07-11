"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useReveal, spring } from "@/lib/useReveal";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CTASection() {
  const [ref, revealed] = useReveal();

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-2xl p-8 md:p-16 lg:p-24 text-center flex flex-col items-center"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed
              ? "translateY(0) scale(1)"
              : "translateY(40px) scale(0.95)",
            filter: revealed ? "blur(0)" : "blur(8px)",
            transition: `all 800ms ${spring}`,
          }}
        >
          {/* Decorative background blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[600px] aspect-square rounded-full bg-primary/10 blur-3xl -z-10" />

          <div className="relative z-10 flex flex-col items-center">
            <Badge variant="outline" className="mb-6">
              Join AreaAlert
            </Badge>

            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl max-w-2xl">
              Ready to help your community?
            </h2>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Join AreaAlert today and help thousands stay informed about
              utility outages in Bangladesh.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row w-full sm:w-auto justify-center">
              <Link href="/register">
                <Button size="lg">
                  Get Started Free <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
