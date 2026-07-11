"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useReveal, spring } from "@/lib/useReveal";
import {
  ArrowRight,
  Zap,
  Droplets,
  Wifi,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [eyebrowRef, eyebrowRevealed] = useReveal();
  const [headlineRef, headlineRevealed] = useReveal();
  const [subtitleRef, subtitleRevealed] = useReveal();
  const [ctaRef, ctaRevealed] = useReveal();
  const [visualRef, visualRevealed] = useReveal();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32 md:pt-32 md:pb-40 isolate">
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div
        className="absolute top-1/2 right-1/4 -z-10 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/20 blur-[120px] opacity-50 dark:opacity-20 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(calc(50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))`,
        }}
      />
      <div
        className="absolute top-1/4 left-1/4 -z-10 h-[400px] w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-accent/10 blur-[100px] opacity-50 dark:opacity-20 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(calc(-50% - ${mousePos.x}px), calc(-50% - ${mousePos.y}px))`,
        }}
      />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Copy & CTA */}
          <div className="flex flex-col items-start z-10">
            <div
              ref={eyebrowRef}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur-md shadow-sm"
              style={{
                opacity: eyebrowRevealed ? 1 : 0,
                transform: eyebrowRevealed
                  ? "translateY(0)"
                  : "translateY(16px)",
                filter: eyebrowRevealed ? "blur(0)" : "blur(4px)",
                transition: `all 700ms ${spring}`,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-muted-foreground tracking-wide uppercase text-xs font-semibold">
                Live Outage Tracking
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl"
              style={{
                opacity: headlineRevealed ? 1 : 0,
                transform: headlineRevealed
                  ? "translateY(0)"
                  : "translateY(24px)",
                filter: headlineRevealed ? "blur(0)" : "blur(6px)",
                transition: `all 800ms ${spring} 100ms`,
              }}
            >
              Never stay in the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 dark:to-emerald-300">
                dark
              </span>{" "}
              again.
            </h1>

            <p
              ref={subtitleRef}
              className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed max-w-xl"
              style={{
                opacity: subtitleRevealed ? 1 : 0,
                transform: subtitleRevealed
                  ? "translateY(0)"
                  : "translateY(20px)",
                filter: subtitleRevealed ? "blur(0)" : "blur(4px)",
                transition: `all 800ms ${spring} 200ms`,
              }}
            >
              AreaAlert empowers communities across Bangladesh to report, track,
              and resolve electricity, water, and internet outages in real-time.
            </p>

            <div
              ref={ctaRef}
              className="mt-10 flex flex-col gap-4 sm:flex-row w-full sm:w-auto"
              style={{
                opacity: ctaRevealed ? 1 : 0,
                transform: ctaRevealed ? "translateY(0)" : "translateY(20px)",
                filter: ctaRevealed ? "blur(0)" : "blur(4px)",
                transition: `all 800ms ${spring} 300ms`,
              }}
            >
              <Link href="/report">
                <Button size="lg">
                  Report Outage <Activity className="ml-2" />
                </Button>
              </Link>

              <Link href="/reports">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base bg-background/50 backdrop-blur-sm transition-all hover:bg-muted"
                >
                  Explore Map <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
            </div>

            {/* Social Proof / Trust */}
            <div className="mt-12 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="size-10 rounded-full border-2 border-background bg-muted overflow-hidden"
                  >
                    <img
                      src={`https://api.dicebear.com/9.x/notionists/svg?seed=${i}&backgroundColor=transparent`}
                      alt="User"
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="font-semibold text-foreground">
                  Trusted by 10k+
                </div>
                <div className="text-muted-foreground">community members</div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Visuals */}
          <div
            ref={visualRef}
            className="relative hidden lg:flex h-full min-h-[600px] w-full items-center justify-center perspective-[1000px]"
            style={{
              opacity: visualRevealed ? 1 : 0,
              transform: visualRevealed
                ? "scale(0.95) translateY(20px)"
                : "scale(0.9) translateY(40px)",
              filter: visualRevealed ? "blur(0)" : "blur(10px)",
              transition: `all 1000ms ${spring} 400ms`,
            }}
          >
            {/* Main Center Card */}
            <div
              className="absolute z-20 w-[380px] rounded-3xl bg-card/80 border border-border/50 shadow-2xl backdrop-blur-xl p-6 transition-transform duration-700 ease-out"
              style={{
                transform: `rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Zap className="size-6 fill-primary/20" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">
                      Power Outage
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Gulshan-1, Dhaka
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold animate-pulse">
                  Active
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[65%] bg-primary rounded-full" />
                </div>
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span>Reported 2h ago</span>
                  <span className="text-primary">Resolving soon</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ShieldCheck className="size-4 text-emerald-500" />
                  Verified by 42 users
                </div>
                <div className="flex -space-x-2">
                  <div className="size-6 rounded-full bg-emerald-100 border border-background" />
                  <div className="size-6 rounded-full bg-blue-100 border border-background" />
                  <div className="size-6 rounded-full bg-purple-100 border border-background" />
                </div>
              </div>
            </div>

            {/* Floating Card 1 - Top Right */}
            <div
              className="absolute z-10 w-[240px] rounded-2xl bg-card/60 border border-border/40 shadow-xl backdrop-blur-md p-4 -top-8 -right-4 transition-transform duration-700 ease-out"
              style={{
                transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px) rotate(6deg)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Droplets className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Water Supply</div>
                  <div className="text-xs text-emerald-500">Restored</div>
                </div>
              </div>
            </div>

            {/* Floating Card 2 - Bottom Left */}
            <div
              className="absolute z-30 w-[260px] rounded-2xl bg-card/60 border border-border/40 shadow-xl backdrop-blur-md p-4 -bottom-12 -left-8 transition-transform duration-700 ease-out"
              style={{
                transform: `translate(${-mousePos.x * 0.6}px, ${-mousePos.y * 0.6}px) rotate(-4deg)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <Wifi className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">ISP Downtime</div>
                  <div className="text-xs text-muted-foreground">
                    Dhanmondi, 5m ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
