"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { User as UserIcon, ShieldAlert, CheckCircle2, LogIn, Shield, ShieldOff } from "lucide-react";

export function AdminUsersTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("usersPage") || "1", 10);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(initialPage);
  const limit = 10;

  const updatePage = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("usersPage", newPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const fetchUsers = async (currentPage = page) => {
    setLoading(true);
    const offset = (currentPage - 1) * limit;
    const { data, error } = await authClient.admin.listUsers({ query: { limit, sortBy: "createdAt", sortDirection: "desc", offset } });
    if (error) {
      toast.error(error.message || "Failed to fetch users");
    } else if (data) {
      setUsers(data.users || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleBan = async (userId: string, isBanned: boolean) => {
    if (isBanned) {
      const { error } = await authClient.admin.unbanUser({ userId });
      if (error) toast.error(error.message);
      else toast.success("User unbanned");
    } else {
      const { error } = await authClient.admin.banUser({ userId, banReason: "Admin action" });
      if (error) toast.error(error.message);
      else toast.success("User banned");
    }
    fetchUsers(page);
  };

  const handleImpersonate = async (userId: string) => {
    const { error } = await authClient.admin.impersonateUser({ userId });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Impersonating user");
      window.location.href = "/";
    }
  };

  return (
    <div className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent border-b-muted">
              <TableHead className="font-semibold text-foreground h-12">User</TableHead>
              <TableHead className="font-semibold text-foreground">Role</TableHead>
              <TableHead className="font-semibold text-foreground">Status</TableHead>
              <TableHead className="font-semibold text-foreground">Joined</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="h-32 text-center text-muted-foreground animate-pulse">Loading users...</TableCell></TableRow>
            ) : users.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="h-32 text-center text-muted-foreground">No users found</TableCell></TableRow>
            ) : (
              users.map(user => (
                <TableRow key={user.id} className="hover:bg-muted/40 transition-colors group">
                  <TableCell>
                    <div className="flex items-center gap-3 py-1">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border bg-muted flex items-center justify-center">
                        {user.image ? (
                          <Image src={user.image} alt={user.name || ""} fill className="object-cover" />
                        ) : (
                          <UserIcon className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"} className="capitalize">
                      {user.role || "user"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.banned ? (
                      <Badge variant="destructive" className="gap-1 bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">
                        <ShieldAlert className="h-3 w-3" /> Banned
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1 text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 dark:text-emerald-400 dark:border-emerald-900/50 dark:bg-emerald-900/20">
                        <CheckCircle2 className="h-3 w-3" /> Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{format(new Date(user.createdAt), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Impersonate"
                        onClick={() => handleImpersonate(user.id)} 
                        disabled={user.role === "admin"}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <LogIn className="h-4 w-4" />
                        <span className="sr-only">Impersonate</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title={user.banned ? "Unban User" : "Ban User"}
                        onClick={() => handleBan(user.id, user.banned)}
                        disabled={user.role === "admin"}
                        className={user.banned 
                          ? "h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" 
                          : "h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"}
                      >
                        {user.banned ? <Shield className="h-4 w-4" /> : <ShieldOff className="h-4 w-4" />}
                        <span className="sr-only">{user.banned ? "Unban User" : "Ban User"}</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between border-t bg-muted/20 px-6 py-4">
        <div className="text-sm text-muted-foreground">
          Showing page <span className="font-medium text-foreground">{page}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="shadow-sm"
            onClick={() => updatePage(Math.max(1, page - 1))}
            disabled={page === 1 || loading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="shadow-sm"
            onClick={() => updatePage(page + 1)}
            disabled={users.length < limit || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
