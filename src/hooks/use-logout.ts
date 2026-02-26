import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const typedClient = client as typeof client & {
  api: {
    auth: {
      "logout": {
        $post: () => Promise<Response>;
      };
    };
  };
};

type ResponseType = { success: string };

export const useLogout = () => {

  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
    const res = await typedClient.api.auth["logout"]["$post"]();

    if(!res.ok){

      throw new Error("Logout failed");
        
    }

    return await res.json();

    },

    onSuccess: () => {

      toast.success("Successfully Logged Out !!");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        
    },

    onError: () => {

      toast.error("Failed to logout !!");
      
    }
  });
};
