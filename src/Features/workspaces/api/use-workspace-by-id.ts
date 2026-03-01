import { useQuery } from "@tanstack/react-query";

export const useGetWorkspace = (workspaceId: string) => {
  const query = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      const res = await fetch(`/api/workspaces/${workspaceId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch workspace");
      }

      const { data } = await res.json();
      return data;
    },
    enabled: !!workspaceId,
  });

  return query;
};
