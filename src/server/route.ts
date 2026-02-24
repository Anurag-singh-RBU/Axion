import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { loginFormSchema, signupFormSchema } from '@/app/(auth)/schema'
import { createAdminClient } from '@/lib/appwrite';
import { ID } from 'node-appwrite';
import { deleteCookie, setCookie } from 'hono/cookie'
import { AUTH_COOKIE } from '@/app/(auth)/constants'
import { sessionMiddleware } from '@/lib/sessionMiddleware';

const app = new Hono()
.get("/current" , sessionMiddleware , async (c) => {

    const user = c.get("user");

    return c.json({ data : user });
    
})
.post("/sign-in" , zValidator("json" , loginFormSchema) , async (c) => {

    const { email , password } = c.req.valid("json");

    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email , password);

    setCookie(c , AUTH_COOKIE , session.secret, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ email , password });

})
.post("/sign-up" , zValidator("json" , signupFormSchema) , async (c) => {

    try{

        const { username , email , password } = c.req.valid("json");

        const { account } = await createAdminClient();

        await account.create(ID.unique(), email, password, username);
        const session = await account.createEmailPasswordSession(email, password);

        setCookie(c , AUTH_COOKIE , session.secret, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
        });

        return c.json({ success: "OK" });

    } catch(err : any){

        console.log("SIGNUP ERROR :", err);
        return c.json({ message : err?.message || "Internal Server Error" } , 500);

    }

})
.post("/logout" , sessionMiddleware , async (c) => {   // If user is not logged in then will not be able to logout.

    const account = c.get("account");

    await account.deleteSession("current");

    deleteCookie(c , AUTH_COOKIE);

    return c.json({ success: "OK" });

})

export default app;