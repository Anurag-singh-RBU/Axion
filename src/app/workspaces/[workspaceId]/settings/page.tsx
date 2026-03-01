"use client";

import React from 'react';
import { useGetWorkspace } from '@/Features/workspaces/api/use-workspace-by-id';
import WorkspaceUpdateForm from '@/Features/workspaces/components/updateWorkspaceForm';
import { useParams } from 'next/navigation';

const WorkspaceSettingsPage = () => {
  const params = useParams();
  const workspaceId = params?.workspaceId as string;
  
  const { data: workspace, isLoading, error } = useGetWorkspace(workspaceId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">
          Loading workspace...
        </p>
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
