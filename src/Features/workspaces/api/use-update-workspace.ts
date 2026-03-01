import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { z } from "zod";
import { updateWorkspaceSchema } from "../schema";
import { toast } from "sonner";

type RequestType = z.infer<typeof updateWorkspaceSchema> & { workspaceId : string };
type ResponseType = { success: string };

export const useUpdateWorkspace = () => {

    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({

        mutationFn: async ({ workspaceId , ...form }) => {

            const fd = new FormData();

            if(form.name) fd.append("name", form.name);
            if(form.description) fd.append("description", form.description);
            if(form.image) fd.append("image", form.image);

            const res = await fetch(`/api/workspaces/${workspaceId}`, {
                method: "PATCH",
                body: fd,
                credentials: "include",
            });

            if(!res.ok){

                throw new Error("Workspace update failed");

            }

            return await res.json();

        },

        onSuccess: () => {

            toast.success("Workspace Updated !!") ;
            queryClient.invalidateQueries({ queryKey : ["workspaces"] });

        },

        onError: () => {

            toast.error("Failed to update workspace !!");

        }

    });

};