"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FadeIn, SlideUp } from "@/components/ui/motion-wrapper";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { STORIES, CATEGORIES } from "@/lib/data/stories";

export function StoriesGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredStories = STORIES.filter(
    (story) => activeCategory === "All" || story.category === activeCategory,
  );

  const displayedStories = filteredStories.slice(0, visibleCount);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(8); // Reset visibility when category changes
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="space-y-12">
      {/* Filters */}
      <FadeIn>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => handleCategoryChange(cat)}
              className="transition-all duration-300"
            >
              {cat}
            </Button>
          ))}
        </div>
      </FadeIn>

      {/* Masonry Grid */}
      <div
        key={`${activeCategory}-${visibleCount}`} // Force re-render animation when list changes
        className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        {displayedStories.map((story, index) => {
          const Icon = story.icon;

          return (
            <SlideUp
              key={story.id}
              delay={index * 0.05}
              className="break-inside-avoid"
            >
              <Card
                className={cn(
                  "bg-background hover:shadow-xl transition-all duration-300 border-border/50 relative overflow-hidden group hover:-translate-y-1",
                  story.featured ? "border-primary/20 bg-primary/5" : "",
                )}
              >
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
                    <div
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground"
                      title={story.category}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {story.content.map((paragraph, i) => (
                      <p
                        key={i}
                        className={cn(
                          "text-muted-foreground leading-relaxed relative",
                          // Make the first paragraph act as a pull-quote
                          i === 0
                            ? "text-foreground font-medium text-[15px]"
                            : "text-sm",
                        )}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SlideUp>
          );
        })}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredStories.length && (
        <FadeIn className="flex justify-center mt-12">
          <Button
            variant="secondary"
            onClick={handleLoadMore}
            className="font-semibold shadow-sm"
          >
            Load More Stories
          </Button>
        </FadeIn>
      )}
    </div>
  );
}
