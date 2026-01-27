import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import auth from '../../../server/route'
import * as workspaces from "../../Features/workspaces/server/route"

const app = new Hono().basePath('/api')

// Chaining method

const routes = app
    .route("/auth", auth as Hono)
    .route("/workspaces", workspaces as unknown as Hono);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;

