import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { workspaceSchema } from '../schema';
import { sessionMiddleware } from '@/lib/sessionMiddleware';
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from '@/config';
import { ID } from 'node-appwrite';

const app = new Hono()
.post("/" , zValidator("json" , workspaceSchema) , sessionMiddleware , async (c) => {

    const databases = c.get("databases");
    const storage = c.get("storage");
    const user = c.get("user");

    const { name , key , description , image } = c.req.valid("json");
    let uploadedImgURL : string | undefined;

    if(image instanceof File){

        const file = await storage.createFile(
            IMAGES_BUCKET_ID,
            ID.unique(),
            image,
        );
        
        const arrayBuffer = await storage.getFilePreview(
            IMAGES_BUCKET_ID,
            file.$id,
        );

        uploadedImgURL = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;

    }

    const workspace = await databases.createDocument(DATABASE_ID , WORKSPACES_ID , ID.unique() , { name , key , description , userId : user.$id , imageUrl : uploadedImgURL });
    
    return c.json({ data: workspace });

})

export default app;