"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenServer } from "@/lib/getTokenServer";

export async function getAdminUserStats(searchParams?: {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || session.user.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const token = await getTokenServer();

  const params = new URLSearchParams();
  if (searchParams?.page) params.append("page", searchParams.page);
  if (searchParams?.limit) params.append("limit", searchParams.limit);
  if (searchParams?.search) params.append("search", searchParams.search);
  if (searchParams?.sortBy) params.append("sortBy", searchParams.sortBy);
  if (searchParams?.sortDirection)
    params.append("sortDirection", searchParams.sortDirection);

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users-stats${params.toString() ? `?${params.toString()}` : ""}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { error: err.error || err.msg || "Failed to fetch user stats" };
  }

  const data = await res.json();
  return {
    success: true,
    users: data.users,
    total: data.total,
    page: data.page,
    totalPages: data.totalPages,
  };
}
