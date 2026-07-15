import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-10 px-4 min-h-[calc(100vh-80px)]">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  );
}
