import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { loginFormSchema, signupFormSchema } from '@/app/(auth)/schema'
import { createAdminClient } from '@/lib/appwrite';
import { ID } from 'node-appwrite';

const app = new Hono()
.post("/sign-in" , zValidator("json" , loginFormSchema) , async (c) => {

    const { email , password } = c.req.valid("json");

    return c.json({ email , password });

})
.post("/sign-up" , zValidator("json" , signupFormSchema) , async (c) => {

    const { username , email , password } = c.req.valid("json");

    const { account } = await createAdminClient();
    const user = await account.create(ID.unique() , username , email , password);

    const session = await account.createEmailPasswordSession({ email , password });

    return c.json({ username , email , password });

})

export default app;