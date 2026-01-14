import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType,} from "hono/client";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth["sign-in"]["$post"]>;

type RequestType = InferRequestType<typeof client.api.auth["sign-in"]["$post"]>;

export const useLogin = () => {

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.auth["sign-in"]["$post"]({json});

      if (!res.ok) {

        throw new Error("Login failed");
        
      }

      return await res.json();

    },
  });
};
