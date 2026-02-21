import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { workspaceSchema } from '../schema';
import { sessionMiddleware } from '@/lib/sessionMiddleware';
import { DATABASE_ID, WORKSPACES_ID } from '@/config';
import { ID } from 'node-appwrite';

const app = new Hono()
.post("/" , zValidator("json" , workspaceSchema) , sessionMiddleware , async (c) => {

    const databases = c.get("databases");
    const user = c.get("user");

    const { name , key , description } = c.req.valid("json");
    const workspace = await databases.createDocument(DATABASE_ID , WORKSPACES_ID , ID.unique() , { name , key , description , userId : user.$id });
    
    return c.json({ data: workspace });

})

export default app;