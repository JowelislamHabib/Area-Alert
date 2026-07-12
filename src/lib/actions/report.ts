"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { CreateReportInput } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createReport(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return { error: "You must be logged in to report an outage" };
  }

  const utilityType = formData.get("utilityType") as string;
  const area = formData.get("area") as string;
  const district = formData.get("district") as string;
  const startedAt = formData.get("startedAt") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const videoUrl = formData.get("videoUrl") as string;
  const ispName = formData.get("ispName") as string;

  if (!utilityType || !area || !district || !shortDescription || !description) {
    return { error: "Missing required fields" };
  }

  const validUtilityTypes = ["electricity", "internet", "water", "gas"];
  if (!validUtilityTypes.includes(utilityType)) {
    return { error: "Invalid utility type" };
  }

  const body: CreateReportInput = {
    utilityType: utilityType as CreateReportInput["utilityType"],
    area,
    district,
    startedAt,
    shortDescription,
    description,
    image: image || undefined,
    videoUrl: videoUrl || undefined,
    ispName: utilityType === "internet" ? (ispName || undefined) : undefined,
    reporterId: session.user.id,
    reporterName: session.user.name || "Anonymous",
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { error: err.error || "Failed to create report" };
  }

  const report = await res.json();
  return { success: true, report };
}

export async function getReports(searchParams?: { district?: string; area?: string; utilityType?: string; sortBy?: string }) {
  const params = new URLSearchParams();
  if (searchParams?.district) params.append("district", searchParams.district);
  if (searchParams?.area) params.append("area", searchParams.area);
  if (searchParams?.utilityType) params.append("utilityType", searchParams.utilityType);
  if (searchParams?.sortBy) params.append("sortBy", searchParams.sortBy);

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/reports${params.toString() ? `?${params.toString()}` : ""}`;
  
  const res = await fetch(url, {
    cache: "no-store", // Reports change frequently
  });

  if (!res.ok) {
    return { error: "Failed to fetch reports" };
  }

  const reports = await res.json();
  return { success: true, reports };
}

export async function getReportById(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return { error: "Failed to fetch report" };
  }

  const report = await res.json();
  return { success: true, report };
}

export async function voteReport(id: string, voteType: "upvote" | "downvote" | "resolved") {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/${id}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: session.user.id,
      voteType,
    }),
  });

  if (!res.ok) {
    return { error: "Failed to vote" };
  }

  revalidatePath(`/reports/${id}`);
  const report = await res.json();
  return { success: true, report };
}
