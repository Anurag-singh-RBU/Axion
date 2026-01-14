import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { loginFormSchema } from '@/app/(auth)/schema'

const app = new Hono().post("/sign-in" , zValidator("json" , loginFormSchema) , (c) => {

    return c.json({success : "ok"})

});

export default app;