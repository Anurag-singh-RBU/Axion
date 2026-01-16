import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import type { z } from "zod";
import type { signupFormSchema } from "@/app/(auth)/schema";

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

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
        const res = await typedClient.api.auth["sign-up"]["$post"]({json});

        if(!res.ok){

          throw new Error("Signup failed");
            
        }

        return await res.json();

        },
    });
};
