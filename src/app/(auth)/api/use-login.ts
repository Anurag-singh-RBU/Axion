import { Mutation, useMutation } from "@tanstack/react-query";
import { InferRequestType , InferResponseType } from "hono";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth["sign-in"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth["sign-in"]["$post"]>;

export const useLogin = () => {

    const mutation = useMutation<ResponseType , Error , RequestType>({

        mutationFn: async (data) => {

            const res = await client.api.auth["sign-in"]["$post"]({ json : data });

            if (!res.ok) {

                throw new Error("Login failed");

            }
            
            return res.json();

        },

    });

    return mutation;
    
}

