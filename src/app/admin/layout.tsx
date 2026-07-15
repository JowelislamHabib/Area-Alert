import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 min-h-[calc(100vh-80px)]">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <AdminNav />
      {children}
    </div>
  );
}
