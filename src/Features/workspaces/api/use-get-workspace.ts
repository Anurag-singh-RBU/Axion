import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/rpc'

const typedClient = client as typeof client & {
    api: {
        workspaces: {
            $get: () => Promise<Response>;
        };
    };
};

export const useGetWorkspaces = () => {

    const query = useQuery({

        queryKey: ['workspaces'],
        queryFn: async () => {

            const res = await typedClient.api.workspaces.$get();

            if(!res.ok){

                throw new Error('Failed to fetch current user');

            }

            const { data } = await res.json();
            return data;

        },
    })

    return query;

}