import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { workspaceSchema } from "../schema";
import { toast } from "sonner"

type RequestType = z.infer<typeof workspaceSchema>;
type ResponseType = { success: string };

export const useWorkspace = () => {

    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (form) => {

            const fd = new FormData();
          
            fd.append("name", form.name);
            fd.append("key", form.key);
            fd.append("description", form.description || "");
          
            if(form.image){

              fd.append("image", form.image);

            }

            const res = await fetch("/api/workspaces", {

              method: "POST",
              body: fd,
              credentials: "include",

            });
          
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
