import { MessageSquare } from "lucide-react";

export function ContactHero() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 opacity-90" />
            Get in Touch
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl text-balance">
            Whether you have a question about the platform, want to report a bug, or just want to say hi, our team is ready to answer all your questions.
          </p>
        </div>
      </div>
    </div>
  );
}
