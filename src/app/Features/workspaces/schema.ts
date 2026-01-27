import { z } from "zod";

export const workspaceSchema = z.object({

    name: z.string().trim().min(1, "Workspace name is required"),
    key: z.string().trim().min(1, "Key is required"),
    description: z.string().trim().max(400, "Description must be at most 400 characters").optional(),

})