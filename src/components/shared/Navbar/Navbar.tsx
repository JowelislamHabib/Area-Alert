"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  LogOut,
  Menu,
  User,
  Plus,
  FileText,
  LayoutDashboard,
} from "lucide-react";
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
  { label: "Safety Map", href: "/safety-map" },
  { label: "About", href: "/about" },
  { label: "Stories", href: "/stories" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const callbackQuery = isAuthPage
    ? ""
    : `?redirect=${encodeURIComponent(currentPath)}`;
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#F4F7F6] dark:bg-[#0F172A]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/areaalert-logo.png"
            alt="AreaAlert Logo"
            width={200}
            height={50}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors relative py-1 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />

          {isPending ? (
            <div className="w-10 h-10 ml-2 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-2 pl-2">
              <Button className="font-semibold rounded-md">
                <Link href="/add-report" className="flex items-center">
                  <Plus className="mr-1.5 size-4" /> Add Report
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex size-10 items-center justify-center overflow-hidden rounded-md border border-border/50 bg-secondary/50 outline-none focus-visible:ring-2 focus-visible:ring-ring ml-2 hover:bg-secondary transition-colors">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || ""}
                      width={40}
                      height={40}
                      className="size-full object-cover"
                    />
                  ) : (
                    <User size={18} className="text-foreground/70" />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-56 rounded-xl"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal p-3">
                      <div className="text-sm font-bold text-foreground">
                        {user.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer py-2.5">
                      <Link
                        href="/reports/my-reports"
                        className="flex items-center w-full"
                      >
                        <FileText
                          size={16}
                          className="mr-2.5 text-muted-foreground"
                        />
                        <span>My Reports</span>
                      </Link>
                    </DropdownMenuItem>
                    {user.role === "admin" && (
                      <DropdownMenuItem className="cursor-pointer py-2.5">
                        <Link
                          href="/admin"
                          className="flex items-center w-full"
                        >
                          <LayoutDashboard
                            size={16}
                            className="mr-2.5 text-muted-foreground"
                          />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    variant="destructive"
                    className="cursor-pointer py-2.5 flex items-center w-full text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <LogOut size={16} className="mr-2.5" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2 pl-4 border-l border-border/40">
              <Button
                variant={pathname === "/login" ? "default" : "ghost"}
                className={`font-semibold rounded-md ${pathname === "/login" ? "" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Link
                  href={`/login${callbackQuery}`}
                  className="flex items-center"
                >
                  Login
                </Link>
              </Button>
              <Button
                variant={pathname === "/register" ? "default" : "outline"}
                className="font-semibold rounded-md"
              >
                <Link
                  href={`/register${callbackQuery}`}
                  className="flex items-center"
                >
                  Register
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Actions & Menu */}
        <div className="flex lg:hidden items-center gap-3">
          {user && !isPending && (
            <Button size="sm" className="font-semibold rounded-md h-8 px-3">
              <Link href="/add-report" className="flex items-center">
                <Plus className="mr-1 size-4" /> Report
              </Link>
            </Button>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] sm:w-80 flex flex-col p-0 border-l border-border/50"
            >
              <SheetHeader className="p-4 pr-12 border-b border-border/40 text-left flex flex-row items-center justify-between mt-0">
                <SheetTitle>
                  <Image
                    src="/areaalert-logo.png"
                    alt="AreaAlert Logo"
                    width={150}
                    height={40}
                    className="h-6 w-auto"
                  />
                </SheetTitle>
                <ThemeToggle />
              </SheetHeader>
              <div className="flex-1 overflow-y-auto">
                <nav className="flex flex-col gap-1 p-4">
                  {navLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(link.href));
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted text-foreground/80 hover:text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                {user && (
                  <div className="px-4 pb-4">
                    <div className="h-px w-full bg-border/40 mb-4" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-2">
                      Account
                    </h4>
                    <nav className="flex flex-col gap-1">
                      <Link
                        href="/reports/my-reports"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold hover:bg-muted text-foreground/80 hover:text-foreground transition-colors"
                      >
                        <FileText size={18} className="text-muted-foreground" />
                        My Reports
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold hover:bg-muted text-foreground/80 hover:text-foreground transition-colors"
                        >
                          <LayoutDashboard
                            size={18}
                            className="text-muted-foreground"
                          />
                          Admin Dashboard
                        </Link>
                      )}
                    </nav>
                  </div>
                )}
              </div>

              {/* Mobile Auth Footer */}
              <div className="p-4 border-t border-border/40 bg-muted/20">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 px-2 mb-1">
                      <div className="flex size-10 items-center justify-center overflow-hidden rounded-md bg-secondary border border-border/50">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name || ""}
                            width={40}
                            height={40}
                            className="size-full object-cover"
                          />
                        ) : (
                          <User size={18} className="text-foreground/70" />
                        )}
                      </div>
                      <div className="text-sm overflow-hidden flex-1">
                        <div className="font-bold text-foreground truncate">
                          {user.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full rounded-md font-semibold mt-2"
                      onClick={() => setOpen(false)}
                    >
                      <Link
                        href="/add-report"
                        className="flex items-center justify-center"
                      >
                        <Plus className="mr-1.5 size-4" /> Add Report
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full rounded-md font-semibold text-destructive hover:text-destructive hover:bg-destructive/5"
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                    >
                      <LogOut size={16} className="mr-2" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={pathname === "/register" ? "default" : "outline"}
                      className="w-full rounded-md font-semibold"
                      onClick={() => setOpen(false)}
                    >
                      <Link
                        href={`/register${callbackQuery}`}
                        className="flex items-center justify-center"
                      >
                        Register
                      </Link>
                    </Button>
                    <Button
                      variant={pathname === "/login" ? "default" : "outline"}
                      className="w-full rounded-md font-semibold"
                      onClick={() => setOpen(false)}
                    >
                      <Link
                        href={`/login${callbackQuery}`}
                        className="flex items-center justify-center"
                      >
                        Login
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
