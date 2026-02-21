import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import type { z } from "zod";
import type { signupFormSchema } from "@/app/(auth)/schema";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const typedClient = client as typeof client & {
  api: {
    auth: {
      "sign-up": {
        $post: (options: { json: z.infer<typeof signupFormSchema> }) => Promise<Response>;
      };
    };
  };
};

type RequestType = z.infer<typeof signupFormSchema>;
type ResponseType = { success: string };

export const useSignUp = () => {

  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
    const res = await typedClient.api.auth["sign-up"]["$post"]({json});

    if(!res.ok){

      throw new Error("Signup failed");
        
    }

    return await res.json();

    },

    onSuccess: () => {

      toast.success("Account Created Successfully !!");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });

    },

    onError: () => {

      toast.error("Failed to signup !!");
      
    }
  });
};
