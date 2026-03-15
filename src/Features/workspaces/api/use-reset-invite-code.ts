import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"

type RequestType = {
    workspaceId: string;
};

type ResponseType = {
    data: unknown;
};

export const useResetInviteCode = () => {

    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ workspaceId }) => {

            const res = await fetch(`/api/workspaces/${workspaceId}/reset-invite-code`, {

                method: "DELETE",
                credentials: "include",

            });

            if(!res.ok){

                throw new Error("Reset invite code failed");

            }

            return await res.json();

        },

        onSuccess: (_, variables) => {

            toast.success("Invite code reset successfully !!") ;
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({ queryKey: ["workspace", variables.workspaceId] });

        },

        onError: () => {

            toast.error("Failed to reset invite code !!");

        }
    });
};
