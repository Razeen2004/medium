import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import z from 'zod';

export const commentRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	},
    Variables:{
        userId: string,
    }
}>();

export const createComments = z.object({
    content: z.string(),
})

commentRouter.use("/*" , async (c, next)=>{
    const SECRET_KEY = c.env.JWT_SECRET;
    const header = await c.req.header("authorization") || "";
	const response = await verify(header, SECRET_KEY);

	if(response){
        c.set("userId", response.id);
		await next(); 
	}else{
		c.status(403);
        return c.json({
            error: "Unauthorized"
        })
	}
})