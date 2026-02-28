"use client"

import React, { useState } from "react";
import { useSound } from "@/hooks/use-sound";
import { click004Sound } from "../../../lib/click-004";
import { useGetWorkspaces } from "@/Features/workspaces/api/use-get-workspace";
import { IMAGES_BUCKET_ID } from "@/config";
import { ChevronDown, Briefcase, Plus, Clock, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "../../../components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import useMediaQuery from "../../../hooks/use-media-query";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { workspaceSchema } from "@/Features/workspaces/schema";
import { useWorkspace } from "@/Features/workspaces/api/use-workspace";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { DottedSeparator } from "../../../components/Dotted-Seperator";
import {
    Avatar,
    AvatarFallback
} from "../../../components/ui/avatar";
import { ImageIcon } from "lucide-react";
import Signature from "@/Features/workspaces/components/signature";

const WorkspaceSwitcher = () => {

  const { mutate } = useWorkspace();
  const play = useSound(click004Sound);

  const methods = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      key: "",
      description: "",
      image: null,
    },
  });

  const onSubmit = async (values) => {
    const FINAL_VALUES = {
      name: values.name || "",
      key: values.key || "",
      description: values.description || "",
      image: values.image instanceof File ? values.image : null,
    };

    await mutate(FINAL_VALUES, {
      onSuccess: async ({ data }) => {
        methods.reset();
        setIsCreateOpen(false);

        const workspaceId = data.$id;

        if(workspaceId){
          router.push(`/workspaces/${workspaceId}`);
        }
      },
    });
  };

  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { data, isLoading } = useGetWorkspaces();
  const [isOpen, setIsOpen] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const workspaces = data?.documents || [];
  const total = data?.total || 0;

  React.useEffect(() => {
      if (workspaces.length > 0 && !selectedWorkspaceId) {
          setSelectedWorkspaceId(workspaces[0].$id);
      }
  }, [workspaces, selectedWorkspaceId]);

  const current = selectedWorkspaceId 
      ? workspaces.find(ws => ws.$id === selectedWorkspaceId) || workspaces[0]
      : workspaces[0];

  const recent = workspaces.slice(0, 3);
  const extra = workspaces.slice(3);

  const handleWorkspaceSelect = (workspaceId) => {

      setSelectedWorkspaceId(workspaceId);
      router.push(`/workspaces/${workspaceId}`);

  };

  return (
      <div className="px-3 py-3">
      <div className="flex items-center justify-between mb-2">
          <div>
          <p className="text-[13px] font-HG uppercase tracking-[0.16em] text-gray-800 dark:text-white font-semibold">
            Workspaces
          </p>
          <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-GS text-gray-900 dark:text-gray-300 tracking-wider">
                {isLoading ? "Please wait" : `${total} active`}
              </span>
              {total > 0 && (
              <span className="inline-flex justify-center items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-HG text-emerald-700 border border-emerald-100">
                <Star className="h-3 w-3 fill-emerald-400 text-emerald-600"/>
                <span className="font-FT">All synced</span>
              </span>
              )}
          </div>
          </div>
          <button type="button" className="inline-flex items-center -mt-5 gap-1 rounded-md bg-black dark:bg-[#1868DB] text-white px-2.5 py-1.5 text-[11px] font-HG tracking-wide shadow-sm active:scale-[0.98] transition-transform cursor-pointer" onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-3.5 w-3.5"/>
            <span className="inline font-HG tracking-wide">New</span>
          </button>
      </div>

      {!isMobile && (
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogContent className="py-5">
                  <Form {...methods}>
                      <form onSubmit={methods.handleSubmit(onSubmit)}>
                          <DialogTitle className="text-lg font-bold mb-4 px-4">
                              <div className="flex flex-row items-center gap-3">
                                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                                    <Signature className="h-4 w-4 -rotate-12" />
                                  </span>
                                  <div className="-mt-0.5">
                                      <h4 className="font-bold text-blue-900 text-lg font-FT tracking-wide dark:text-blue-200">
                                        Create Workspace
                                      </h4>
                                      <span className="block text-xs text-muted-foreground/80 font-medium font-HG tracking-wide">
                                        Setup your workspace easily right here
                                      </span>
                                  </div>
                              </div>
                          </DialogTitle>
                          <FieldGroup>
                          <DottedSeparator color="gray" className="-mt-1"/>
                          <FormField
                            control={methods.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="px-4">
                                <FormLabel className="font-GS tracking-wider ml-2 -mt-4">
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
                              <div className="flex flex-col gap-y-2 px-4">
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
                                        alt="ws img"
                                        fill
                                        className="object-cover cursor-not-allowed"
                                      />
                                    </div>
                                  ) : (
                                    <Avatar className="size-[72px]">
                                      <AvatarFallback>
                                        <ImageIcon className="size-[32px] text-neutral-400 dark:text-white"></ImageIcon>
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                  <div className="flex flex-col justify-center">
                                    <FormLabel className="font-GS tracking-wider ml-2 sm:mt-0 mb-2">
                                      Workspace &nbsp;Icon
                                    </FormLabel>
                                    <span className="text-[11px] sm:block hidden font-HG ml-2 trcking-wide dark:text-gray-300">
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
                                      accept=".jpg , .png , .jpeg , .svg"
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
                                        const input =
                                          document.getElementById("image");
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
                              <FormItem className="px-4">
                                <FormLabel className="font-GS tracking-wider ml-2 sm:mt-0 -mt-2">
                                  Key
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    id="key"
                                    type="text"
                                    placeholder="Enter your workspace code"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="ml-2" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={methods.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem className="px-4">
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
                          <Field className="px-4">
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
                              Create Workspace
                            </Button>
                          </Field>
                          </FieldGroup>
                      </form>
                  </Form>
              </DialogContent>
          </Dialog>
      )}

      {isMobile && (
          <Drawer open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DrawerContent className="p-0">
                  <div className="px-4 pb-4">
                      <Form {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                              <FieldGroup>
                          <FormField
                            control={methods.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-GS tracking-wider ml-2 mt-4">
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
                                <FormMessage className="ml-2"/>
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
                                        alt="ws img"
                                        fill
                                        className="object-cover cursor-not-allowed"
                                      />
                                    </div>
                                  ) : (
                                    <Avatar className="size-[72px]">
                                      <AvatarFallback>
                                        <ImageIcon className="size-[32px] text-neutral-400 dark:text-white"></ImageIcon>
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                  <div className="flex flex-col justify-center">
                                    <FormLabel className="font-GS tracking-wider ml-2 sm:mt-0 mb-2">
                                      Workspace &nbsp;Icon
                                    </FormLabel>
                                    <span className="text-[11px] sm:block hidden font-HG ml-2 trcking-wide dark:text-gray-300">
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
                                      accept=".jpg , .png , .jpeg , .svg"
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
                                        const input =
                                          document.getElementById("image");
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
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    id="key"
                                    type="text"
                                    placeholder="Enter your workspace code"
                                    {...field}
                                  />
                                </FormControl>
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
                                <FormMessage className="ml-2"/>
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
                              Create Workspace
                            </Button>
                          </Field>
                          </FieldGroup>
                          </form>
                      </Form>
                  </div>
              </DrawerContent>
          </Drawer>
      )}

      {current && (
          <>
          <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="group flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-2.5 text-left hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-sm">
                  {(() => {
                      const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
                      const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

                      let logoSrc;
                      if(current?.imageUrl){

                          if(current.imageUrl.startsWith("http")){
                              logoSrc = current.imageUrl;
                          }
                          else if(endpoint && projectId){
                              logoSrc = `${endpoint}/storage/buckets/${IMAGES_BUCKET_ID}/files/${current.imageUrl}/view?project=${projectId}`;
                          }
                      }

                      if(logoSrc){
                          return (
                              <img src={logoSrc} alt={current.name || "Workspace"} className="h-7 w-7 object-cover rounded-md"/>
                          );
                      }

                      return <Briefcase className="h-4.5 w-4.5"/>;

                  })()}
              </div>
              <div className="flex flex-col">
                  <span className="text-[13px] font-GS text-gray-900 line-clamp-1 tracking-wide">
                      {current.name || "Untitled workspace"}
                  </span>
                  <span className="text-[11px] font-HG text-gray-500">
                      {current.key || "No key"} · Current
                  </span>
              </div>
              </div>
              <ChevronDown
              className={`h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-transform ${
                  isOpen ? "rotate-180" : ""
              }`}/>
          </button>

          {isOpen && (
              <>
              {recent.length > 0 && (
                  <div className="mt-3 rounded-lg border border-dashed border-gray-200 bg-white/60 px-2.5 py-2.5 dark:bg-teal-50">
                  <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-gray-500 dark:text-black"/>
                          <span className="text-[11px] font-HG uppercase tracking-[0.14em] text-gray-500 dark:text-black">
                              Recent
                          </span>
                      </div>
                      <span className="text-[10px] font-FT tracking-wider text-gray-500 dark:text-black">
                          Last {recent.length} opened
                      </span>
                  </div>

                  <div className="space-y-1">
                      {recent.map((ws) => {
                          
                          const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
                          const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
                          
                          let logoSrc;
                          if(ws?.imageUrl){
                              if(ws.imageUrl.startsWith("http")){
                                  logoSrc = ws.imageUrl;
                              }
                              else if(endpoint && projectId){
                                  logoSrc = `${endpoint}/storage/buckets/${IMAGES_BUCKET_ID}/files/${ws.imageUrl}/view?project=${projectId}`;
                              }
                          }

                          const isSelected = selectedWorkspaceId === ws.$id;

                          return (
                              <button
                                  key={ws.$id}
                                  type="button"
                                  onClick={() => handleWorkspaceSelect(ws.$id)}
                                  className={`flex w-full items-center justify-between rounded-md px-1.5 py-1.5 text-left text-[12px] transition-colors group ${
                                      isSelected 
                                          ? 'bg-blue-50 border-l-2 border-blue-500' 
                                          : 'hover:bg-gray-100'
                                  }`}>
                                  <div className="flex items-center gap-1.5 -ml-1.5">
                                      {logoSrc ? (
                                          <img 
                                              src={logoSrc} 
                                              alt={ws.name || "Workspace"}
                                              className="h-5 w-5 object-cover rounded-sm"
                                          />
                                      ) : null}
                                      <span 
                                          className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-gray-900 text-[10px] font-HG tracking-wider text-white"
                                          style={{ display: logoSrc ? 'none' : 'flex' }}>
                                          {(ws.name || "?").slice(0, 2).toUpperCase()}
                                      </span>
                                      <span className={`font-HG line-clamp-1 ${isSelected ? 'text-blue-700 font-semibold' : 'text-gray-800'}`}>
                                          {ws.name || "Untitled workspace"}
                                      </span>
                                  </div>
                                  <span className={`text-[10px] font-JBM tracking-wide ${isSelected ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`}>
                                      {ws.key || "No key"}
                                  </span>
                              </button>
                          );
                      })}
                  </div>

                  {extra.length > 0 && (
                      <div className="mt-2">
                          <button
                              type="button"
                              onClick={() => setShowMore((prev) => !prev)}
                              className="inline-flex items-center gap-1 text-[12px] font-HG text-gray-500 hover:text-gray-700 transition-colors">
                              <span>
                                  {showMore
                                      ? "Hide additional workspaces"
                                      : `See ${extra.length} more workspaces`}
                              </span>
                              <ChevronDown
                                  className={`h-3.5 w-3.5 transition-transform ${
                                      showMore ? "rotate-180" : ""
                                  }`}/>
                          </button>

                          {showMore && (
                              <div className="mt-1 space-y-1">
                                  {extra.map((ws) => {
                                      const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
                                      const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
                                      
                                      let logoSrc;
                                      if(ws?.imageUrl){
                                          if(ws.imageUrl.startsWith("http")){
                                              logoSrc = ws.imageUrl;
                                          }
                                          else if(endpoint && projectId){ 
                                              logoSrc = `${endpoint}/storage/buckets/${IMAGES_BUCKET_ID}/files/${ws.imageUrl}/view?project=${projectId}`;
                                          }
                                      }

                                      const isSelected = selectedWorkspaceId === ws.$id;

                                      return (
                                          <button
                                              key={ws.$id}
                                              type="button"
                                              onClick={() => handleWorkspaceSelect(ws.$id)}
                                              className={`flex w-full items-center justify-between rounded-md px-1.5 py-1.5 text-left text-[12px] transition-colors group ${
                                                  isSelected 
                                                      ? 'bg-blue-50 border-l-2 border-blue-500' 
                                                      : 'hover:bg-gray-100'
                                              }`}>
                                              <div className="flex items-center gap-1.5 -ml-1.5">
                                                  {logoSrc ? (
                                                      <img 
                                                          src={logoSrc} 
                                                          alt={ws.name || "Workspace"}
                                                          className="h-5 w-5 object-cover rounded-sm"
                                                      />
                                                  ) : null}
                                                  <span 
                                                      className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-gray-800 text-[10px] font-HG tracking-wider text-white"
                                                      style={{ display: logoSrc ? 'none' : 'flex' }}>
                                                      {(ws.name || "?").slice(0, 2).toUpperCase()}
                                                  </span>
                                                  <span className={`font-HG line-clamp-1 ${isSelected ? 'text-blue-700 font-semibold' : 'text-gray-800'}`}>
                                                      {ws.name || "Untitled workspace"}
                                                  </span>
                                              </div>
                                              <span className={`text-[10px] font-JBM tracking-wide ${isSelected ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`}>
                                                  {ws.key || "No key"}
                                              </span>
                                          </button>
                                      );
                                  })}
                              </div>
                          )}
                      </div>
                  )}
                  </div>
              )}

              {!isLoading && total === 0 && (
                  <div className="mt-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 px-2.5 py-2.5 text-[11px] text-black font-HG">
                      No workspaces yet. Create one to get started.
                  </div>
              )}
              </>
          )}
          </>
      )}
      </div>
  );
};

export default WorkspaceSwitcher;
