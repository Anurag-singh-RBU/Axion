"use client";

import React from 'react';
import { useGetWorkspace } from '@/Features/workspaces/api/use-workspace-by-id';
import WorkspaceUpdateForm from '@/Features/workspaces/components/updateWorkspaceForm';
import { useParams } from 'next/navigation';
import { Component } from "@/components/luma-spin";
import { Skeleton } from '@/components/ui/skeleton';

const WorkspaceSettingsPage = () => {
  const params = useParams();
  const workspaceId = params?.workspaceId as string;
  
  const { data: workspace, isLoading, error } = useGetWorkspace(workspaceId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 overflow-x-hidden">
        <div className="w-full max-w-150 space-y-4">
          <Skeleton className="h-10 w-75"/>
          <Skeleton className="h-6 w-50"/>
          <Skeleton className="h-10 w-full"/>
          <Skeleton className="h-10 w-full"/>
          <Skeleton className="h-24 w-full"/>
          <Skeleton className="h-10 w-37.5"/>
        </div>
      </div>
    );
  }

  if (error || !workspace) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">
          Workspace not found
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <WorkspaceUpdateForm
        className=""
        workspaceId={workspaceId}
        workspaceData={{
          name: workspace.name,
          key: workspace.key,
          description: workspace.description,
          image: workspace.imageUrl,
        }}
        isEditMode={true}
      />
    </div>
  );
};

export default WorkspaceSettingsPage;
