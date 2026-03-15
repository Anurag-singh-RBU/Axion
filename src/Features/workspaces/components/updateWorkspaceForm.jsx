"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { workspaceSchema } from "../schema";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useGetWorkspace } from "../api/use-workspace-by-id";
import { DottedSeparator } from "../../../components/Dotted-Seperator";
import Image from "next/image";
import {
  ImageIcon,
  Upload,
  X,
  ChevronRight,
  Info,
  Lock,
  Globe,
  Users,
  Settings,
  CheckSquare,
  Loader2,
  Sparkles,
  RefreshCcw,
  Copy,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useResetInviteCode } from "../api/use-reset-invite-code";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";

function ResetInviteCodeSection({ workspaceId }) {

  const { data: currentWorkspace } = useGetWorkspace(workspaceId || "");
  const inviteCode = currentWorkspace?.inviteCode;

  const fullInviteCode = inviteCode && typeof window !== "undefined"
    ? `${window.location.origin}/workspaces/${workspaceId}/join/${inviteCode}`
    : null;
  const { mutate, isPending } = useResetInviteCode();
  const [copied, setCopied] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Reset Invite Code",
    message: "A new invite code will be generated. Old code will stop working immediately.",
    confirmText: "Reset",
    cancelText: "Cancel",
    variant: "destructive",
  });

  const onReset = async () => {
    if (!workspaceId || isPending) return;

    const ok = await confirm();
    if (!ok) return;

    mutate({ workspaceId });
  };

  const onCopy = async () => {
    if (!fullInviteCode) return;

    try {
      await navigator.clipboard.writeText(fullInviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
      toast.success("Invite code copied !!");
    } catch {
      toast.error("Failed to copy invite code !!");
    }
  };

  return (
    <Card className="mt-4 border border-violet-200 dark:border-violet-800/60 bg-linear-to-br from-violet-50 via-white to-cyan-50 dark:from-violet-950/30 dark:via-slate-950 dark:to-cyan-950/20 shadow-sm overflow-hidden">
      <ConfirmDialog />
      <CardContent className="px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-200">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-blue-900 text-base font-FT tracking-wider dark:text-blue-200">
                  Invite Code Controls
                </h3>
                <p className="text-[11px] sm:text-[12px] font-HG text-violet-700/90 dark:text-violet-200/90 leading-relaxed">
                  Generate a fresh code anytime for better access security.
                </p>
              </div>
            </div>

            <Button
              type="button"
              size="sm"
              onClick={onReset}
              disabled={isPending || !workspaceId}
              className="font-HG tracking-wide w-full sm:w-auto justify-center">
              {isPending ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin mr-1.5" />
                  Resetting
                </>
              ) : (
                <>
                  <RefreshCcw className="w-3.5 h-3.5 mr-1.5" />
                  Reset Invite Code
                </>
              )}
            </Button>
          </div>

          <div className="rounded-md border border-violet-200/80 dark:border-violet-700/60 bg-white/70 dark:bg-slate-950/50 px-3 py-2.5 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-violet-600 dark:text-violet-300">
                Current Invite Code
              </p>
              <p className="text-xs font-JBM text-gray-600 dark:text-slate-200 truncate">
                {fullInviteCode || "Not available"}
              </p>
            </div>

            <Button
              type="button"
              size="sm"
              disabled={!fullInviteCode}
              onClick={onCopy}
              className={`font-HG w-full sm:w-auto justify-center text-white border-0 ring-1 transition-all duration-300 active:scale-[0.96] ${copied
                  ? "bg-linear-to-r from-emerald-500 to-teal-400 ring-emerald-400/50 hover:brightness-105"
                  : "bg-linear-to-r from-violet-600 via-purple-500 to-violet-500 ring-violet-400/40 hover:brightness-110"
                }`}>
              {copied ? (
                <Check className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              ) : (
                <Copy className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              )}
              {copied ? "Copied" : "Copy Link"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function WorkspaceUpdateForm({
  className,
  workspaceData,
  workspaceId,
  isEditMode = false,
  ...props
}) {
  const { mutate, isPending } = useUpdateWorkspace();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // For dynamic sidebar height sync
  const formCardRef = useRef(null);
  const sidebarRef = useRef(null);
  const [sideMinHeight, setSideMinHeight] = useState(0);

  useLayoutEffect(() => {
    function adjustSidebarHeight() {
      if (formCardRef.current) {
        setSideMinHeight(formCardRef.current.offsetHeight);
      }
    }
    adjustSidebarHeight();
    window.addEventListener("resize", adjustSidebarHeight);
    return () => window.removeEventListener("resize", adjustSidebarHeight);
  }, [workspaceData]); // Update when workspaceData changes (for form height changes)

  const methods = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: workspaceData?.name || "",
      key: workspaceData?.key || "",
      description: workspaceData?.description || "",
      image: workspaceData?.image || undefined,
    },
  });

  useEffect(() => {
    if (workspaceData) {
      methods.reset({
        name: workspaceData.name || "",
        key: workspaceData.key || "",
        description: workspaceData.description || "",
        image: workspaceData.image || undefined,
      });
      if (workspaceData.image) {
        setImagePreview(workspaceData.image);
      }
    }
  }, [workspaceData, methods]);

  const onSubmit = async (values) => {
    const FINAL_VALUES = {
      name: values.name || "",
      key: isEditMode ? workspaceData?.key : values.key || "",
      description: values.description || "",
      image: values.image instanceof File ? values.image : undefined,
      workspaceId: workspaceId || "",
    };

    mutate(FINAL_VALUES, {
      onSuccess: () => {
        methods.reset();
        if (isEditMode) {
          router.refresh();
        }
      },
    });
  };

  const { watch, setValue, clearErrors } = methods;

  const name = watch("name");
  const workspaceKey = watch("key");
  const description = watch("description");
  const image = watch("image");

  const calculateProgress = () => {
    let filled = 0;
    let total = 4;

    if (name?.trim()) filled++;
    if (workspaceKey?.trim()) filled++;
    if (description?.trim()) filled++;
    if (image instanceof File || imagePreview) filled++;

    return Math.round((filled / total) * 100);
  };

  const progress = calculateProgress();
  const pageTitle = isEditMode ? "Update Workspace" : "Create Workspace";
  const buttonText = isEditMode ? "Save Changes" : "Create Workspace";
  const cardTitle = isEditMode ? "Workspace Details" : "New Workspace";
  const cardDescription = isEditMode
    ? "Update your workspace information. Required fields marked with *."
    : "Fill in the details below to create your workspace.";

  // Handle image upload
  const handleImageChange = (file) => {
    if (file) {
      if (file.size > 1024 * 1024) {
        methods.setError("image", { message: "File size must be less than 1MB" });
        return;
      }
      const validTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];
      if (!validTypes.includes(file.type)) {
        methods.setError("image", { message: "Please upload PNG, JPG, SVG, or WebP" });
        return;
      }
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
      clearErrors("image");
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  // Remove image
  const removeImage = () => {
    setValue("image", undefined);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Stats for the sidebar
  const stats = [
    { label: "Members", value: workspaceData?.members?.length || 0, icon: Users, color: "text-blue-500" },
    { label: "Projects", value: workspaceData?.projects?.length || 0, icon: Settings, color: "text-violet-500" },
    { label: "Visibility", value: isEditMode ? (workspaceData?.isPublic ? "Public" : "Private") : "Private", icon: workspaceData?.isPublic ? Globe : Lock, color: "text-amber-500" },
  ];

  const steps = [
    { title: "Name", desc: "Set Workspace Name" },
    { title: "Key", desc: "Unique Workspace Identity" },
    { title: "Icon", desc: "Add Workspace Icon" },
    { title: isEditMode ? "Save" : "Create", desc: isEditMode ? "Apply changes" : "Launch Workspace" },
  ];

  // Animated counters for a more engaging UI
  const [animatedCounts, setAnimatedCounts] = useState({ members: 0, projects: 0 });

  useEffect(() => {
    const targetMembers = workspaceData?.members?.length || 0;
    const targetProjects = workspaceData?.projects?.length || 0;
    let frame = 0;
    const frames = 30;
    const interval = setInterval(() => {
      frame++;
      setAnimatedCounts({
        members: Math.round(targetMembers * (frame / frames)),
        projects: Math.round(targetProjects * (frame / frames)),
      });
      if (frame >= frames) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [workspaceData?.members?.length, workspaceData?.projects?.length]);

  const handleStatClick = (label) => {
    if (!workspaceId) return;
    if (label === "Members") router.push(`/workspaces/${workspaceId}/members`);
    if (label === "Projects") router.push(`/workspaces/${workspaceId}/projects`);
    if (label === "Tasks") router.push(`/workspaces/${workspaceId}/tasks`);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="w-full sm:px-8 px-3 pt-6">
        {/* Compact Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Workspaces
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{isEditMode ? workspaceData?.name : "New"}</span>
          </div>
          <div className="relative inline-block mb-4work">
            <h1 className="sm:text-4xl text-3xl font-black tracking-wide font-FT">
              UPDATE WORKSPACE
            </h1>
            <img
              src="/underline.png"
              alt=""
              style={{ display: "block", width: "120px", height: "auto" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Form Section */}
          <div className="lg:col-span-3">
            <Card
              className="border border-slate-200 dark:border-slate-800 shadow-sm"
              ref={formCardRef}
            >
              <CardHeader className="text-center">
                <CardTitle className="sm:text-2xl text-xl font-FT tracking-wider">
                  Update your Workspace
                </CardTitle>
                <CardDescription className="font-GS tracking-wide sm:text-sm text-xs text-gray-500 -mt-1">
                  Make sure to update your workspace details to keep your workspace up to date.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 px-4">
                <Form {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FieldGroup>
                      <DottedSeparator color="gray" className="-mt-3" />
                      <FormField
                        control={methods.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-GS tracking-wider ml-2 sm:mt-0 -mt-4">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="name"
                                type="text"
                                placeholder="Enter your workspace name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="ml-2 text-xs text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={methods.control}
                        name="key"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <FormLabel className="font-GS tracking-wider ml-2 flex items-center">
                                  Key
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="inline-flex text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
                                        <Info className="w-4 h-4" />
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="top"
                                      align="start"
                                      className="font-HG tracking-wide text-xs px-2 py-1"
                                    >
                                      Workspace key cannot be changed once created
                                    </TooltipContent>
                                  </Tooltip>
                                </FormLabel>
                              </div>
                              <span className="ml-2 px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-700 text-[10px] font-semibold uppercase tracking-wider select-none flex items-center gap-1 border border-yellow-200">
                                <Lock className="w-3 h-3 mr-0.5 text-yellow-500" />
                                Read Only
                              </span>
                            </div>
                            <FormControl>
                              <Input
                                id="key"
                                type="text"
                                placeholder="Enter your workspace code"
                                {...field}
                                readOnly
                                className="bg-gray-50 text-gray-600 text-xs"
                              />
                            </FormControl>
                            <FormMessage className="ml-2 text-xs text-red-500" />
                          </FormItem>
                        )}
                      />

                      {/* Workspace Icon Field */}
                      <div>
                        <FormField
                          control={methods.control}
                          name="image"
                          render={({ field, fieldState }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className="font-GS tracking-wider ml-2 flex items-center">
                                Workspace Icon
                              </FormLabel>
                              <div
                                className={`
                                  relative rounded-md border-2 border-dashed transition-all
                                  ${isDragging
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                                    : "border-slate-200 dark:border-slate-700"
                                  }
                                  ${fieldState.error ? "border-red-300" : ""}
                                `}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                              >
                                {imagePreview ? (
                                  <div className="flex items-center gap-3 p-2">
                                    <div className="relative w-12 h-12 rounded overflow-hidden shrink-0">
                                      <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-HG tracking-wide truncate">
                                        {image instanceof File ? image.name : "Current Icon"}
                                      </p>
                                      <p className="text-xs text-muted-foreground font-HG tracking-wide mt-0.5">
                                        Click to change
                                      </p>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon-xs"
                                      className="shrink-0 h-6 w-6"
                                      onClick={removeImage}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <div
                                    className="p-3 flex items-center gap-3 cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                  >
                                    <div
                                      className={`w-10 h-10 rounded flex items-center justify-center ${isDragging
                                        ? "bg-blue-100"
                                        : "bg-slate-100 dark:bg-slate-800"
                                        }`}
                                    >
                                      {isDragging ? (
                                        <Upload className="w-4 h-4 text-blue-500" />
                                      ) : (
                                        <ImageIcon className="w-4 h-4 text-slate-400" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-HG tracking-wide">
                                        Drag & drop or click to upload
                                      </p>
                                      <span className="text-[10px] font-HG tracking-wide dark:text-gray-300">
                                        PNG , JPG , SVG or JPEG
                                        <span
                                          style={{
                                            color: "#444",
                                            padding: "2px 4px",
                                            borderRadius: "3px",
                                            fontWeight: "bold",
                                            marginLeft: "8px",
                                          }}
                                          className="tracking-wider bg-lime-200"
                                        >
                                          Max 1MB
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                )}

                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  className="hidden"
                                  accept=".jpg,.png,.jpeg,.svg,.webp"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                      handleImageChange(e.target.files[0]);
                                    }
                                  }}
                                />
                              </div>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={methods.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center">
                              <FormLabel className="font-GS tracking-wider ml-2">
                                Description{" "}
                                <span className="text-[10px] py-0.5 px-1 bg-blue-100 text-blue-700 rounded">
                                  Optional
                                </span>
                              </FormLabel>
                            </div>
                            <FormControl>
                              <textarea
                                id="description"
                                placeholder="Enter a description for your space"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="ml-2" />
                          </FormItem>
                        )}
                      />
                    </FieldGroup>

                    <div className="flex gap-2 w-full mt-4">
                      <Button
                        type="submit"
                        size="sm"
                        className="font-HG tracking-wider active:scale-98 transition-transform duration-100 cursor-pointer flex-1 w-full"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin mr-1.5" />
                            {isEditMode ? "Saving Changes" : "Creating Workspace"}
                          </>
                        ) : (
                          buttonText
                        )}
                      </Button>
                      {isEditMode && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs flex-[.40] min-w-[80px] font-HG tracking-wider active:scale-98 transition-transform duration-100 cursor-pointer"
                          onClick={() => router.back()}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <ResetInviteCodeSection
              workspaceId={workspaceId}
            />
          </div>

          {/* Sidebar matches Form's Height */}
          <div className="lg:col-span-1">
            <div
              ref={sidebarRef}
              style={{
                minHeight: sideMinHeight ? sideMinHeight : undefined,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                height: sideMinHeight ? sideMinHeight : "auto",
              }}
            >
              {/* 1. Progress Card */}
              <Card className="px-3 py-2 bg-white/90 rounded-xl border border-blue-200 dark:border-blue-900/50 shadow-inner flex-shrink-0">
                <CardContent className="p-0!">
                  <div className="w-full mt-2 mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1 mb-1">
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            fill="#e0eaff"
                          />
                          <path
                            d="M8 12l2.5 2.5L16 9"
                            stroke="#2563eb"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="font-bold text-blue-900 text-xs font-FT ml-1 tracking-wide">
                          PROGRESS
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-blue-900 tracking-wide">
                        {progress}% Done
                      </span>
                    </div>
                    <div className="relative w-full h-3 bg-blue-100 dark:bg-blue-300 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full rounded-full transition-all duration-500 -mb-2"
                        style={{
                          width: `${progress}%`,
                          background:
                            "linear-gradient(90deg, #bbf7d0 0%, #6ee7b7 40%, #4ade80 100%)",
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2. Stats Card */}
              <Card
                className="rounded-xl border border-blue-100 dark:border-blue-800/40 px-3 py-2 flex-shrink-0 shadow-inner"
                style={{
                  background:
                    "linear-gradient(135deg, #f7fafe 0%, #fafdff 70%, #e5f6fa 100%)",
                }}
              >
                <CardContent className="!p-0">
                  <div className="mb-3 mt-1.5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="16"
                            height="16"
                            rx="4"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="#eff6ff"
                          />
                          <path
                            d="M8 12h8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M12 8v8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <h4 className="font-bold text-blue-900 text-base font-FT tracking-wide dark:text-blue-200">
                          Workspace &nbsp;Overview
                        </h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {
                          label: "Members",
                          icon: Users,
                          color: stats[0].color,
                          value: animatedCounts.members,
                        },
                        {
                          label: "Projects",
                          icon: stats[1].icon,
                          color: stats[1].color,
                          value: animatedCounts.projects,
                        },
                        {
                          label: "Tasks",
                          icon: CheckSquare,
                          color: "text-emerald-500",
                          value: workspaceData?.tasks?.length ?? 0,
                        },
                      ].map((stat, i) => (
                        <button
                          key={i}
                          onClick={() => handleStatClick(stat.label)}
                          className="group flex flex-col items-center justify-center p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 shadow-inner transition transform hover:-translate-y-0.5"
                        >
                          <div className="flex items-center justify-center mb-1 w-8 h-8 rounded-full bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
                            <stat.icon
                              className={`w-4 h-4 ${stat.color} group-hover:scale-110 transition-transform`}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                            {stat.value}
                          </span>
                          <span className="text-[10px] font-medium text-gray-500 dark:text-gray-300 tracking-wide uppercase mt-0.5">
                            {stat.label}
                          </span>
                          <span className="sr-only">{stat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {steps.map((step, index) => {
                const completed = progress > index * (100 / steps.length);
                return (
                  <div
                    key={index}
                    className={`
                          flex items-center gap-2 px-2 py-2 rounded-xl
                          border border-transparent
                          shadow-[inset_0_2px_8px_0_rgba(113,181,249,0.16)]
                          transition-all
                          bg-gradient-to-tr from-blue-50 via-white to-blue-100
                          dark:bg-gradient-to-br dark:from-blue-950/40 dark:via-blue-950/60 dark:to-blue-800/50
                          dark:border-blue-900/50
                          dark:text-gray-300
                          text-[11.5px]
                          ${completed
                        ? "border-green-200 ring-1 ring-green-100 bg-gradient-to-tr from-green-50 via-white to-green-100"
                        : "border-blue-100"}
                          hover:scale-[1.035] hover:ring-2 hover:ring-blue-100
                          hover:shadow-[inset_0_3px_12px_0_rgba(109,182,246,0.17)]
                          hover:dark:ring-blue-900/50
                        `}
                  >
                    <div
                      className={`
                            w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border-2 shrink-0
                            ${completed
                          ? "bg-gradient-to-tr from-green-100 via-green-50 to-green-200 text-green-700 border-green-400 dark:bg-gradient-to-br dark:from-green-900/40 dark:to-green-600/30 dark:text-green-300"
                          : "bg-gradient-to-tr from-blue-100 via-white to-blue-100 text-blue-400 border-blue-300 dark:bg-blue-950/30 dark:text-blue-400"
                        }
                          `}
                    >
                      {completed ? (
                        <svg className="w-3.5 h-3.5 scale-110" fill="none" viewBox="0 0 16 16">
                          <path d="M4.5 8.5l2 2.5 5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="font-semibold text-gray-900 font-FT tracking-wider dark:text-white">{step.title}</span>
                      <span className="text-gray-700 text-[10.5px] dark:text-gray-300 leading-tight opacity-80 font-HG tracking-wide">
                        {step.desc}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div>
                <div className="flex-1 flex items-end justify-center sm:mb-0 -mb-2">
                  <div className="py-2 px-2 flex flex-col items-center text-xs text-gray-500 dark:text-slate-300 text-center">
                    <div className="w-full flex flex-col items-center">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-blue-900 text-base font-FT tracking-wider dark:text-blue-200">
                            <span className="py-0.5 rounded">
                              Support <span className="text-blue-800 dark:text-blue-100">and</span> Help
                            </span>
                          </h4>
                        </div>
                      </div>
                      <span className="block bg-yellow-50 rounded-md dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100 px-3 py-4 text-xs mt-1 border border-yellow-200 dark:border-yellow-800 font-HG font-medium">
                        For guidance check the <b className="text-blue-800 dark:text-blue-300 mb-1">&nbsp;Docs</b>{" "}
                        <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 rounded px-1 font-semibold ml-1 text-[11px]">New</span>
                        <br className="mt-0.5" />
                        Need more help ? <span className="text-violet-700 dark:text-violet-200 ml-0.5">Contact admin</span> anytime.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
