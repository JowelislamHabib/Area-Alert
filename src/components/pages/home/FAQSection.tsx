"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How are reports verified?",
    answer:
      "Reports are community-verified when multiple users confirm the same issue in the same area. You can upvote a report to add your confirmation. The more confirmations a report gets, the more trustworthy it becomes.",
  },
  {
    question: "Can I edit or delete my reports?",
    answer:
      "Yes. You can edit or delete any report you've submitted from your My Reports dashboard. Go to your profile, find the report, and use the edit or delete options.",
  },
  {
    question: "Is the platform free to use?",
    answer:
      "Yes, AreaAlert is completely free for all users. You can browse reports without an account, and creating an account to submit reports is also free.",
  },
  {
    question: "What types of outages can I report?",
    answer:
      "You can report electricity, internet, water, and gas outages. For internet reports, you can optionally specify your ISP name to help others identify if it's a localized or provider-wide issue.",
  },
  {
    question: "How do I search for reports in my area?",
    answer:
      "Use the search bar on the Explore Reports page to filter by area, district, or utility type. You can also sort by newest, oldest, or most recently updated.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <HelpCircle className="size-4" />
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
              Frequently asked questions
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              Everything you need to know about AreaAlert. Can't find the answer you're looking for? Reach out to our community.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={cn(
                    "rounded-[var(--radius)] border overflow-hidden transition-all duration-300",
                    isOpen
                      ? "border-primary/20 bg-card shadow-lg shadow-primary/5"
                      : "border-border/60 bg-card hover:border-border"
                  )}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={cn(
                      "font-semibold text-base transition-colors",
                      isOpen ? "text-primary" : "text-foreground"
                    )}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
                        isOpen && "rotate-180 text-primary"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
