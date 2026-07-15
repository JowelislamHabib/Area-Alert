"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SlideUp } from "@/components/ui/motion-wrapper";
import { authClient } from "@/lib/auth-client";
import { getAdminUserStats } from "@/lib/actions/admin";
import { toast } from "sonner";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { User as UserIcon, ShieldAlert, CheckCircle2, LogIn, Shield, ShieldOff, Search, ArrowUpDown, FileText } from "lucide-react";

export function AdminUsersTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("usersPage") || "1", 10);
  
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // Filters and Sorts
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      if (searchQuery !== debouncedSearch) {
        setPage(1); // Reset page on new search
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  const updatePage = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("usersPage", newPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const fetchUsers = async () => {
    setLoading(true);
    const res = await getAdminUserStats({
      page: page.toString(),
      limit: limit.toString(),
      search: debouncedSearch,
      sortBy,
      sortDirection,
    });
    
    if (res.error) {
      toast.error(res.error || "Failed to fetch users");
    } else if (res.users) {
      setUsers(res.users);
      setTotalPages(res.totalPages || 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, debouncedSearch, sortBy, sortDirection]);

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
    fetchUsers();
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

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "desc" ? "asc" : "desc");
  };

  return (
    <SlideUp delay={0.1} className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden flex flex-col gap-0 mt-4">
      
      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 items-center justify-between border-b bg-muted/20">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full bg-background"
            style={{ height: '40px' }}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
            <SelectTrigger className="w-[160px] bg-background" style={{ height: '40px' }}>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Join Date</SelectItem>
              <SelectItem value="reportCount">Report Count</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon" 
            className="shrink-0 bg-background"
            style={{ height: '40px', width: '40px' }}
            onClick={toggleSortDirection}
            title={`Sort ${sortDirection === "asc" ? "Ascending" : "Descending"}`}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent border-b-muted">
              <TableHead className="font-semibold text-foreground h-12">User</TableHead>
              <TableHead className="font-semibold text-foreground">Role</TableHead>
              <TableHead className="font-semibold text-foreground">Reports</TableHead>
              <TableHead className="font-semibold text-foreground">Status</TableHead>
              <TableHead className="font-semibold text-foreground">Joined</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="h-32 text-center text-muted-foreground animate-pulse">Loading users...</TableCell></TableRow>
            ) : users.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="h-32 text-center text-muted-foreground">No users found</TableCell></TableRow>
            ) : (
              users.map(user => (
                <TableRow key={user._id || user.id} className="hover:bg-muted/40 transition-colors group">
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
                    <div className="flex items-center gap-1.5 font-medium">
                      <FileText className="h-3.5 w-3.5 text-primary" />
                      {user.reportCount || 0}
                    </div>
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
                      <Tooltip>
                        <TooltipTrigger render={
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleImpersonate(user._id || user.id)} 
                            disabled={user.role === "admin"}
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          />
                        }>
                          <LogIn className="h-4 w-4" />
                          <span className="sr-only">Impersonate</span>
                        </TooltipTrigger>
                        <TooltipContent>Impersonate</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger render={
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleBan(user._id || user.id, user.banned)}
                            disabled={user.role === "admin"}
                            className={user.banned 
                              ? "h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" 
                              : "h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"}
                          />
                        }>
                          {user.banned ? <Shield className="h-4 w-4" /> : <ShieldOff className="h-4 w-4" />}
                          <span className="sr-only">{user.banned ? "Unban User" : "Ban User"}</span>
                        </TooltipTrigger>
                        <TooltipContent>{user.banned ? "Unban User" : "Ban User"}</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between border-t bg-muted/20 px-6 py-4">
        <div className="text-sm text-muted-foreground">
          Showing page <span className="font-medium text-foreground">{page}</span> of {totalPages}
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
            disabled={page >= totalPages || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </SlideUp>
  );
}
