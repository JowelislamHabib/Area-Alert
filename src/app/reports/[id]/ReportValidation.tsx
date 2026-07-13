"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, CheckCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { voteReport, updateReportStatus } from "@/lib/actions/report";

export function ReportValidation({ report, user }: { report: any; user: any }) {
  // Local state for optimistic updates
  const [upvotes, setUpvotes] = useState<string[]>(report.upvotes || []);
  const [downvotes, setDownvotes] = useState<string[]>(report.downvotes || []);
  const [resolvedVotes, setResolvedVotes] = useState<string[]>(report.resolvedVotes || []);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectTo = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const [isPending, setIsPending] = useState(false);

  const totalVotes = upvotes.length + downvotes.length + resolvedVotes.length;
  const confidence = totalVotes > 0 ? Math.round(((upvotes.length + resolvedVotes.length) / totalVotes) * 100) : null;

  const hasUpvoted = user ? upvotes.includes(user.id) : false;
  const hasDownvoted = user ? downvotes.includes(user.id) : false;
  const hasSuggestedResolved = user ? resolvedVotes.includes(user.id) : false;

  const handleVote = async (voteType: "upvote" | "downvote" | "resolved") => {
    if (!user) return;
    
    // Optimistic UI updates
    const userId = user.id;
    let oldUpvotes = [...upvotes];
    let oldDownvotes = [...downvotes];
    let oldResolved = [...resolvedVotes];

    const removeUser = (arr: string[]) => arr.filter(id => id !== userId);

    let newUpvotes = removeUser(upvotes);
    let newDownvotes = removeUser(downvotes);
    let newResolved = removeUser(resolvedVotes);

    if (voteType === "upvote") {
      if (!hasUpvoted) newUpvotes.push(userId);
    } else if (voteType === "downvote") {
      if (!hasDownvoted) newDownvotes.push(userId);
    } else if (voteType === "resolved") {
      if (!hasSuggestedResolved) newResolved.push(userId);
    }

    setUpvotes(newUpvotes);
    setDownvotes(newDownvotes);
    setResolvedVotes(newResolved);

    setIsPending(true);
    const res = await voteReport(report._id, voteType);
    setIsPending(false);

    if (res.error) {
      toast.error(res.error);
      // Revert optimism
      setUpvotes(oldUpvotes);
      setDownvotes(oldDownvotes);
      setResolvedVotes(oldResolved);
      return;
    }

    const msgs = {
      upvote: hasUpvoted ? "Upvote removed." : "Upvoted — thanks for validating!",
      downvote: hasDownvoted ? "Vote removed." : "Marked as possibly fake.",
      resolved: hasSuggestedResolved ? "Suggestion removed." : "Thanks for suggesting it's resolved!",
    };
    toast.success(msgs[voteType]);
  };

  const handleStatusUpdate = async (status: "active" | "resolved") => {
    if (!user || user.id !== report.reporterId) return;
    
    setIsPending(true);
    const res = await updateReportStatus(report._id, status);
    setIsPending(false);
    
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Report status updated!");
    }
  };

  return (
    <>
      {confidence !== null && (
        <div className="mb-6 p-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-sm font-semibold mb-2">
            <span className="text-slate-700 dark:text-slate-300">Community Confidence</span>
            <span className={`font-bold ${confidence >= 70 ? "text-emerald-600 dark:text-emerald-400" : confidence >= 40 ? "text-amber-600 dark:text-amber-400" : "text-red-500 dark:text-red-400"}`}>
              {confidence}%
            </span>
          </div>
          <div className="h-2.5 w-full bg-slate-200/60 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${confidence >= 70 ? "bg-emerald-500" : confidence >= 40 ? "bg-amber-400" : "bg-red-400"}`} 
              style={{ width: `${confidence}%` }} 
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Based on {totalVotes} vote{totalVotes !== 1 && "s"}</p>
        </div>
      )}

      {/* Static Vote Counts Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-xl p-3 sm:p-4 text-center flex flex-col items-center justify-center border border-emerald-100 dark:border-emerald-500/20">
          <span className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400">{upvotes.length}</span>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-1">Confirmed Real</span>
        </div>
        <div className="bg-blue-50 dark:bg-blue-500/10 rounded-xl p-3 sm:p-4 text-center flex flex-col items-center justify-center border border-blue-100 dark:border-blue-500/20">
          <span className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400">{resolvedVotes.length}</span>
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 mt-1">Think Resolved</span>
        </div>
        <div className="bg-red-50 dark:bg-red-500/10 rounded-xl p-3 sm:p-4 text-center flex flex-col items-center justify-center border border-red-100 dark:border-red-500/20">
          <span className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">{downvotes.length}</span>
          <span className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1">May Be Fake</span>
        </div>
      </div>
      
      {user ? (
        user.id === report.reporterId ? (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl p-4 text-center text-sm font-medium text-slate-600 dark:text-slate-400 space-y-4">
            <p>You cannot validate your own report.</p>
            {report.status !== "resolved" && (
              <Button variant="default" disabled={isPending} onClick={() => handleStatusUpdate("resolved")}>
                Mark as Resolved
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => handleVote("upvote")}
              className={`w-full sm:flex-1 flex flex-row items-center justify-center gap-1.5 h-10 sm:h-11 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                hasUpvoted
                  ? "bg-emerald-500 dark:bg-emerald-600 text-white border-emerald-500 dark:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-700 hover:text-white"
                  : "hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-600 dark:hover:text-emerald-400 text-muted-foreground"
              }`}
            >
              <ThumbsUp className="size-4" />
              <span>{hasUpvoted ? "Confirmed" : "Confirm Real"}</span>
            </Button>
            
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => handleVote("resolved")}
              className={`w-full sm:flex-1 flex flex-row items-center justify-center gap-1.5 h-10 sm:h-11 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                hasSuggestedResolved
                  ? "bg-blue-500 dark:bg-blue-600 text-white border-blue-500 dark:border-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white"
                  : "hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-600 dark:hover:text-blue-400 text-muted-foreground"
              }`}
            >
              <CheckCircle className="size-4" />
              <span>{hasSuggestedResolved ? "Suggested" : "Looks Resolved"}</span>
            </Button>

            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => handleVote("downvote")}
              className={`w-full sm:flex-1 flex flex-row items-center justify-center gap-1.5 h-10 sm:h-11 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                hasDownvoted
                  ? "bg-red-400 dark:bg-red-600 text-white border-red-400 dark:border-red-600 hover:bg-red-500 dark:hover:bg-red-700 hover:text-white"
                  : "hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-600 dark:hover:text-red-400 text-muted-foreground"
              }`}
            >
              <ThumbsDown className="size-4" />
              <span>{hasDownvoted ? "Flagged" : "Seems Fake"}</span>
            </Button>
          </div>
        )
      ) : (
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center group transition-all duration-300 hover:shadow-md hover:border-emerald-500/30">
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:16px]" />
          
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out">
              <CheckCircle className="size-6" />
            </div>
            
            <div className="space-y-1.5">
              <h4 className="text-lg font-bold text-foreground tracking-tight">Help Verify This Report</h4>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Join your neighbors to confirm or flag this issue. Reliable updates start with community input!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-3 w-full sm:w-auto">
              <Link href={`/login?redirect=${encodeURIComponent(redirectTo)}`} className="w-full sm:w-auto">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-emerald-500/20 transition-all duration-300 font-semibold px-6">
                  Sign In
                </Button>
              </Link>
              <Link href={`/register?redirect=${encodeURIComponent(redirectTo)}`} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-800/50 dark:hover:bg-emerald-950/50 transition-all duration-300 font-semibold px-6">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
