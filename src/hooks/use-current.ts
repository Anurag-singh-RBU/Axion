import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/rpc'

const typedClient = client as typeof client & {
    api: {
        auth: {
            "current": {
                $get: () => Promise<Response>;
            };
        };
    };
};

export const useCurrent = () => {

    const query = useQuery({

        queryKey: ['current'],
        queryFn: async () => {

            const res = await typedClient.api.auth.current.$get();

            if(!res.ok){

                throw new Error('Failed to fetch current user');

            }

            const { data } = await res.json();
            return data;

        },
    })

    return query;

}