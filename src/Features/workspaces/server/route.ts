import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { workspaceSchema } from '../schema';
import { sessionMiddleware } from '@/lib/sessionMiddleware';
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from '@/config';
import { ID, Permission, Role } from 'node-appwrite';

const app = new Hono()
.get("/" , sessionMiddleware , async (c) => {

    const databases = c.get("databases");

    const workspaces = await databases.listDocuments(

        DATABASE_ID,
        WORKSPACES_ID,

    );

    return c.json({data : workspaces});
    
})
.post("/" , zValidator("form" , workspaceSchema) , sessionMiddleware , async (c) => {
    try {
        const databases = c.get("databases");
        const storage = c.get("storage");
        const user = c.get("user");

        const { name , key , description , image } = c.req.valid("form");
        // Log basic incoming payload info for debugging in deployed logs
        console.log("Create workspace request:", {
            name: !!name ? "[REDACTED]" : name,
            key: !!key ? "[REDACTED]" : key,
            description: !!description ? "[REDACTED]" : description,
            hasImage: !!image,
            userId: user?.$id,
        });
        let uploadedImgURL : string | undefined;

        // Check env and runtime values to help diagnostics in production logs
        try {
            console.log("Env presence:", {
                NEXT_PUBLIC_APPWRITE_ENDPOINT: !!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
                NEXT_PUBLIC_APPWRITE_PROJECT: !!process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
                IMAGES_BUCKET_ID: !!process.env.NEXT_PUBLIC_APPWRITE_IMAGES_ID,
                DATABASE_ID: !!process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
                WORKSPACES_ID: !!process.env.NEXT_PUBLIC_APPWRITE_WORKSPACES_ID,
            });
        } catch (e) {
            console.log("Error checking env vars", e);
        }

        const canUseFileConstructor = typeof File !== "undefined";

        if (image) {
            // Only attempt to upload when we have an actual File-like object
            if (canUseFileConstructor && image instanceof File) {
                try {
                    const file = await storage.createFile(
                        IMAGES_BUCKET_ID,
                        ID.unique(),
                        image,
                        [
                            Permission.read(Role.any()),
                        ]
                    );

                    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
                    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

                    if (endpoint && projectId) {
                        uploadedImgURL = `${endpoint}/storage/buckets/${IMAGES_BUCKET_ID}/files/${file.$id}/view?project=${projectId}`;
                    } else {
                        uploadedImgURL = file.$id;
                    }
                } catch (uploadErr) {
                    console.error("Error uploading image to storage:", uploadErr);
                    // proceed without image rather than failing the whole request
                    uploadedImgURL = undefined;
                }
            } else if (typeof image === "string") {
                // If the client sent a string URL (already uploaded), use it
                uploadedImgURL = image as string;
            } else {
                console.log("Image provided but not a File or string; skipping upload.");
            }
        }

        const workspace = await databases.createDocument(

            DATABASE_ID,
            WORKSPACES_ID,
            ID.unique(),
            { name , key , description , userId : user.$id , imageUrl : uploadedImgURL }

        );
        
        return c.json({ data : workspace });

    } catch (error) {

        console.error("Error creating workspace:", error);
        return c.json({ error: "Failed to create workspace" } , 500);

    }
})

export default app;