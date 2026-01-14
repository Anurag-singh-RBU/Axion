import { hc } from "hono/client"
import { AppType } from "@/app/server/app"

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL as string);