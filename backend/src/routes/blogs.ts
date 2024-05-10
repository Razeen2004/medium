import {Hono} from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import z from 'zod';

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	},
    Variables:{
        userId: string,
    }
}>();

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    image: z.string(),

})

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number(),
})

blogRouter.use('/*', async (c, next) => {
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

blogRouter.post('/', async (c) => {
    const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate())

    const body = await c.req.json();
    const authorId = await Number(c.get("userId"));

    const blog = await prisma.post.create({
        data:{
            title: body.title,
            description: body.description,
            published: true,
            image:body.image,
            authorId: authorId,
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) => {
    const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate())

    const body = await c.req.json();

    const blog = await prisma.post.update({
        where: {
            id: Number(body.id)
        },
        data:{
            title: body.title,
            description: body.description,
        }
    })

    return c.json({
        id: blog.id
    })
})


blogRouter.get('/bulk', async (c) => {
    const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate())

    try{
        const blog = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                postedDate: true,
                image:true,
                author: {
                    select:{
                        name: true,
                    }
                }
            }
        })
        return c.json({
            blogs: blog
        })
    }catch(e){
        c.status(411);
        return c.json({
            error: "Error while fetching the posts"
        })
    }
})

blogRouter.get('/:id', async (c) => {
    const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate())

    const id = Number(c.req.param("id"));

    try{
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }
        })
        return c.json({
            blog: blog
        })
    }catch(e){
        c.status(411);
        return c.json({
            error: "Error while fetching the posts"
        })
    }
})