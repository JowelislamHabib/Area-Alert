import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";
import { STORIES } from "@/lib/data/stories";
import { cn } from "@/lib/utils";

export default function StoriesSection() {
  // Grab the 3 featured stories
  const featuredStories = STORIES.filter(story => story.featured).slice(0, 3);

  return (
    <section className="relative py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Success Stories
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
              Community Voices
            </h2>
            <p className="text-muted-foreground max-w-xl">
              See how real people use AreaAlert to stay safe, save time, and build stronger communities.
            </p>
          </div>
          <Link
            href="/stories"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "font-medium self-start sm:self-auto hover:bg-primary hover:text-primary-foreground"
            )}
          >
            Read all stories <ArrowRight className="ml-1.5 size-4" />
          </Link>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {featuredStories.map((story) => {
            const Icon = story.icon;
            return (
              <StaggerItem key={story.id} className="h-full">
                <Card className="h-full bg-background hover:shadow-xl transition-all duration-300 border-border/50 relative overflow-hidden group hover:-translate-y-1">
                  <Quote className="absolute top-4 right-4 h-16 w-16 text-muted/20 -z-10 group-hover:text-primary/10 transition-colors duration-300" />
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary overflow-hidden shadow-sm">
                        <Image
                          src={`https://i.pravatar.cc/150?img=${story.avatarId}`}
                          alt={story.persona}
                          width={48}
                          height={48}
                          className="object-cover size-full"
                          unoptimized
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground leading-tight">
                          {story.persona}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {story.role}
                        </p>
                      </div>

                      {/* Small category icon badge */}
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {story.content.slice(0, 2).map((paragraph, i) => (
                        <p 
                          key={i} 
                          className={cn(
                            "text-muted-foreground leading-relaxed relative",
                            i === 0 ? "text-foreground font-medium text-[15px]" : "text-sm line-clamp-3"
                          )}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn delay={0.4} className="mt-12 text-center sm:hidden">
          <Link 
            href="/stories" 
            className={cn(
              buttonVariants({ variant: "outline" }),
              "hover:bg-primary hover:text-primary-foreground"
            )}
          >
            Read all stories <ArrowRight className="ml-1.5 size-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
