import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { JWTKEY } from '$env/static/private';

const prisma = new PrismaClient();

type User = {
	username: string;
	password: string;
	email: string;
};

type TokenData = {
	id: string;
	username: string;
	email: string;
};

export const POST = async ({ request }: { request: Request }) => {
	try {
		const user = (await request.json()) as User;
		const checkingUser = await prisma.user.findFirst({
			where: {
				email: user.email,
				OR: {
					username: user.username
				}
			}
		});
		if (checkingUser) {
			return new Response(
				JSON.stringify({ message: 'Létezik felhasználó ezzel az emailcímmel/felhasználónévvel!' }),
				{ status: 200 }
			);
		}
		const newUser = await prisma.listUser.create({
			data: {
				list: {
					create: {
						name: 'alapértelmezett',
						importance: 'DEFAULT',
						expiresat: new Date().toISOString()
					}
				},
				user: {
					create: {
						email: user.email,
						username: user.username,
						password: await bcrypt.hash(user.password, 10),
						registeredAt: '' + Date.now()
					}
				}
			}
		});

		const newTokenData: TokenData = {
			username: user.username,
			email: user.email,
			id: newUser.userId
		};

		const token = jwt.sign(newTokenData, JWTKEY);
		return new Response(JSON.stringify({ message: 'Sikeres regisztráció!', token: token }), {
			status: 201
		});
	} catch (error) {
		return new Response(JSON.stringify({ message: 'Hiba történt!' }), { status: 500 });
	}
};
