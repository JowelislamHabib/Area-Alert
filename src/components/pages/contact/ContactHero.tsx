import { MessageSquare } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-12 sm:pt-32 sm:pb-16">
      <div className="absolute inset-0 bg-[url('https://ui.shadcn.com/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <MessageSquare className="h-4 w-4" />
            <span>Get in Touch</span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
            We'd Love to <span className="text-primary">Hear From You</span>
          </h1>
          
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Whether you have a question about the platform, want to report a bug, or just want to say hi, our team is ready to answer all your questions.
          </p>
        </div>
      </div>
    </section>
  );
}
