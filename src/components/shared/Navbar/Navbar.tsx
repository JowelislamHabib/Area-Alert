"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AlertTriangle, LogOut, Menu, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Reports", href: "/reports" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const callbackQuery = `?redirect=${encodeURIComponent(currentPath)}`;
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <AlertTriangle className="h-5 w-5 text-primary" />
          <span className="font-heading text-lg">AreaAlert</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link href="/add-report">
            <Button size="sm" className="font-semibold">
              <Plus className="mr-1.5 size-4" /> Add Report
            </Button>
          </Link>
          {isPending ? null : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex size-10 items-center justify-center overflow-hidden rounded-full border outline-none focus-visible:ring-2 focus-visible:ring-ring ml-2">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || ""}
                    width={40}
                    height={40}
                    className="size-full object-cover"
                  />
                ) : (
                  <User size={20} className="text-muted-foreground" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {user.email}
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} variant="destructive">
                  <LogOut size={16} className="mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2 ml-2 pl-4 border-l border-border/40">
              <Link href={`/login${callbackQuery}`}>
                <Button variant="ghost" size="sm" className="font-semibold text-muted-foreground hover:text-foreground">
                  Login
                </Button>
              </Link>
              <Link href={`/register${callbackQuery}`}>
                <Button variant="outline" size="sm" className="font-semibold">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" />
            }
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                AreaAlert
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 mt-4 px-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground ${
                      isActive ? "bg-accent text-foreground font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex flex-col gap-2 px-4 mt-6 pt-4 border-t">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-muted">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || ""}
                          width={32}
                          height={32}
                          className="size-full object-cover"
                        />
                      ) : (
                        <User size={16} className="text-muted-foreground" />
                      )}
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                  >
                    <LogOut size={16} />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link href={`/login${callbackQuery}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href={`/register${callbackQuery}`} className="w-full">
                    <Button className="w-full" onClick={() => setOpen(false)}>
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
