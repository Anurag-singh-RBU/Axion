import { z } from "zod";

// Some runtime environments (serverless / Node) don't have the `File` constructor
// available, referencing `File` directly during module initialization can throw.
// Use a conditional to build a compatible schema for both browser and server.

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