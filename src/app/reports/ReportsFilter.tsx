"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Check,
  ChevronsUpDown,
  FilterX,
  CalendarIcon,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

type DistrictData = { district: string; areas: string[] }[];

export function ReportsFilter({
  areaData,
  children,
}: {
  areaData: DistrictData;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const [districtOpen, setDistrictOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);

  const [localFilters, setLocalFilters] = useState({
    district: searchParams.get("district") || "",
    area: searchParams.get("area") || "",
    utilityType: searchParams.get("utilityType") || "",
    status: searchParams.get("status") || "",
    sortBy: searchParams.get("sortBy") || "newest",
    datePreset: searchParams.get("datePreset") || "all",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  });

  useEffect(() => {
    if (isOpen) {
      setLocalFilters({
        district: searchParams.get("district") || "",
        area: searchParams.get("area") || "",
        utilityType: searchParams.get("utilityType") || "",
        status: searchParams.get("status") || "",
        sortBy: searchParams.get("sortBy") || "newest",
        datePreset: searchParams.get("datePreset") || "all",
        startDate: searchParams.get("startDate") || "",
        endDate: searchParams.get("endDate") || "",
      });
    }
  }, [isOpen, searchParams]);

  const currentDistrict = localFilters.district;
  const currentArea = localFilters.area;
  const currentUtility = localFilters.utilityType;
  const currentSort = localFilters.sortBy;
  const currentStatus = localFilters.status;
  const currentPreset = localFilters.datePreset;

  const date = ((localFilters.startDate || localFilters.endDate) && currentPreset === "custom") ? {
    from: localFilters.startDate ? new Date(localFilters.startDate) : undefined,
    to: localFilters.endDate ? new Date(localFilters.endDate) : undefined,
  } : undefined;

  const districts = areaData.map((d) => d.district);
  const selectedDistrictData = areaData.find(
    (d) => d.district === currentDistrict,
  );
  const areas = selectedDistrictData ? selectedDistrictData.areas : [];

  const updateParam = useCallback(
    (name: string, value: string) => {
      setLocalFilters((prev) => {
        const next = { ...prev, [name]: value };
        if (name === "district" && value !== prev.district) {
          next.area = "";
        }
        return next;
      });
    },
    [],
  );

  const handleDatePreset = (preset: "all" | "today" | "custom") => {
    setLocalFilters((prev) => {
      const next = { ...prev, datePreset: preset };
      if (preset === "all") {
        next.startDate = "";
        next.endDate = "";
      } else if (preset === "today") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        next.startDate = today.toISOString();
        next.endDate = "";
      }
      return next;
    });
  };

  const handleCustomDateChange = (
    newDate: { from?: Date; to?: Date } | undefined,
  ) => {
    setLocalFilters((prev) => {
      const next = { ...prev, datePreset: "custom" };
      if (newDate?.from) next.startDate = newDate.from.toISOString();
      else next.startDate = "";

      if (newDate?.to) next.endDate = newDate.to.toISOString();
      else next.endDate = "";

      return next;
    });
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(localFilters).forEach(([key, value]) => {
      if (value && !(key === "sortBy" && value === "newest") && !(key === "datePreset" && value === "all")) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    if (localFilters.datePreset === "all") {
      params.delete("startDate");
      params.delete("endDate");
    }
    router.push(`/reports?${params.toString()}`);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    ["district", "area", "utilityType", "status", "sortBy", "datePreset", "startDate", "endDate"].forEach(k => params.delete(k));
    router.push(`/reports?${params.toString()}`);
    setIsOpen(false);
  };

  const hasFilters =
    localFilters.district ||
    localFilters.area ||
    localFilters.utilityType ||
    localFilters.sortBy !== "newest" ||
    localFilters.status ||
    localFilters.startDate ||
    localFilters.datePreset !== "all";

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3 w-full">
        {children}
        <Button
          variant={isOpen ? "default" : "outline"}
          className={cn(
            "h-11 px-4 gap-2 shadow-sm shrink-0",
            !isOpen && "bg-background border-input",
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </Button>
      </div>

      {isOpen && (
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8">
            {/* Service Type */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Service Type
              </h4>
              <div className="flex flex-col gap-1">
                <FilterOption
                  active={!currentUtility}
                  onClick={() => updateParam("utilityType", "")}
                >
                  All
                </FilterOption>
                <FilterOption
                  active={currentUtility === "electricity"}
                  onClick={() => updateParam("utilityType", "electricity")}
                >
                  Electricity
                </FilterOption>
                <FilterOption
                  active={currentUtility === "water"}
                  onClick={() => updateParam("utilityType", "water")}
                >
                  Water
                </FilterOption>
                <FilterOption
                  active={currentUtility === "internet"}
                  onClick={() => updateParam("utilityType", "internet")}
                >
                  Internet
                </FilterOption>
                <FilterOption
                  active={currentUtility === "gas"}
                  onClick={() => updateParam("utilityType", "gas")}
                >
                  Gas
                </FilterOption>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Status
              </h4>
              <div className="flex flex-col gap-1">
                <FilterOption
                  active={!currentStatus || currentStatus === "all"}
                  onClick={() => updateParam("status", "")}
                >
                  All
                </FilterOption>
                <FilterOption
                  active={currentStatus === "active"}
                  onClick={() => updateParam("status", "active")}
                >
                  Active
                </FilterOption>
                <FilterOption
                  active={currentStatus === "resolved"}
                  onClick={() => updateParam("status", "resolved")}
                >
                  Resolved
                </FilterOption>
              </div>
            </div>

            {/* District & Area */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  District
                </h4>
                <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={districtOpen}
                        className={cn(
                          "w-full justify-between font-normal bg-background h-9",
                          !currentDistrict && "text-muted-foreground",
                        )}
                      />
                    }
                  >
                    {currentDistrict || "All Districts"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[--anchor-width] p-0"
                    align="start"
                  >
                    <Command>
                      <CommandInput placeholder="Search district..." />
                      <CommandList>
                        <CommandEmpty>No district found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value="all_districts"
                            onSelect={() => {
                              updateParam("district", "");
                              setDistrictOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                !currentDistrict ? "opacity-100" : "opacity-0",
                              )}
                            />
                            All Districts
                          </CommandItem>
                          {districts.map((d) => (
                            <CommandItem
                              key={d}
                              value={d}
                              onSelect={(val) => {
                                const actual =
                                  districts.find(
                                    (x) => x.toLowerCase() === val,
                                  ) || val;
                                updateParam(
                                  "district",
                                  actual === currentDistrict ? "" : actual,
                                );
                                setDistrictOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  currentDistrict === d
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {d}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Area
                </h4>
                <Popover open={areaOpen} onOpenChange={setAreaOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={areaOpen}
                        className={cn(
                          "w-full justify-between font-normal bg-background h-9",
                          !currentArea && "text-muted-foreground",
                        )}
                        disabled={!currentDistrict}
                      />
                    }
                  >
                    {currentArea || "All Areas"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[--anchor-width] p-0"
                    align="start"
                  >
                    <Command>
                      <CommandInput placeholder="Search area..." />
                      <CommandList>
                        <CommandEmpty>No area found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value="all_areas"
                            onSelect={() => {
                              updateParam("area", "");
                              setAreaOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                !currentArea ? "opacity-100" : "opacity-0",
                              )}
                            />
                            All Areas
                          </CommandItem>
                          {areas.map((a) => (
                            <CommandItem
                              key={a}
                              value={a}
                              onSelect={(val) => {
                                const actual =
                                  areas.find((x) => x.toLowerCase() === val) ||
                                  val;
                                updateParam(
                                  "area",
                                  actual === currentArea ? "" : actual,
                                );
                                setAreaOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  currentArea === a
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {a}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Date & Sort */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Date
                </h4>
                <div className="flex flex-col gap-1">
                  <FilterOption
                    active={currentPreset === "all"}
                    onClick={() => handleDatePreset("all")}
                  >
                    All Time
                  </FilterOption>
                  <FilterOption
                    active={currentPreset === "today"}
                    onClick={() => handleDatePreset("today")}
                  >
                    Today
                  </FilterOption>

                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-2 h-9",
                            currentPreset !== "custom" &&
                              "text-muted-foreground",
                            currentPreset === "custom" &&
                              "border-emerald-500 ring-1 ring-emerald-500",
                          )}
                        />
                      }
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentPreset === "custom" && date?.from
                        ? date.to
                          ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
                          : format(date.from, "LLL dd, y")
                        : "Pick a Date Range"}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleCustomDateChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Sort By
                </h4>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between font-normal bg-background h-9"
                      />
                    }
                  >
                    {currentSort === "most_upvoted"
                      ? "Most Upvoted"
                      : "Newest First"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[--anchor-width] p-0"
                    align="start"
                  >
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            value="newest"
                            onSelect={() => updateParam("sortBy", "newest")}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                currentSort !== "most_upvoted"
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            Newest First
                          </CommandItem>
                          <CommandItem
                            value="most_upvoted"
                            onSelect={() =>
                              updateParam("sortBy", "most_upvoted")
                            }
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                currentSort === "most_upvoted"
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            Most Upvoted
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/50 flex justify-end gap-3">
            {hasFilters && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <FilterX className="size-4 mr-2" /> Clear Filters
              </Button>
            )}
            <Button onClick={applyFilters} className="bg-[#0f6b4b] hover:bg-[#0f6b4b]/90 text-white">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterOption({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-left px-3 h-9 flex items-center rounded-md text-sm font-semibold transition-colors",
        active ? "bg-[#0f6b4b] text-white" : "text-foreground hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}
