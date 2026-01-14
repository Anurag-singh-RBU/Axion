import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import auth from '../../../server/route'

const app = new Hono().basePath('/api')

const routes = app
    .route("/auth", auth as Hono);

export const GET = handle(app);
export type AppType = typeof routes;