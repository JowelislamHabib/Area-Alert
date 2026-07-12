"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Video, ChevronDown, ChevronUp } from "lucide-react";

export function ReportMedia({ image, videoId }: { image?: string | null; videoId?: string | null }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!image && !videoId) return null;

  return (
    <div className="space-y-4 mb-8">
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          {image ? <ImageIcon className="size-4" /> : <Video className="size-4" />}
          {isOpen ? "Hide Attachment" : "View Attachment"}
        </span>
        {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </Button>

      {isOpen && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {image && (
            <div className="rounded-xl overflow-hidden border border-border/50 shadow-sm bg-muted/50">
              <img src={image} alt="Outage Attachment" className="w-full h-auto max-h-[500px] object-contain" />
            </div>
          )}
          {videoId && (
            <div className="rounded-xl overflow-hidden border border-border/50 shadow-sm aspect-video bg-muted">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
