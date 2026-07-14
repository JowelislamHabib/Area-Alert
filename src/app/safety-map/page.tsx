"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SafetyMapHero } from "@/components/pages/safety-map/SafetyMapHero";
import { DistrictGrid } from "@/components/pages/safety-map/DistrictGrid";
import { Loader2, Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface AreaStats {
  name: string;
  totalReports: number;
  activeReports: number;
  resolvedReports: number;
  score: number;
  safetyLevel: string;
  activeUtilities: {
    electricity: number;
    water: number;
    gas: number;
    internet: number;
    flood: number;
  };
  districtName?: string;
}

export interface DistrictStats {
  name: string;
  district: string;
  totalReports: number;
  activeReports: number;
  resolvedReports: number;
  score: number;
  safetyLevel: string;
  activeUtilities: {
    electricity: number;
    water: number;
    gas: number;
    internet: number;
    flood: number;
  };
}

function SafetyMapContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [activeTab, setActiveTab] = useState<"districts" | "areas">(
    (searchParams.get("type") as "districts" | "areas") || "districts",
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedDistrict, setSelectedDistrict] = useState(
    searchParams.get("district") || "",
  );
  const [utilityFilter, setUtilityFilter] = useState(
    searchParams.get("utilityType") || "all",
  );
  const [safetyFilter, setSafetyFilter] = useState(
    searchParams.get("safetyLevel") || "all",
  );
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10),
  );

  const [stats, setStats] = useState<DistrictStats[]>([]);
  const [overview, setOverview] = useState({
    safeCount: 0,
    activeCount: 0,
    activeOutages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // Sync state to URL whenever it changes
  const updateUrlParams = useCallback(
    (newParams: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      // Use replace to avoid filling history with every keystroke
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const handleTabChange = (tab: "districts" | "areas") => {
    setActiveTab(tab);
    setPage(1);
    updateUrlParams({ type: tab, page: "1" });
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setPage(1);
    updateUrlParams({ q: val, page: "1" });
  };

  const handleUtilityChange = (val: string | null) => {
    if (!val) return;
    setUtilityFilter(val);
    setPage(1);
    updateUrlParams({ utilityType: val === "all" ? null : val, page: "1" });
  };

  const handleSafetyChange = (val: string | null) => {
    if (!val) return;
    setSafetyFilter(val);
    setPage(1);
    updateUrlParams({ safetyLevel: val === "all" ? null : val, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrlParams({ page: newPage.toString() });
  };

  const handleClearDistrict = () => {
    setSelectedDistrict("");
    setPage(1);
    updateUrlParams({ district: null, page: "1" });
  };

  const handleViewAreas = (districtName: string) => {
    setActiveTab("areas");
    setSelectedDistrict(districtName);
    setPage(1);
    updateUrlParams({ type: "areas", district: districtName, page: "1" });
  };

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/safety-stats`,
      );
      url.searchParams.set("type", activeTab);
      url.searchParams.set("page", page.toString());
      url.searchParams.set("limit", "12");
      if (searchQuery) url.searchParams.set("q", searchQuery);
      if (selectedDistrict && activeTab === "areas")
        url.searchParams.set("district", selectedDistrict);
      if (utilityFilter !== "all")
        url.searchParams.set("utilityType", utilityFilter);
      if (safetyFilter !== "all")
        url.searchParams.set("safetyLevel", safetyFilter);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch safety stats");
      const data = await res.json();

      setStats(data.stats);
      setTotalPages(data.totalPages || 1);
      if (data.overview) setOverview(data.overview);
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to load safety data");
    } finally {
      setLoading(false);
    }
  }, [
    activeTab,
    page,
    searchQuery,
    selectedDistrict,
    utilityFilter,
    safetyFilter,
  ]);

  // Use a debouncer for the search query to avoid spamming the backend
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchStats();
    }, 300);
    return () => clearTimeout(handler);
  }, [fetchStats]);

  return (
    <>
      <SafetyMapHero overview={overview} activeType={activeTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Legend & Tabs container */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-6 overflow-x-auto shadow-sm">
            <span className="font-semibold text-sm whitespace-nowrap">
              Safety Score:
            </span>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-sm text-muted-foreground">
                80–100: Safe
              </span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="text-sm text-muted-foreground">
                50–79: Caution
              </span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="text-sm text-muted-foreground">
                0–49: Avoid if possible
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border shadow-sm w-fit">
              <Button
                variant="ghost"
                className={cn(
                  "px-6",
                  activeTab === "districts" && "bg-background shadow-sm",
                )}
                onClick={() => handleTabChange("districts")}
              >
                Districts
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "px-6",
                  activeTab === "areas" && "bg-background shadow-sm",
                )}
                onClick={() => handleTabChange("areas")}
              >
                Areas
              </Button>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search location..."
                  className="pl-9 bg-card border-border shadow-sm"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
              <Select value={utilityFilter} onValueChange={handleUtilityChange}>
                <SelectTrigger className="w-[150px] bg-card border-border shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground font-medium">
                      Utility:
                    </span>
                    <SelectValue placeholder="All" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="electricity">Electricity</SelectItem>
                  <SelectItem value="water">Water</SelectItem>
                  <SelectItem value="gas">Gas</SelectItem>
                  <SelectItem value="internet">Internet</SelectItem>
                </SelectContent>
              </Select>
              <Select value={safetyFilter} onValueChange={handleSafetyChange}>
                <SelectTrigger className="w-[150px] bg-card border-border shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground font-medium">
                      Safety:
                    </span>
                    <SelectValue placeholder="All" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="safe">Safe</SelectItem>
                  <SelectItem value="caution">Caution</SelectItem>
                  <SelectItem value="avoid">Avoid if possible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeTab === "areas" && selectedDistrict && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-muted-foreground">
                Filtered by district:
              </span>
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 px-3 py-1 rounded-md text-sm font-medium border border-emerald-200 dark:border-emerald-900">
                {selectedDistrict}
                <button
                  onClick={handleClearDistrict}
                  className="hover:bg-emerald-200 dark:hover:bg-emerald-800 p-0.5 rounded-sm transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {loading && stats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground animate-pulse">
              Analyzing safety data...
            </p>
          </div>
        ) : stats.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-border shadow-sm">
            <h3 className="text-2xl font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter.
            </p>
          </div>
        ) : (
          <>
            <div
              className={cn(
                "transition-opacity duration-200",
                loading && "opacity-50 pointer-events-none",
              )}
            >
              <DistrictGrid
                stats={stats}
                activeTab={activeTab}
                onViewAreas={handleViewAreas}
              />
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1 || loading}
                  className="shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                </Button>
                <span className="text-sm font-medium text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, page + 1))
                  }
                  disabled={page === totalPages || loading}
                  className="shadow-sm"
                >
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default function SafetyMapPage() {
  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <Suspense fallback={<div className="min-h-screen" />}>
        <SafetyMapContent />
      </Suspense>
    </div>
  );
}
