import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { loginFormSchema, signupFormSchema } from '@/app/(auth)/schema'
import { createAdminClient } from '@/lib/appwrite';
import { ID } from 'node-appwrite';
import { setCookie } from 'hono/cookie'
import { AUTH_COOKIE } from '@/app/(auth)/constants'

const app = new Hono()
.post("/sign-in" , zValidator("json" , loginFormSchema) , async (c) => {

    const { email , password } = c.req.valid("json");

    return c.json({ email , password });

})
.post("/sign-up" , zValidator("json" , signupFormSchema) , async (c) => {

    try {

        const { username , email , password } = c.req.valid("json");

        const { account } = await createAdminClient();

        const user = await account.create(ID.unique(), email, password, username);
        const session = await account.createEmailPasswordSession(email, password);

        setCookie(c , AUTH_COOKIE , session.secret, {
            path: "/",
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
        });

        return c.json({ user , session });

    } catch(err : any){

        console.log("SIGNUP ERROR :", err);
        return c.json({ message : err?.message || "Internal Server Error" } , 500);

    }

})

export default app;