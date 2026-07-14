import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-background/50 px-4">
      <div className="relative flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700">
        {/* Glow effect behind the logo */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8 flex items-center justify-center">
          {/* Subtle spinning rings */}
          <div
            className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary/80 border-r-primary/30 border-b-primary/10 animate-spin"
            style={{ animationDuration: "2s" }}
          />

          <div
            className="absolute inset-2 rounded-full border-[3px] border-transparent border-l-primary/60 border-t-primary/20 animate-spin"
            style={{ animationDuration: "3s", animationDirection: "reverse" }}
          />

          {/* The Favicon in the center with a gentle breathing effect */}
          <div
            className="relative flex items-center justify-center animate-pulse"
            style={{ animationDuration: "2s" }}
          >
            <Image
              src="/areaalert-favicon.png"
              alt="AreaAlert Logo"
              width={72}
              height={72}
              className="object-contain drop-shadow-md relative z-10"
              priority
            />
          </div>
        </div>

        {/* Text area */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground/90 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Loading AreaAlert
          </h2>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className="h-2 w-2 rounded-full bg-primary/80 animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="h-2 w-2 rounded-full bg-primary/80 animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-2 w-2 rounded-full bg-primary/80 animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
