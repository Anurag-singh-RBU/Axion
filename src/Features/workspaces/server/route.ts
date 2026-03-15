import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { updateWorkspaceSchema, workspaceSchema } from '../schema';
import { sessionMiddleware } from '@/lib/sessionMiddleware';
import { DATABASE_ID, IMAGES_BUCKET_ID, MEMBERS_ID, WORKSPACES_ID } from '@/config';
import { ID, Permission, Query, Role } from 'node-appwrite';
import { generateInviteCode } from '@/lib/utils';
import { getMember } from '@/types/members/utils';
import z from 'zod';

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
.get("/:workspaceId/invite-info/:code" , sessionMiddleware , async (c) => {

    try {

        const databases = c.get("databases");
        const { workspaceId, code } = c.req.param();

        const workspace = await databases.getDocument(

            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId

        );

        if (workspace.inviteCode !== code) {

            return c.json({ data: { name: null, valid: false } });

        }

        return c.json({ data: { name: workspace.name, valid: true } });

    } catch (error) {

        console.error("Error getting invite info:", error);
        return c.json({ data: { name: null, valid: false } });

    }

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

.get("/:workspaceId/member" , sessionMiddleware , async (c) => {

    try {

        const databases = c.get("databases");
        const user = c.get("user");

        const workspaceId = c.req.param("workspaceId");

        const member = await getMember(databases, workspaceId, user.$id);

        return c.json({ data: member || null });

    } catch (error) {

        console.error("Error fetching member:", error);
        return c.json({ data: null });

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
.delete("/:workspaceId" , sessionMiddleware , async (c) => {

    try {

        const databases = c.get("databases");
        const user = c.get("user");

        const workspaceId = c.req.param("workspaceId");

        const member = await getMember(databases , workspaceId , user.$id);

        if(!member || member.role !== "ADMIN"){

            return c.json({ error : "Unauthorized" } , 403);

        }

        await databases.deleteDocument(

            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId

        );

        return c.json({ data : "Workspace deleted successfully" });

    } catch (error) {

        console.error("Error deleting workspace :", error);
        return c.json({ error: "Failed to delete workspace" }, 500);

    }

})
.delete("/:workspaceId/reset-invite-code" , sessionMiddleware , async (c) => {

    try {

        const databases = c.get("databases");
        const user = c.get("user");

        const workspaceId = c.req.param("workspaceId");

        const member = await getMember(databases , workspaceId , user.$id);

        if(!member || member.role !== "ADMIN"){

            return c.json({ error : "Unauthorized" } , 403);

        }

        const workspace = await databases.updateDocument(

            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId,
            {

                inviteCode : generateInviteCode(6),

            }

        );

        return c.json({ data : workspace });

    } catch (error) {

        return c.json({ error: "Something went wrong !!" }, 500);

    }

})
.post("/:workspaceId/join" , sessionMiddleware ,  zValidator("json" , z.object({ code : z.string() })) , async (c) => {

    try {

        const { workspaceId } = c.req.param();
        const { code } = c.req.valid("json");

        const databases = c.get("databases");
        const user = c.get("user");

        const member = await getMember(databases , workspaceId , user.$id);

        if(member){

            return c.json({ error : "Already a member of this workspace" } , 400);

        }

        const workspace = await databases.getDocument(

            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId

        );

        if(workspace.inviteCode !== code){

            return c.json({ error : "Invalid invite code" } , 400);

        }

        await databases.createDocument(

            DATABASE_ID,
            MEMBERS_ID,
            ID.unique(),
            {
                userId : user.$id,
                workspaceId : workspaceId,
                role : "MEMBER"
            }

        );

        return c.json({ data : "Joined workspace successfully" });

    } catch (error) {

        console.error("Error joining workspace :", error);
        return c.json({ error: "Failed to join workspace" }, 500);

    }

});

export default app;
