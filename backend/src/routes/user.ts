import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import bcrypt from "bcryptjs";
import z from 'zod';
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	}
}>();


const signupInput = z.object({
	email: z.string().email().nonempty(),
	name: z.string().optional(),
	password: z.string().min(6).nonempty(),
})

const signinInput = z.object({
	email: z.string().email(),
	password: z.string().min(6)
})


userRouter.post('/signup', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const SECRET_KEY = c.env.JWT_SECRET;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate())

	let body = await c.req.json();
	const bodyPassword = body.password;
	const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({
			error: "Invalid input"
		})
	}
	else {
		const hashedPassword = await bcrypt.hash(bodyPassword, 10);

		try {
			const user = await prisma.user.create({
				data: {
					email: body.email,
					name: body.name,
					passwords: hashedPassword,
				}
			})
			const payload = {
				id: user.id
			}

			const token = await sign(payload, SECRET_KEY);

			return c.json({
				jwt: token
			});
		} catch (e) {
			c.status(403);
			return c.json({
				error: "Error while signing up"
			})
		}
	}
})

userRouter.get('/user' , async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate())

	const SECRET_KEY = c.env.JWT_SECRET;

	const header = await c.req.header("authorization") || "";
	const response = await verify(header, SECRET_KEY);
	try{
		const userRes = await prisma.user.findUnique(
			{
				where: {
					id: Number(response.id),
				},
				select: {
					name: true,
					email: true,
				}
			}
		)
		return c.json({
			user: userRes
		})
	}catch(e){
		return console.log(e)
	}
})

userRouter.get('/users', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate())

	const users = await prisma.user.findMany()
	//no-
	return c.json(users)
})

userRouter.post('/signin', async (c) => {
	const dbUrl = c.env.DATABASE_URL;
	const SECRET_KEY = c.env.JWT_SECRET;
	const prisma = new PrismaClient({
		datasourceUrl: dbUrl,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const bodyPassword = await body.password;

	const { success } = signinInput.safeParse(body);

	if (!success) {
		c.status(400);
		return c.json({
			error: "Invalid input"
		})
	} else {
		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
			}
		})
		if (user) {
			const match = await bcrypt.compare(bodyPassword, user.passwords);
			const jwt = await sign({ id: user.id }, SECRET_KEY);

			if (match) {
				return c.json({
					jwt: jwt
				})
			} else {
				c.status(403);
				return c.json({
					error: "Invalid Password"
				})
			}

		} else {
			c.status(403);
			return c.json({
				error: "Error while signing in"
			})
		}
	}
})