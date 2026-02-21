"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Field,
  FieldGroup,
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { workspaceSchema } from "../schema";
import { useWorkspace } from "../api/use-workspace";
import { DottedSeparator } from "../../../components/Dotted-Seperator";

export default function WorkspaceCreatePage({className , ...props}) {

    const { mutate } = useWorkspace();

    const methods = useForm({

        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            name: "",
            key: "",
            description: "",
        },

    })

    const onSubmit = (values) => {

        console.log(values);
        mutate(values);

    }

    return (

        <div className="w-full sm:px-8 px-3 pt-6">

            <div className="mb-7 animate-fade-in">
                <div className="relative inline-block">
                    <h1 className="text-4xl font-black tracking-wide font-FT">
                        Create workspace
                    </h1>

                    <img
                    src="/underline.png"
                    alt=""
                    style={{ display: 'block', width: '120px', height: 'auto' }}/>

                </div>
            </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

            <div className="xl:col-span-2 sm:space-y-8">

            <Card>
                <CardHeader className="text-center">
                <CardTitle className="text-xl font-FT tracking-wider">Create a New Workspace</CardTitle>
                <CardDescription className="font-HG tracking-wide sm:text-sm text-xs">
                    Enter your workspace details below. Workspace helps you organize your projects.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}>
                <FieldGroup>
                <DottedSeparator color="gray" className="-mt-1"/>
                    <FormField control={methods.control} name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-GS tracking-wider ml-2 sm:mt-0 -mt-4">Name</FormLabel>
                                <FormControl>
                                <Input id="name" type="text" placeholder="Enter your workspace name" {...field}/>
                                </FormControl>
                                <FormMessage className="ml-2"/>
                            </FormItem>
                        )}/>
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
                        <FormField control={methods.control} name="description"
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
                    )}/>
                    <Field>
                        <Button type="submit" className="font-HG tracking-wider active:scale-98 transition-transform duration-100" disabled={methods.formState.isSubmitting}>
                        {methods.formState.isSubmitting && (
                            <svg className="animate-spin mr-2 h-4 w-4 inline" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                        )}
                        Create Workspace
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </Form>
    </CardContent>
</Card>
</div>

<div className="flex flex-col h-full">
    <Card className="flex flex-col flex-1 h-full justify-between py-5 sm:px-6 px-4 bg-gradient-to-br from-white via-gray-50 to-gray-200 border rounded-2xl">
    <div>
        <h2 className="text-2xl font-FT font-extrabold mb-2 tracking-wider text-gray-900 flex items-center gap-2">
            WORKSPACE
        <span className="ml-2 font-HG tracking-wider inline-block bg-gradient-to-r from-blue-400 to-violet-500 text-white px-2 py-1 rounded text-xs font-medium">
            Guide
        </span>
        </h2>
    <p className="text-sm text-gray-700 mb-3 font-HG pl-0.5">
        Follow these steps to get your workspace up.
    </p>
    <div className="mb-2">
        <ol className="text-gray-600 text-xs font-HG space-y-2">
        <li>
            <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold mr-2">
                Name your workspace
            </span>
            <span className="text-black font-normal">Eg : Axion Service System</span>
        </li>
        <li>
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold mr-2">
                Pick a unique key
            </span>
            <span className="text-black font-normal">Eg : ASS<span className="text-xs font-JBM">-</span>2026</span>
        </li>
        <li>
            <span className="inline-block bg-violet-100 text-violet-800 px-2 py-0.5 rounded font-bold mr-2">
                Add a description
            </span>
            <span className="text-black font-normal">Shortly describe its purpose.</span>
        </li>
        </ol>
    </div>
    <div className="flex items-center mt-4 mb-2 text-xs text-red-500 font-HG">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-0.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="flex items-center gap-2">
        <span className="text-black">
            <span className="ml-1 text-xs text-black font-medium tracking-wide whitespace-nowrap">Workspace key cannot be changed once created.</span>
        </span>
        </span>
    </div>
    <div className="flex gap-3 mt-3 w-full">
        <Button variant="default" className="flex-1 bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-900 hover:to-black shadow-sm font-HG px-6" type="button">
            Know More
        </Button>
        <Button variant="outline" type="button" className="flex-1 font-HG px-6 bg-gradient-to-r from-blue-50 via-white to-blue-100 border text-primary transition-colors relative shadow-xs">
            <span className="relative z-10" style={{wordSpacing: "2px"}}>Support Help</span>
        </Button>
    </div>
    </div>
    <div className="flex-1 flex flex-col justify-end">
        <div className="relative rounded-xl bg-gradient-to-br from-blue-100 via-white to-blue-200 border border-blue-300 overflow-hidden px-4 py-4">
        <div className="absolute top-0 right-0 opacity-30 pointer-events-none">
            <svg width="80" height="80" viewBox="0 0 120 120" fill="none">
            <circle cx="100" cy="30" r="30" fill="#3b82f6" fillOpacity="0.15"/>
            <circle cx="60" cy="90" r="20" fill="#1e3a8a" fillOpacity="0.10"/>
            </svg>
        </div>
        <div className="flex items-center mb-2">
            <svg className="w-5 h-5 -ml-1 mr-2 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="#eff6ff"/>
            <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h4 className="font-bold text-blue-900 text-base font-FT tracking-wide">
                What is a Workspace ?
            </h4>
        </div>
        <p className="text-xs text-blue-700 leading-normal text-justify font-HG">
            A <span className="font-semibold text-black bg-pink-100 px-1 rounded">workspace</span> is your team’s private area for projects and collaboration.
            Each workspace has its own members and content
            <span className="text-black font-medium"> - Manage your projects and tasks with ease.</span>
            <br/><br/>
            <span
                className="font-semibold tracking-wider mr-1 -ml-1 px-2 rounded inline-flex items-center gap-1"
                style={{
                    background: "linear-gradient(90deg, #dbeafe 0%, #bae6fd 100%)",
                    color: "#1e293b",
                    boxShadow: "0 2px 6px 0 rgba(160,202,254,0.14)"
                }}>
                Note :
            </span>
            Set a clear <span className="text-blue-800 font-semibold">name</span> , <span className="text-blue-800 font-semibold">code</span> and <span className="text-blue-800 font-semibold">description</span> to make your workspace instantly recognizable for everyone. Teamwork makes the dream work.
        </p>
        </div>
    </div>
    </Card>
    </div>
    </div>
    </div>
    );
}
