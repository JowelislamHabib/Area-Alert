import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Facebook", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="/areaalert-logo.png"
                alt="AreaAlert Logo"
                width={200}
                height={50}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Community-powered utility outage tracking for Bangladesh. Know
              before you go. Report when you know.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Social</h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} AreaAlert. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
