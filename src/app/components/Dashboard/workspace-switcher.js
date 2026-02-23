"use client"

import React, { useState } from "react";
import { useGetWorkspaces } from "@/Features/workspaces/api/use-get-workspace";
import { IMAGES_BUCKET_ID } from "@/config";
import { ChevronDown, Briefcase, Plus, Clock, Star } from "lucide-react";

const WorkspaceSwitcher = () => {
    const { data, isLoading } = useGetWorkspaces();
    const [isOpen, setIsOpen] = useState(true);
    const [showMore, setShowMore] = useState(false);
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

    const workspaces = data?.documents || [];
    const total = data?.total || 0;

    // Set initial selected workspace to the first one when data loads
    React.useEffect(() => {
        if (workspaces.length > 0 && !selectedWorkspaceId) {
            setSelectedWorkspaceId(workspaces[0].$id);
        }
    }, [workspaces, selectedWorkspaceId]);

    // Current workspace is the selected one (or first one if nothing selected)
    const current = selectedWorkspaceId 
        ? workspaces.find(ws => ws.$id === selectedWorkspaceId) || workspaces[0]
        : workspaces[0];

    const recent = workspaces.slice(0, 3);
    const extra = workspaces.slice(3);

    // Handle workspace selection - set as current
    const handleWorkspaceSelect = (workspaceId) => {
        setSelectedWorkspaceId(workspaceId);
        console.log('Selected workspace:', workspaceId);
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
                    {isLoading ? "Loading" : `${total} active`}
                </span>
                {total > 0 && (
                <span className="inline-flex justify-center items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-HG text-emerald-700 border border-emerald-100">
                    <Star className="h-3 w-3 fill-emerald-400 text-emerald-600"/>
                    <span className="font-FT">All synced</span>
                </span>
                )}
            </div>
            </div>
            <button type="button" className="inline-flex items-center -mt-5 gap-1 rounded-md bg-black dark:bg-[#1868DB] text-white px-2.5 py-1.5 text-[11px] font-HG tracking-wide shadow-sm hover:bg-gray-900 active:scale-[0.98] transition-transform">
                <Plus className="h-3.5 w-3.5"/>
                <span className="inline font-HG tracking-wide">New</span>
            </button>
        </div>

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
                                <img
                                    src={logoSrc}
                                    alt={current.name || "Workspace"}
                                    className="h-7 w-7 object-cover rounded-md"/>
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
                                className="inline-flex items-center gap-1 text-[12px] font-HG text-gray-50 hover:text-gray-700 transition-colors">
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
