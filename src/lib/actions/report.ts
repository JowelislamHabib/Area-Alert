"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { CreateReportInput } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { getTokenServer } from "@/lib/getTokenServer";

export async function createReport(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return { error: "You must be logged in to report an outage" };
  }

  const utilityType = (formData.get("utilityType") as string)?.trim();
  const area = (formData.get("area") as string)?.trim();
  const district = (formData.get("district") as string)?.trim();
  const startedAt = (formData.get("startedAt") as string)?.trim();
  const shortDescription = (formData.get("shortDescription") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const image = (formData.get("image") as string)?.trim();
  const videoUrl = (formData.get("videoUrl") as string)?.trim();
  const ispName = (formData.get("ispName") as string)?.trim();

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
    reporterImage: session.user.image || undefined,
  };

  const token = await getTokenServer();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reports`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Backend fetch failed in createReport:", res.status, res.statusText, text);
    let err = {};
    try {
      err = JSON.parse(text);
    } catch (e) {}
    return { error: (err as any).error || (err as any).msg || "Failed to create report" };
  }

  const report = await res.json();
  revalidatePath("/reports");
  revalidatePath("/reports/my-reports");
  revalidatePath("/");
  return { success: true, report };
}

export async function getReports(searchParams?: { district?: string; area?: string; utilityType?: string; sortBy?: string; status?: string; startDate?: string; endDate?: string; q?: string; page?: string; limit?: string; reporterId?: string }) {
  const params = new URLSearchParams();
  if (searchParams?.district) params.append("district", searchParams.district);
  if (searchParams?.area) params.append("area", searchParams.area);
  if (searchParams?.utilityType) params.append("utilityType", searchParams.utilityType);
  if (searchParams?.sortBy) params.append("sortBy", searchParams.sortBy);
  if (searchParams?.status) params.append("status", searchParams.status);
  if (searchParams?.startDate) params.append("startDate", searchParams.startDate);
  if (searchParams?.endDate) params.append("endDate", searchParams.endDate);
  if (searchParams?.q) params.append("q", searchParams.q);
  if (searchParams?.page) params.append("page", searchParams.page);
  if (searchParams?.limit) params.append("limit", searchParams.limit);
  if (searchParams?.reporterId) params.append("reporterId", searchParams.reporterId);

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/reports${params.toString() ? `?${params.toString()}` : ""}`;
  
  const res = await fetch(url, {
    cache: "no-store", // Reports change frequently
  });

  if (!res.ok) {
    return { error: "Failed to fetch reports" };
  }

  const data = await res.json();
  // The backend now returns { reports, totalPages, currentPage, total }
  if (data.reports) {
    return { success: true, reports: data.reports, totalPages: data.totalPages, currentPage: data.currentPage, total: data.total };
  }
  return { success: true, reports: data, totalPages: 1, currentPage: 1, total: data.length };
}

export async function getReportStatsData() {
  try {
    const [districtsRes, areasRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/safety-stats?type=districts&limit=100`, { cache: "no-store" }),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/safety-stats?type=areas&limit=1000`, { cache: "no-store" })
    ]);

    const districtsData = await districtsRes.json();
    const areasData = await areasRes.json();

    const districts = districtsData.stats || [];
    const areas = areasData.stats || [];

    const validDistricts = districts.filter((d: any) => d.totalReports > 0).sort((a: any, b: any) => b.totalReports - a.totalReports);
    const validAreas = areas.filter((a: any) => a.totalReports > 0).sort((a: any, b: any) => b.totalReports - a.totalReports);

    return {
      mostReportedDistrict: validDistricts[0] || null,
      lowestReportedDistrict: validDistricts[validDistricts.length - 1] || null,
      mostReportedArea: validAreas[0] || null,
      lowestReportedArea: validAreas[validAreas.length - 1] || null,
    };
  } catch (e) {
    console.error("Failed to fetch report stats data", e);
    return null;
  }
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

  const token = await getTokenServer();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/${id}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
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

export async function updateReportStatus(id: string, status: "active" | "resolved") {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const token = await getTokenServer();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: session.user.id,
      status,
    }),
  });

  if (!res.ok) {
    return { error: "Failed to update status" };
  }

  const report = await res.json();
  revalidatePath(`/reports/${id}`);
  revalidatePath(`/reports`);
  return { success: true, report };
}

export async function deleteReport(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const token = await getTokenServer();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: session.user.id,
    }),
  });

  if (!res.ok) {
    return { error: "Failed to delete report" };
  }

  revalidatePath(`/reports`);
  revalidatePath(`/reports/my-reports`);
  return { success: true };
}

export async function updateReport(id: string, data: { shortDescription?: string; description?: string; image?: string; videoUrl?: string; status?: string }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const token = await getTokenServer();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reports/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: session.user.id,
      ...data,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { error: err.error || "Failed to update report" };
  }

  const updatedReport = await res.json();
  revalidatePath(`/reports/${id}`);
  revalidatePath(`/reports`);
  revalidatePath(`/reports/my-reports`);
  return { success: true, report: updatedReport.report };
}
