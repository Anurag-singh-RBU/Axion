import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"

type RequestType = {
    workspaceId: string;
    code: string;
};

type ResponseType = {
    data: unknown;
};

export const useJoinWorkspace = () => {

    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ workspaceId, code }) => {

            const res = await fetch(`/api/workspaces/${workspaceId}/join`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
                credentials: "include",

            });

            if(!res.ok){

                throw new Error("Join workspace failed");

            }

            return await res.json();

        },

        onSuccess: (_, variables) => {
            toast.success("Joined workspace successfully !!");
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({ queryKey: ["workspace", variables.workspaceId] });
        },

        onError: () => {
            toast.error("Failed to join workspace");
        }
    });
};
