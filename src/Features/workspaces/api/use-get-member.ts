import { useQuery } from "@tanstack/react-query";

export const useGetMember = (workspaceId: string) => {
  return useQuery({
    queryKey: ["member", workspaceId],
    queryFn: async () => {
      const res = await fetch(`/api/workspaces/${workspaceId}/member`, {
        credentials: "include",
      });

      if (!res.ok) {
        return null;
      }

      const { data } = await res.json();
      return data;
    },
    enabled: !!workspaceId,
  });
};
