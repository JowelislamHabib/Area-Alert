"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown, FilterX } from "lucide-react";
import { cn } from "@/lib/utils";

type DistrictData = { district: string; areas: string[] }[];

export function ReportsFilter({ areaData }: { areaData: DistrictData }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [districtOpen, setDistrictOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);

  const currentDistrict = searchParams.get("district") || "";
  const currentArea = searchParams.get("area") || "";
  const currentUtility = searchParams.get("utilityType") || "";
  const currentSort = searchParams.get("sortBy") || "newest";

  const districts = areaData.map((d) => d.district);
  const selectedDistrictData = areaData.find((d) => d.district === currentDistrict);
  const areas = selectedDistrictData ? selectedDistrictData.areas : [];

  const updateParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      
      if (name === "district" && value !== currentDistrict) {
        params.delete("area");
      }

      router.push(`/reports?${params.toString()}`);
    },
    [searchParams, router, currentDistrict]
  );

  const clearFilters = () => {
    router.push(`/reports`);
  };

  const hasFilters = currentDistrict || currentArea || currentUtility || currentSort !== "newest";

  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-muted-foreground hover:text-foreground">
            <FilterX className="size-4 mr-2" /> Clear
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Utility Type</Label>
          <Select value={currentUtility} onValueChange={(val) => updateParam("utilityType", val === "all" || !val ? "" : val)}>
            <SelectTrigger>
              <SelectValue placeholder="All Utilities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Utilities</SelectItem>
              <SelectItem value="electricity">Electricity</SelectItem>
              <SelectItem value="internet">Internet</SelectItem>
              <SelectItem value="water">Water</SelectItem>
              <SelectItem value="gas">Gas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sort By</Label>
          <Select value={currentSort} onValueChange={(val) => updateParam("sortBy", val || "newest")}>
            <SelectTrigger>
              <SelectValue placeholder="Newest First" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="most_upvoted">Most Upvoted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>District</Label>
          <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={districtOpen}
                  className={cn("w-full justify-between font-normal", !currentDistrict && "text-muted-foreground")}
                />
              }
            >
              {currentDistrict || "Any District"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </PopoverTrigger>
            <PopoverContent className="w-[--anchor-width] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search district..." />
                <CommandList>
                  <CommandEmpty>No district found.</CommandEmpty>
                  <CommandGroup>
                    {districts.map((d) => (
                      <CommandItem
                        key={d}
                        value={d}
                        onSelect={(val) => {
                          const actual = districts.find(x => x.toLowerCase() === val) || val;
                          updateParam("district", actual === currentDistrict ? "" : actual);
                          setDistrictOpen(false);
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", currentDistrict === d ? "opacity-100" : "opacity-0")} />
                        {d}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Area</Label>
          <Popover open={areaOpen} onOpenChange={setAreaOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={areaOpen}
                  className={cn("w-full justify-between font-normal", !currentArea && "text-muted-foreground")}
                  disabled={!currentDistrict}
                />
              }
            >
              {currentArea || "Any Area"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </PopoverTrigger>
            <PopoverContent className="w-[--anchor-width] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search area..." />
                <CommandList>
                  <CommandEmpty>No area found.</CommandEmpty>
                  <CommandGroup>
                    {areas.map((a) => (
                      <CommandItem
                        key={a}
                        value={a}
                        onSelect={(val) => {
                          const actual = areas.find(x => x.toLowerCase() === val) || val;
                          updateParam("area", actual === currentArea ? "" : actual);
                          setAreaOpen(false);
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", currentArea === a ? "opacity-100" : "opacity-0")} />
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
    </div>
  );
}
