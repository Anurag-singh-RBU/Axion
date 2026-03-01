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
import { useEffect, useRef } from "react";
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
import { DottedSeparator } from "../../../components/Dotted-Seperator";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WorkspaceUpdateForm({ className, workspaceData, workspaceId, isEditMode = false, ...props }) {
  const { mutate } = useUpdateWorkspace();
  const router = useRouter();
  const inputRef = useRef(null);

  const methods = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: workspaceData?.name || "",
      key: workspaceData?.key || "",
      description: workspaceData?.description || "",
      image: workspaceData?.image || undefined,
    },
  });

  // Update form when workspaceData changes
  useEffect(() => {
    if (workspaceData) {
      methods.reset({
        name: workspaceData.name || "",
        key: workspaceData.key || "",
        description: workspaceData.description || "",
        image: workspaceData.image || undefined,
      });
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

  const { watch } = methods;

  const name = watch("name");
  const workspaceKey = watch("key");
  const image = watch("image");

  const calculateProgress = () => {
    let filled = 0;
    let total = 3;

    if (name?.trim()) filled++;
    if (workspaceKey?.trim()) filled++;
    if (image instanceof File) filled++;

    return Math.round((filled / total) * 100);
  };

  const progress = calculateProgress();
  const pageTitle = isEditMode ? "UPDATE  WORKSPACE" : "Create Workspace";
  const buttonText = isEditMode ? "Update Workspace" : "Create Workspace";
  const cardTitle = isEditMode ? "Update Workspace Details" : "Create a New Workspace";
  const cardDescription = isEditMode 
    ? "Modify your workspace details. Update your workspace information as needed."
    : "Enter your workspace details below. Workspace helps you organize your projects.";

  return (
    <div className="w-full sm:px-8 px-3 pt-6">
      <div className="mb-7 animate-fade-in">
        <div className="relative inline-block">
          <h1 className="text-4xl font-black tracking-wide font-FT">
            UPDATE &nbsp;WORKSPACE
          </h1>

          <img
            src="/underline.png"
            alt="underline decoration"
            style={{ display: "block", width: "120px", height: "auto" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 sm:space-y-8">
          <Card className="border-0 shadow-none rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-200 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-FT tracking-wider">
                {cardTitle}
              </CardTitle>
              <CardDescription className="font-HG tracking-wide sm:text-sm text-xs">
                {cardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Form {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <FieldGroup>
                    <DottedSeparator color="gray" className="-mt-1" />
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
                          <FormMessage className="ml-2" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name="image"
                      render={({ field }) => (
                        <div className="flex flex-col gap-y-2">
                          <div className="flex items-center gap-x-5">
                            {field.value ? (
                              <div className="size-[72px] relative rounded-md overflow-hidden">
                                <Image
                                  src={
                                    field.value instanceof File
                                      ? URL.createObjectURL(field.value)
                                      : typeof field.value === "string"
                                        ? field.value
                                        : ""
                                  }
                                  alt="workspace image"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <Avatar className="size-[72px]">
                                <AvatarFallback>
                                  <ImageIcon className="size-[32px] text-neutral-400 dark:text-white" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className="flex flex-col justify-center">
                              <FormLabel className="font-GS tracking-wider ml-2 sm:mt-0 mb-2">
                                Workspace Icon
                              </FormLabel>
                              <span className="text-[11px] sm:block hidden font-HG ml-2 tracking-wide dark:text-gray-300">
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
                              <Input
                                id="image"
                                type="file"
                                className="hidden"
                                accept=".jpg,.png,.jpeg,.svg"
                                onChange={(e) => {
                                  if (
                                    e.target.files &&
                                    e.target.files.length > 0
                                  ) {
                                    field.onChange(e.target.files[0]);
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="w-fit sm:mt-2 px-3 py-2 rounded-md bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-900 transition-colors duration-150"
                                onClick={() => {
                                  const input = document.getElementById("image");
                                  if (input) input.click();
                                }}
                              >
                                <span className="flex items-center gap-2 cursor-pointer">
                                  <ImageIcon className="w-4 h-4 text-blue-500" />
                                  <span className="font-HG text-sm dark:text-gray-200">
                                    Upload Image
                                  </span>
                                </span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name="key"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-GS tracking-wider ml-2 sm:mt-0 -mt-2">
                            Key 
                            {isEditMode && (
                              <span className="text-xs text-gray-500 ml-2 font-normal">
                                (Read-only)
                              </span>
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="key"
                              type="text"
                              placeholder="Enter your workspace code"
                              disabled={isEditMode}
                              readOnly={isEditMode}
                              value={isEditMode ? (workspaceData?.key || "") : field.value}
                              onChange={!isEditMode ? field.onChange : undefined}
                              className={isEditMode ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}
                            />
                          </FormControl>
                          {isEditMode && (
                            <p className="text-xs text-gray-500 ml-2 mt-1">
                              Workspace key cannot be changed once created.
                            </p>
                          )}
                          <FormMessage className="ml-2" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center">
                            <FormLabel className="font-GS tracking-wider ml-2 sm:mt-0 -mt-2">
                              Description
                            </FormLabel>
                            <span className="ml-2 sm:mt-0 -mt-2 px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600 font-medium">
                              optional
                            </span>
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
                    <Field>
                      <Button
                        type="submit"
                        className="font-HG tracking-wider active:scale-98 transition-transform duration-100 cursor-pointer"
                        disabled={methods.formState.isSubmitting}
                      >
                        {methods.formState.isSubmitting && (
                          <svg
                            className="animate-spin mr-2 h-4 w-4 inline"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                          </svg>
                        )}
                        {buttonText}
                      </Button>
                    </Field>
                  </FieldGroup>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col h-full">
          <Card className="flex flex-col h-full min-h-0 flex-1 justify-between py-5 sm:px-6 px-4 bg-gradient-to-br from-white via-gray-50 to-gray-200 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black border rounded-2xl">
            <div className="flex flex-col">
              <h2 className="text-2xl font-FT font-extrabold mb-2 tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                WORKSPACE
                <span className="ml-2 font-HG tracking-wider inline-block bg-gradient-to-r from-blue-400 to-violet-500 text-white px-2 py-1 rounded text-xs font-medium">
                  {isEditMode ? "EDIT" : "Guide"}
                </span>
              </h2>
              <p className="text-sm text-gray-700 mb-3 font-HG pl-0.5 dark:text-gray-300">
                {isEditMode ? "Update your workspace information below." : "Follow these steps to get your workspace up."}
              </p>
              <div className="mb-2">
                <ol className="text-gray-600 text-xs font-HG space-y-2">
                  <li>
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold mr-2">
                      {isEditMode ? "Edit" : "Name your"} workspace
                    </span>
                    <span className="text-black font-normal dark:text-white">
                      Eg : Axion Service System
                    </span>
                  </li>
                  <li>
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold mr-2">
                      {isEditMode ? "Review" : "Pick a unique"} key
                    </span>
                    <span className="text-black font-normal dark:text-white">
                      Eg : ASS
                      <span className="text-xs font-JBM dark:text-white">
                        {" "}-{" "}
                      </span>
                      2026
                    </span>
                  </li>
                  <li>
                    <span className="inline-block bg-violet-100 text-violet-800 px-2 py-0.5 rounded font-bold mr-2">
                      {isEditMode ? "Change" : "Add a"} description
                    </span>
                    <span className="text-black font-normal dark:text-white">
                      {isEditMode ? "Update the workspace purpose." : "Shortly describe its purpose."}
                    </span>
                  </li>
                </ol>
              </div>
              <div className="flex items-center mt-4 mb-2 text-xs text-red-500 font-HG">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-0.5 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="12"
                    y1="16"
                    x2="12"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="12"
                    y1="8"
                    x2="12.01"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="flex items-center gap-2">
                  <span className="text-black">
                    <span className="ml-1 text-xs text-black font-medium tracking-wide whitespace-nowrap dark:text-teal-300">
                      Workspace key cannot be changed once created.
                    </span>
                  </span>
                </span>
              </div>
              <div className="flex gap-3 mt-3 w-full">
                <Button
                  variant="default"
                  className="flex-1 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:border-slate-700 bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-900 hover:to-black shadow-sm font-HG px-6"
                  type="button"
                >
                  Know More
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="flex-1 dark:border-dotted dark:border-gray-400 font-HG px-6 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:border-slate-700 bg-gradient-to-r from-blue-50 via-white to-blue-100 border text-primary transition-colors relative shadow-xs"
                >
                  <span
                    className="relative z-10 dark:text-white"
                    style={{ wordSpacing: "2px" }}
                  >
                    Support Help
                  </span>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-end min-h-0">
              <div className="relative rounded-xl bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-blue-300 dark:border-gray-600 overflow-hidden px-4 py-4 h-full">
                <div className="absolute top-0 right-0 opacity-30 pointer-events-none">
                  <svg width="80" height="80" viewBox="0 0 120 120" fill="none">
                    <circle
                      cx="100"
                      cy="30"
                      r="30"
                      fill="#3b82f6"
                      fillOpacity="0.15"
                    />
                    <circle
                      cx="60"
                      cy="90"
                      r="20"
                      fill="#1e3a8a"
                      fillOpacity="0.10"
                    />
                  </svg>
                </div>
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 -ml-1 mr-2 text-blue-600"
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
                    {isEditMode ? "Updating Workspace" : "What is a Workspace?"}
                  </h4>
                </div>
                <p className="text-xs text-blue-700 leading-normal text-justify font-HG dark:text-amber-50">
                  {isEditMode ? (
                    <>
                      Update your workspace <span className="font-semibold text-black bg-pink-100 px-1 rounded">details</span> as needed. You can modify the name, description, and icon at any time. The workspace key is <span className="font-semibold">permanent</span> and cannot be changed.
                      <br />
                      <br />
                      <span
                        className="font-semibold tracking-wider mr-1 -ml-1 px-2 rounded inline-flex items-center gap-1"
                        style={{
                          background: "linear-gradient(90deg, #dbeafe 0%, #bae6fd 100%)",
                          color: "#1e293b",
                          boxShadow: "0 2px 6px 0 rgba(160,202,254,0.14)",
                        }}
                      >
                        Tip:
                      </span>
                      Keep your workspace information <span className="text-blue-800 font-semibold dark:text-teal-200">up-to-date</span> so team members can easily understand its purpose.
                    </>
                  ) : (
                    <>
                      A <span className="font-semibold text-black bg-pink-100 px-1 rounded">workspace</span> is your team&apos;s private area for projects and collaboration. Each workspace has its own members and content
                      <span className="text-black font-medium dark:text-blue-200">
                        {" "}- Manage your projects and tasks with ease.
                      </span>
                      <br />
                      <br />
                      <span
                        className="font-semibold tracking-wider mr-1 -ml-1 px-2 rounded inline-flex items-center gap-1"
                        style={{
                          background: "linear-gradient(90deg, #dbeafe 0%, #bae6fd 100%)",
                          color: "#1e293b",
                          boxShadow: "0 2px 6px 0 rgba(160,202,254,0.14)",
                        }}
                      >
                        Note:
                      </span>
                      Set a clear <span className="text-blue-800 font-semibold dark:text-teal-200">name</span>, <span className="text-blue-800 font-semibold dark:text-red-200">code</span> and <span className="text-blue-800 font-semibold dark:text-purple-200">description</span> to make your workspace instantly recognizable for everyone. Teamwork makes the dream work.
                    </>
                  )}
                </p>
                <div className="mt-4 px-3 bg-white/90 rounded-xl border border-slate-100">
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
                </div>
                <div className="flex justify-center items-center mt-3">
                  <span className="flex items-center gap-2 px-3 font-HG text-xs font-semibold text-blue-800 dark:text-blue-300 tracking-wide">
                    <span>
                      {isEditMode ? "UPDATING" : "ALMOST THERE"} {" "}
                      <span className="font-bold text-green-800 dark:text-green-300">
                        {" "}- {isEditMode ? "SAVE CHANGES" : "KEEP GOING"} {" "}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}