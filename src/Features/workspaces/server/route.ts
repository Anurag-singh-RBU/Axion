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

        const canUseFileConstructor = typeof File !== "undefined";

        if (canUseFileConstructor && image instanceof File) {

            const file = await storage.createFile(
                IMAGES_BUCKET_ID,
                ID.unique(),
                image,
                [
                    Permission.read(Role.any()),
                ]
            );

            // Store a direct Appwrite file view URL so the client can display the logo.
            const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
            const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

            if (endpoint && projectId) {
                uploadedImgURL = `${endpoint}/storage/buckets/${IMAGES_BUCKET_ID}/files/${file.$id}/view?project=${projectId}`;
            } else {
                // Fallback: still store the file id if env is missing
                uploadedImgURL = file.$id;
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