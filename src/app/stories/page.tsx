import { FadeIn } from "@/components/ui/motion-wrapper";
import { StoriesGrid } from "@/components/stories/StoriesGrid";

export const metadata = {
  title: "Community Stories | AreaAlert",
  description: "Read how AreaAlert empowers communities across Bangladesh with real-time local service updates.",
};

export default function StoriesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <FadeIn className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-sm font-medium">
                Community Voices
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Real Stories.<br />
                Real Impact.
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Discover how AreaAlert empowers people across Bangladesh to share real-time updates, making neighborhoods safer and better connected every single day.
              </p>
            </FadeIn>

            {/* Right: Abstract Graphic / Avatars Collage */}
            <FadeIn delay={0.2} className="hidden lg:flex justify-center items-center relative h-[300px]">
              {/* Central glowing circle */}
              <div className="absolute w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl animate-pulse" />
              
              {/* Floating avatar circles (CSS purely visual) */}
              <div className="absolute top-4 left-10 w-16 h-16 rounded-full border-4 border-primary bg-[#F4F7F6] flex items-center justify-center shadow-2xl animate-float">
                <span className="text-primary font-bold text-xl">R</span>
              </div>
              <div className="absolute bottom-10 left-20 w-12 h-12 rounded-full border-4 border-primary bg-[#F4F7F6] flex items-center justify-center shadow-2xl animate-float-delayed">
                <span className="text-primary font-bold text-lg">N</span>
              </div>
              <div className="absolute top-20 right-16 w-20 h-20 rounded-full border-4 border-primary bg-[#F4F7F6] flex items-center justify-center shadow-2xl animate-float-slow">
                <span className="text-primary font-bold text-2xl">H</span>
              </div>
              <div className="absolute bottom-4 right-24 w-14 h-14 rounded-full border-4 border-primary bg-[#F4F7F6] flex items-center justify-center shadow-2xl animate-float">
                <span className="text-primary font-bold text-lg">T</span>
              </div>
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <path d="M120 80 Q 200 150 280 120" stroke="white" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                <path d="M100 240 Q 150 180 250 250" stroke="white" strokeWidth="2" fill="none" strokeDasharray="5,5" />
              </svg>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main Content: Stories Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StoriesGrid />
        </div>
      </section>
    </div>
  );
}
