"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createReport } from "@/lib/actions/report";
import { useSession } from "@/lib/auth-client";
import { isValidImageUrl, uploadImage } from "@/lib/api/uploadImage";
import { Camera, ImageIcon, Link2, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { toast } from "sonner";

import areaData from "@/../public/data/area.json";

const UTILITY_OPTIONS = [
  { value: "electricity", label: "Electricity" },
  { value: "internet", label: "Internet" },
  { value: "water", label: "Water" },
  { value: "gas", label: "Gas" },
] as const;

export default function AddReportPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [utilityType, setUtilityType] = useState("electricity");
  const [startedAt, setStartedAt] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [ispName, setIspName] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [imageMode, setImageMode] = useState<"url" | "file">("url");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [urlError, setUrlError] = useState("");

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

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!district) errors.district = "Select a district";
    if (!area) errors.area = "Select an area";
    if (!shortDescription.trim()) errors.shortDescription = "Short description is required";
    if (!description.trim()) errors.description = "Description is required";
    if (utilityType === "internet" && !ispName.trim()) errors.ispName = "ISP name is required for internet reports";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const [submitError, submitAction, submitting] = useActionState(
    async (prevState: string | null, formData: FormData) => {
      if (!session?.user) {
        toast.error("You must be logged in to report an outage");
        return "Authentication required";
      }

      if (!validate()) return null;

      if (!startedAt) {
        formData.set("startedAt", new Date().toISOString());
      }

      if (imageMode === "url" && imageUrl && !isValidImageUrl(imageUrl)) {
        setUrlError("URL must end with an image extension (png, jpg, jpeg, gif, webp, svg)");
        return null;
      }

      if (imageMode === "file" && imageFile) {
        try {
          const uploaded = await uploadImage(imageFile);
          formData.set("image", uploaded);
        } catch {
          return "Image upload failed. Please try again.";
        }
      }

      const result = await createReport(formData);

      if (result.error) {
        return result.error;
      }

      toast.success("Outage reported successfully");
      router.push("/");
      return null;
    },
    null
  );

  if (!session?.user) {
    return (
      <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Sign in required</CardTitle>
            <CardDescription>
              You need to be logged in to report an outage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login" className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all hover:bg-primary/80">Log in</Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Report an Outage</CardTitle>
          <CardDescription>
            Let your community know about a utility outage in your area.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={submitAction} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-2">
              <Label htmlFor="district">District</Label>
              <select
                id="district"
                name="district"
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setArea("");
                  if (fieldErrors.district) setFieldErrors((p) => ({ ...p, district: "" }));
                }}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Select district</option>
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {fieldErrors.district && (
                <p className="text-xs text-destructive">{fieldErrors.district}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="area">Area</Label>
              <select
                id="area"
                name="area"
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                  if (fieldErrors.area) setFieldErrors((p) => ({ ...p, area: "" }));
                }}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
                disabled={!district}
              >
                <option value="">Select area</option>
                {areas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              {fieldErrors.area && (
                <p className="text-xs text-destructive">{fieldErrors.area}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="utilityType">Utility Type</Label>
              <select
                id="utilityType"
                name="utilityType"
                value={utilityType}
                onChange={(e) => {
                  setUtilityType(e.target.value);
                  if (fieldErrors.utilityType) setFieldErrors((p) => ({ ...p, utilityType: "" }));
                }}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                {UTILITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {utilityType === "internet" && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="ispName">ISP Name</Label>
                <Input
                  id="ispName"
                  name="ispName"
                  type="text"
                  placeholder="e.g. Link3, Grameen Phone"
                  value={ispName}
                  onChange={(e) => {
                    setIspName(e.target.value);
                    if (fieldErrors.ispName) setFieldErrors((p) => ({ ...p, ispName: "" }));
                  }}
                  aria-invalid={!!fieldErrors.ispName}
                  required
                />
                {fieldErrors.ispName && (
                  <p className="text-xs text-destructive">{fieldErrors.ispName}</p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="startedAt">Outage Started At</Label>
              <Input
                id="startedAt"
                name="startedAt"
                type="datetime-local"
                value={startedAt}
                onChange={(e) => setStartedAt(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                name="shortDescription"
                type="text"
                placeholder="e.g. Power cut in Sector 4"
                value={shortDescription}
                onChange={(e) => {
                  setShortDescription(e.target.value);
                  if (fieldErrors.shortDescription) setFieldErrors((p) => ({ ...p, shortDescription: "" }));
                }}
                aria-invalid={!!fieldErrors.shortDescription}
                required
              />
              {fieldErrors.shortDescription && (
                <p className="text-xs text-destructive">{fieldErrors.shortDescription}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Provide details about the outage..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (fieldErrors.description) setFieldErrors((p) => ({ ...p, description: "" }));
                }}
                className="flex min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={!!fieldErrors.description}
                required
              />
              {fieldErrors.description && (
                <p className="text-xs text-destructive">{fieldErrors.description}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Image (optional)</Label>

              <div className="flex items-center gap-2 rounded-lg border p-1">
                <button
                  type="button"
                  onClick={() => { setImageMode("url"); clearImage(); }}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    imageMode === "url" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Link2 size={14} />
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => { setImageMode("file"); clearImage(); }}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    imageMode === "file" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Camera size={14} />
                  Upload
                </button>
              </div>

              {imageMode === "url" ? (
                <div className="relative">
                  <Input
                    name="image"
                    type="url"
                    placeholder="https://example.com/outage.jpg"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setUrlError("");
                      if (e.target.value && isValidImageUrl(e.target.value)) {
                        setPreview(e.target.value);
                      } else {
                        setPreview("");
                      }
                    }}
                  />
                  {urlError && (
                    <p className="mt-1 text-xs text-destructive">{urlError}</p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground">
                    <ImageIcon size={16} />
                    {imageFile ? imageFile.name : "Choose file"}
                    <input
                      type="file"
                      accept="image/png,image/jpg,image/jpeg,image/gif,image/webp,image/svg+xml"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  {imageFile && (
                    <button
                      type="button"
                      onClick={clearImage}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <X size={14} />
                      Remove
                    </button>
                  )}
                </div>
              )}

              {preview && (
                <div className="relative mt-1 aspect-video w-full max-w-xs overflow-hidden rounded-lg border">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>

            <input type="hidden" name="reporterId" value={session.user.id} />
            <input type="hidden" name="reporterName" value={session.user.name || "Anonymous"} />

            {submitError && (
              <p className="text-xs text-destructive">{submitError}</p>
            )}

            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Report Outage"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
