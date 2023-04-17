import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { JWTKEY } from '$env/static/private';

const prisma = new PrismaClient();

type Data = {
    id: string
}

type TokenData = {
    id: string;
    username: string;
    email: string;
};

export const POST  = async ({ request }: { request: Request }) => {
    try {
        const listId = (await request.json()) as Data
        const token = request.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            throw new Error('No token provided');
        }

        const verified: TokenData = jwt.verify(token, JWTKEY);
        const { id } = verified;

        const result = await prisma.$transaction([
          prisma.listUser.deleteMany({
            where: {
              listId: listId.id
            }
          }),
          prisma.list.delete({
            where: {
              id: listId.id 
            }
          })
        ]);

        return new Response(
            JSON.stringify({ message: 'Sikeres törlés!', result }),
            { status: 200 },
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Hiba történt!', error: error.message }),
            { status: 500 },
        );
    }
};