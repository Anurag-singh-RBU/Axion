import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"

type RequestType = {
    workspaceId: string;
};

type ResponseType = {
    data: string;
};

export const useDeleteWorkspace = () => {

    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ workspaceId }) => {

            const res = await fetch(`/api/workspaces/${workspaceId}`, {

                method: "DELETE",
                credentials: "include",

            });

            if(!res.ok){

                throw new Error("Workspace deletion failed");

            }

            return await res.json();

        },

        onSuccess: (_, variables) => {

            toast.success("Workspace deleted !!") ;
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({ queryKey: ["workspace", variables.workspaceId] });

        },

        onError: () => {

            toast.error("Failed to delete workspace !!");

        }
    });
};
