import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { updateWorkspaceSchema, workspaceSchema } from '../schema';
import { sessionMiddleware } from '@/lib/sessionMiddleware';
import { DATABASE_ID, IMAGES_BUCKET_ID, MEMBERS_ID, WORKSPACES_ID } from '@/config';
import { ID, Permission, Query, Role } from 'node-appwrite';
import { generateInviteCode } from '@/lib/utils';
import { getMember } from '@/types/members/utils';

const app = new Hono()
.get("/" , sessionMiddleware , async (c) => {

    const databases = c.get("databases");
    const user = c.get("user");

    const members = await databases.listDocuments(

        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("userId" , user.$id)]

    );

    if(members.total === 0){

        return c.json({ data : {documents : [] , total : 0 }});

    }

    const wsIDs = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(

        DATABASE_ID,
        WORKSPACES_ID,
        [

            Query.orderDesc("$createdAt"),
            Query.contains("$id" , wsIDs)
        
        ]

    );

    return c.json({data : workspaces});
    
})
.get("/:workspaceId" , sessionMiddleware , async (c) => {

    try {

        const databases = c.get("databases");
        const user = c.get("user");

        const workspaceId = c.req.param("workspaceId");

        const member = await getMember(databases, workspaceId, user.$id);

        if(!member){

            return c.json({ error: "Unauthorized" }, 403);

        }

        const workspace = await databases.getDocument(

            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId

        );

        return c.json({ data: workspace });

    } catch (error) {

        console.error("Error fetching workspace:", error);
        return c.json({ error: "Failed to fetch workspace" }, 500);

    }

})
.post("/" , zValidator("form" , workspaceSchema) , sessionMiddleware , async (c) => {
    try {
        const databases = c.get("databases");
        const storage = c.get("storage");
        const user = c.get("user");

        const { name , key , description , image } = c.req.valid("form");
        console.log("Create workspace request:", {
            name: !!name ? "[REDACTED]" : name,
            key: !!key ? "[REDACTED]" : key,
            description: !!description ? "[REDACTED]" : description,
            hasImage: !!image,
            userId: user?.$id,
        });

        let uploadedImgURL : string | undefined;

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
                    } 
                    
                    else {
                        uploadedImgURL = file.$id;
                    }
                } catch (uploadErr) {
                    console.error("Error uploading image to storage:", uploadErr);
                    uploadedImgURL = undefined;
                }
            } 
            
            else if (typeof image === "string") {
                uploadedImgURL = image as string;
            } 
            
            else {
                console.log("Image provided but not a File or string; skipping upload.");
            }
        }

        const workspace = await databases.createDocument(

            DATABASE_ID,
            WORKSPACES_ID,
            ID.unique(),
            { name , key , description , userId : user.$id , imageUrl : uploadedImgURL , inviteCode : generateInviteCode(6) }

        );

        await databases.createDocument(

            DATABASE_ID,
            MEMBERS_ID,
            ID.unique(),
            {
                userId : user.$id,
                workspaceId : workspace.$id,
                role : "ADMIN"

            }

        )
        
        return c.json({ data : workspace });

    } catch (error) {

        console.error("Error creating workspace:", error);
        return c.json({ error: "Failed to create workspace" } , 500);

    }
})
.patch("/:workspaceId" , zValidator("form" , updateWorkspaceSchema) , sessionMiddleware , async (c) => {

    try {

        const databases = c.get("databases");
        const user = c.get("user");
        const storage = c.get("storage");

        const workspaceId = c.req.param("workspaceId");
        const { name , description , image } = c.req.valid("form");

        const member = await getMember(databases , workspaceId , user.$id);

        if(!member || member.role !== "ADMIN"){

            return c.json({ error : "Unauthorized" } , 403);

        }

        let uploadedImgURL : string | undefined;

        if (image) {

            if (typeof image === "string") {

                uploadedImgURL = image as string;

            }

            else if (typeof File !== "undefined" && image instanceof File) {

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
                    uploadedImgURL = undefined;

                }

            } else {

                console.log("Image provided but not a File or string; skipping upload.");

            }

        }

        const workspace = await databases.updateDocument(

            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId,
            {
                name,
                description,
                imageUrl : uploadedImgURL

            }

        );

        return c.json({ data : workspace });

    } catch (error) {

        console.error("Error updating workspace :", error);
        return c.json({ error : "Failed to update workspace" } , 500);

    }

})

export default app;
