"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { Eye, EyeOff, Zap, MapPin, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { SlideUp } from "@/components/ui/motion-wrapper";

function validateEmail(email: string): string | null {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Enter a valid email address";
  return null;
}

function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("redirect") || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const emailErr = validateEmail(email.trim());
    const passwordErr = validatePassword(password);
    setFieldErrors({
      email: emailErr ?? undefined,
      password: passwordErr ?? undefined,
    });
    return !emailErr && !passwordErr;
  };

  const [error, submitAction, isPending] = useActionState(
    async (prevState: string | null, formData: FormData) => {
      if (!validate()) return null;

      const { error: signInError } = await signIn.email({
        email: email.trim(),
        password,
      });

      if (signInError) {
        return signInError.message || "Invalid credentials";
      }

      toast.success("Logged in successfully");
      window.location.href = callbackUrl;
      return null;
    },
    null,
  );

  const handleGoogle = async () => {
    await signIn.social({ provider: "google" });
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-8 bg-muted/20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp delay={0.1} className="w-full bg-background rounded-[var(--radius)] md:rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-border/50">
          {/* Left Panel: Emotional Value Prop */}
          <div className="w-full md:w-3/5 bg-primary p-8 md:p-12 lg:p-14 text-primary-foreground flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <Link href="/" className="inline-block mb-12">
                <Image
                  src="/areaalert-logo.png"
                  alt="AreaAlert Logo"
                  width={150}
                  height={40}
                  className="h-7 w-auto brightness-0 invert"
                />
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">
                Welcome back.
              </h1>
              <p className="text-primary-foreground/90 leading-relaxed mb-10 text-lg">
                Your neighborhood needs you. Log in to share real-time updates,
                avoid hazards, and help keep your community safe.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-foreground/15 p-2.5 rounded-xl shrink-0">
                    <Zap className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px]">
                      Real-time Outage Alerts
                    </h3>
                    <p className="text-sm text-primary-foreground/80 mt-1 leading-relaxed">
                      Know before you step out the door.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-foreground/15 p-2.5 rounded-xl shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px]">
                      Interactive Safety Map
                    </h3>
                    <p className="text-sm text-primary-foreground/80 mt-1 leading-relaxed">
                      Navigate your city avoiding waterlogging and hazards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-foreground/15 p-2.5 rounded-xl shrink-0">
                    <HeartHandshake className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px]">Community Driven</h3>
                    <p className="text-sm text-primary-foreground/80 mt-1 leading-relaxed">
                      A stronger, safer Bangladesh starts with you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-primary-foreground/20 hidden md:block">
              <p className="text-sm font-medium text-primary-foreground/80 italic">
                "AreaAlert helped me avoid a flooded route yesterday. It's an
                absolute lifesaver."
              </p>
            </div>
          </div>

          {/* Right Panel: Login Form */}
          <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-background">
            <div className="max-w-sm w-full mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Sign in to your account
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Enter your email and password to access your dashboard.
                </p>
              </div>

              <form
                action={submitAction}
                className="flex flex-col gap-5"
                noValidate
              >
                <div className="flex flex-col gap-2.5">
                  <Label
                    htmlFor="email"
                    className="font-semibold text-foreground/80"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email)
                        setFieldErrors((p) => ({ ...p, email: undefined }));
                    }}
                    aria-invalid={!!fieldErrors.email}
                    required
                    className="h-11"
                  />
                  {fieldErrors.email && (
                    <p className="text-xs font-medium text-destructive">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="font-semibold text-foreground/80"
                    >
                      Password
                    </Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password)
                          setFieldErrors((p) => ({
                            ...p,
                            password: undefined,
                          }));
                      }}
                      aria-invalid={!!fieldErrors.password}
                      required
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="text-xs font-medium text-destructive">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="h-11 w-full font-bold mt-2"
                >
                  {isPending ? "Signing in..." : "Sign in"}
                </Button>

                <div className="relative flex items-center gap-4 my-2">
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Or
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogle}
                  className="h-11 w-full font-semibold"
                >
                  <svg role="img" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={`/register${callbackUrl !== "/" ? `?redirect=${encodeURIComponent(callbackUrl)}` : ""}`}
                    className="font-bold text-primary hover:underline underline-offset-4"
                  >
                    Create one now
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </SlideUp>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
