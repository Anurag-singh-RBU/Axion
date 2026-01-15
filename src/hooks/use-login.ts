import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import type { z } from "zod";
import type { loginFormSchema } from "@/app/(auth)/schema";

const typedClient = client as typeof client & {
  api: {
    auth: {
      "sign-in": {
        $post: (options: { json: z.infer<typeof loginFormSchema> }) => Promise<Response>;
      };
    };
  };
};

type RequestType = z.infer<typeof loginFormSchema>;
type ResponseType = { success: string };

export const useLogin = () => {

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await typedClient.api.auth["sign-in"]["$post"]({json});

      if(!res.ok){

        throw new Error("Login failed");
        
      }

      return await res.json();

    },
  });
};
