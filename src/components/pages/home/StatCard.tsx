import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({
  label,
  value,
  icon: Icon,
  description,
  accent = "from-primary to-primary/70",
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  accent?: string;
}) {
  return (
    <Card className="border-border/60 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
      <CardContent className="pt-6 pb-6">
        <div className="flex items-start gap-4">
          <div className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-lg shadow-primary/10 shrink-0`}>
            <Icon className="size-6" />
          </div>
          <div className="space-y-1 min-w-0">
            <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{value}</p>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            {description && (
              <p className="text-xs text-muted-foreground/70 truncate">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
