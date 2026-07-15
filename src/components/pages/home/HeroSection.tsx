import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Search, ArrowRight, Zap, Wifi, Droplets, Flame, Shield, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2Mkgxdi0yaDE1em0wLTR2Mkg4di0yaDE2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="space-y-6 text-primary-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Shield className="size-4" />
              Community-Powered Utility Tracking
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-primary-foreground text-balance leading-[1.15]">
              Your Voice Keeps Our <span className="text-primary-foreground/80">Community Safe</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-lg leading-relaxed text-balance">
              When disaster strikes, we are each other's lifeline. Share real-time updates and rely on your neighbors to navigate power outages, floods, and crises together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/reports"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "font-semibold bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0 shadow-lg shadow-black/10"
                )}
              >
                <Search className="mr-2 size-4" />
                Explore Reports
              </Link>
              <Link
                href="/add-report"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "bg-transparent font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                )}
              >
                Report an Outage
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Floating utility cards */}
              <div className="absolute top-4 left-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center gap-3 shadow-lg shadow-black/10 rotate-[-4deg] hover:rotate-0 transition-transform duration-300">
                <div className="flex size-12 items-center justify-center rounded-xl bg-yellow-400/20 text-yellow-300">
                  <Zap className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Electricity</p>
                  <p className="text-xs text-white/60">142 active reports</p>
                </div>
              </div>
              <div className="absolute top-32 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center gap-3 shadow-lg shadow-black/10 rotate-[3deg] hover:rotate-0 transition-transform duration-300">
                <div className="flex size-12 items-center justify-center rounded-xl bg-blue-400/20 text-blue-300">
                  <Wifi className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Internet</p>
                  <p className="text-xs text-white/60">89 active reports</p>
                </div>
              </div>
              <div className="absolute bottom-32 left-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center gap-3 shadow-lg shadow-black/10 rotate-[2deg] hover:rotate-0 transition-transform duration-300">
                <div className="flex size-12 items-center justify-center rounded-xl bg-cyan-400/20 text-cyan-300">
                  <Droplets className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Water</p>
                  <p className="text-xs text-white/60">67 active reports</p>
                </div>
              </div>
              <div className="absolute bottom-12 right-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center gap-3 shadow-lg shadow-black/10 rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                <div className="flex size-12 items-center justify-center rounded-xl bg-orange-400/20 text-orange-300">
                  <Flame className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Gas</p>
                  <p className="text-xs text-white/60">34 active reports</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Clock className="size-8 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom wave */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-16 sm:h-24 text-background" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,100 C360,0 720,0 1080,50 C1260,75 1380,100 1440,100 L1440,100 L0,100 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
