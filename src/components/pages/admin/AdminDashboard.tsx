"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminUsersTable } from "./AdminUsersTable";
import { AdminReportsTable } from "./AdminReportsTable";
import { AdminOverview } from "./AdminOverview";
import { FadeIn } from "@/components/ui/motion-wrapper";

export function AdminDashboard() {
  return (
    <FadeIn delay={0.1}>
      <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <AdminOverview />
      </TabsContent>
      <TabsContent value="users">
        <AdminUsersTable />
      </TabsContent>
      <TabsContent value="reports">
        <AdminReportsTable />
      </TabsContent>
      </Tabs>
    </FadeIn>
  );
}
