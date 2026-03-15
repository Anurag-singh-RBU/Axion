"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../../../../components/ui/badge"
import { FormatTableDateObject, HeaderColumnButton } from "./data-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../../components/ui/dropdown-menu"
import { Button } from "../../../../components/ui/button"
import BoxIcon from "@/app/assets/icons/box"
import FileAlertIcon from "@/app/assets/icons/file-alert"
import FileBanIcon from "@/app/assets/icons/file-ban"
import FileCheckIcon from "@/app/assets/icons/file-check"
import SquareWandIcon from "@/app/assets/icons/square-wand-sparkle"
import FilePenIcon from "@/app/assets/icons/file-pen"
import TrashIcon from "@/app/assets/icons/trash"
import HardriveIcon from "@/app/assets/icons/hardrive"

import { Eye, Trash2, Edit3, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useDeleteWorkspace } from "@/Features/workspaces/api/use-delete-workspace"
import { useConfirm } from "@/hooks/use-confirm"

export type WorkspaceRow = {
  id: string,
  workspaceName: string
  key: string
  "serial no": string
  membersCount: number
  projectsCount: number
  "created at": Date | null
  status: "active" | "disabled"
}

// status type alias for convenience
export type WorkspaceStatus = "active" | "disabled"

const WorkspaceActions = ({ workspaceId, workspaceName }: { workspaceId: string; workspaceName: string }) => {
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Delete Workspace",
    message: `Are you sure you want to delete  \"${workspaceName}\ " ? This action cannot be undone.`,
    confirmText: "Delete",
    cancelText: "Cancel",
    variant: "destructive",
  });
  const { mutate, isPending } = useDeleteWorkspace();

  const onDeleteClick = async () => {
    const ok = await confirm();

    if (!ok) return;

    mutate({ workspaceId });
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8" disabled={isPending}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="">
          <Link href={`/workspaces/${workspaceId}`}>
            <DropdownMenuItem className="font-HG text-sm cursor-pointer" inset={undefined}>
              <HardriveIcon/>
                Preview
              </DropdownMenuItem>
          </Link>
          <Link href={`/workspaces/${workspaceId}/update`} className="w-full">
            <DropdownMenuItem className="font-HG text-sm cursor-pointer" inset={undefined}>
              <FilePenIcon/>
                Update
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="font-HG text-sm cursor-pointer text-destructive"
            inset={undefined}
            disabled={isPending}
            onClick={onDeleteClick}>
            <TrashIcon/>
              {isPending ? "Deleting" : "Delete"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export const columns: ColumnDef<WorkspaceRow>[] = [
  {
    accessorKey: "workspaceName",
    header: ({ column }) => <HeaderColumnButton column={column}>Workspace</HeaderColumnButton>,
    cell: ({ row }) => (
      <div className="font-HG text-xs uppercase tracking-wide">{row.original.workspaceName}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "key",
    header: ({ column }) => <HeaderColumnButton column={column}>Key</HeaderColumnButton>,
    cell: ({ row }) => <div className="text-muted-foreground text-xs -ml-0.5 font-HG tracking-wide">{row.original.key}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "serial no",
    header: ({ column }) => <HeaderColumnButton column={column}>Serial No</HeaderColumnButton>,
    cell: ({ row }) => <div className="text-xs font-HG tracking-wide">{row.original["serial no"]}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "membersCount",
    header: ({ column }) => <HeaderColumnButton column={column}>Members</HeaderColumnButton>,
    cell: ({ row }) => (
      <Badge variant="purple" className="text-xs font-JBM" icon>
        <SquareWandIcon/>
        {row.original.membersCount}
      </Badge>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "projectsCount",
    header: ({ column }) => <HeaderColumnButton column={column}>Projects</HeaderColumnButton>,
    cell: ({ row }) => (
      <Badge variant="gray" className="text-xs">
        <BoxIcon />
        {row.original.projectsCount}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <HeaderColumnButton column={column}>Status</HeaderColumnButton>,
    cell: ({ row }) => (
      <Badge className="capitalize font-HG" variant={getStatusBadgeVariant(row.original.status)} icon>
        {getStatusIcon(row.original.status)}
        {row.original.status}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "created at",
    header: ({ column }) => <HeaderColumnButton column={column}>Created At</HeaderColumnButton>,
    cell: ({ row }) => <FormatTableDateObject date={row.original["created at"]}/>,
  },
  {
    accessorKey: "actions",
    header: ({ column }) => <HeaderColumnButton column={column}>Actions</HeaderColumnButton>,
    cell: ({ row }) => <WorkspaceActions workspaceId={row.original.id} workspaceName={row.original.workspaceName} />,
    enableSorting: false,
  },
]

const getStatusIcon = (status: WorkspaceStatus) => {
  switch (status) {
    case "active":
      return <FileCheckIcon/>;
    case "disabled":
      return <FileBanIcon/>;
    default:
      return <FileAlertIcon/>;
  }
};

const getStatusBadgeVariant = (status: WorkspaceStatus): "green" | "destructive" | "gray" => {
  switch (status) {
    case "active":
      return "green";
    case "disabled":
      return "destructive";
    default:
      return "gray";
  }
};
