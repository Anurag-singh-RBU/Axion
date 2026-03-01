import { APP_URL } from "@/config";

export const fetchWorkspace = async (workspaceId: string) => {
  try {
    console.log("Fetching workspace with ID:", workspaceId);
    
    const url = `${APP_URL}/api/workspaces/${workspaceId}`;
    
    console.log("Fetching from URL:", url);
    
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    console.log("Response status:", res.status);
    console.log("Response ok:", res.ok);
    
    if (!res.ok) {
      const text = await res.text();
      console.log("Error response text:", text);
      let errorData: { error?: string } = {};
      try {
        errorData = JSON.parse(text);
      } catch (e) {}
      console.error("Error response:", errorData);
      throw new Error(errorData.error || `Failed to fetch workspace: ${res.status}`);
    }

    const data = await res.json();
    console.log("Workspace data:", data);
    return data.data;
  } catch (error) {
    console.error("Error fetching workspace:", error);
    return null;
  }
};
