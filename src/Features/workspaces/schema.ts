import { z } from "zod";

const FileSchema = typeof File !== "undefined" ? z.instanceof(File) : z.any();

export const workspaceSchema = z.object({

    name: z.string().trim().min(1, "Workspace name is required"),
    key: z.string().trim().min(1, "Key is required"),
    description: z.string().trim().max(400, "Description must be at most 400 characters").optional(),
    image: z.union([
        FileSchema,
        z.string().transform((value) => value === "" ? undefined : value),
    ]).optional(),

});

export const updateWorkspaceSchema = z.object({

    name: z.string().trim().min(1, "Must be 1 or more characters").optional(),
    description: z.string().trim().max(400, "Description must be at most 400 characters").optional(),
    image: z.union([
        FileSchema,
        z.string().transform((value) => value === "" ? undefined : value),
    ]).optional(),

});