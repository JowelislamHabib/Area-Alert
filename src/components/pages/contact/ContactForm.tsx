"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Send a Message</CardTitle>
        <CardDescription>
          Fill out the form below and we'll reply to your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="John Doe" 
              required 
              className="bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="john@example.com" 
              required 
              className="bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea 
              id="message" 
              name="message" 
              placeholder="How can we help you?" 
              required 
              className="min-h-[150px] resize-none bg-background"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Sending...</>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
