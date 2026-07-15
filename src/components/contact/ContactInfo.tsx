import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";

export function ContactInfo() {
  const contactDetails = [
    {
      title: "Email Us",
      description: "Our friendly team is here to help.",
      value: "hello@areaalert.com.bd",
      icon: Mail,
      href: "mailto:hello@areaalert.com.bd",
    },
    {
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm.",
      value: "+880 1234 567890",
      icon: Phone,
      href: "tel:+8801234567890",
    },
    {
      title: "Visit Us",
      description: "Come say hello at our office.",
      value: "Banani, Dhaka, Bangladesh",
      icon: MapPin,
      href: "#",
    },
  ];

  return (
    <StaggerContainer delay={0.1} className="space-y-6">
      <div className="grid gap-4">
        {contactDetails.map((item, index) => (
          <StaggerItem key={index}>
            <Card className="transition-colors hover:border-primary/50">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                  <Link href={item.href} className="text-sm font-medium text-primary hover:underline">
                    {item.value}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </div>
    </StaggerContainer>
  );
}
