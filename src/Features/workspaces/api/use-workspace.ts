import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import type { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { workspaceSchema } from "../schema";
import { toast } from "sonner"

const typedClient = client as typeof client & {
    api: {
        workspaces: {
            $post: (options: { json: z.infer<typeof workspaceSchema> }) => Promise<Response>;
        };
    };
};

type RequestType = z.infer<typeof workspaceSchema>;
type ResponseType = { success: string };

export const useWorkspace = () => {

    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
        const res = await typedClient.api.workspaces.$post({ json });

        if(!res.ok){

            throw new Error("Workspace creation failed");
            
        }

        return await res.json();

        },

        onSuccess: () => {

            toast.success("Workspace Created !!") ;
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });

        },

        onError: () => {

            toast.error("Failed to create workspace !!");
            
        }
    });
};
