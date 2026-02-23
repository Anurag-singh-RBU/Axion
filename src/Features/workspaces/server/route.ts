import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { workspaceSchema } from '../schema';
import { sessionMiddleware } from '@/lib/sessionMiddleware';
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from '@/config';
import { ID } from 'node-appwrite';

const app = new Hono()
.post("/" , zValidator("form" , workspaceSchema) , sessionMiddleware , async (c) => {
    try {
        const databases = c.get("databases");
        const storage = c.get("storage");
        const user = c.get("user");

        const { name , key , description , image } = c.req.valid("form");
        let uploadedImgURL : string | undefined;

        const canUseFileConstructor = typeof File !== "undefined";

        if (canUseFileConstructor && image instanceof File) {

            const file = await storage.createFile(
                IMAGES_BUCKET_ID,
                ID.unique(),
                image,
            );

            uploadedImgURL = file.$id;

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