import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import type { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { workspaceSchema } from "../schema";

const typedClient = client as typeof client & {
    api: {
        workspaces: {
            "workspaces": {
                $post: (options: { json: z.infer<typeof workspaceSchema> }) => Promise<Response>;
            };
        };
    };
};

type RequestType = z.infer<typeof workspaceSchema>;
type ResponseType = { success: string };

export const useWorkspace = () => {

    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
        const res = await typedClient.api.workspaces["workspaces"]["$post"]({json});

        if(!res.ok){

            throw new Error("Workspace creation failed");
            
        }

        return await res.json();

        },

        onSuccess: () => {

        queryClient.invalidateQueries({ queryKey: ["workspaces"] });

        }
    });
};
