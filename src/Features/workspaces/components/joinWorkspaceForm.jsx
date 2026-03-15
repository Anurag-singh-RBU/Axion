"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DottedSeparator } from "@/components/Dotted-Seperator";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useGetMember } from "../api/use-get-member";

import {
    Loader2,
    ArrowRight,
    KeyRound,
    BadgeCheck,
    Sparkle,
} from "lucide-react";

export default function JoinWorkspaceForm({ workspaceId, inviteCode }) {
  const router = useRouter();
  const { mutate, isPending } = useJoinWorkspace();
  const [code, setCode] = useState(inviteCode || "");
  const [error, setError] = useState("");
  const [resolvedWorkspaceName, setResolvedWorkspaceName] = useState("");
  const [isValidating, setIsValidating] = useState(true);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const { data: member } = useGetMember(workspaceId || "");

    useEffect(() => {
        const validateInvite = async () => {
            if (!workspaceId || !inviteCode) {
                setIsValidating(false);
                return;
            }

            try {
                setIsValidating(true);
                const res = await fetch(
                    `/api/workspaces/${workspaceId}/invite-info/${inviteCode}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const json = await res.json().catch(() => ({}));
                const isValidInvite = Boolean(json?.data?.valid);

                if (res.ok && isValidInvite) {
                    setResolvedWorkspaceName(json?.data?.name || "Secure Workspace");
                    setIsCodeValid(true);
                    setError("");
                } else {
                    setError("Invalid or expired invite code. Ask admin for new link.");
                    setResolvedWorkspaceName("");
                    setIsCodeValid(false);
                }
            } catch (err) {
                setError("Failed to validate invite. Please log in and try again.");
                setResolvedWorkspaceName("");
                setIsCodeValid(false);
            } finally {
                setIsValidating(false);
            }
        };

        validateInvite();
    }, [workspaceId, inviteCode]);

  const handleJoin = () => {
    if (!workspaceId) {
      setError("Workspace ID missing.");
      return;
    }
    if (!code.trim()) {
      setError("Invite code is required.");
      return;
    }
    setError("");
    mutate(
      { workspaceId, code: code.trim() },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}`);
        },
        onError: (err) => {
          console.error("Join error:", err);
          const message = err?.message || "Invalid or expired invite code.";
          setError(message);
        },
      }
    );
  };

    if (member) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center sm:px-4 px-2">
                <div className="w-full max-w-md text-center space-y-6">
                    <div className="flex flex-col items-center gap-4 p-8 bg-emerald-50 rounded-2xl border border-emerald-200">
                        <div className="p-2 bg-white rounded-full">
                            <BadgeCheck className="h-8 w-8 text-emerald-600" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-xl font-bold text-slate-900">Already a Member</h2>
                            <p className="text-sm text-slate-600">You&apos;re already in this workspace.</p>
                        </div>
                        <div className="space-y-2">
                            <Button asChild className="h-10 w-full">
                                <Link href={`/workspaces/${workspaceId}`}>
                                    Go to Workspace
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="h-10 w-full">
                                <Link href="/workspaces/create">Explore Workspaces</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

  return (
        <div className="min-h-screen w-full flex items-center justify-center sm:px-4 px-2">
            <div className="w-full max-w-md">
                <Card className="overflow-hidden border-slate-200 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-950/75 dark:backdrop-blur-xl dark:shadow-[0_20px_70px_rgba(2,6,23,0.65)]">

                    <CardHeader className="text-center sm:px-6 px-3 pt-3 pb-4 space-y-3">
                        <div className="mx-auto relative">
                            <div className="flex h-18 w-18 items-center justify-center rounded-[1.75rem] border border-indigo-100 bg-linear-to-br from-indigo-50 via-white to-violet-50 shadow-[0_12px_30px_rgba(99,102,241,0.16)] dark:border-indigo-500/20 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/60 dark:shadow-[0_18px_40px_rgba(79,70,229,0.22)]">
                                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-200/80 dark:from-indigo-500 dark:to-fuchsia-500 dark:shadow-indigo-950/70">
                                    <KeyRound className="h-6.5 w-6.5" />
                                </div>
                            </div>
                            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-white text-amber-500 shadow-sm dark:border-slate-900 dark:bg-slate-900 dark:text-amber-300 dark:shadow-[0_6px_18px_rgba(251,191,36,0.2)]">
                                <Sparkle className="h-3.5 w-3.5 fill-current" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs uppercase tracking-[0.16em] text-slate-400 font-HG font-semibold dark:text-slate-500">
                                Workspace Invitation
                            </p>
                            <CardTitle className="text-2xl font-FT text-slate-900 dark:text-slate-50">
                                Join &nbsp;Workspace
                            </CardTitle>
                            <CardDescription className="font-HG text-slate-500 leading-relaxed dark:text-slate-400">
                                {resolvedWorkspaceName
                                    ? (
                                        <>
                                            You have been invited to join{" "}
                                            <span className="inline-flex items-center font-FT font-semibold text-indigo-700 dark:text-indigo-300">
                                                {resolvedWorkspaceName}
                                            </span>
                                        </>
                                    )
                                    : "Enter the invite code below to access the workspace."}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <DottedSeparator className="text-slate-200 sm:-my-4 -my-5 dark:text-slate-800" />

                    <CardContent className="sm:px-6 px-3 py-5 space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-[0.14em] text-slate-500 font-HG font-semibold flex items-center gap-1.5 dark:text-slate-400">
                                <KeyRound className="h-3.5 w-3.5" />
                                Invite Code
                            </label>

                            <Input
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value);
                                    if (error) setError("");
                                }}
                                onKeyDown={(e) => e.key === "Enter" && !isPending && !isValidating && handleJoin()}
                                placeholder="Enter invite code"
                                disabled={isPending || isValidating}
                                className={`h-11 rounded-lg border font-JBM text-sm tracking-wide ${error
                                        ? "border-red-300 focus-visible:ring-red-400 dark:border-red-500/60 dark:bg-red-950/30 dark:text-red-50 dark:placeholder:text-red-300/60 dark:focus-visible:ring-red-500"
                                        : isCodeValid
                                            ? "border-emerald-300 bg-emerald-50 focus-visible:ring-emerald-400 dark:border-emerald-500/50 dark:bg-emerald-950/30 dark:text-emerald-50 dark:placeholder:text-emerald-200/60 dark:focus-visible:ring-emerald-500"
                                            : "border-slate-300 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:ring-indigo-500"
                                    }`}
                            />

                            {error ? (
                                <p className="text-xs text-red-600 font-HG flex items-center gap-1.5 dark:text-red-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 dark:bg-red-400" />
                                    {error}
                                </p>
                            ) : (
                                <p className="text-xs text-slate-400 font-HG dark:text-gray-400">
                                    Ask your admin if your invite code is not working.
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 font-HG flex items-center gap-1.5 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                                <BadgeCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                Secure Access
                            </div>
                            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 font-HG flex items-center gap-1.5 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                                <Sparkle className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                                Instant Join
                            </div>
                        </div>

                        <Button
                            onClick={handleJoin}
                            disabled={isPending || !code.trim() || isValidating}
                            className="h-11 w-full rounded-lg font-HG font-semibold tracking-wide">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Joining Workspace
                                </>
                            ) : (
                                "Join Workspace"
                            )}
                        </Button>
                        {member && (
                            <p className="text-xs text-emerald-600 text-center font-semibold">
                                Already a member -{' '}
                                <Link href={`/workspaces/${workspaceId}`} className="underline hover:text-emerald-700">
                                    Go to workspace →
                                </Link>
                            </p>
                        )}
                    </CardContent>
                </Card>

                <p className="mt-4 text-center text-xs text-slate-500 font-HG dark:text-teal-200">
                    By joining , you agree to the workspace collaboration rules.
                </p>
            </div>
        </div>
    );
}
