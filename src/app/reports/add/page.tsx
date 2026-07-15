"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { createReport } from "@/lib/actions/report";
import { useSession } from "@/lib/auth-client";
import { isValidImageUrl, uploadImage } from "@/lib/api/uploadImage";
import { cn } from "@/lib/utils";

import { format } from "date-fns";
import {
  Camera,
  ImageIcon,
  Loader2,
  X,
  CalendarIcon,
  Zap,
  Droplets,
  Wifi,
  Flame,
  Clock,
  Navigation,
  MapPin,
  Video,
  PlaySquare,
  Check,
  ChevronsUpDown,
  Waves,
} from "lucide-react";
import { AuthRequired } from "@/components/shared/AuthRequired";
import { FadeIn, SlideUp } from "@/components/ui/motion-wrapper";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { toast } from "sonner";

import areaData from "@/../public/data/area.json";

const UTILITIES = [
  {
    id: "electricity",
    label: "Electricity",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    activeBorder: "border-amber-500",
  },
  {
    id: "water",
    label: "Water",
    icon: Droplets,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    activeBorder: "border-blue-500",
  },
  {
    id: "internet",
    label: "Internet",
    icon: Wifi,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    activeBorder: "border-purple-500",
  },
  {
    id: "gas",
    label: "Gas",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    activeBorder: "border-orange-500",
  },
  {
    id: "flood",
    label: "Flood",
    icon: Waves,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    activeBorder: "border-cyan-500",
  },
] as const;

const QUICK_CHIPS: Record<string, string[]> = {
  electricity: [
    "Total Blackout",
    "Low Voltage",
    "Frequent Drops",
    "Scheduled Outage",
  ],
  water: ["No Supply", "Low Pressure", "Dirty Water", "Pipe Burst"],
  internet: [
    "Complete Disconnection",
    "Slow Speeds",
    "High Ping",
    "Frequent Disconnects",
  ],
  gas: ["No Supply", "Low Pressure", "Gas Leak"],
  flood: ["Flash Flood", "Waterlogging", "Rising Water Level", "Dam Overflow"],
};

const getYoutubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function AddReportPage() {
  const router = useRouter();
  const { data: session } = useSession();

  // Core State
  const [utilityType, setUtilityType] = useState<string>("electricity");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [districtOpen, setDistrictOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);

  // Date / Time State
  const initialDate = new Date();
  const [isHappeningNow, setIsHappeningNow] = useState(true);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [time, setTime] = useState<string>(
    `${initialDate.getHours().toString().padStart(2, "0")}:${initialDate.getMinutes().toString().padStart(2, "0")}`,
  );

  // Details State
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [ispName, setIspName] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Media State
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [urlError, setUrlError] = useState("");

  // Video State
  const [videoUrl, setVideoUrl] = useState("");

  const districts = areaData.map((d) => d.district);
  const areas = areaData.find((d) => d.district === district)?.areas || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageUrl("");
    setImageFile(null);
    setPreview("");
    setUrlError("");
  };

  const handleChipClick = (chip: string) => {
    setShortDescription(chip);
    if (fieldErrors.shortDescription)
      setFieldErrors((p) => ({ ...p, shortDescription: "" }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!district) errors.district = "Select a district";
    if (!area) errors.area = "Select an area";
    if (!shortDescription.trim())
      errors.shortDescription = "Select or type a short description";
    if (utilityType === "internet" && !ispName.trim())
      errors.ispName = "ISP name is required";
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fill in all required fields.");
    }

    return Object.keys(errors).length === 0;
  };

  const [submitError, submitAction, submitting] = useActionState(
    async (prevState: string | null, formData: FormData) => {
      if (!session?.user) {
        toast.error("You must be logged in to report an outage");
        return "Authentication required";
      }

      if (!validate()) return null;

      // DateTime Logic
      let startDateTime = new Date();
      if (!isHappeningNow && date) {
        const [hours, minutes] = time.split(":");
        startDateTime = new Date(date);
        startDateTime.setHours(parseInt(hours || "0", 10));
        startDateTime.setMinutes(parseInt(minutes || "0", 10));
      }
      formData.set("startedAt", startDateTime.toISOString());

      // Values
      formData.set("district", district.trim());
      formData.set("area", area.trim());
      formData.set("utilityType", utilityType.trim());

      // Description is optional visually, but if empty we just pass shortDescription or leave it empty.
      if (!description.trim()) {
        formData.set("description", shortDescription.trim());
      } else {
        formData.set("description", description.trim());
      }

      if (videoUrl) {
        formData.set("videoUrl", videoUrl.trim());
      }

      if (imageFile) {
        try {
          const uploaded = await uploadImage(imageFile);
          formData.set("image", uploaded);
        } catch {
          return "Image upload failed. Please try again.";
        }
      } else if (imageUrl) {
        if (!isValidImageUrl(imageUrl)) {
          setUrlError("Invalid image URL");
          return null;
        }
      }

      const result = await createReport(formData);

      if (result.error) {
        return result.error;
      }

      toast.success("Outage reported successfully!");

      // Reset form state to defaults
      setUtilityType("electricity");
      setDistrict("");
      setArea("");
      setShortDescription("");
      setDescription("");
      setIspName("");
      setIsHappeningNow(true);
      setDate(new Date());
      setTime(
        `${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}`,
      );
      clearImage();
      setVideoUrl("");
      setFieldErrors({});

      return null;
    },
    null,
  );

  if (!session?.user) {
    return (
      <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-muted/30 p-4">
        <AuthRequired
          title="Sign in to report"
          description="You must be logged in to report an outage. This helps us prevent spam and ensure reliability."
          redirectUrl="/reports/add"
        />
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-muted/30 pb-8">
      {/* Hero Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <FadeIn className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Report an Outage
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl">
              Help your community by sharing what's happening.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <form action={submitAction} className="space-y-8" noValidate>
          {/* STEP 1: UTILITY SELECTION */}
          <SlideUp className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                1
              </span>
              What is the issue?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {UTILITIES.map((u) => {
                const Icon = u.icon;
                const isSelected = utilityType === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      setUtilityType(u.id);
                      setShortDescription(""); // reset chips
                    }}
                    className={cn(
                      "relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? cn("bg-card shadow-sm", u.activeBorder)
                        : "border-border/50 bg-card/50 opacity-70 hover:opacity-100 hover:border-border",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-full p-3 transition-colors duration-300",
                        isSelected ? u.bg : "bg-muted",
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-8",
                          isSelected ? u.color : "text-muted-foreground",
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        "font-medium",
                        isSelected
                          ? "text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {u.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Conditional ISP Input with animation */}
            {utilityType === "internet" && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300 pt-2">
                <Card className="border-purple-500/20 bg-purple-500/5">
                  <CardContent className="p-4 flex flex-col gap-2">
                    <Label
                      htmlFor="ispName"
                      className="text-purple-700 dark:text-purple-300"
                    >
                      Which Internet Service Provider (ISP)?
                    </Label>
                    <Input
                      id="ispName"
                      name="ispName"
                      placeholder="e.g. Link3, Grameenphone, DotInternet"
                      value={ispName}
                      onChange={(e) => {
                        setIspName(e.target.value);
                        if (fieldErrors.ispName)
                          setFieldErrors((p) => ({ ...p, ispName: "" }));
                      }}
                      className={cn(
                        "bg-background",
                        fieldErrors.ispName &&
                          "border-destructive ring-destructive",
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </SlideUp>

          {/* STEP 2: LOCATION */}
          <SlideUp delay={0.1} className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                2
              </span>
              Where is it happening?
            </h2>
            <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
              <CardContent className="p-6 grid grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col gap-3">
                  <Label
                    htmlFor="district"
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Navigation className="size-4" /> District
                  </Label>
                  <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={districtOpen}
                          className={cn(
                            "w-full justify-between h-11 bg-background/50",
                            fieldErrors.district &&
                              "border-destructive ring-destructive",
                            !district && "text-muted-foreground",
                          )}
                        />
                      }
                    >
                      {district ? district : "Select district..."}
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
                            {districts.map((d) => (
                              <CommandItem
                                key={d}
                                value={d}
                                onSelect={(currentValue) => {
                                  // CommandItem value is always lowercased. Let's find the original case.
                                  const originalValue =
                                    districts.find(
                                      (dist) =>
                                        dist.toLowerCase() === currentValue,
                                    ) || currentValue;
                                  setDistrict(
                                    originalValue === district
                                      ? ""
                                      : originalValue,
                                  );
                                  setArea("");
                                  if (fieldErrors.district)
                                    setFieldErrors((p) => ({
                                      ...p,
                                      district: "",
                                    }));
                                  setDistrictOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    district === d
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

                <div className="flex flex-col gap-3">
                  <Label
                    htmlFor="area"
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <MapPin className="size-4" /> Area
                  </Label>
                  <Popover open={areaOpen} onOpenChange={setAreaOpen}>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={areaOpen}
                          className={cn(
                            "w-full justify-between h-11 bg-background/50",
                            fieldErrors.area &&
                              "border-destructive ring-destructive",
                            !area && "text-muted-foreground",
                          )}
                          disabled={!district}
                        />
                      }
                    >
                      {area ? area : "Select area..."}
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
                            {areas.map((a) => (
                              <CommandItem
                                key={a}
                                value={a}
                                onSelect={(currentValue) => {
                                  const originalValue =
                                    areas.find(
                                      (ar) => ar.toLowerCase() === currentValue,
                                    ) || currentValue;
                                  setArea(
                                    originalValue === area ? "" : originalValue,
                                  );
                                  if (fieldErrors.area)
                                    setFieldErrors((p) => ({ ...p, area: "" }));
                                  setAreaOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    area === a ? "opacity-100" : "opacity-0",
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
              </CardContent>
            </Card>
          </SlideUp>

          {/* STEP 3: DETAILS & TIMING */}
          <SlideUp delay={0.2} className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                3
              </span>
              What happened?
            </h2>
            <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
              <CardContent className="p-6 space-y-6">
                {/* Time Selection */}
                <div className="space-y-3 pb-6 border-b border-border/50">
                  <Label className="text-muted-foreground">
                    When did it start?
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      size="lg"
                      variant={isHappeningNow ? "default" : "outline"}
                      className={cn("flex-1 h-11", isHappeningNow && "shadow-md")}
                      onClick={() => setIsHappeningNow(true)}
                    >
                      <Clock className="mr-2 size-4" />
                      Right Now
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      variant={!isHappeningNow ? "default" : "outline"}
                      className={cn("flex-1 h-11", !isHappeningNow && "shadow-md")}
                      onClick={() => setIsHappeningNow(false)}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      In the past
                    </Button>
                  </div>

                  {/* Manual Date/Time Picker */}
                  {!isHappeningNow && (
                    <div className="pt-3 animate-in slide-in-from-top-2 fade-in duration-300">
                      <Popover>
                        <PopoverTrigger
                          render={
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal h-11 bg-background/50 hover:bg-background/80",
                                !date && "text-muted-foreground",
                              )}
                            />
                          }
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP") + ` at ${time}`
                          ) : (
                            <span>Pick a date & time</span>
                          )}
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                          <div className="p-3 border-t flex items-center justify-between gap-4">
                            <Label
                              htmlFor="time"
                              className="text-xs text-muted-foreground"
                            >
                              Time
                            </Label>
                            <Input
                              id="time"
                              type="time"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                              className="w-[120px]"
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </div>

                {/* Quick Chips & Description */}
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="shortDescription"
                        className="text-muted-foreground"
                      >
                        Quick Summary
                      </Label>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {QUICK_CHIPS[utilityType]?.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleChipClick(chip)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                            shortDescription === chip
                              ? "bg-primary text-primary-foreground border-primary shadow-sm"
                              : "bg-background/50 text-muted-foreground hover:bg-muted hover:text-foreground border-border/50",
                          )}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                    <Input
                      id="shortDescription"
                      name="shortDescription"
                      type="text"
                      placeholder="Or type your own short summary..."
                      value={shortDescription}
                      onChange={(e) => {
                        setShortDescription(e.target.value);
                        if (fieldErrors.shortDescription)
                          setFieldErrors((p) => ({
                            ...p,
                            shortDescription: "",
                          }));
                      }}
                      className={cn(
                        "bg-background/50 h-11",
                        fieldErrors.shortDescription &&
                          "border-destructive ring-destructive",
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="description"
                      className="text-muted-foreground"
                    >
                      More Details (Optional)
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Any additional info that might help? (e.g. Did you hear a loud bang?)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-background/50 resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideUp>

          {/* STEP 4: MEDIA UPLOAD */}
          <SlideUp delay={0.3} className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                4
              </span>
              Add Media (Optional)
            </h2>
            <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
              <CardContent className="p-6">
                {/* Media Type Tabs */}
                <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
                  <button
                    type="button"
                    onClick={() => setMediaType("image")}
                    className={cn(
                      "px-4 py-2 flex items-center gap-2 rounded-md text-sm font-medium transition-colors",
                      mediaType === "image"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <ImageIcon className="size-4" /> Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaType("video")}
                    className={cn(
                      "px-4 py-2 flex items-center gap-2 rounded-md text-sm font-medium transition-colors",
                      mediaType === "video"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Video className="size-4" /> Video
                  </button>
                </div>

                {mediaType === "image" && (
                  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">
                        Upload Image File
                      </Label>
                      {!preview ? (
                        <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border/50 bg-background/30 px-6 py-10 transition-colors hover:border-primary/50 hover:bg-muted/50">
                          <div className="rounded-full bg-primary/10 p-4">
                            <Camera className="size-8 text-primary" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-foreground">
                              Click to upload a photo
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              PNG, JPG up to 5MB
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/png,image/jpg,image/jpeg,image/gif,image/webp"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                      ) : (
                        <div className="relative overflow-hidden rounded-xl border border-border shadow-sm max-w-sm group">
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full object-cover aspect-video"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={clearImage}
                            >
                              <X className="size-4 mr-2" /> Remove Image
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {!imageFile && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="h-px bg-border/50 flex-1"></div>
                          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                            OR
                          </span>
                          <div className="h-px bg-border/50 flex-1"></div>
                        </div>
                        <Label
                          htmlFor="imageUrl"
                          className="text-muted-foreground"
                        >
                          Paste Image URL
                        </Label>
                        <Input
                          id="imageUrl"
                          name="image"
                          type="url"
                          placeholder="https://example.com/outage-photo.jpg"
                          value={imageUrl}
                          onChange={(e) => {
                            setImageUrl(e.target.value);
                            setUrlError("");
                            if (
                              e.target.value &&
                              isValidImageUrl(e.target.value)
                            ) {
                              setPreview(e.target.value);
                            } else if (!e.target.value) {
                              setPreview("");
                            }
                          }}
                          className="bg-background/50 h-11"
                        />
                        {urlError && (
                          <p className="text-xs text-destructive">{urlError}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {mediaType === "video" && (
                  <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="videoUrl"
                        className="text-muted-foreground flex items-center gap-2"
                      >
                        <PlaySquare className="size-4 text-red-500" /> YouTube
                        Video URL
                      </Label>
                      <Input
                        id="videoUrl"
                        name="videoUrl"
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    {videoUrl && getYoutubeVideoId(videoUrl) && (
                      <div className="relative overflow-hidden rounded-xl border border-border shadow-sm max-w-sm aspect-video bg-black mt-2">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${getYoutubeVideoId(videoUrl)}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </SlideUp>

          <input type="hidden" name="reporterId" value={session.user.id} />
          <input
            type="hidden"
            name="reporterName"
            value={session.user.name || "Anonymous"}
          />
          <SlideUp delay={0.4} className="pt-4">
            {submitError && (
              <div className="mb-4 rounded-lg bg-destructive/15 p-4 text-sm text-destructive font-medium border border-destructive/20 text-center">
                {submitError}
              </div>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" />
                  Submitting Report...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Your report will be immediately visible to others in your area.
            </p>
          </SlideUp>
        </form>
      </div>
    </main>
  );
}
