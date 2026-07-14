import Link from "next/link";
import Image from "next/image";
import { Map, User, Link as LinkIcon, Share2 } from "lucide-react";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Reports", href: "/reports" },
  { label: "Safety Map", href: "/safety-map" },
  { label: "About Us", href: "/about" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
  { label: "Add Report", href: "/add-report" },
  { label: "My Reports", href: "/reports/my-reports" },
];

const legalLinks = [
  { label: "Contact Support", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  { label: "Facebook", icon: FacebookIcon, href: "#" },
  {
    label: "LinkedIn",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/jowelislamhabib/",
  },
  { label: "X", icon: TwitterIcon, href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand & Vision */}
          <div className="lg:col-span-5 lg:pr-8">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold mb-6"
            >
              <Image
                src="/areaalert-logo.png"
                alt="AreaAlert Logo"
                width={200}
                height={50}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              AreaAlert empowers communities across Bangladesh to share
              real-time local service updates, making neighborhoods more
              informed, safer, and better connected.
            </p>
            <p className="text-sm font-bold text-primary leading-relaxed">
              Know before you go. Report when you know.
            </p>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
              <Map className="size-4 text-primary" /> Explore
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links (Static) */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
              <User className="size-4 text-primary" /> Account
            </h3>
            <ul className="space-y-3">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
              <LinkIcon className="size-4 text-primary" /> Connect
            </h3>
            <ul className="space-y-3 mb-8">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
              <Share2 className="size-4 text-primary" /> Social
            </h3>
            <ul className="flex flex-wrap gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex size-9 items-center justify-center rounded-md bg-secondary text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground"
                      aria-label={link.label}
                    >
                      <Icon className="size-4" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="mt-16 border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-muted-foreground">
            &copy; {new Date().getFullYear()} AreaAlert. All rights reserved.
          </p>
          <p className="text-xs font-medium text-muted-foreground/60">
            Community-powered utility outage tracking for Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  );
}
