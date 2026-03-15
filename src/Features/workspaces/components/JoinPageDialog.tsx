"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  LogIn,
  Home,
  ArrowRight,
  FolderX,
  Fingerprint,
  BadgeCheck,
  UserCheck,
} from "lucide-react";
import { DottedSeparator } from "@/components/Dotted-Seperator";

interface JoinPageDialogProps {
  type: "not-found" | "login-required" | "already-member";
  workspaceId?: string;
}

export default function JoinPageDialog({ type, workspaceId }: JoinPageDialogProps) {
  const isNotFound = type === "not-found";
  const isAlreadyMember = type === "already-member";

  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        className={`top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md p-0 gap-0 overflow-hidden rounded-2xl border bg-white ${
          isAlreadyMember
            ? "border-emerald-300/80"
            : "border-slate-200"
        }`}
      >

          {/* Header */}
          <div
            className={`flex flex-col items-center gap-4 px-8 pt-8 pb-6 ${
              isAlreadyMember
                ? "bg-linear-to-b from-emerald-50 via-white to-white"
                : "bg-white"
            }`}
          >

            {/* Icon */}
            {isAlreadyMember ? (
              <div className="relative">
                <div className="rounded-3xl border-2 border-emerald-100 p-1.5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 text-white">
                    <UserCheck className="h-8 w-8" />
                  </div>
                </div>
                <div className="absolute -right-1.5 -bottom-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-emerald-700">
                  <BadgeCheck className="h-3.5 w-3.5" />
                </div>
              </div>
            ) : (
              <div className={`p-1.5 rounded-3xl border-2 ${
                isNotFound ? "border-red-100" : "border-violet-100"
              }`}>
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white ${
                    isNotFound
                      ? "bg-linear-to-br from-red-500 to-orange-500"
                      : "bg-linear-to-br from-violet-600 to-blue-500"
                  }`}
                >
                  {isNotFound ? (
                    <FolderX className="h-8 w-8" />
                  ) : (
                    <Fingerprint className="h-8 w-8" />
                  )}
                </div>
              </div>
            )}

            <div className="text-center space-y-1.5">
              <DialogTitle className="text-xl font-bold text-slate-900 font-FT">
                {isNotFound ? "Workspace Not Found" : isAlreadyMember ? "Already a Member" : "Login Required"}
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-500 font-HG leading-relaxed">
                {isNotFound
                  ? "This workspace does not exist or the invite link has expired."
                  : isAlreadyMember
                  ? "You're already in this workspace. Click below to access it."
                  : "You need to be signed in to accept this workspace invite."}
              </DialogDescription>
            </div>
          </div>

          {/* Divider */}
          <DottedSeparator className="text-gray-300 -mt-2 -mb-2"/>
          {/* Actions */}
          <div className="flex flex-col gap-2 px-6 py-5">
            {isNotFound ? (
              <Button asChild className="h-10 w-full font-HG">
                <Link href="/workspaces/create">
                  Continue to Workspaces
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : isAlreadyMember ? (
              <>
                <Button
                  asChild
                  className="h-10 w-full font-HG"
                >
                  <Link href={`/workspaces/${workspaceId}`}>
                    Continue to Workspace
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-10 w-full font-HG"
                >
                  <Link href="/workspaces/create">
                    Explore Workspaces
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="h-10 w-full font-HG">
                  <Link href="/sign-in">
                    <LogIn className="mr-2 h-4 w-4"/>
                    Login Now
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-10 w-full font-HG"
                >
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4"/>
                    Go Home
                  </Link>
                </Button>
              </>
            )}
          </div>

      </DialogContent>
    </Dialog>
  );
}
