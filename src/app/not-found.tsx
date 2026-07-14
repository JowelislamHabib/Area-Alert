import { Button } from "@/components/ui/button";
import { FileQuestion, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-muted/30 font-sans">
      <div className="max-w-md w-full bg-card border border-border/50 rounded-2xl shadow-sm p-8 text-center flex flex-col items-center">
        <div className="size-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 ring-4 ring-orange-500/5">
          <FileQuestion className="size-8 text-orange-500" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">
          404
        </h1>

        <h2 className="text-lg font-bold mb-3 text-foreground/80">
          Page Not Found
        </h2>

        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          We couldn't find the page you were looking for. It might have been
          removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <Button variant="default" className="w-full sm:w-auto min-w-[150px] p-0" asChild>
            <Link href="/reports" className="flex items-center justify-center w-full h-full px-4 py-2">
              <Search className="size-4 mr-2" />
              Explore Reports
            </Link>
          </Button>

          <Button variant="outline" className="w-full sm:w-auto min-w-[150px] p-0" asChild>
            <Link href="/" className="flex items-center justify-center w-full h-full px-4 py-2">
              <Home className="size-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
