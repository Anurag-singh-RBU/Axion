'use client'

import React, { useMemo } from 'react'
import { DataTable } from '@/Features/workspaces/components/table-columns/data-table'
import { columns } from '@/Features/workspaces/components/table-columns/columns'
import { useGetWorkspaces } from '@/Features/workspaces/api/use-get-workspace'

const SettingsPage = () => {

  const { data: workspacesData , isLoading } = useGetWorkspaces();

  const tableData = useMemo(() => {

    if(!workspacesData?.documents) return []

    return workspacesData.documents.map((workspace , index) => ({
      id: workspace.$id,
      workspaceName: workspace.name,
      key: workspace.key,
      'serial no': "AWS-" + String(index + 1).padStart(3, '0'),
      membersCount: workspace.membersCount || 1,
      projectsCount: workspace.projectsCount || 0,
      'created at': workspace.$createdAt ? new Date(workspace.$createdAt) : null,
      status: workspace.status || 'active',

    }))
  }, [workspacesData])

  return (
    <div className="space-y-6">
      <div>
        <DataTable columns={columns} data={tableData} isLoading={isLoading}/>
      </div>
    </div>
  )
}

export default SettingsPage