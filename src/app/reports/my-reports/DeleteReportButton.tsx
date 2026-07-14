"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteReport } from "@/lib/actions/report";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DeleteReportButton({ id, redirectTo, asIcon = true }: { id: string; redirectTo?: string; asIcon?: boolean }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteReport(id);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Report deleted successfully");
        setIsOpen(false);
        if (redirectTo) {
          router.push(redirectTo);
        } else {
          router.refresh();
        }
      }
    } catch (error) {
      toast.error("Failed to delete report");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={
        asIcon ? (
          <Button
            variant="destructive"
            size="sm"
            className="h-8 w-8 p-0"
            disabled={isDeleting}
            title="Delete Report"
          />
        ) : (
          <Button
            variant="destructive"
            size="default"
            className="gap-2 shadow-sm"
            disabled={isDeleting}
          />
        )
      }>
        <Trash2 className="size-4" />
        {asIcon ? <span className="sr-only">Delete</span> : "Delete Report"}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Report</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this report? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
